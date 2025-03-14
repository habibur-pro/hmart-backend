// a. Id, Primary key
// b. Order_id (Foreign key - orders)
// c. Product_id (Foreign key - products)
// d. Product_variant_id (Foreign key - product_variants)
// e. Product_name
// f.
// Color (NULL)
// g. Size (NULL)
// h. Price (Float)
// i.
// Quantity (integer)
// j.
// Total_amount (Float)

import { Types } from 'mongoose'

export type TOrderItem = {
    id: string
    orderId: string
    product: Types.ObjectId
    productVariant: Types.ObjectId
    quantity: number
    price: number
    totalAmount: number
    createdAt: Date
    updatedAt: Date
}
