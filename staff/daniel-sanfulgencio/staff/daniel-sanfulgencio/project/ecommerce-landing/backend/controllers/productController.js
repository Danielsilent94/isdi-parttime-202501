import * as logic from '../logic/productLogic.js';

export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category } = req.body;
    const product = await logic.createProduct({ name, description, price, category });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await logic.getAllProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await logic.getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await logic.deleteProduct(req.params.id);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};
