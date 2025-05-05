import data from "../../data"
import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId"

const updateBio = (newBio) => {
    validator.text(newBio, 200, 0, 'bio')

    const loggedUserId = getLoggedUserId()

    validator.id(loggedUserId)

    const user = data.users.findUserById(loggedUserId)
    if (!user) throw new errors.ExistenceError('user not found')
    user.bio = newBio
    data.users.updateUserById(loggedUserId, user)
}

export default updateBio