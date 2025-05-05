import data from "../../data";
import { errors, validator } from "common"

const getUserBioById = (id) => {
    validator.id(id)

    const user = data.users.findUserById(id)

    if (!user) throw new errors.ExistenceError('user not found')
    return user.bio
}

export default getUserBioById