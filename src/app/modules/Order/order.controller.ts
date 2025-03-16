import httpStatus from 'http-status'
import sendResponse from '../../helpers/sendResponse'
import catchAsync from '../../helpers/asyncHandler'
import OrderServices from './order.service'

const createOrder = catchAsync(async (req, res) => {
    const data = await OrderServices.createOrder(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'order placed successfully',
        data: data,
    })
})

const OrderControls = {
    createOrder,
}
export default OrderControls
