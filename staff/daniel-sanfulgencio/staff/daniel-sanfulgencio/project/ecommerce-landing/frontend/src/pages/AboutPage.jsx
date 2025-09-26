import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-6">Sobre Nosotros</h1>

        <p className="text-gray-300 text-lg leading-relaxed">
          En <span className="text-blue-400 font-semibold">BOLD TECH</span>,
          creemos que la tecnología debe ser accesible para todos. Nuestra
          misión es ofrecer productos de alta calidad con precios competitivos,
          junto con una experiencia de compra sencilla y segura.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              🚀 Innovación
            </h2>
            <p className="text-gray-300 text-sm">
              Siempre buscamos las últimas tendencias tecnológicas para
              mantenerte actualizado.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              🤝 Confianza
            </h2>
            <p className="text-gray-300 text-sm">
              Productos garantizados y soporte cercano para que compres con
              tranquilidad.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              🌍 Compromiso
            </h2>
            <p className="text-gray-300 text-sm">
              Apostamos por prácticas responsables y un futuro tecnológico más
              sostenible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}