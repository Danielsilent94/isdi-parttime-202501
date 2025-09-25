import React from "react";
import { Link } from "react-router-dom";

export default function CartPage({ cart, setCart }) {
  // Quitar un producto del carrito
  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  // Calcular total general
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Tu Carrito</h1>

      {cart.length === 0 ? (
        <div>
          <p className="text-gray-400">El carrito está vacío.</p>
          <Link
            to="/products"
            className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-medium"
          >
            Ver productos
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-gray-800 rounded-xl p-4 flex items-center gap-4"
            >
              {/* Miniatura */}
              <img
                src={item.image || "/default-product.png"}
                alt={item.name}
                className="w-20 h-20 object-contain rounded-lg bg-white p-2"
              />

              {/* Info */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
                <p className="text-green-400 font-bold">
                  {item.price} € x {item.quantity} ={" "}
                  {(item.price * item.quantity).toFixed(2)} €
                </p>
              </div>

              {/* Botón eliminar */}
              <button
                onClick={() => handleRemove(item._id)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          ))}

          {/* Total y checkout */}
          <div className="bg-gray-900 rounded-xl p-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold">Total:</span>
              <span className="text-2xl font-bold text-green-400">
                {total.toFixed(2)} €
              </span>
            </div>

            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg text-lg">
              Finalizar compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}