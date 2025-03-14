import ShippingAddress from '../app/modules/ShippingAddress/shippingAddress.model'

export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    BLOCKED = 'blocked',
}
export enum CategoryStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}
export enum ProductStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

export enum OrderStatus {
    PENDING = 'pending',
    SHIPPED = 'shipped',
    CANCELED = 'canceled',
    APPROVED = 'approved',
    DELIVERED = 'delivered',
}
export enum PaymentStatus {
    PAID = 'paid',
    UNPAID = 'unpaid',
}
export enum PaymentType {
    MOBILEBANKING = 'mobilebanking',
    NETBANKING = 'netbanking',
    BANK = 'bank',
    CARD = 'card',
}
