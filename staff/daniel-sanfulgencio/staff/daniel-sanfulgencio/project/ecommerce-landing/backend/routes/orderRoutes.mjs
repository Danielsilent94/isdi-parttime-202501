import express from "express";
import authMiddleware from "../middlewares/authMiddleware.mjs";
import { createOrder, getUserOrders } from "../controllers/orderController.mjs";

const router = express.Router();

router.post("/", authMiddleware, createOrder);
router.get("/user/:id", authMiddleware, getUserOrders);

export default router;