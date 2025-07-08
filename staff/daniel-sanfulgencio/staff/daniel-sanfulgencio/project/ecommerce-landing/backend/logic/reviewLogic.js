import Review from '../models/review.js';
import Product from '../models/product.js';
import { ExistenceError } from '../common/errors/index.js';

export const createReview = async ({ text, score, productId, author }) => {
  const product = await Product.findById(productId);
  if (!product) throw new ExistenceError('Producto no encontrado');

  const review = await Review.create({ text, score, product: productId, author });

  await Product.findByIdAndUpdate(productId, {
    $push: { reviews: review._id }
  });

  return review;
};

export const getReviewsByProduct = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) throw new ExistenceError('Producto no encontrado');

  const reviews = await Review.find({ product: productId }).populate('author', 'name');
  return reviews;
};
