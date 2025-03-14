import httpStatus from 'http-status'
import sendResponse from '../../helpers/sendResponse'
import catchAsync from '../../helpers/asyncHandler'
import ShippingAddressServices from './shippingAddress.service'

const addAddress = catchAsync(async (req, res) => {
    const data = await ShippingAddressServices.addAddress(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'address added successfully',
        data: data,
    })
})
const ShippingAddressControls = {
    addAddress,
}
export default ShippingAddressControls
