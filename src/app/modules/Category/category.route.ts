import { Router } from 'express'
import CategoryControls from './category.controller'

const router = Router()
router.post('/create-category', CategoryControls.createCategory)
const CategoryRoutes = router
export default CategoryRoutes
