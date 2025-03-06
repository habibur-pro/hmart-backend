import { Types } from 'mongoose'
import { ProductStatus } from '../../../enum'
import { TProductVariant } from '../ProductVariant/productVariant.interface'

export type TProduct = {
    id: string
    productName: string
    urlSlug: string
    category: Types.ObjectId
    description: string
    price: number
    stockQuantity: number
    status: ProductStatus
    variants: Array<Types.ObjectId>
    images: Array<string>
    createdAt: Date
    updatedAt: Date
}

export type TProductAddPayload = {
    productName: string
    category: string
    description: string
    price: number
    stockQuantity: number
    status: ProductStatus
    variants?: Array<TProductVariant>
    images: Array<string>
}
