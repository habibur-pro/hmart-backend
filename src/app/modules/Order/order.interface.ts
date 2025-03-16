import { Types } from 'mongoose'
import { OrderStatus, PaymentType } from '../../../enum'
import ProductVariant from '../ProductVariant/productVariant.model'

export type TOrder = {
    id: string
    userId: string
    phone: string
    email: string
    totalAmount: number
    discountAmount: number
    grossAmount: number
    shippingAmount: number
    netAmount: number
    status: OrderStatus
    paymentType: PaymentType
    transactionId: string
    items: Array<Types.ObjectId>
}

export type TOrderCreatePayload = {
    userId?: string
    phone: string
    email?: string
    paymentType: PaymentType
    discountAmount: number
    shippingAmount: number
    items: Array<{
        productId: string
        ProductVariantId: string
        quantity: number
        price: number
        totalAmount: number
    }>
}
