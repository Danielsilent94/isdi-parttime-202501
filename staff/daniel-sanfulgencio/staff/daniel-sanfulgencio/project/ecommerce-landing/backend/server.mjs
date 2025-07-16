import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connect } from './data/database.mjs';
import productRoutes from './routes/productRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs';
import reviewRoutes from './routes/reviewRoutes.mjs';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/', (req, res) => {
  res.send('✅ BOLD TECH backend is running');
});

const mongoUrl = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

connect(mongoUrl, dbName)
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('❌ DB connection failed:', error);
    process.exit(1);
  });