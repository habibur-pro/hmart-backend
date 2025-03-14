import { Types } from 'mongoose'

export type TCart = {
    id: string
    userId: string
    product: Types.ObjectId
    productVariant: Types.ObjectId
    quantify: number
}
