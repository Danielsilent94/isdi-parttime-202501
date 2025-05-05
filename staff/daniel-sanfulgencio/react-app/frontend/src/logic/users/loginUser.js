import { errors, validator } from "common"

const loginUser = (loginData, callback) => { //{'email': 'patata@mail.com'}
    //comprobamos si el email que ha puesto el usuario esta en la bbdd y si no lo esta, lanzamos un alert
    validator.password(loginData['password'])
    validator.email(loginData['email'])

    const user = { email: loginData.email, password: loginData.password }

    const xhr = new XMLHttpRequest()

    xhr.open('POST', `${import.meta.env.VITE_API_APP}/users/auth`, true)

    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4)
            if (xhr.status === 200) {
                if (loginData['remember']) {
                    localStorage.id = xhr.response
                } else {
                    sessionStorage.id = xhr.response
                }
                callback(null)
            } else {
                const response = JSON.parse(xhr.response)
                if (errors[response.name]) callback(new errors[response.name](response.message))
                else callback(new Error(`${response.name}: ${response.message}`))
                callback(new errors[response.name](response.message))
            }
    }

    xhr.send(JSON.stringify(user))
}

export default loginUser