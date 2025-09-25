import axios from "axios";

export default async function getReviewsByProduct(productId) {
  const res = await axios.get(`http://localhost:3000/api/reviews/product/${productId}`);
  return res.data;
}