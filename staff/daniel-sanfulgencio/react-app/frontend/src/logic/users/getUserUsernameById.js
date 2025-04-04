import data from "../../data";
import { ExistenceError } from "../../utils/errors";
import validator from "../../utils/validators";

const getUserUsernameById = (id) => {
    validator.id(id)

    const user = data.users.findUserById(id)

    if (!user) throw new ExistenceError('user not found')
    return user.username
}

export default getUserUsernameById