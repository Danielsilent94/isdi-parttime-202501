import express from 'express';
import { json } from 'express';
import { data } from './data/index.js';
import validator from 'common';
import { FormatError } from 'common/errors.js';
import cors from 'cors'

const port = 5173 //localhost:5173/

const api = express()

api.use(cors())

const jsonBodyParser = json()

api.get('/api', (req, res) => {
    res.status(200)
    res.send('Hello World!')
})

api.post('/users', jsonBodyParser, (req, res) => {
    const { email, password } = req.body

    try {
        validator.email(email)
        validator.password(password)
        const username = email.split('@')[0]

        data.users.findUserByEmail(email, (error, user) => {
            if (error) res.status(500).send(error.message)
            else if (user) res.status(409).send('Duplicity error.')
            else {
                data.users.createUser({ email, password, username }, (error, user) => {
                    if (error) res.status(500).send(error.message)
                    else if (user) res.status(201).send()
                    else {
                        res.status(500).send('something went wrong')
                    }
                })
            }
        })
    } catch (error) {
        if (error instanceof TypeError || error instanceof RangeError || error instanceof FormatError) {
            res.status(400).send(error.message)
        } else {
            res.status(500).send(error.message)
        }
    }
})

api.post('/users/auth', jsonBodyParser, (req, res) => {
    const { email, password } = req.body

    try {
        validator.email(email)
        validator.password(password)

        data.users.findUserByEmail(email, (error, user) => {
            if (error) res.status(500).send(error.message)
            else if (!user) res.status(404).send('user not found')
            else {
                if (user.password !== password) res.status(401).send('invalid credentials')
                else {
                    res.status(200).send(user.id)
                }
            }
        })
    } catch (error) {
        if (error instanceof TypeError || error instanceof RangeError || error instanceof FormatError) {
            res.status(400).send(error.message)
        } else {
            res.status(500).send(error.message)
        }
    }
})

api.get('/users/username', (req, res) => {
    const auhtHeader = req.headers.authorization

    const id = Number(auhtHeader.split(" ")[1])

    try {
        validator.id(id)
        data.users.findUserById(id, (error, user) => {
            if (error) res.status(500).send(error.message)
            else if (!user) res.status(404).send('user not found')
            else res.status(200).send(user.username)
        })
    } catch (error) {
        if (error instanceof TypeError || error instanceof RangeError || error instanceof FormatError) {
            res.status(400).send(error.message)
        } else {
            res.status(500).send(error.message)
        }
    }
})

api.get('/users/avatar', (req, res) => {
    const auhtHeader = req.headers.authorization

    const id = Number(auhtHeader.split(" ")[1])

    try {
        validator.id(id)
        data.users.findUserById(id, (error, user) => {
            if (error) res.status(500).send(error.message)
            else if (!user) res.status(404).send('user not found')
            else res.status(200).send(user.avatar)
        })
    } catch (error) {
        if (error instanceof TypeError || error instanceof RangeError || error instanceof FormatError) {
            res.status(400).send(error.message)
        } else {
            res.status(500).send(error.message)
        }
    }
})

api.listen(port, () => {
    console.info(`API listening to PORT: ${port}`)
})