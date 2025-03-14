import { Document, Model, model, Schema } from 'mongoose'
import idGenerator from '../../helpers/idGenerator'
import { TOrder } from './order.interface'

const OrderSchema = new Schema<TOrder>(
    {
        id: {
            type: String,
            required: [true, 'id is required'],
            unique: true,
        },
        userId: {
            type: String,
            default: null,
        },
        totalAmount: {
            type: Number,
            required: [true, 'totalAmount is required'],
        },
        discountAmount: {
            type: Number,
            required: [true, 'discountAmount is required'],
        },
        grossAmount: {
            type: Number,
            required: [true, 'grossAmount is required'],
        },
        shippingAmount: {
            type: Number,
            required: [true, 'shippingAmount is required'],
        },
        netAmount: {
            type: Number,
            required: [true, 'netAmount is required'],
        },
        status: {
            type: String,
            required: [true, 'status is required'],
        },
        paymentType: {
            type: String,
            required: [true, 'paymentType is required'],
        },
        transactionId: {
            type: String,
            default: null,
        },
        items: {
            type: [Schema.ObjectId],
            ref: 'orderItem',
            default: [],
        },
    },
    { timestamps: true }
)
OrderSchema.pre<TOrder>('validate', async function (next) {
    if (!this.id) {
        this.id = await idGenerator(
            this.constructor as Model<Document & TOrder>
        )
    }
    next()
})
const Product = model('order', OrderSchema)
export default Product
