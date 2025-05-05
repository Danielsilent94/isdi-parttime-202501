import fs from 'fs';
import { errors } from 'common'

const users = {
    createUser: (user, callback) => { //e.g user = {email: "danny@mail.com", password: "12345Aa!", username: "danny"}
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
    },
    updateUserById: (id, newUserData, callback) => {
        fs.readFile('./data/users.json', (error, data) => {
            if (error) callback(error)
            else {
                let users = JSON.parse(data)
                if (!users) callback(new errors.ExistenceError('user not found'))
                else {
                    const userIndex = users.findIndex(user => user.id === id)
                    if (userIndex === -1) {
                        callback(new errors.ExistenceError('user not found'))
                    } else {
                        users[userIndex] = newUserData

                        const usersJson = JSON.stringify(users)

                        fs.writeFile('./data/users.json', usersJson, (error) => {
                            if (error) callback(error)
                            else callback(null, newUserData)
                        })
                    }
                }
            }
        })
    }
}

export default users