import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { FaSearch, FaFilter } from 'react-icons/fa';

const SearchPage = () => {
  const { isDarkMode } = useTheme();
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [showFilters, setShowFilters] = useState(false);

  // Search function with SEO optimization
  useEffect(() => {
    if (!query) {
      setSearchResults([]);
      setFilteredResults([]);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    
    const results = products.filter(product => {
      // Weighted search for better SEO
      let score = 0;
      
      // Exact name match (highest score)
      if (product.name.toLowerCase() === lowercaseQuery) score += 100;
      // Name starts with query
      else if (product.name.toLowerCase().startsWith(lowercaseQuery)) score += 50;
      // Name includes query
      else if (product.name.toLowerCase().includes(lowercaseQuery)) score += 30;
      
      // Category match
      if (product.category.toLowerCase().includes(lowercaseQuery)) score += 20;
      
      // Description match
      if (product.description.toLowerCase().includes(lowercaseQuery)) score += 15;
      
      // Ingredients match
      if (product.ingredients.toLowerCase().includes(lowercaseQuery)) score += 10;
      
      // Benefits match
      if (product.benefits?.some(b => b.toLowerCase().includes(lowercaseQuery))) score += 10;
      
      // Shades match - with type checking
      if (Array.isArray(product.shades)) {
        if (product.shades.some(s => s.toLowerCase().includes(lowercaseQuery))) score += 5;
      } else if (typeof product.shades === 'number') {
        const shadeNumberMatch = 
          `${product.shades} shades`.toLowerCase().includes(lowercaseQuery) ||
          `${product.shades} colors`.toLowerCase().includes(lowercaseQuery);
        if (shadeNumberMatch) score += 5;
      }
      
      // SEO keywords
      const seoKeywords = [
        'makeup', 'cosmetics', 'beauty', 'skincare', 'organic', 'vegan',
        'cruelty free', 'natural', 'clean beauty', 'foundation', 'lipstick',
        'mascara', 'serum', 'cleanser', 'moisturizer', 'highlighter'
      ];
      
      if (seoKeywords.some(k => k.includes(lowercaseQuery))) score += 8;
      
      return score > 0;
    });

    // Sort by score
    results.sort((a, b) => {
      const getScore = (product) => {
        let score = 0;
        if (product.name.toLowerCase() === lowercaseQuery) score += 100;
        if (product.name.toLowerCase().startsWith(lowercaseQuery)) score += 50;
        if (product.name.toLowerCase().includes(lowercaseQuery)) score += 30;
        return score;
      };
      
      return getScore(b) - getScore(a);
    });

    setSearchResults(results);
  }, [query]);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...searchResults];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Filter by price
    filtered = filtered.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep relevance sort
        break;
    }

    setFilteredResults(filtered);
  }, [searchResults, selectedCategory, priceRange, sortBy]);

  const categories = ['all', 'Face', 'Lips', 'Eyes', 'Skincare'];

  const themeStyles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem',
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#333333',
      minHeight: '100vh'
    },
    header: {
      marginBottom: '2rem'
    },
    title: {
      fontSize: '2rem',
      marginBottom: '0.5rem',
      color: isDarkMode ? '#f5346b' : '#333333',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    query: {
      color: isDarkMode ? '#ffffff' : '#333333',
      fontWeight: '600'
    },
    resultsCount: {
      color: isDarkMode ? '#cccccc' : '#666666',
      marginBottom: '1rem'
    },
    filterBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    filterButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      border: `1px solid ${isDarkMode ? '#404040' : '#ddd'}`,
      borderRadius: '4px',
      cursor: 'pointer',
      color: isDarkMode ? '#ffffff' : '#333333'
    },
    filterSection: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      padding: '1.5rem',
      borderRadius: '8px',
      marginBottom: '2rem',
      display: showFilters ? 'block' : 'none'
    },
    filterGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.5rem'
    },
    filterLabel: {
      display: 'block',
      marginBottom: '0.5rem',
      color: isDarkMode ? '#cccccc' : '#666666'
    },
    filterSelect: {
      width: '100%',
      padding: '0.5rem',
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`,
      borderRadius: '4px',
      color: isDarkMode ? '#ffffff' : '#333333'
    },
    priceInput: {
      width: '100%',
      padding: '0.5rem',
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`,
      borderRadius: '4px',
      color: isDarkMode ? '#ffffff' : '#333333'
    },
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '2rem'
    },
    noResults: {
      textAlign: 'center',
      padding: '4rem 2rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '12px'
    },
    noResultsIcon: {
      fontSize: '4rem',
      color: isDarkMode ? '#f5346b' : '#f5346b',
      marginBottom: '1rem'
    }
  };

  if (!query) {
    return (
      <div style={themeStyles.container}>
        <div style={themeStyles.noResults}>
          <FaSearch style={themeStyles.noResultsIcon} />
          <h2>Enter a search term</h2>
          <p>Search for products, categories, or ingredients</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = (product) => {
    addToCart(product, Array.isArray(product.shades) ? product.shades[0] : '', 1);
  };

  return (
    <div style={themeStyles.container}>
      <div style={themeStyles.header}>
        <h1 style={themeStyles.title}>
          <FaSearch /> Search Results
        </h1>
        <p style={themeStyles.resultsCount}>
          Found <span style={themeStyles.query}>{filteredResults.length}</span> results for "{query}"
        </p>
      </div>

      <div style={themeStyles.filterBar}>
        <button 
          style={themeStyles.filterButton}
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
        <select 
          style={themeStyles.filterSelect}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="relevance">Sort by: Relevance</option>
          <option value="price-low">Sort by: Price (Low to High)</option>
          <option value="price-high">Sort by: Price (High to Low)</option>
          <option value="name">Sort by: Name</option>
        </select>
      </div>

      <div style={themeStyles.filterSection}>
        <div style={themeStyles.filterGrid}>
          <div>
            <label style={themeStyles.filterLabel}>Category</label>
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
          <div>
            <label style={themeStyles.filterLabel}>Min Price (₹)</label>
            <input
              type="number"
              style={themeStyles.priceInput}
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
              min="0"
              max={priceRange.max}
            />
          </div>
          <div>
            <label style={themeStyles.filterLabel}>Max Price (₹)</label>
            <input
              type="number"
              style={themeStyles.priceInput}
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
              min={priceRange.min}
              max="1000"
            />
          </div>
        </div>
      </div>

      {filteredResults.length === 0 ? (
        <div style={themeStyles.noResults}>
          <FaSearch style={themeStyles.noResultsIcon} />
          <h2>No products found</h2>
          <p>Try adjusting your search or filters</p>
        </div>
      ) : (
        <div style={themeStyles.productsGrid}>
          {filteredResults.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;