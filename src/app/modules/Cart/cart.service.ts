import { Request } from 'express'
import Product from '../Product/product.model'
import ApiError from '../../helpers/ApiErrot'
import httpStatus from 'http-status'
import Cart from './cart.model'
import ProductVariant from '../ProductVariant/productVariant.model'
const addToCart = async (req: Request) => {
    const payload = req.body
    console.log(payload)

    if (!payload.product || !payload.productVariant) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found')
    }

    const product = await Product.findById(payload.product)
    if (!product) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found')
    }

    if (payload.userId) {
        // Check if the same product with the same variant already exists in the database cart
        const existingCartItem = await Cart.findOne({
            userId: payload.userId,
            product: payload.product,
            productVariant: payload.productVariant,
        })

        if (existingCartItem) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'Product already in cart'
            )
        }

        // Add the new product to the user's database cart
        await Cart.create({ ...payload })
    } else {
        // Get session cart or initialize an empty array
        const carts = req.session.cart || []

        // Check if the same product with the same variant already exists in the session cart
        const isDuplicate = carts.some(
            (cart) =>
                cart.product.toString() === payload.product &&
                cart.productVariant.toString() === payload.productVariant
        )

        if (isDuplicate) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'Product already in cart'
            )
        }

        // Add new product to session cart
        req.session.cart = [...carts, payload]
    }

    return { message: 'Product added to cart' }
}

const getMyCart = async (req: Request) => {
    const userId = req.query?.userId
    if (userId) {
        const carts = await Cart.find({ userId }).populate([
            'product',
            'productVariant',
        ])
        return carts
    } else {
        const carts = req.session?.cart || []

        if (carts?.length) {
            const cartsWithData = await Promise.all(
                carts.map(async (cart) => {
                    const existProduct = await Product.findById(cart.product)
                    const existVariant = await ProductVariant.findById(
                        cart.productVariant
                    )
                    return {
                        ...cart,
                        product: existProduct,
                        productVariant: existVariant,
                    }
                })
            )

            return cartsWithData
        } else {
            return carts
        }
    }
}

const CartServices = { addToCart, getMyCart }
export default CartServices
