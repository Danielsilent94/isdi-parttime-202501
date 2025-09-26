import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import createReview from "../logic/createReview";
import getReviewsByProduct from "../logic/getReviewsByProduct";

export default function ProductDetailPage({ products, onAddToCart }) {
  const { id } = useParams();
  const product = products.find((p) => p._id === id);

  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Cargar reseñas
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviewsByProduct(id);
        setReviews(data);
      } catch (err) {
        console.error("Error cargando reseñas:", err);
        setError("No se pudieron cargar las reseñas.");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const newReview = await createReview(product._id, comment, rating);
      setReviews((prev) => [newReview, ...prev]); // actualizar en pantalla
      setComment("");
      setRating(5);
    } catch (err) {
      console.error("Error en handleSubmit:", err);
      setError(err.message || "No se pudo enviar la reseña.");
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white p-6">
        <h2>Producto no encontrado</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-3xl mx-auto">
        {/* Info del producto */}
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-400 mb-4">{product.description}</p>
        <p className="text-green-400 text-2xl font-bold mb-6">
          {product.price} €
        </p>
        <button
          onClick={() => onAddToCart(product)}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-medium"
        >
          Añadir al carrito
        </button>

        {/* Reseñas */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Reseñas</h2>

          {loading ? (
            <p className="text-gray-400">Cargando reseñas...</p>
          ) : reviews.length === 0 ? (
            <p className="text-gray-400">No hay reseñas todavía.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div
                  key={rev._id}
                  className="bg-gray-800 p-4 rounded-lg shadow"
                >
                  <p className="text-yellow-400 font-semibold">
                    ⭐ {rev.rating} estrellas
                  </p>
                  <p className="text-gray-200 italic">"{rev.comment}"</p>
                  {rev.user?.name && (
                    <p className="text-gray-400 text-sm mt-1">
                      — {rev.user.name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Formulario reseña */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-2">Escribe una reseña</h3>
          {error && (
            <div className="bg-red-600/20 border border-red-500 rounded p-2 mb-3">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              className="w-full p-3 rounded bg-gray-700 text-white"
              placeholder="Tu opinión..."
            />
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full p-3 rounded bg-gray-700 text-white"
            >
              <option value={5}>5 estrellas</option>
              <option value={4}>4 estrellas</option>
              <option value={3}>3 estrellas</option>
              <option value={2}>2 estrellas</option>
              <option value={1}>1 estrella</option>
            </select>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-medium"
            >
              Enviar reseña
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}