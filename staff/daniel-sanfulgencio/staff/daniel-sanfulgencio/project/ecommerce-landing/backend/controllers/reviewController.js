import * as logic from '../logic/reviewLogic.js';

export const createReview = async (req, res, next) => {
  const { text, score, productId } = req.body;
  const author = req.userId;

  try {
    const review = await logic.createReview({ text, score, productId, author });
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

export const getReviewsByProduct = async (req, res, next) => {
  try {
    const reviews = await logic.getReviewsByProduct(req.params.productId);
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};
