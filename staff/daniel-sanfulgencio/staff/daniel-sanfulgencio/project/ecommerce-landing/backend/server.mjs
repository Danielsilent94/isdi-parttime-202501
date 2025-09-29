import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.mjs";

dotenv.config();

const PORT = process.env.PORT || 3000;

// Usamos DB diferente en test para no ensuciar la principal
const MONGO_URI =
  process.env.NODE_ENV === "test"
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ No se ha definido la URI de MongoDB en el .env");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`✅ Conectado a MongoDB (${process.env.NODE_ENV || "dev"})`);
    // En entorno de test, Mocha/Supertest importa app directamente y no necesitamos levantar servidor
    if (process.env.NODE_ENV !== "test") {
      app.listen(PORT, () =>
        console.log(`🚀 Servidor en http://localhost:${PORT}`)
      );
    }
  })
  .catch((err) => {
    console.error("❌ Error conectando a MongoDB:", err.message);
    process.exit(1);
  });

export default app;