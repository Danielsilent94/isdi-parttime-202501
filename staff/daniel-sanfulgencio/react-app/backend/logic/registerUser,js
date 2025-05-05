import { errors } from "common"
import { data } from "../data/index.js"


const registerUser = (email, password, username, callback) => {
    data.users.findUserByEmail(email, (error, user) => {
        if (error) callback(error)
        else if (user) callback(new errors.DuplicityError('user already exists'))
        else {
            data.users.createUser({ email, password, username }, (error, user) => {
                if (error) callback(error)
                else if (user) callback(null)
                else {
                    callback(new errors.ServerError('unexpected error on registerUser'))
                }
            })
        }
    })
}

export default registerUser