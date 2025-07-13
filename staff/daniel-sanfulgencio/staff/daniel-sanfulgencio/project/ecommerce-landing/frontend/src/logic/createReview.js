import axios from 'axios';
import { apiUrl } from './helpers/constants';

export async function createReview(review) {
  const token = localStorage.getItem('token');
  const res = await axios.post(`${apiUrl}/reviews`, review, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
}