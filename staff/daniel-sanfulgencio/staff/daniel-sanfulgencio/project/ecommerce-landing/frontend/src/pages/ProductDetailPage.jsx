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
      await createReview(product._id, user.userId, comment, rating);
      setComment("");
      setRating(5);

      const updatedReviews = await getReviewsByProduct(product._id);
      setReviews(updatedReviews || []);
    } catch (err) {
      alert("Error al enviar la reseña");
    }
  };

  if (!product) {
    return <div className="p-4 text-white">Producto no encontrado</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
      <p className="mb-2 text-gray-300">{product.description}</p>
      <p className="mb-4 font-bold text-green-400">{product.price} €</p>

      <button
        onClick={() => onAddToCart(product)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Añadir al carrito
      </button>

      {/* Reseñas */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-3">Reseñas</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-400">No hay reseñas todavía.</p>
        ) : (
          <ul className="space-y-3">
            {reviews.map((review) => (
              <li key={review._id} className="bg-gray-800 p-4 rounded-lg">
                <p className="text-yellow-400">⭐ {review.rating} estrellas</p>
                <p className="text-sm text-gray-300 italic">"{review.comment}"</p>
                <p className="text-xs text-gray-400 mt-1">
                  — {review.user?.name || "Usuario"} ·{" "}
                  {new Date(review.createdAt).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Formulario de reseña */}
      {user && (
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-2">Escribe una reseña</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tu opinión..."
              className="border p-2 rounded text-black"
              required
            />
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="text-black p-2 rounded"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} estrellas
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Enviar reseña
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;