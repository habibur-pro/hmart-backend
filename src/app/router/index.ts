import { Router } from 'express'
import RoleRoutes from '../modules/Role/role.route'
import AuthRoutes from '../modules/Auth/auth.route'
import CategoryRoutes from '../modules/Category/category.route'
import ProductRoutes from '../modules/Product/product.route'
import CartRoutes from '../modules/Cart/cart.route'
import ShippingAddressRoutes from '../modules/ShippingAddress/shippingAddress.route'

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
    {
        path: '/carts',
        route: CartRoutes,
    },
    {
        path: '/shipping-addresses',
        route: ShippingAddressRoutes,
    },
]

routes.map((route) => router.use(route.path, route.route))

export default router
