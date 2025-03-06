import { Router } from 'express'
import RoleRoutes from '../modules/Role/role.route'
import AuthRoutes from '../modules/Auth/auth.route'
import CategoryRoutes from '../modules/Category/category.route'
import ProductRoutes from '../modules/Product/product.route'

const router = Router()
const routes = [
    {
        path: '/roles',
        route: RoleRoutes,
    },
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/categories',
        route: CategoryRoutes,
    },
    {
        path: '/products',
        route: ProductRoutes,
    },
]

routes.map((route) => router.use(route.path, route.route))

export default router
