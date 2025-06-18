import React from 'react'

const HomePage = () => {
  return (
    <section className="p-10 text-white text-center">
      <h1 className="text-4xl font-bold mb-4">
        Bienvenido a <span className="text-blue-400">BOLD TECH</span>
      </h1>
      <p className="text-lg mb-6">
        Descubre los últimos productos en tecnología: portátiles, móviles, accesorios y más.
      </p>
      <a
        href="/products"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded transition"
      >
        Ver productos
      </a>
    </section>
  )
}

export default HomePage

