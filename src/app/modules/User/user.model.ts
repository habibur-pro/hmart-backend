import { Document, Model, model, Schema } from 'mongoose'
import { TUser } from './user.interface'
import { UserStatus } from '../../../enum'
import idGenerator from '../../helpers/idGenerator'

const UserSchema = new Schema<TUser>({
    id: {
        type: String,
        required: [true, 'id is required'],
        unique: true,
    },
    role: {
        type: Schema.ObjectId,
        required: [true, 'id is required'],
    },
    fullName: {
        type: String,
        required: [true, 'full name is required'],
    },
    email: {
        type: String,
        default: null,
    },
    phone: {
        type: String,
        required: [true, 'phone is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    status: {
        type: String,
        enum: Object.values(UserStatus),
        required: [true, 'status is required'],
    },
})
UserSchema.pre<TUser>('validate', async function (next) {
    if (!this.id) {
        this.id = await idGenerator(this.constructor as Model<Document & TUser>)
    }
    next()
})
const User = model('user', UserSchema)
export default User
