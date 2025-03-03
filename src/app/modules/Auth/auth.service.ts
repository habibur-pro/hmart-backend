import ApiError from '../../helpers/ApiErrot'
import Role from '../Role/role.model'
import User from '../User/user.model'
import { TsignupPayload, TVerifySignInPayload } from './auth.interface'
import httpStatus from 'http-status'
import bcrypt from 'bcrypt'
import { UserStatus } from '../../../enum'
import jwt from 'jsonwebtoken'
import config from '../../config'

const signup = async (payload: TsignupPayload) => {
    console.log(payload)
    const role = await Role.findOne({ roleName: 'user' })
    if (!role) throw new ApiError(httpStatus.BAD_REQUEST, 'role not found')
    const saltRounds = 10 // Higher means more security but slower
    const hashedPassword = await bcrypt.hash(payload.password, saltRounds)
    const userData = {
        ...payload,
        role: role._id,
        password: hashedPassword,
        status: UserStatus.ACTIVE,
    }
    await User.create(userData)
    return { message: 'signup success' }
}
const verifySignIn = async (payload: TVerifySignInPayload) => {
    const user = await User.findOne({
        $or: [{ phone: payload?.phone }, { email: payload.email }],
    })
    if (!user)
        throw new ApiError(httpStatus.BAD_REQUEST, 'user or password not match')
    const isPassMatch = bcrypt.compare(user.password, payload.password)
    if (!isPassMatch)
        throw new ApiError(httpStatus.BAD_REQUEST, 'user or password not match')
    return { message: 'verify success' }
}
const signIn = async (payload: TVerifySignInPayload) => {
    const user = await User.findOne({
        $or: [{ phone: payload?.phone }, { email: payload.email }],
    })
    if (!user)
        throw new ApiError(httpStatus.BAD_REQUEST, 'user or password not match')
    const isPassMatch = bcrypt.compare(user.password, payload.password)
    if (!isPassMatch)
        throw new ApiError(httpStatus.BAD_REQUEST, 'user or password not match')
    const accessToken = jwt.sign(
        { id: user.id, phone: user.phone },
        config.jwt_secret!
    )
    const responseData = {
        name: user.fullName,
        id: user.id,
        phone: user.phone,
        accessToken,
    }
    return responseData
}
const AuthServices = { signup, verifySignIn, signIn }
export default AuthServices
