import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({ user, setUser, cart }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(null)
    navigate('/')
  }

  const totalItems = cart?.reduce((acc, item) => acc + item.quantity, 0) || 0

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <Link to="/">BOLD TECH</Link>
      </div>

      <div className="flex gap-4 items-center">
        <Link to="/products" className="hover:text-blue-400">Productos</Link>
        <Link to="/about" className="hover:text-blue-400">Sobre Nosotros</Link>

        {!user ? (
          <>
            <Link to="/login" className="hover:text-green-400">Login</Link>
            <Link to="/register" className="hover:text-yellow-400">Registro</Link>
          </>
        ) : (
          <>
            <Link to="/cart" className="relative hover:text-blue-400">
              🛒
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link to="/profile">
              <img
                src={user.avatar || 'https://i.pravatar.cc/40'}
                alt="avatar"
                className="w-8 h-8 rounded-full border border-white hover:ring"
              />
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
