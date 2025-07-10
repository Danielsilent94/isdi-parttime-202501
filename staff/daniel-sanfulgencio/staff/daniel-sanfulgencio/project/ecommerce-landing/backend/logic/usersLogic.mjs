import User from '../models/User.mjs';
import bcrypt from 'bcrypt';

export async function registerUser({ name, email, password }) {
  const existing = await User.findOne({ email });
  if (existing) throw new Error('User already exists');

  const hash = await bcrypt.hash(password, 5);
  await User.create({ name, email, password: hash });
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid credentials');

  return user._id.toString();
}