import httpStatus from 'http-status'
import sendResponse from '../../helpers/sendResponse'
import catchAsync from '../../helpers/asyncHandler'
import categoryServices from './category.service'

const createCategory = catchAsync(async (req, res) => {
    const data = await categoryServices.createCategory(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'category created successfully',
        data: data,
    })
})
const CategoryControls = {
    createCategory,
}
export default CategoryControls
