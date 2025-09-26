import React, { useEffect, useState } from "react";
import getAllProducts from "../logic/getAllProducts";
import ProductCard from "../components/ProductCard";

const ProductsPage = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetched = await getAllProducts();
      setProducts(fetched);
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Todos los productos</h2>
      {products.length === 0 ? (
        <p className="text-gray-400 text-center">No hay productos disponibles.</p>
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