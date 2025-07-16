import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getLoggedUser } from '../logic/getLoggedUser';

const Navbar = ({ cart, onLogout }) => {
  const navigate = useNavigate();
  const user = getLoggedUser();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    onLogout();
    navigate('/login');
  };

  return (
    <header className="bg-black text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        BOLD TECH
      </Link>
      <nav className="flex gap-4 items-center">
        <Link to="/products">Productos</Link>
        <Link to="/about">Sobre Nosotros</Link>

        <Link to="/cart" className="relative">
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-xs px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

        {user ? (
          <>
            <Link to="/profile">
              <img
                src={`https://i.pravatar.cc/30?u=${user.id}`}
                alt="Perfil"
                className="rounded-full w-8 h-8 inline-block"
              />
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;