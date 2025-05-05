import data from "../../data"
import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId";

//TODO Add ID validators to everywhere

const updateUsername = (newUsername, callback) => {
    validator.username(newUsername)

    const xhr = new XMLHttpRequest()

    xhr.open('PATCH', `${import.meta.env.VITE_API_APP}/users/username`, true)

    xhr.setRequestHeader('Authorization', `Basic ${getLoggedUserId()}`)
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(null)
            } else {
                const response = JSON.parse(xhr.response)
                if (errors[response.name]) callback(new errors[response.name](response.message))
                else callback(new Error(`${response.name}: ${response.message}`))
            }

        }
    }

    xhr.send(JSON.stringify({ username: newUsername }))
}

export default updateUsername