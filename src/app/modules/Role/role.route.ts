import { Router } from 'express'
import RoleControls from './role.controller'

const router = Router()
router.post('/create-role', RoleControls.createRole)
const RoleRoutes = router
export default RoleRoutes
