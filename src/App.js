import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext'; // Add this
import ProtectedRoute from './components/ProtectedRoute'; // Add this
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import WishlistPage from './pages/WishlistPage';
import SearchPage from './pages/SearchPage';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Checkout from './pages/Checkout';
import Login from './pages/Login'; // Add this
import Signup from './pages/Signup'; // Add this
import Profile from './pages/Profile'; // Add this

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ThemeProvider>
          <AuthProvider> {/* Add AuthProvider */}
            <CartProvider>
              <WishlistProvider>
                <div style={styles.app}>
                  <Navbar />
                  <main style={styles.main}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/wishlist" element={<WishlistPage />} />
                      <Route path="/search" element={<SearchPage />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:id" element={<BlogPost />} />
                      <Route path="/checkout" element={
                        <ProtectedRoute>
                          <Checkout />
                        </ProtectedRoute>
                      } />
                      <Route path="/profile" element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      } />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </HelmetProvider>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    flex: 1
  }
};

export default App;