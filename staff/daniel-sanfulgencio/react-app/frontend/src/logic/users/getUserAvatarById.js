import data from "../../data";
import { ExistenceError } from "../../utils/errors";
import validator from "../../utils/validators";

const getUserAvatarById = (id) => {
    validator.id(id)

    const userLogged = data.users.findUserById(id)

    if (!userLogged) throw new ExistenceError('user not found')
    return userLogged.avatar
}

export default getUserAvatarById