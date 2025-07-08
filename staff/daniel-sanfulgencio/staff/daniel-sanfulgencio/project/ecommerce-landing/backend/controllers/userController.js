import * as logic from '../logic/userLogic.js';

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    await logic.registerUser(name, email, password);
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await logic.loginUser(email, password);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await logic.getUserProfile(req.userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
