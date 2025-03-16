import httpStatus from 'http-status'
import sendResponse from '../../helpers/sendResponse'
import catchAsync from '../../helpers/asyncHandler'
import OfferServices from './offer.service'

const createOffer = catchAsync(async (req, res) => {
    const data = await OfferServices.createOffer(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'offer added successfully',
        data: data,
    })
})

const OfferControls = {
    createOffer,
}
export default OfferControls
