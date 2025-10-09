 import Order from "../models/Order.mjs";

export const createOrder = async (req, res) => {
  try {
    const { items, total } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "El pedido no tiene productos" });
    }

    if (typeof total !== "number") {
      return res.status(400).json({ error: "Total inválido" });
    }

    const orderItems = items.map((item) => ({
      product: item.product,
      quantity: item.quantity,
      price: item.price,
    }));

    const order = new Order({
      user: req.user.id,
      items: orderItems,
      total,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error("❌ Error al crear pedido:", err);
    res.status(500).json({ error: "Error al crear pedido" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id })
      .populate("items.product", "name price image")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("❌ Error al obtener pedidos:", err);
    res.status(500).json({ error: "Error al obtener pedidos" });
  }
};