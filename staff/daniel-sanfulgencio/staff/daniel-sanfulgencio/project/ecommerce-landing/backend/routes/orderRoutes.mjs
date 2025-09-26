import express from "express";
import Order from "../models/Order.mjs";
import authMiddleware from "../middlewares/authMiddleware.mjs";

const router = express.Router();

// 📌 Crear un pedido
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "El pedido está vacío" });
    }

    const newOrder = new Order({
      user: req.user.id,
      items,
      total,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error("❌ Error creando pedido:", err);
    res.status(500).json({ error: "Error al crear el pedido" });
  }
});

// 📌 Obtener pedidos del usuario logueado
router.get("/my-orders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("❌ Error obteniendo pedidos:", err);
    res.status(500).json({ error: "Error al obtener pedidos" });
  }
});

export default router;