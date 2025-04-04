import data from "../../data"
import { ExistenceError } from "../../utils/errors"
import validator from "../../utils/validators"
import getLoggedUserId from "../helpers/getLoggedUserId"

const updateEmail = (newEmail) => {
    validator.email(newEmail)
    const loggedUserId = getLoggedUserId()

    const doesUserExist = data.users.findUserByEmail(newEmail)
    if (doesUserExist) {
        throw new ExistenceError('something went wrong, try again with new credentials')
    }

    const user = data.users.findUserById(loggedUserId)

    if (!user) throw new ExistenceError('user not found')
    user.email = newEmail
    data.users.updateUserById(loggedUserId, user)
}

export default updateEmail