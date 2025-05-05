import data from "../../data"
import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId"

const updateAvatar = (newAvatar) => {
    //validator.imgUrl(newAvatar)

    const loggedUserId = getLoggedUserId()

    validator.id(loggedUserId)

    const user = data.users.findUserById(loggedUserId)

    if (!user) throw new errors.ExistenceError('user not found')
    user.avatar = newAvatar
    data.users.updateUserById(loggedUserId, user)
}

export default updateAvatar