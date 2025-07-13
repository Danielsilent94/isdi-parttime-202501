import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../logic/getAllProducts';
import { getReviewsByProduct } from '../logic/getReviewsByProduct';
import { createReview } from '../logic/createReview';
import getLoggedUserId from '../logic/getLoggedUserId';

const ProductsPage = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [reviewsVisible, setReviewsVisible] = useState({});
  const [reviews, setReviews] = useState({});
  const [newReview, setNewReview] = useState({});
  const [reviewFormVisible, setReviewFormVisible] = useState({});
  const userId = getLoggedUserId();

  useEffect(() => {
    getAllProducts()
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(err => setError(err.message));
  }, []);

  const addToCart = (product) => {
    const exists = cart.find(item => item._id === product._id);
    if (exists) {
      setCart(cart.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    const exists = cart.find(item => item._id === product._id);
    if (!exists) return;
    if (exists.quantity > 1) {
      setCart(cart.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ));
    } else {
      setCart(cart.filter(item => item._id !== product._id));
    }
  };

  const handleFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(
          p => p.category?.toLowerCase() === category.toLowerCase()
        )
      );
    }
  };

  const toggleReviews = async (productId) => {
    if (reviewsVisible[productId]) {
      setReviewsVisible(prev => ({ ...prev, [productId]: false }));
    } else {
      try {
        const data = await getReviewsByProduct(productId);
        setReviews(prev => ({ ...prev, [productId]: data }));
        setReviewsVisible(prev => ({ ...prev, [productId]: true }));
      } catch (err) {
        console.error('❌ Error fetching reviews:', err);
        setError('No se pudieron cargar las opiniones');
      }
    }
  };

  const toggleReviewForm = (productId) => {
    setReviewFormVisible(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const handleReviewSubmit = async (e, productId) => {
    e.preventDefault();
    if (!newReview[productId]?.text || !newReview[productId]?.score) return;

    try {
      await createReview({
        text: newReview[productId].text,
        score: Number(newReview[productId].score),
        productId
      });
      const updated = await getReviewsByProduct(productId);
      setReviews(prev => ({ ...prev, [productId]: updated }));
      setNewReview(prev => ({ ...prev, [productId]: { text: '', score: '' } }));
      setReviewFormVisible(prev => ({ ...prev, [productId]: false }));
    } catch (err) {
      console.error('❌ Error creating review:', err);
      setError('Error al enviar la opinión');
    }
  };

  const categories = ['all', 'laptops', 'smartphones', 'accessories', 'headphones'];

  return (
    <section className="p-6 md:p-10 text-white">
      <h2 className="text-4xl font-bold mb-8 text-center">🛒 Todos los Productos</h2>
      {error && <p className="text-red-400 text-center">{error}</p>}

      {/* Filtros */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedCategory === cat
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Lista */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <div
            key={product._id}
            className="bg-white text-black rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <p className="text-lg font-bold text-green-700 mb-4">${product.price.toFixed(2)}</p>
            </div>

            <div className="flex flex-col gap-2 mt-auto">
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
              >
                ➕ Añadir al Carrito
              </button>

              <button
                onClick={() => removeFromCart(product)}
                className="bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg transition"
              >
                ➖ Quitar del Carrito
              </button>

              <button
                onClick={() => toggleReviews(product._id)}
                className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
              >
                {reviewsVisible[product._id] ? 'Ocultar Opiniones' : 'Ver Opiniones'}
              </button>
            </div>

            {reviewsVisible[product._id] && (
              <div className="mt-6 border-t border-gray-300 pt-4">
                <h4 className="font-semibold mb-3 text-lg">⭐ Opiniones:</h4>
                {reviews[product._id]?.length ? (
                  <div className="space-y-3">
                    {reviews[product._id].map(r => (
                      <div key={r._id} className="bg-gray-100 p-3 rounded">
                        <p className="text-sm">
                          <strong>{r.author?.name || 'Anónimo'}:</strong> {r.text} ({r.score}/5)
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Aún no hay opiniones.</p>
                )}

                {userId && (
                  <div className="mt-4">
                    <button
                      onClick={() => toggleReviewForm(product._id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition w-full"
                    >
                      {reviewFormVisible[product._id] ? 'Cancelar' : '➕ Agregar Opinión'}
                    </button>

                    {reviewFormVisible[product._id] && (
                      <form onSubmit={e => handleReviewSubmit(e, product._id)} className="mt-4 space-y-3">
                        <textarea
                          placeholder="Escribe tu opinión..."
                          value={newReview[product._id]?.text || ''}
                          onChange={e =>
                            setNewReview(prev => ({
                              ...prev,
                              [product._id]: {
                                ...prev[product._id],
                                text: e.target.value
                              }
                            }))
                          }
                          className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                        />
                        <input
                          type="number"
                          min="1"
                          max="5"
                          placeholder="Puntuación (1-5)"
                          value={newReview[product._id]?.score || ''}
                          onChange={e =>
                            setNewReview(prev => ({
                              ...prev,
                              [product._id]: {
                                ...prev[product._id],
                                score: e.target.value
                              }
                            }))
                          }
                          className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                        />
                        <button
                          type="submit"
                          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition w-full"
                        >
                          Enviar Opinión
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsPage;