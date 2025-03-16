import { Document, model, Schema } from 'mongoose'
import { TOffer } from './offer.interface'
import { OfferStatus } from '../../../enum'
import idGenerator from '../../helpers/idGenerator'
import { Model } from 'mongoose'

const OfferSchema = new Schema<TOffer>(
    {
        id: {
            type: String,
            required: [true, 'id is required'],
            unique: true,
        },
        couponCode: {
            type: String,
            required: [true, 'couponCode is required'],
            unique: true,
        },
        discountValue: {
            type: Number,
            required: [true, 'discountValue is required'],
        },
        startDate: {
            type: Date,
            required: [true, 'startDate is required'],
        },
        endDate: {
            type: Date,
            default: null,
        },
        description: {
            type: String,
            default: null,
        },
        status: {
            type: String,
            default: OfferStatus.ACTIVE,
        },
    },
    { timestamps: true }
)
OfferSchema.pre<TOffer>('validate', async function (next) {
    if (!this.id) {
        this.id = await idGenerator(
            this.constructor as Model<Document & TOffer>
        )
    }
    next()
})
const Offer = model<TOffer>('offer', OfferSchema)
export default Offer
