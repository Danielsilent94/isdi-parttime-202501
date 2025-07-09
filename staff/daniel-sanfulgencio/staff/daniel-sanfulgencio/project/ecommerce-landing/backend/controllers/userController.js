import * as userLogic from '../logic/userLogic.js';

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    await userLogic.registerUser(name, email, password);
    res.status(201).json({ message: 'Usuario registrado' });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await userLogic.loginUser(email, password);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
