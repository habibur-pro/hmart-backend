import { Router } from 'express'
import ShippingAddressControls from './shippingAddress.controller'

const router = Router()
router.post('/add-address', ShippingAddressControls.addAddress)
const ShippingAddressRoutes = router
export default ShippingAddressRoutes
