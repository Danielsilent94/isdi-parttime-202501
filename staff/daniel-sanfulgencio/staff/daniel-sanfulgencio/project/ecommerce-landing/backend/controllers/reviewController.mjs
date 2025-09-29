import Review from "../models/Review.mjs";

// Crear reseña
export async function createReview(req, res) {
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
    console.error("Error al crear reseña:", err);
    res.status(500).json({ error: "Error al crear la reseña" });
  }
}

// Obtener reseñas de un producto
export async function getReviewsByProduct(req, res) {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    console.error("Error al obtener reseñas:", err);
    res.status(500).json({ error: "Error al obtener reseñas" });
  }
}