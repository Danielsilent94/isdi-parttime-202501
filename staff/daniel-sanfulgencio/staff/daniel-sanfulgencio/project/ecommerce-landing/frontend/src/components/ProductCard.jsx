import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
  if (!product) return null; // 👈 seguridad extra por si llega vacío

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col h-full">
      {/* Imagen del producto */}
      <Link to={`/product/${product._id}`} className="flex justify-center items-center mb-4">
        <img
          src={product.image || "/default-product.png"}  // 👈 placeholder local
          alt={product.name || "Producto"}
          className="h-40 object-contain"
        />
      </Link>

      {/* Información */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {product.name || "Sin nombre"}
        </h3>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {product.description || "Sin descripción"}
        </p>
        <p className="text-green-600 font-bold text-base mt-2">
          {product.price != null ? `${product.price} €` : "Precio no disponible"}
        </p>
        {product.category && (
          <p className="text-gray-500 text-xs mt-1">Categoría: {product.category}</p>
        )}
      </div>

      {/* Botones */}
      <div className="flex flex-col gap-2 mt-4">
        <button
          onClick={() => onAddToCart && onAddToCart(product)} // 👈 solo ejecuta si existe
          className="bg-yellow-500 text-black py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors font-medium"
          aria-label={`Añadir ${product.name || "producto"} al carrito`}
        >
          Añadir al carrito
        </button>
        <Link
          to={`/product/${product._id}`}
          className="text-blue-600 hover:underline text-sm text-center"
          aria-label={`Ver detalles de ${product.name || "producto"}`}
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;