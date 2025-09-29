import express from "express";
import authMiddleware from "../middlewares/authMiddleware.mjs";
import {
  createReview,
  getReviewsByProduct,
} from "../controllers/reviewController.mjs";

const router = express.Router();

// Crear reseña (requiere autenticación)
router.post("/", authMiddleware, createReview);

// Obtener reseñas de un producto
router.get("/product/:productId", getReviewsByProduct);

export default router;