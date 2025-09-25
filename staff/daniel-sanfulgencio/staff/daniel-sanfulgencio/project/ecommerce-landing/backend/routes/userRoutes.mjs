import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.mjs";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "secreto_super_seguro";

// 🔑 Registro
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    // Verificar si ya existe el usuario
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: "Usuario registrado con éxito",
      user: { _id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    console.error("❌ Error en registro:", err);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

// 🔑 Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Credenciales inválidas" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "Credenciales inválidas" });

    // Generar token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login exitoso",
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("❌ Error en login:", err);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

// Obtener usuario por ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
});

// Actualizar usuario
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!updatedUser)
      return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
});

// Eliminar usuario
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
});

export default router;