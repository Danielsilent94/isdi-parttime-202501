import express from 'express';
import Review from '../models/Review.mjs';

const router = express.Router();

// Crear nueva review
router.post('/', async (req, res) => {
  try {
    const { text, score, productId, author } = req.body;

    if (!text || !score || !productId || !author) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newReview = new Review({ text, score, product: productId, author });
    await newReview.save();

    res.status(201).json(newReview);
  } catch (err) {
    console.error('❌ Error creating review:', err);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

// Obtener reviews por producto
router.get('/product/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId }).populate('author', 'name');
    res.json(reviews);
  } catch (err) {
    console.error('❌ Error getting reviews:', err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

export default router;