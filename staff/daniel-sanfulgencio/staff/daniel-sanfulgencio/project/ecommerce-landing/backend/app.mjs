import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.mjs";
import productRoutes from "./routes/productRoutes.mjs";
import reviewRoutes from "./routes/reviewRoutes.mjs";

const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/api", (req, res) => {
  res.json({ message: " API funcionando correctamente" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

export default app;