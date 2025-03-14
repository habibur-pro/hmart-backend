import { Document, Model, model, Schema } from 'mongoose'
import { TShippingAddress } from './shippingAddress.interface'
import idGenerator from '../../helpers/idGenerator'

const ShippingAddressSchema = new Schema<TShippingAddress>(
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
        fullName: {
            type: String,
            required: [true, 'fullName is required'],
            trim: true,
        },
        phone: {
            type: String,
            required: [true, 'phone is required'],
        },
        email: {
            type: String,
            default: null,
        },
        fullAddress: {
            type: String,
            required: [true, 'fullAddress is required'],
        },
        state: {
            type: String,
            required: [true, 'state is required'],
        },
        city: {
            type: String,
            required: [true, 'city is required'],
        },
        zipCode: {
            type: String,
            required: [true, 'zip code is required'],
        },
    },
    { timestamps: true }
)
ShippingAddressSchema.pre<TShippingAddress>('validate', async function (next) {
    if (!this.id) {
        this.id = await idGenerator(
            this.constructor as Model<Document & TShippingAddress>
        )
    }
    next()
})
const ShippingAddress = model('shippingAddress', ShippingAddressSchema)
export default ShippingAddress
