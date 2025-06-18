import React from 'react'

const CartPage = ({ cart, setCart }) => {
  const removeItem = id => {
    const updatedCart = cart
      .map(item => {
        if (item._id === id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 }
          }
          return null
        }
        return item
      })
      .filter(Boolean)

    setCart(updatedCart)
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <section className="p-10 text-white">
      <h2 className="text-3xl font-bold mb-6">Mi carrito</h2>

      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item._id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="text-xl">{item.name}</h3>
                <p>Cantidad: {item.quantity}</p>
                <p className="text-sm text-gray-400">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <button
                onClick={() => removeItem(item._id)}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              >
                Quitar 1
              </button>
            </div>
          ))}

          <div className="text-right text-xl mt-6 font-semibold">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      )}
    </section>
  )
}

export default CartPage