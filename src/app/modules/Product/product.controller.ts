import httpStatus from 'http-status'
import sendResponse from '../../helpers/sendResponse'
import catchAsync from '../../helpers/asyncHandler'
import ProductServices from './product.service'

const addProduct = catchAsync(async (req, res) => {
    const data = await ProductServices.addProduct(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'product added successfully',
        data: data,
    })
})
const getProducts = catchAsync(async (req, res) => {
    const data = await ProductServices.getProducts()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'products fetched successfully',
        data: data,
    })
})
const ProductControls = {
    addProduct,
    getProducts,
}
export default ProductControls
