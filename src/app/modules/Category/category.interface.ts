import { CategoryStatus } from '../../../enum'

export type TCategory = {
    id: string
    categoryName: string
    url_slug: string
    status: CategoryStatus
    createdAt: Date
    updatedAt: Date
}
