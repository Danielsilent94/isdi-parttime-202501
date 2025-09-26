import express from "express";
import authMiddleware from "../middlewares/authMiddleware.mjs";
import Order from "../models/Order.mjs";

const router = express.Router();

// 📌 Crear pedido (checkout)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "El pedido no tiene productos" });
    }

    const order = new Order({
      user: req.user.id, // 👈 sacamos el id del token
      items,
      total,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error("❌ Error al crear pedido:", err);
    res.status(500).json({ error: "Error al crear pedido" });
  }
});

// 📌 Obtener pedidos de un usuario
router.get("/user/:id", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id })
      .populate("items.product", "name price image")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("❌ Error al obtener pedidos:", err);
    res.status(500).json({ error: "Error al obtener pedidos" });
  }
});

export default router;