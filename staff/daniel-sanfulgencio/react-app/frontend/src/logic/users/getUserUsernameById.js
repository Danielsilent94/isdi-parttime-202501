import data from "../../data";
import { ExistenceError } from "../../utils/errors";
import validator from "../../utils/validators";

const getUserUsernameById = (id) => {
    validator.id(id)

    const userLogged = data.users.findUserById(id)

    if (!userLogged) throw new ExistenceError('user not found')
    return userLogged.username
}

export default getUserUsernameById