import { Router } from 'express'
import ProductControls from './product.controller'

const router = Router()
router.post('/add-product', ProductControls.addProduct)
router.get('/', ProductControls.getProducts)
const ProductRoutes = router
export default ProductRoutes
