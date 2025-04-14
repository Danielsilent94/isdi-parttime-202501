import fs from 'fs';

const users = {
    createUser: (user, callback) => { //e.g user = {email: "percy1@mail.com", password: "percy1@mail.com", username: "percy1"}
        fs.readFile('./data/users.json', (error, data) => {
            if (error) callback(error)
            else {
                let users = JSON.parse(data)
                if (!users) users = []
                user.id = Date.now()
                users.push(user)

                const usersJson = JSON.stringify(users)

                fs.writeFile('./data/users.json', usersJson, (error) => {
                    if (error) callback(error)
                    else callback(null, user)
                })
            }
        })
    },
    findUserByEmail: (email, callback) => {
        fs.readFile('./data/users.json', (error, data) => {
            if (error) callback(error)
            else {
                let users = JSON.parse(data)
                if (!users) users = []

                const userFound = users.find(user => user.email === email)

                callback(null, userFound)
            }
        })
    },
    findUserById: (id, callback) => {
        fs.readFile('./data/users.json', (error, data) => {
            if (error) callback(error)
            else {
                let users = JSON.parse(data)
                if (!users) users = []

                const userFound = users.find(user => user.id === id)

                callback(null, userFound)
            }
        })
    }
}

export default users