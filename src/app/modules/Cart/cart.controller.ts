import httpStatus from 'http-status'
import sendResponse from '../../helpers/sendResponse'
import catchAsync from '../../helpers/asyncHandler'
import CartServices from './cart.service'

const addToCart = catchAsync(async (req, res) => {
    const data = await CartServices.addToCart(req)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'item added  successfully',
        data: data,
    })
})
const getMyCart = catchAsync(async (req, res) => {
    const data = await CartServices.getMyCart(req)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'cart fetch successfully',
        data: data,
    })
})
const CartControls = {
    addToCart,
    getMyCart,
}
export default CartControls
