import axios from 'axios';
import { apiUrl } from './helpers/constants';

export async function getReviewsByProduct(productId) {
  
  const res = await axios.get(`${apiUrl}/reviews/product/${productId}`);
  return res.data;
}