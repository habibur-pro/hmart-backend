import { model, Schema } from 'mongoose'
import { TCategory } from './category.interface'
import { CategoryStatus } from '../../../enum'
import idGenerator from '../../helpers/idGenerator'
import { Model, Document } from 'mongoose'

const CategorySchema = new Schema<TCategory>(
    {
        id: { type: String, unique: true, required: [true, 'id is required'] },
        categoryName: {
            type: String,
            required: [true, 'category name is required'],
            trim: true,
        },
        url_slug: {
            type: String,
            required: [true, 'url slug is required'],
            unique: true,
        },
        status: {
            type: String,
            enum: Object.values(CategoryStatus),
            default: CategoryStatus.ACTIVE,
        },
    },
    { timestamps: true }
)
CategorySchema.pre<TCategory>('validate', async function (next) {
    if (!this.id) {
        this.id = await idGenerator(
            this.constructor as Model<Document & TCategory>
        )
    }
    next()
})
const Category = model('category', CategorySchema)
export default Category
