import { Router } from 'express'
import RoleRoutes from '../modules/Role/role.route'
import AuthRoutes from '../modules/Auth/auth.route'

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
]

routes.map((route) => router.use(route.path, route.route))

export default router
