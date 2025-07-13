import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User.mjs'

const router = express.Router()

// Registrar usuario
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Missing email or password' })

    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ error: 'Email already in use' })

    const hash = await bcrypt.hash(password, 10)
    const user = new User({ email, password: hash, name })
    await user.save()

    res.status(201).json({ message: 'User created successfully', userId: user._id })
  } catch (err) {
    console.error('❌ Error registering user:', err)
    res.status(500).json({ error: 'Failed to register' })
  }
})

// Login usuario
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Missing email or password' })

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ error: 'Invalid credentials' })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(400).json({ error: 'Invalid credentials' })

    res.json({ message: 'Login successful', userId: user._id, name: user.name })
  } catch (err) {
    console.error('❌ Error logging in:', err)
    res.status(500).json({ error: 'Failed to login' })
  }
})

export default router