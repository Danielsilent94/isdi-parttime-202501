import users from "./users.js";

const testCallback = (error, response) => {
    if (error) console.log(error)
    else console.log(response)
}

//users.createUser({ email: "percy1@mail.com", password: "percy1@mail.com", username: "percy1" }, (error, user) => testCallback(error, user))

users.updateUserById(1745433875083, {
    "email": "percy1@mail.com",
    "password": "percy1@mail.com",
    "username": "PercyElMejor",
    "id": 1745433875083
}, (error, user) => testCallback(error, user))