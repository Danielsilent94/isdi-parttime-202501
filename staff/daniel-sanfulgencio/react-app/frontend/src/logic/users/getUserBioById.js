import data from "../../data";
import { ExistenceError } from "../../utils/errors";
import validator from "../../utils/validators";

const getUserBioById = (id) => {
    validator.id(id)

    const userLogged = data.users.findUserById(id)

    if (!userLogged) throw new ExistenceError('user not found')
    return userLogged.bio
}

export default getUserBioById