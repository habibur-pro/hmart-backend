import { Types } from 'mongoose'
import { OrderStatus, PaymentType } from '../../../enum'

export type TOrder = {
    id: string
    userId: string
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
