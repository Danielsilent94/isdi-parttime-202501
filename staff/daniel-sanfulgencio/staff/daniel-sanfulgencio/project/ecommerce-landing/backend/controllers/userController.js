import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'clave-secreta'

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ error: 'Email ya registrado' })

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashed })

    res.status(201).json({ message: 'Usuario registrado' })
  } catch {
    res.status(500).json({ error: 'Error en el registro' })
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ error: 'Credenciales incorrectas' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ error: 'Credenciales incorrectas' })

    const token = jwt.sign({ userId: user._id, name: user.name }, JWT_SECRET, { expiresIn: '1d' })
    res.json({ token, user: { name: user.name, email: user.email } })
  } catch {
    res.status(500).json({ error: 'Error en login' })
  }
}
