import { errors } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId";

const getUserUsername = (callback) => {
    const xhr = new XMLHttpRequest()

    xhr.open('GET', `${import.meta.env.VITE_API_APP}/users/username`, true)

    xhr.setRequestHeader('Authorization', `Basic ${getLoggedUserId()}`)

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const username = xhr.response
                if (callback && typeof callback === 'function') callback(null, username)
            } else {
                try {
                    const response = JSON.parse(xhr.response)
                    if (callback && typeof callback === 'function') {
                        if (errors[response.name]) callback(new errors[response.name](response.message))
                        else callback(new Error(`${response.name}: ${response.message}`))
                    }
                } catch (parseError) {
                    if (callback && typeof callback === 'function') {
                        callback(new Error('Unexpected response format'))
                    }
                }
            }
        }
    }

    xhr.send()
}

export default getUserUsername
