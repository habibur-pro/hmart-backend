import { Router } from 'express'
import OrderControls from './order.controller'

const router = Router()
router.post('/new-order', OrderControls.createOrder)
const OrderRoutes = router
export default OrderRoutes
