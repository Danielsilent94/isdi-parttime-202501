import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';

function App() {
  // Estado de usuario
  const [user, setUser] = useState(() => {
    const id = localStorage.getItem('userId');
    const name = localStorage.getItem('userName');
    if (id && name) return { id, name };
    return null;
  });

  // Estado de carrito
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Mantener user en localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('userId', user.id);
      localStorage.setItem('userName', user.name);
    } else {
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
    }
  }, [user]);

  // Mantener carrito en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Logout handler
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
  };

  return (
    <Router>
      <div className="bg-[#0f172a] min-h-screen">
        <Navbar user={user} onLogout={handleLogout} cart={cart} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage cart={cart} setCart={setCart} />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} />} />
          <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;