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
    },
    createPost: function (post) { //e.g post = {title: "Hello", description: "world", img: "https://iamalink.com/img.png"}
        var postsJson = localStorage.posts
        var posts;
        if (!postsJson) {
            posts = [];
        } else {
            posts = JSON.parse(postsJson)
        }

        var userIdJson = localStorage.id;
        if (!userIdJson) {
            userIdJson = sessionStorage.id
        }

        var userId = JSON.parse(userIdJson)

        post.author = userId;
        post.createdOn = new Date();
        post.id = Date.now()

        posts.push(post)

        localStorage.posts = JSON.stringify(posts)

    },
    retrievePosts: function () {
        var posts = localStorage.posts ? JSON.parse(localStorage.getItem("posts")) : [];

        for (var i = 0; i < posts.length; i++) {
            var author = data.findUserById(posts[i].author)
            posts[i].author = author.username
            var date = new Date(posts[i].createdOn)
            posts[i].createdOn = date.toLocaleString()
        }

        return posts
    }
}
