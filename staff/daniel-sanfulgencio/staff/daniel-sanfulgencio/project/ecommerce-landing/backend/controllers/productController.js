import * as productLogic from '../logic/productLogic.js';

export const createProduct = async (req, res, next) => {
  try {
    const product = await productLogic.createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await productLogic.getAllProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await productLogic.getProductById(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const deleted = await productLogic.deleteProduct(req.params.id);
    res.json(deleted);
  } catch (err) {
    next(err);
  }
};
