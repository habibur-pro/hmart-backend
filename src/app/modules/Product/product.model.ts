import { Document, Model, model, Schema } from 'mongoose'
import { TProduct } from './product.interface'
import { ProductStatus } from '../../../enum'
import idGenerator from '../../helpers/idGenerator'

//    variants: Array<TProductVariant>
//    image: Array<string>
//    createdAt: Date
//    updatedAt: Date
const ProductSchema = new Schema<TProduct>(
    {
        id: {
            type: String,
            required: [true, 'id is required'],
            unique: true,
        },
        urlSlug: {
            type: String,
            required: [true, 'urlSlug is required'],
            unique: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'productCategory',
            required: [true, 'category is required'],
        },
        description: {
            type: String,
            required: [true, 'description is required'],
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
        status: {
            type: String,
            enum: Object.values(ProductStatus),
            default: ProductStatus.ACTIVE,
        },
        variants: {
            type: [Schema.Types.ObjectId],
            default: [],
            ref: 'productVariant',
        },
        images: {
            type: [String],
            required: [true, 'images are required'],
        },
    },
    { timestamps: true }
)
ProductSchema.pre<TProduct>('validate', async function (next) {
    if (!this.id) {
        this.id = await idGenerator(
            this.constructor as Model<Document & TProduct>
        )
    }
    next()
})
const Product = model('product', ProductSchema)
export default Product
