import { errors } from "common"
import { data } from "../data/index.js"

const loginUser = (email, password, callback) => {
    data.users.findUserByEmail(email, (error, user) => {
        if (error) callback(error)
        else if (!user) callback(new errors.ExistenceError('user not found'))
        else {
            if (user.password !== password) callback(new errors.AuthError('invalid credentials'))
            else {
                callback(null, user.id)
            }
        }
    })
}

export default loginUser