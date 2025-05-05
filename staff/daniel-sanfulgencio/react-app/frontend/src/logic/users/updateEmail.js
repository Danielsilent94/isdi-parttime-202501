import data from "../../data"
import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId"

const updateEmail = (newEmail) => {
    validator.email(newEmail)
    const loggedUserId = getLoggedUserId()

    const doesUserExist = data.users.findUserByEmail(newEmail)
    if (doesUserExist) {
        throw new errors.ExistenceError('something went wrong, try again with new credentials')
    }

    const user = data.users.findUserById(loggedUserId)

    if (!user) throw new errors.ExistenceError('user not found')
    user.email = newEmail
    data.users.updateUserById(loggedUserId, user)
}

export default updateEmail