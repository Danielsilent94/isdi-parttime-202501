import React from "react";
import ProductCard from "../components/ProductCard";

const ProductsPage = ({ products = [], onAddToCart }) => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Todos los productos</h2>

      {products.length === 0 ? (
        <p className="text-gray-400">No hay productos disponibles.</p>
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