import { Router } from 'express'
import CartControls from './cart.controller'

const router = Router()
router.post('/add-to-cart', CartControls.addToCart)
router.get('/my-cart', CartControls.getMyCart)
const CartRoutes = router
export default CartRoutes
