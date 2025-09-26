import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Bienvenido a <span className="text-blue-400">BOLD TECH</span>
      </h1>
      <p className="text-gray-300 text-lg mb-8 max-w-2xl">
        Encuentra la mejor tecnología al mejor precio. Ordenadores, móviles,
        tablets y mucho más, todo en un solo lugar.
      </p>
      <Link
        to="/products"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-lg"
      >
        Ver productos
      </Link>
    </div>
  );
}