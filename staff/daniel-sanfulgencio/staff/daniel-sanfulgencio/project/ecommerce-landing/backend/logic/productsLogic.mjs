import Product from '../models/Product.mjs';

export async function createProduct(data) {
  if (!data) throw new Error('Missing product data');
  return Product.create(data);
}

export async function getAllProducts() {
  return Product.find();
}

export async function getProductById(id) {
  if (!id) throw new Error('Missing product ID');
  return Product.findById(id);
}

export async function deleteProductById(id) {
  if (!id) throw new Error('Missing product ID');
  return Product.findByIdAndDelete(id);
}