import axios from "axios";
import { apiUrl } from "./helpers/constants";

export default async function createReview(productId, comment, rating) {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      `${apiUrl}/reviews`,
      {
        productId,
        comment,
        rating,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error("Error en createReview:", err.response?.data || err.message);
    throw new Error(
      err.response?.data?.error || "No se pudo crear la reseña"
    );
  }
}