import { Document, Model, model, Schema } from 'mongoose'
import idGenerator from '../../helpers/idGenerator'
import { TOrderItem } from './orderItem.interface'

const OrderItemSchema = new Schema<TOrderItem>(
    {
        id: {
            type: String,
            required: [true, 'id is required'],
            unique: true,
        },
        orderId: {
            type: String,
            required: [true, 'orderId is required'],
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'product',
            required: [true, 'product is required'],
        },
        productVariant: {
            type: Schema.Types.ObjectId,
            ref: 'productVariant',
            required: [true, 'productVariant is required'],
        },
        quantity: {
            type: Number,
            required: [true, 'quantity is required'],
            min: 1,
        },
        price: {
            type: Number,
            required: [true, 'price is required'],
            min: 1,
        },
        totalAmount: {
            type: Number,
            required: [true, 'totalAmount is required'],
        },
    },
    { timestamps: true }
)
OrderItemSchema.pre<TOrderItem>('validate', async function (next) {
    if (!this.id) {
        this.id = await idGenerator(
            this.constructor as Model<Document & TOrderItem>
        )
    }
    next()
})
const OrderItem = model('orderItem', OrderItemSchema)
export default OrderItem
