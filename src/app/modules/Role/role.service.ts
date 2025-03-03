import Role from './role.model'

const createRole = async (payload: { roleName: string }) => {
    await Role.create(payload)
    return { message: 'role created' }
}

const RoleServices = { createRole }
export default RoleServices
