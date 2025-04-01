import data from "../../data"
import { ContentError, ExistenceError } from "../../utils/errors"
import validator from "../../utils/validators"

const registerUser = (registerData) => { //registerData = {'email': '', 'password': '', 'confirmation-password': ''}
    validator.email(registerData['email'])
    validator.password(registerData['password'])
    validator.password(registerData['confirmation-password'])
    const username = registerData['email'].split('@')[0]
    validator.username(username)


    if (registerData['password'] !== registerData['confirmation-password']) {
        throw new ContentError('password and confirmation password are not the same')
    }

    const doesUserExist = data.users.findUserByEmail(registerData['email'])
    if (doesUserExist) {
        throw new ExistenceError('something went wrong, try again with new credentials')
    }

    const userCreated = { email: registerData['email'], password: registerData['password'], username, id: Date.now() }

    data.users.createUser(userCreated)

    sessionStorage.id = userCreated.id //almacenamos en el sessionStorage el id del usuario que se acaba de registrar y loggear
}

export default registerUser