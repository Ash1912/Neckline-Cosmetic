import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaInfo, FaVideo, FaStar, FaBox, FaShieldAlt } from 'react-icons/fa';

const ProductTabs = ({ product }) => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description', icon: <FaInfo /> },
    { id: 'howToUse', label: 'How to Use', icon: <FaVideo /> },
    { id: 'ingredients', label: 'Ingredients', icon: <FaShieldAlt /> },
    { id: 'specs', label: 'Specifications', icon: <FaBox /> },
    { id: 'reviews', label: `Reviews (${product.reviews || 0})`, icon: <FaStar /> }
  ];

  const themeStyles = {
    tabsContainer: {
      marginTop: '3rem'
    },
    tabHeaders: {
      display: 'flex',
      gap: '0.5rem',
      borderBottom: `2px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
      paddingBottom: '0.5rem',
      overflowX: 'auto',
      scrollbarWidth: 'thin',
      '::-webkit-scrollbar': {
        height: '3px'
      },
      '::-webkit-scrollbar-thumb': {
        backgroundColor: '#e88ca6',
        borderRadius: '3px'
      }
    },
    tabHeader: {
      padding: '0.75rem 1.5rem',
      border: 'none',
      backgroundColor: 'transparent',
      fontSize: '1rem',
      cursor: 'pointer',
      color: isDarkMode ? '#cccccc' : '#666666',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      whiteSpace: 'nowrap',
      borderRadius: '2rem',
      ':hover': {
        color: '#e88ca6',
        backgroundColor: isDarkMode ? '#404040' : '#f8f8f8'
      }
    },
    activeTabHeader: {
      color: '#e88ca6',
      borderBottom: `3px solid #e88ca6`,
      backgroundColor: isDarkMode ? '#404040' : '#f8f8f8'
    },
    tabContent: {
      padding: '2rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '0 0 12px 12px',
      lineHeight: '1.8',
      color: isDarkMode ? '#cccccc' : '#666666'
    },
    specsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem'
    },
    specItem: {
      padding: '1rem',
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      borderRadius: '8px'
    },
    specLabel: {
      fontSize: '0.9rem',
      color: isDarkMode ? '#cccccc' : '#666666',
      marginBottom: '0.25rem'
    },
    specValue: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: isDarkMode ? '#ffffff' : '#333333'
    },
    reviewItem: {
      padding: '1rem',
      borderBottom: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
      marginBottom: '1rem'
    },
    reviewHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '0.5rem'
    },
    reviewerName: {
      fontWeight: '600',
      color: isDarkMode ? '#ffffff' : '#333333'
    },
    reviewRating: {
      color: '#ffc107',
      display: 'flex',
      gap: '0.2rem'
    },
    reviewDate: {
      fontSize: '0.85rem',
      color: isDarkMode ? '#999999' : '#999999'
    },
    reviewText: {
      color: isDarkMode ? '#cccccc' : '#666666'
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div>
            <p style={{ marginBottom: '1rem' }}>{product.description}</p>
            {product.benefits && (
              <>
                <h4 style={{ marginBottom: '0.5rem', color: isDarkMode ? '#ffffff' : '#333333' }}>Key Benefits:</h4>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  {product.benefits.map((benefit, index) => (
                    <li key={index} style={{ marginBottom: '0.25rem' }}>{benefit}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        );

      case 'howToUse':
        return <p>{product.howToUse}</p>;

      case 'ingredients':
        return <p>{product.ingredients}</p>;

      case 'specs':
        return (
          <div style={themeStyles.specsGrid}>
            <div style={themeStyles.specItem}>
              <div style={themeStyles.specLabel}>Item Number</div>
              <div style={themeStyles.specValue}>{product.itemNo || 'N/A'}</div>
            </div>
            <div style={themeStyles.specItem}>
              <div style={themeStyles.specLabel}>Category</div>
              <div style={themeStyles.specValue}>{product.category}</div>
            </div>
            <div style={themeStyles.specItem}>
              <div style={themeStyles.specLabel}>Sub Category</div>
              <div style={themeStyles.specValue}>{product.subCategory || 'N/A'}</div>
            </div>
            <div style={themeStyles.specItem}>
              <div style={themeStyles.specLabel}>Type</div>
              <div style={themeStyles.specValue}>{product.type || 'N/A'}</div>
            </div>
            <div style={themeStyles.specItem}>
              <div style={themeStyles.specLabel}>Shades Available</div>
              <div style={themeStyles.specValue}>
                {typeof product.shades === 'number' 
                  ? `${product.shades} shades` 
                  : `${product.shades?.length || 0} shades`}
              </div>
            </div>
            <div style={themeStyles.specItem}>
              <div style={themeStyles.specLabel}>Availability</div>
              <div style={{ ...themeStyles.specValue, color: product.inStock ? '#4caf50' : '#ff4444' }}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </div>
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div>
            {product.reviews && product.reviews > 0 ? (
              // Add your reviews here
              <p>Customer reviews will appear here</p>
            ) : (
              <p>No reviews yet. Be the first to review this product!</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={themeStyles.tabsContainer}>
      <div style={themeStyles.tabHeaders}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            style={{
              ...themeStyles.tabHeader,
              ...(activeTab === tab.id ? themeStyles.activeTabHeader : {})
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      <div style={themeStyles.tabContent}>
        {renderContent()}
      </div>
    </div>
  );
};

export default ProductTabs;