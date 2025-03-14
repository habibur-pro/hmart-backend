import { TShippingAddress } from './shippingAddress.interface'
import ShippingAddress from './shippingAddress.model'

const addAddress = async (payload: Partial<TShippingAddress>) => {
    const shippingAddress = await ShippingAddress.create(payload)
    return shippingAddress
}
const ShippingAddressServices = { addAddress }
export default ShippingAddressServices
