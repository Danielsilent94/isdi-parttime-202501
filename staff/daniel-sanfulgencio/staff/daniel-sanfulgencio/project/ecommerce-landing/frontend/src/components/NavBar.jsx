import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-[#1d1259] shadow-md sticky top-0 z-50">
      <Link to="/" className="text-3xl font-bold text-white">
        BOLD <span className="text-blue-400">TECH</span>
      </Link>

      <div className="space-x-6 hidden md:flex">
        <Link to="/about" className="hover:text-blue-300">about</Link>
        <div className="relative group">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="hover:text-blue-300"
          >
            products
          </button>
          {showMenu && (
            <div className="absolute top-full mt-2 bg-white text-black p-4 rounded shadow-lg space-y-2">
              <Link to="/products?cat=laptops" className="block hover:underline">Laptops</Link>
              <Link to="/products?cat=smartphones" className="block hover:underline">Smartphones</Link>
              <Link to="/products?cat=accessories" className="block hover:underline">Accessories</Link>
              <Link to="/products?cat=tablets" className="block hover:underline">Tablets</Link>
              <Link to="/products?cat=headphones" className="block hover:underline">Headphones</Link>
            </div>
          )}
        </div>
        <Link to="/contact" className="hover:text-blue-300">contact us</Link>
        <Link to="/cart" className="hover:text-blue-300">my cart</Link>
      </div>

      <div className="space-x-4 hidden md:flex">
        <Link to="/login" className="font-semibold hover:text-blue-300">LOGIN</Link>
        <Link to="/register" className="font-semibold hover:text-blue-300">SIGN UP</Link>
      </div>
    </nav>
  )
}

export default Navbar

