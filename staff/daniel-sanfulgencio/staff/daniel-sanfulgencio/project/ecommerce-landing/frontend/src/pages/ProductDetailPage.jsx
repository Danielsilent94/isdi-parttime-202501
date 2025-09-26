import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getLoggedUser from "../logic/getLoggedUser";
import createReview from "../logic/createReview";
import getReviewsByProduct from "../logic/getReviewsByProduct";

const ProductDetailPage = ({ products = [], onAddToCart }) => {
  const { id } = useParams();
  const product = products.find((p) => p._id === id);
  const user = getLoggedUser();

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const result = await getReviewsByProduct(id);
        setReviews(result || []);
      } catch (err) {
        console.error("Error cargando reseñas:", err);
        setReviews([]);
      }
    };
    loadReviews();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Debes iniciar sesión para opinar");
      return;
    }

    try {
      const success = await createReview(product._id, comment, rating);
      if (success) {
        setComment("");
        setRating(5);
        const updatedReviews = await getReviewsByProduct(product._id);
        setReviews(updatedReviews || []);
      }
    } catch {
      alert("Error al enviar la reseña");
    }
  };

  if (!product) {
    return <div className="p-6 text-white">Producto no encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">{product.name}</h2>
        <p className="mb-3 text-gray-300">{product.description}</p>
        <p className="mb-6 font-bold text-green-400 text-xl">{product.price} €</p>

        <button
          onClick={() => onAddToCart(product)}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium"
        >
          Añadir al carrito
        </button>

        {/* Reseñas */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">Reseñas</h3>
          {reviews.length === 0 ? (
            <p className="text-gray-400">No hay reseñas todavía.</p>
          ) : (
            <ul className="space-y-4">
              {reviews.map((review) => (
                <li
                  key={review._id}
                  className="bg-gray-800 p-4 rounded-xl shadow-md"
                >
                  <p className="text-sm text-gray-200 mb-1">
                    ⭐ {review.rating} estrellas
                  </p>
                  <p className="text-sm text-gray-300 italic">
                    "{review.comment}"
                  </p>
                  {review.user?.name && (
                    <p className="text-xs text-gray-500 mt-2">
                      – {review.user.name}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Formulario de reseña */}
        {user && (
          <div className="mt-12">
            <h3 className="text-lg font-semibold mb-3">Escribe una reseña</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tu opinión..."
                className="border border-gray-600 bg-gray-700 text-white p-3 rounded resize-none"
                required
              />
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="bg-gray-700 text-white p-2 rounded"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} estrellas
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                Enviar reseña
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;