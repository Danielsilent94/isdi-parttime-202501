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

import getAllProducts from './logic/getAllProducts';

function App() {
  const [user, setUser] = useState(() => {
    const id = localStorage.getItem('userId');
    const name = localStorage.getItem('userName');
    return id && name ? { id, name } : null;
  });

  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('userId', user.id);
      localStorage.setItem('userName', user.name);
    } else {
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <Router>
      <div className="bg-[#0f172a] min-h-screen">
        <Navbar user={user} onLogout={handleLogout} cart={cart} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/products"
            element={
              <ProductsPage
                products={products}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetailPage
                products={products}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/profile"
            element={<ProfilePage user={user} setUser={setUser} />}
          />
          <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;