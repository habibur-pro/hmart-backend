import { TOfferCreatePayload } from './offer.interface'
import Offer from './offer.model'

const createOffer = async (payload: TOfferCreatePayload) => {
    const newOffer = await Offer.create(payload)
    return newOffer
}

const OfferServices = { createOffer }
export default OfferServices
