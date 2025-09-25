import React, { useEffect, useState } from "react";
import getAllProducts from "../logic/getAllProducts";
import ProductCard from "../components/ProductCard";

const ProductsPage = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetched = await getAllProducts();
      setProducts(fetched);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="p-4 text-white">Cargando productos...</div>;
  }

  return (
    <div className="min-h-screen bg-blue-900 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Todos los productos</h2>
      {products.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;