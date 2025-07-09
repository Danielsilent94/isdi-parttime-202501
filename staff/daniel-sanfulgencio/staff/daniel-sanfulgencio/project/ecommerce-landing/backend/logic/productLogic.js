import Product from '../models/product.js';
import Review from '../models/review.js';
import { ExistenceError } from '../common/errors/index.js';

export const createProduct = async ({ name, description, price, category }) => {
  const product = new Product({ name, description, price, category });
  await product.save();
  return product;
};

export const getAllProducts = async () => {
  return Product.find().populate({
    path: 'reviews',
    populate: { path: 'author', select: 'name' }
  });
};

export const getProductById = async (id) => {
  const product = await Product.findById(id).populate({
    path: 'reviews',
    populate: { path: 'author', select: 'name' }
  });

  if (!product) throw new ExistenceError('Producto no encontrado');
  return product;
};

export const deleteProduct = async (id) => {
  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) throw new ExistenceError('Producto no encontrado');
  return deleted;
};
