import { Document, Model, Schema } from 'mongoose'
import { TProductVariant } from './productVariant.interface'
import idGenerator from '../../helpers/idGenerator'
import { model } from 'mongoose'

const ProductVariantSchema = new Schema<TProductVariant>(
    {
        id: {
            type: String,
            required: [true, 'id is required'],
            unique: true,
        },
        productId: {
            type: String,
            required: [true, 'product id is required'],
        },
        color: {
            type: String,
            default: null,
        },
        size: {
            type: String,
            default: null,
        },
        price: {
            type: Number,
            required: [true, 'price is required'],
            min: 1,
        },
        stockQuantity: {
            type: Number,
            required: [true, 'stock Quantity is required'],
        },

        image: {
            type: String,
            required: [true, 'image is required'],
        },
    },
    { timestamps: true }
)
ProductVariantSchema.pre<TProductVariant>('validate', async function (next) {
    if (!this.id) {
        this.id = await idGenerator(
            this.constructor as Model<Document & TProductVariant>
        )
    }
    next()
})
const ProductVariant = model('productVariant', ProductVariantSchema)
export default ProductVariant
