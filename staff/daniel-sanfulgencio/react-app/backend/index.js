import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { validator, errors } from 'common';
import { FormatError } from 'common/errors.js';
import User from './models/User.js'; // <<-- Importamos el modelo User

const port = 4321;
const api = express();
api.use(cors());
api.use(json());

api.get('/api', (req, res) => {
    res.status(200).send('Hello World!');
});

// Registro de usuario
api.post('/users', async (req, res) => {
    const { email, password } = req.body;

    try {
        validator.email(email);
        validator.password(password);
        const username = email.split('@')[0];

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).send('Duplicity error.');

        const newUser = await User.create({ email, password, username });
        res.status(201).send({ id: newUser._id });
    } catch (error) {
        if (error instanceof TypeError || error instanceof RangeError || error instanceof FormatError) {
            res.status(400).send(error.message);
        } else {
            res.status(500).send(error.message);
        }
    }
});

// Login de usuario
api.post('/users/auth', async (req, res) => {
    const { email, password } = req.body;

    try {
        validator.email(email);
        validator.password(password);

        const user = await User.findOne({ email });
        if (!user) return res.status(404).send('user not found');

        if (user.password !== password) return res.status(401).send('invalid credentials');

        res.status(200).send(user._id.toString());
    } catch (error) {
        if (error instanceof TypeError || error instanceof RangeError || error instanceof FormatError) {
            res.status(400).send(error.message);
        } else {
            res.status(500).send(error.message);
        }
    }
});

// Obtener username
api.get('/users/username', async (req, res) => {
    const authHeader = req.headers.authorization;
    const id = authHeader?.split(" ")[1];

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).send('user not found');

        res.status(200).send(user.username);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener avatar
api.get('/users/avatar', async (req, res) => {
    const authHeader = req.headers.authorization;
    const id = authHeader?.split(" ")[1];

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).send('user not found');

        res.status(200).send(user.avatar || '');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Conexión a Mongo y arranque del servidor
mongoose.connect('mongodb://127.0.0.1:27017/my-app')
    .then(() => {
        console.log('✅ Connected to MongoDB');
        api.listen(port, () => {
            console.info(`🚀 API listening to PORT: ${port}`);
        });
    })
    .catch(error => {
        console.error('❌ Failed to connect to MongoDB', error);
    });

