import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import { ExistenceError, AuthenticationError } from '../common/errors/index.js'

// Registro de usuario
export const registerUser = async (name, email, password) => {
  const existing = await User.findOne({ email })
  if (existing) throw new ExistenceError('Email ya registrado')

  const hashed = await bcrypt.hash(password, 10)
  await User.create({ name, email, password: hashed })
}

// Login de usuario
export const loginUser = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) throw new AuthenticationError('Usuario o contraseña incorrectos')

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) throw new AuthenticationError('Usuario o contraseña incorrectos')

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

  return { token, user: { id: user._id, name: user.name, email: user.email } }
}

// Obtener perfil de usuario por ID
export const getUserProfile = async (id) => {
  const user = await User.findById(id).select('-password')
  if (!user) throw new ExistenceError('Usuario no encontrado')
  return user
}