import httpStatus from 'http-status'
import sendResponse from '../../helpers/sendResponse'
import catchAsync from '../../helpers/asyncHandler'
import RoleServices from './role.service'

const createRole = catchAsync(async (req, res) => {
    const data = await RoleServices.createRole(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'role created successfully',
        data: data,
    })
})
const RoleControls = {
    createRole,
}
export default RoleControls
