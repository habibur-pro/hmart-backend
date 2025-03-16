import { Router } from 'express'
import OfferControls from './offer.controller'

const router = Router()
router.post('/new-offer', OfferControls.createOffer)
const OfferRoutes = router
export default OfferRoutes
