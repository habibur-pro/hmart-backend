import { Document, Model, model, Schema } from 'mongoose'
import { TCart } from './cart.interface'
import idGenerator from '../../helpers/idGenerator'

const CartSchema = new Schema<TCart>(
    {
        id: {
            type: String,
            required: [true, 'id is require'],
            unique: true,
        },
        userId: {
            type: String,
            required: [true, 'userId is require'],
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'product',
            required: [true, 'product is require'],
        },
        productVariant: {
            type: Schema.Types.ObjectId,
            ref: 'productVariant',
            default: null,
        },
        quantify: {
            type: Number,
            required: [true, 'quantity is required'],
        },
    },
    { timestamps: true }
)
CartSchema.pre<TCart>('validate', async function (next) {
    if (!this.id) {
        this.id = await idGenerator(this.constructor as Model<Document & TCart>)
    }
    next()
})

const Cart = model<TCart>('cart', CartSchema)
export default Cart
