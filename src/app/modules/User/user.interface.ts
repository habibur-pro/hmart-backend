import { Types } from 'mongoose'
import { UserStatus } from '../../../enum'

export type TUser = {
    id: string
    role: Types.ObjectId
    fullName: string
    password: string
    email: string
    phone: string
    status: UserStatus
}
