import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { ExistenceError } from '../common/errors/index.js';

export const registerUser = async (name, email, password) => {
  const existing = await User.findOne({ email });
  if (existing) throw new ExistenceError('Email ya registrado');

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashed });
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new ExistenceError('Usuario no encontrado');

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new ExistenceError('Contraseña incorrecta');

  return user;
};
