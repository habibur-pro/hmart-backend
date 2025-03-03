import { Router } from 'express'
import AuthControls from './auth.controller'

const router = Router()
router.post('/signup', AuthControls.signup)
router.post('/verify-signin', AuthControls.verifySignIn)
router.post('/signin', AuthControls.signIn)
const AuthRoutes = router
export default AuthRoutes
