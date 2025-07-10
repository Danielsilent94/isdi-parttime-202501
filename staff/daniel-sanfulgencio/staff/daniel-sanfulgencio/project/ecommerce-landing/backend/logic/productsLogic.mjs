import Product from '../models/Product.mjs';

export async function createProduct({ name, description, price, category }) {
  const product = await Product.create({ name, description, price, category });
  return product;
}

export async function getAllProducts() {
  return Product.find();
}

export async function getProductById(id) {
  return Product.findById(id);
}

export async function deleteProductById(id) {
  return Product.findByIdAndDelete(id);
}