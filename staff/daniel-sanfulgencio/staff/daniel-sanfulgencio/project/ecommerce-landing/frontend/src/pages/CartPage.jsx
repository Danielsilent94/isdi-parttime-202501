import React from 'react';

const CartPage = ({ cart, setCart }) => {
  const removeItem = (_id) => {
    const updatedCart = cart
      .map(item => {
        if (item._id === _id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return null;
        }
        return item;
      })
      .filter(Boolean);

    setCart(updatedCart);
  };

  const total = cart.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return acc + price * quantity;
  }, 0);

  return (
    <section className="max-w-4xl mx-auto p-6 md:p-10 text-white">
      <h2 className="text-4xl font-bold mb-8 text-center">🛒 Mi Carrito</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-300">Tu carrito está vacío. ¡Agrega productos para comenzar!</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item, index) => (
            <div
              key={`${item._id}-${index}`}
              className="bg-gray-900 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-lg hover:shadow-xl transition"
            >
              <div className="flex-1 mb-4 sm:mb-0">
                <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                <p className="text-gray-400 mb-1">Cantidad: <span className="font-semibold">{item.quantity}</span></p>
                <p className="text-green-400 font-semibold">
                  {Number(item.price * item.quantity).toFixed(2)} €
                </p>
              </div>

              <button
                onClick={() => removeItem(item._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition w-full sm:w-auto"
              >
                ➖ Quitar 1
              </button>
            </div>
          ))}

          <div className="bg-gray-800 rounded-xl p-6 text-right shadow-lg">
            <h4 className="text-2xl font-bold text-green-400">Total: {total.toFixed(2)} €</h4>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartPage;