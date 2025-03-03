import { Document, Model, model, Schema } from 'mongoose'
import { TRole } from './role.interface'
import idGenerator from '../../helpers/idGenerator'

const RoleSchema = new Schema<TRole>(
    {
        id: {
            type: String,
            required: [true, 'id is required'],
            unique: true,
        },
        roleName: {
            type: String,
            required: [true, 'roleName is required'],
            unique: true,
        },
    },
    { timestamps: true }
)
RoleSchema.pre<TRole>('validate', async function (next) {
    if (!this.id) {
        this.id = await idGenerator(this.constructor as Model<Document & TRole>)
    }
    next()
})
const Role = model<TRole>('role', RoleSchema)
export default Role
