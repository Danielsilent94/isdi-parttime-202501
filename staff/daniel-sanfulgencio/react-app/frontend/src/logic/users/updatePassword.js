import data from "../../data"
import { AuthError, ContentError, ExistenceError } from "common/errors"
import validator from "common"
import getLoggedUserId from "../helpers/getLoggedUserId"

const updatePassword = (newPassword, confirmationNewPassword, oldPassword) => {
    validator.password(newPassword)
    validator.password(confirmationNewPassword)
    validator.password(oldPassword)

    if (newPassword !== confirmationNewPassword) {
        throw new ContentError('password and confirmation password are not the same')
    }

    const loggedUserId = getLoggedUserId()

    const user = data.users.findUserById(loggedUserId)

    if (!user) throw new ExistenceError('user not found')
    if (user.password !== oldPassword) throw new AuthError('incorrect password')
    user.password = newPassword
    data.users.updateUserById(loggedUserId, user)
}

export default updatePassword