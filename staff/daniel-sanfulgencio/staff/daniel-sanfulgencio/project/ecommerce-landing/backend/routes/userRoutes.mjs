import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.mjs';

const router = express.Router();

// Registrar usuario
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'El email ya está en uso' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hash, name });
    await user.save();

    res.status(201).json({
      message: 'Usuario creado correctamente',
      userId: user._id
    });
  } catch (err) {
    console.error('❌ Error registrando usuario:', err);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Login usuario
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Faltan email o password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Credenciales incorrectas' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ error: 'Credenciales incorrectas' });
    }

    res.json({
      message: 'Login exitoso',
      userId: user._id,
      name: user.name
    });
  } catch (err) {
    console.error('❌ Error en login:', err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// Obtener perfil de usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (err) {
    console.error('❌ Error obteniendo usuario:', err);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
});

// Actualizar perfil de usuario por ID
router.put('/:id', async (req, res) => {
  try {
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.avatar) updates.avatar = req.body.avatar;
    if (req.body.description) updates.description = req.body.description;

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true
    }).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (err) {
    console.error('❌ Error actualizando usuario:', err);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});

export default router;