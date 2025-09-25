import express from "express";
import Review from "../models/Review.mjs";
import authMiddleware from "../middlewares/authMiddleware.mjs";

const router = express.Router();

// Crear reseña (requiere autenticación)
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
    await review.populate("user", "name"); // 👈 añadimos autor

    res.status(201).json(review);
  } catch (err) {
    console.error("❌ Error al crear reseña:", err);
    res.status(500).json({ error: "Error al crear la reseña" });
  }
});

// Obtener reseñas por producto (ordenadas)
router.get("/product/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate("user", "name")
      .sort({ createdAt: -1 }); // 👈 más recientes primero

    res.json(reviews);
  } catch (err) {
    console.error("❌ Error al obtener reseñas:", err);
    res.status(500).json({ error: "Error al obtener reseñas" });
  }
});

export default router;