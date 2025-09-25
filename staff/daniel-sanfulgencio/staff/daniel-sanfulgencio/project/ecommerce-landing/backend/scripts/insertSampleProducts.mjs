import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.mjs';

dotenv.config();

const mongoUrl = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

const products = [
  {
    name: 'Auriculares Bluetooth',
    description: 'Auriculares inalámbricos con cancelación de ruido.',
    price: 59.99,
    category: 'audio',
  },
  {
    name: 'Teclado Mecánico RGB',
    description: 'Teclado mecánico con retroiluminación personalizable.',
    price: 89.95,
    category: 'periféricos',
  },
  {
    name: 'Smartphone Bold X3',
    description: 'Móvil con pantalla AMOLED y cámara de 108MP.',
    price: 399.99,
    category: 'smartphones',
  },
];

mongoose
  .connect(`${mongoUrl}/${dbName}`)
  .then(async () => {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('✅ Productos insertados correctamente');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Error al insertar productos:', err);
    process.exit(1);
  });