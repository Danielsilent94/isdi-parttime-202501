import axios from 'axios';

export async function getReviewsByProduct(productId) {
  const res = await axios.get(`/api/products/${productId}/reviews`);
  return res.data;
}
