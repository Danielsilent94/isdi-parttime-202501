import data from "../../data";
import { ExistenceError } from "common/errors";
import validator from "common";

const getUserUsernameById = (id) => {
    validator.id(id)

    const user = data.users.findUserById(id)

    if (!user) throw new ExistenceError('user not found')
    return user.username
}

export default getUserUsernameById