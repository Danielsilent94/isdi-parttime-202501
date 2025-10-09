import express from "express";
import authMiddleware from "../middlewares/authMiddleware.mjs";
import { createOrder, getUserOrders } from "../controllers/orderController.mjs";

const router = express.Router();

// Crear pedido
router.post("/", authMiddleware, createOrder);

// Obtener pedidos de un usuario
router.get("/user/:id", authMiddleware, getUserOrders);

export default router;