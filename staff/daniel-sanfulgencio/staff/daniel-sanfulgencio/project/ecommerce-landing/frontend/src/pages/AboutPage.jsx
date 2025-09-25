import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Sobre BOLD TECH</h1>

        <p className="text-gray-300 mb-8">
          En <span className="font-semibold">BOLD TECH</span> creemos que la tecnología
          debería ser accesible, confiable y emocionante. Nuestro objetivo es ofrecer
          productos de primera calidad en portátiles, smartphones y accesorios,
          acompañados de un servicio cercano y transparente.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-2xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">🚀 Misión</h3>
            <p className="text-gray-400 text-sm">
              Acercar la mejor tecnología al mejor precio, siempre con atención rápida y humana.
            </p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">🔒 Confianza</h3>
            <p className="text-gray-400 text-sm">
              Pagos seguros, envíos rápidos y soporte cuando lo necesites. La seguridad es lo primero.
            </p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">💡 Selección</h3>
            <p className="text-gray-400 text-sm">
              Nuestro catálogo está cuidadosamente seleccionado para recomendar solo lo mejor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}