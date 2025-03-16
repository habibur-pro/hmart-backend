import mongoose from 'mongoose'
import { TOrderCreatePayload } from './order.interface'
import OrderItem from '../OrderItem/orderItem.model'
import ApiError from '../../helpers/ApiErrot'
import httpStatus from 'http-status'
import Product from '../Product/product.model'

const createOrder = async (payload: TOrderCreatePayload) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const productIds = payload.items.map(
            (item) => new mongoose.Types.ObjectId(item.productId)
        )

        // Fetch product details
        const products = await Product.find({
            _id: { $in: productIds },
        }).session(session)

        if (products.length !== productIds.length) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'Some products were not found.'
            )
        }

        // Create a stock map
        const productStockMap = new Map(
            products.map((product) => [
                product._id.toString(),
                product.stockQuantity,
            ])
        )

        // Check stock availability
        for (const item of payload.items) {
            const availableStock = productStockMap.get(item.productId) || 0
            if (item.quantity > availableStock) {
                throw new ApiError(
                    httpStatus.BAD_REQUEST,
                    `Product ${item.productId} is out of stock`
                )
            }
        }

        // Calculate total amount
        const totalAmount = payload.items.reduce((sum, item) => {
            const product = products.find(
                (p) => p._id.toString() === item.productId
            )
            return sum + (product ? product.price * item.quantity : 0)
        }, 0)

        console.log('Total amount:', totalAmount)

        // Calculate final amounts

        const discountAmount = parseFloat(payload.discountAmount) || 0

        const shippingAmount = parseFloat(payload.shippingAmount) || 0
        const grossAmount = totalAmount - discountAmount
        const netAmount = grossAmount + shippingAmount

        // Create order items
        const orderItems = await OrderItem.insertMany(
            payload.items.map((item) => ({
                productId: item.productId,
                productVariantId: item.ProductVariantId,
                quantity: item.quantity,
                price:
                    products.find((p) => p._id.toString() === item.productId)
                        ?.price || 0,
                total:
                    products.find((p) => p._id.toString() === item.productId)
                        ?.price * item.quantity || 0,
            })),
            { session }
        )

        // Create the order
        const order = await Order.create(
            [
                {
                    userId: payload.userId,
                    phone: payload.phone,
                    email: payload.email,
                    paymentType: payload.paymentType,
                    items: orderItems.map((item) => item._id), // Reference order items
                    totalAmount,
                    discountAmount,
                    shippingAmount,
                    netAmount,
                    status: 'pending',
                },
            ],
            { session }
        )

        // Reduce stock for purchased products
        for (const item of payload.items) {
            await Product.updateOne(
                { _id: item.productId },
                { $inc: { stockQuantity: -item.quantity } },
                { session }
            )
        }

        // Commit transaction
        await session.commitTransaction()
        session.endSession()

        return { success: true, order }
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            error?.message || 'Something went wrong'
        )
    }
}

const OrderServices = { createOrder }
export default OrderServices
