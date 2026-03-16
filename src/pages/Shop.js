import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Shop = () => {
  const { isDarkMode } = useTheme();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['all', 'Face', 'Lips', 'Eyes', 'Skincare'];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const handleAddToCart = (product) => {
    addToCart(product, Array.isArray(product.shades) ? product.shades[0] : '', 1);
  };

  const themeStyles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem',
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#333333',
      minHeight: '100vh'
    },
    title: {
      fontSize: '2rem',
      marginBottom: '2rem',
      color: isDarkMode ? '#f5346b' : '#333333'
    },
    filters: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      flexWrap: 'wrap'
    },
    filterGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    filterLabel: {
      fontSize: '0.9rem',
      color: isDarkMode ? '#cccccc' : '#666666'
    },
    filterSelect: {
      padding: '0.5rem',
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`,
      borderRadius: '4px',
      fontSize: '0.9rem',
      cursor: 'pointer',
      color: isDarkMode ? '#ffffff' : '#333333'
    },
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '1.5rem'
    },
    noProducts: {
      textAlign: 'center',
      color: isDarkMode ? '#999999' : '#999999',
      fontSize: '1.1rem',
      padding: '3rem'
    }
  };

  // Responsive styles
  if (window.innerWidth <= 768) {
    themeStyles.productsGrid.gridTemplateColumns = 'repeat(2, 1fr)';
  }
  if (window.innerWidth <= 480) {
    themeStyles.productsGrid.gridTemplateColumns = '1fr';
    themeStyles.filters.flexDirection = 'column';
  }

  return (
    <div style={themeStyles.container}>
      <h1 style={themeStyles.title}>Shop All Products</h1>

      {/* Filters */}
      <div style={themeStyles.filters}>
        <div style={themeStyles.filterGroup}>
          <label style={themeStyles.filterLabel}>Category:</label>
          <select 
            style={themeStyles.filterSelect}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div style={themeStyles.filterGroup}>
          <label style={themeStyles.filterLabel}>Sort by:</label>
          <select 
            style={themeStyles.filterSelect}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div style={themeStyles.productsGrid}>
        {sortedProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <p style={themeStyles.noProducts}>No products found in this category.</p>
      )}
    </div>
  );
};

export default Shop;