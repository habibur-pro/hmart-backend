import { DiscountType, OfferStatus } from '../../../enum'

export type TOffer = {
    id: string
    couponCode: string
    discountType: DiscountType
    discountValue: number
    startDate: Date
    endDate: Date
    description: string
    status: OfferStatus
    createdAt: Date
    updatedAt: Date
}

export type TOfferCreatePayload = {
    couponCode: string
    discountType: DiscountType
    discountValue: number
    startDate: Date
    endDate?: Date
    description?: string
}
