import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutPage from './pages/AboutPage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'

const App = () => {
  return (
    <Router>
      <div className="bg-[#2c1e76] min-h-screen text-white">
        <Navbar />
       <Routes>
  <Route path="/" element={<HeroSection />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="/products" element={<ProductsPage />} />
  <Route path="/product/:id" element={<ProductDetailPage />} />
    </Routes>
      </div>
    </Router>
  )
}

export default App

