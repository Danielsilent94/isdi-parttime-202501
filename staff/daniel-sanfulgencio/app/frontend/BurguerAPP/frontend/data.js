var data = {
    findUserById: function (id) { //definimos la función para poder acceder a ella
        var usersJson = localStorage.users //nos traemos los users de la bbdd del localStorage
        if (!usersJson) return undefined //si no hay bbdd devolvemos undefined porque no hay ningun usuario

        var users = JSON.parse(usersJson) //si sí hay bbdd la convertimos a js

        var userFound = users.find(function (user) { return user.id === id }) //buscamos el usuario con el mismo id usando el metodo find

        return userFound //lo devolvemos
    },
    findUserByEmail: function (email) {
        var usersJson = localStorage.users
        if (!usersJson) return undefined

        var users = JSON.parse(usersJson)

        var userFound = users.find(function (user) { return user.email === email })

        return userFound
    },
    createUser: function (user) { //e.g user = {email: "percy1@mail.com", password: "percy1@mail.com", username: "percy1", id: 1740600285989}
        var usersJson = localStorage.users
        var users;
        if (!usersJson) {
            users = []
        } else {
            users = JSON.parse(usersJson)
        }

        users.push(user)

        localStorage.setItem('users', JSON.stringify(users))
    }
}
