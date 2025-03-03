import httpStatus from 'http-status'
import sendResponse from '../../helpers/sendResponse'
import catchAsync from '../../helpers/asyncHandler'
import AuthServices from './auth.service'

const signup = catchAsync(async (req, res) => {
    const data = await AuthServices.signup(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'signup success successfully',
        data: data,
    })
})
const verifySignIn = catchAsync(async (req, res) => {
    const data = await AuthServices.verifySignIn(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'signup verification success ',
        data: data,
    })
})
const signIn = catchAsync(async (req, res) => {
    const data = await AuthServices.signIn(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'signin success ',
        data: data,
    })
})
const AuthControls = {
    signup,
    verifySignIn,
    signIn,
}
export default AuthControls
