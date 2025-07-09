import axios from 'axios';

export async function createReview(review) {
  const token = localStorage.getItem('token');
  const res = await axios.post('/api/reviews', review, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
}