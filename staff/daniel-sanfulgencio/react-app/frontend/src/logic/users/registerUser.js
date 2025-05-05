import { errors, validator } from "common"

const registerUser = (registerData, callback) => { //registerData = {'email': '', 'password': '', 'confirmation-password': ''}
    const securityErrors = validator.passwordSecurity(registerData['password'])

    if (securityErrors.length > 0) throw new errors.FormatError(securityErrors.join(','))

    if (registerData['password'] !== registerData['confirmation-password']) {
        throw new errors.ContentError('password and confirmation password are not the same')
    }

    validator.email(registerData['email'])
    validator.password(registerData['password'])
    validator.password(registerData['confirmation-password'])

    const user = { email: registerData['email'], password: registerData['password'] }

    const xhr = new XMLHttpRequest()

    xhr.open('POST', `${import.meta.env.VITE_API_APP}/users`, true)

    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 201) {
                callback(null)
            } else {
                const response = JSON.parse(xhr.response)
                if (errors[response.name]) callback(new errors[response.name](response.message)) //new errors.ExistenceError('user not found')
                else callback(new Error(`${response.name}: ${response.message}`))
                callback(new errors[response.name](response.message)) //new errors.ExistenceError('user not found')
            }
        }
    }

    xhr.send(JSON.stringify(user))

}

export default registerUser