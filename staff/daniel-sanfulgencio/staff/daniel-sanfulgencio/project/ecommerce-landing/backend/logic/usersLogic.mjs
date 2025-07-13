import bcrypt from 'bcrypt';
import User from '../models/User.mjs';

export async function registerUser({ name, email, password } = {}) {
  if (!name || !email || !password) throw new Error('Missing user data');

  const existing = await User.findOne({ email });
  if (existing) throw new Error('User already exists');

  const hashed = await bcrypt.hash(password, 10);
  return User.create({ name, email, password: hashed });
}

export async function loginUser({ email, password } = {}) {
  if (!email || !password) throw new Error('Missing credentials');

  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid credentials');

  return user._id.toString();
}