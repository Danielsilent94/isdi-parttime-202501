import data from "../../data"
import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId"

const updatePassword = (newPassword, confirmationNewPassword, oldPassword) => {
    validator.password(newPassword)
    validator.password(confirmationNewPassword)
    validator.password(oldPassword)

    if (newPassword !== confirmationNewPassword) {
        throw new errors.ContentError('password and confirmation password are not the same')
    }

    const loggedUserId = getLoggedUserId()

    const user = data.users.findUserById(loggedUserId)

    if (!user) throw new errors.ExistenceError('user not found')
    if (user.password !== oldPassword) throw new errors.AuthError('incorrect password')
    user.password = newPassword
    data.users.updateUserById(loggedUserId, user)
}

export default updatePassword