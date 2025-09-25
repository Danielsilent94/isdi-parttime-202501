import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import Product from '../models/Product.mjs';

dotenv.config();

// Soporte __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const run = async () => {
  const mongoUrl = process.env.MONGO_URL;
  const dbName = process.env.DB_NAME;

  if (!mongoUrl || !dbName) {
    console.error('❌ Faltan MONGO_URL o DB_NAME en el archivo .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(`${mongoUrl}/${dbName}`);
    console.log('✅ Conectado a la base de datos');

    const dataPath = path.join(__dirname, '../sample_products.json');
    const products = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    await Product.deleteMany(); // opcional: limpia antes de insertar
    await Product.insertMany(products);

    console.log('✅ Productos cargados correctamente');
    process.exit();
  } catch (err) {
    console.error('❌ Error al cargar productos:', err);
    process.exit(1);
  }
};

run();