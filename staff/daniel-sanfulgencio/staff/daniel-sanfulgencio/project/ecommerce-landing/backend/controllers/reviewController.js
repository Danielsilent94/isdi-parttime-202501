import * as reviewLogic from '../logic/reviewLogic.js';

export const createReview = async (req, res, next) => {
  try {
    const review = await reviewLogic.createReview(req.body);
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

export const getReviewsByProduct = async (req, res, next) => {
  try {
    const reviews = await reviewLogic.getReviewsByProduct(req.params.productId);
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};
