import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.mjs";
import productRoutes from "./routes/productRoutes.mjs";
import reviewRoutes from "./routes/reviewRoutes.mjs";
import orderRoutes from "./routes/orderRoutes.mjs";

dotenv.config();

// Crear app Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas principales
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);

// Ruta de prueba
app.get("/api", (req, res) => {
  res.json({ message: "API funcionando correctamente" });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Conexión a MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conectado a MongoDB");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("Error conectando a MongoDB:", err.message);
    process.exit(1);
  });