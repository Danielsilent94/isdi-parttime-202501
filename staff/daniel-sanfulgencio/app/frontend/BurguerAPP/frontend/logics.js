/*Logicas internas de las funcionalidades de la app*/

function loginUser(loginData) { //{'email': 'patata@mail.com'}
    //comprobamos si el email que ha puesto el usuario esta en la bbdd y si no lo esta, lanzamos un alert

    var userLoginCheckout = data.findUserByEmail(loginData['email'])

    //comprueba que el usuario loggeado esta en nuestra ddbb(si es que tenemos una base de datos)
    //si esta en la base de datos, comprobamos que la cotnraseña coincide con la del usuario, sino, lanzamos un alert
    if (!userLoginCheckout || userLoginCheckout['password'] !== loginData['password']) {
        alert("wrong credentials")
        return
    }

    sessionStorage.id = userLoginCheckout.id

    navigateToHome(currentView)

    //y si se cumple todo, guardamos el id en el session storage y navegamos a home

}

function registerUser(registerData) { //registerData = {'email': '', 'password': '', 'confirmation-password': ''}
    if (!registerData['email'] && !registerData['password'] && !registerData['confirmation-password']) { //!registerData['email'] => registerData['email'] === undefined && registerData['email'] === null
        alert('Register Data Incomplete')
        return;
    }
    if (registerData['password'] !== registerData['confirmation-password']) {
        alert('Password and confirmation password are not the same')
        return
    }
    /*Podriamos longitud, y caracteres de la contraseñar, validar que el mail no esta en uso, etc*/

    //comprobar si el user ya existe

    var doesUserExist = data.findUserByEmail(registerData['email'])
    if (doesUserExist) {
        alert('Something went wrong, try again with new credentials')
        return
    }

    var username = registerData['email'].split('@')[0]

    var userCreated = { email: registerData['email'], password: registerData['password'], username, id: Date.now() }

    data.createUser(userCreated)

    sessionStorage.id = userCreated.id //almacenamos en el sessionStorage el id del usuario que se acaba de registrar y loggear

    navigateToHome(currentView) //hemos creado una variable currentView para almacenar la pagina en la que estamos en ese momento y no tener que pasarla entre diversas funciones
}