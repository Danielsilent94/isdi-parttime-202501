import { errors } from "common"
import { data } from "../data/index.js"

const getUsername = (id, callback) => {
    data.users.findUserById(id, (error, user) => {
        if (error) callback(error)
        else if (!user) callback(new errors.ExistenceError('user not found'))
        else callback(null, user.username)
    })
}

export default getUsername