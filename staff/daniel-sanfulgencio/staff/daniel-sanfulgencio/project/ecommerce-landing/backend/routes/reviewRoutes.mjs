import express from "express";
import Review from "../models/Review.mjs";
import authMiddleware from "../middlewares/authMiddleware.mjs";

const router = express.Router();

// Crear reseña (requiere estar autenticado)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { productId, comment, rating } = req.body;

    if (!productId || !comment || !rating) {
      return res.status(400).json({ error: "Faltan datos en la reseña" });
    }

    const review = new Review({
      product: productId,
      user: req.user.id, // viene del token
      comment,
      rating,
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    console.error("❌ Error al crear reseña:", err);
    res.status(500).json({ error: "Error al crear la reseña" });
  }
});

// Obtener reseñas por producto
router.get("/product/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId })
      .populate("user", "name") // opcional: incluir el nombre del usuario
      .sort({ createdAt: -1 }); // reseñas más recientes primero

    res.json(reviews);
  } catch (err) {
    console.error("❌ Error al obtener reseñas:", err);
    res.status(500).json({ error: "Error al obtener reseñas" });
  }
});

export default router;