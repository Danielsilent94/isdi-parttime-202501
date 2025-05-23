import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { validator, errors } from 'common';
import { FormatError } from 'common/errors.js';

import User from './models/User.js';
import Post from './models/Post.js';

const port = 4321;
const api = express();
api.use(cors());
api.use(json());

api.get('/api', (req, res) => {
    res.status(200).send('Hello World!');
});

// Registro
api.post('/users', async (req, res) => {
    const { email, password } = req.body;

    try {
        validator.email(email);
        validator.password(password);
        const username = email.split('@')[0];

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ name: 'DuplicityError', message: 'Duplicity error.' });

        const newUser = await User.create({ email, password, username });
        res.status(201).json({ id: newUser._id });
    } catch (error) {
        res.status(400).json({ name: error.name, message: error.message });
    }
});

// Login
api.post('/users/auth', async (req, res) => {
    const { email, password } = req.body;

    try {
        validator.email(email);
        validator.password(password);

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ name: 'ExistenceError', message: 'user not found' });

        if (user.password !== password) return res.status(401).json({ name: 'AuthError', message: 'invalid credentials' });

        res.status(200).json({ id: user._id.toString() });
    } catch (error) {
        res.status(400).json({ name: error.name, message: error.message });
    }
});

// Obtener username
api.get('/users/username', async (req, res) => {
    const authHeader = req.headers.authorization;
    const id = authHeader?.split(" ")[1];

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ name: 'ExistenceError', message: 'user not found' });

        res.status(200).send(user.username);
    } catch (error) {
        res.status(500).json({ name: error.name, message: error.message });
    }
});

// Obtener avatar
api.get('/users/avatar', async (req, res) => {
    const authHeader = req.headers.authorization;
    const id = authHeader?.split(" ")[1];

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ name: 'ExistenceError', message: 'user not found' });

        res.status(200).send(user.avatar || '');
    } catch (error) {
        res.status(500).json({ name: error.name, message: error.message });
    }
});

// Obtener datos por ID
api.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id).lean();
        if (!user) return res.status(404).json({ name: 'ExistenceError', message: 'user not found' });

        res.status(200).json({
            _id: user._id,
            username: user.username,
            avatar: user.avatar || ''
        });
    } catch (error) {
        res.status(500).json({ name: error.name, message: error.message });
    }
});

// Crear post
api.post('/posts', async (req, res) => {
    const authHeader = req.headers.authorization;
    const id = authHeader?.split(" ")[1];
    const { title, description, img } = req.body;

    try {
        validator.text(title, 40, 1, 'Post Title');
        validator.text(description, 210, 1, 'Post Description');

        const post = await Post.create({
            title,
            description,
            img,
            author: id,
            likes: [],
            createdOn: new Date()
        });

        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ name: error.name, message: error.message });
    }
});

// Todos los posts
api.get('/posts', async (req, res) => {
    const authHeader = req.headers.authorization;
    const id = authHeader?.split(" ")[1];

    try {
        const posts = await Post.find()
            .populate('author', '_id username avatar')
            .sort({ createdOn: -1 });

        const normalized = posts.map(post => ({
            id: post._id.toString(),
            title: post.title,
            description: post.description,
            img: post.img,
            author: {
                id: post.author._id.toString(),
                username: post.author.username,
                avatar: post.author.avatar || ''
            },
            createdOn: post.createdOn.toLocaleString(),
            likes: post.likes.map(u => u.toString()),
            isLiked: post.likes.map(u => u.toString()).includes(id)
        }));

        res.status(200).json(normalized);
    } catch (error) {
        res.status(500).json({ name: error.name, message: error.message });
    }
});

// Posts por autor
api.get('/posts/author/:authorId', async (req, res) => {
    const authHeader = req.headers.authorization;
    const loggedUserId = authHeader?.split(" ")[1];
    const authorId = req.params.authorId;

    try {
        const posts = await Post.find({ author: authorId })
            .populate('author', '_id username avatar')
            .sort({ createdOn: -1 });

        const normalized = posts.map(post => ({
            id: post._id.toString(),
            title: post.title,
            description: post.description,
            img: post.img,
            author: {
                id: post.author._id.toString(),
                username: post.author.username,
                avatar: post.author.avatar || ''
            },
            createdOn: post.createdOn.toLocaleString(),
            likes: post.likes.map(userId => userId.toString()),
            isLiked: post.likes.map(userId => userId.toString()).includes(loggedUserId)
        }));

        res.status(200).json(normalized);
    } catch (error) {
        res.status(500).json({ name: error.name, message: error.message });
    }
});

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
