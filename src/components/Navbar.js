import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { FaShoppingCart, FaBars, FaTimes} from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';
import WishlistButton from './WishlistButton';

const Navbar = () => {
  const { getCartCount } = useCart();
  const { isDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const themeStyles = {
    navbar: {
      backgroundColor: isDarkMode 
        ? (isScrolled ? '#1a1a1a' : '#2d2d2d') 
        : (isScrolled ? '#f5346b' : '#f5346b'),
      boxShadow: isDarkMode 
        ? '0 2px 4px rgba(0,0,0,0.3)' 
        : '0 2px 4px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      transition: 'all 0.3s ease',
      padding: isScrolled ? '0.5rem 0' : '0.75rem 0'
    },
    logo: {
      height: '40px',
      width: 'auto',
      display: 'block',
      filter: 'brightness(0) invert(1)',
      transition: 'all 0.3s ease'
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none'
    },
    link: {
      color: '#ffffff',
      textDecoration: 'none',
      fontSize: '1rem',
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      transition: 'all 0.3s ease',
      fontWeight: '500',
      ':hover': {
        backgroundColor: isDarkMode ? '#404040' : '#ff4d7a',
        transform: 'translateY(-2px)'
      }
    },
    cartLink: {
      color: '#ffffff',
      textDecoration: 'none',
      fontSize: '1.2rem',
      position: 'relative',
      padding: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      transition: 'all 0.3s ease',
      ':hover': {
        transform: 'scale(1.1)'
      }
    },
    cartCount: {
      position: 'absolute',
      top: '-5px',
      right: '-5px',
      backgroundColor: isDarkMode ? '#f5346b' : '#333333',
      color: '#ffffff',
      borderRadius: '50%',
      padding: '2px 6px',
      fontSize: '0.8rem',
      minWidth: '18px',
      textAlign: 'center'
    },
    menuButton: {
      display: isMobile ? 'block' : 'none',
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#ffffff',
      padding: '0.5rem',
      transition: 'all 0.3s ease',
      ':hover': {
        transform: 'scale(1.1)'
      }
    },
    navLinks: {
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
      flexDirection: isMobile && isMenuOpen ? 'column' : 'row',
      position: isMobile && isMenuOpen ? 'absolute' : 'static',
      top: isMobile && isMenuOpen ? '70px' : 'auto',
      left: 0,
      right: 0,
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f5346b',
      padding: isMobile && isMenuOpen ? '1rem' : '0',
      boxShadow: isMobile && isMenuOpen 
        ? (isDarkMode ? '0 4px 8px rgba(0,0,0,0.3)' : '0 4px 8px rgba(0,0,0,0.1)') 
        : 'none',
      width: isMobile && isMenuOpen ? '100%' : 'auto',
      zIndex: 999
    },
    desktopLinks: {
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center'
    }
  };

  return (
    <nav style={themeStyles.navbar}>
      <div style={styles.navContainer}>
        <Link to="/" style={themeStyles.logoContainer}>
          <img 
            src="/assets/images/Logo.png"
            alt="Neckline Cosmetic" 
            style={themeStyles.logo}
          />
        </Link>

        {/* Search Bar - Hidden on mobile when menu is open */}
        {!isMobile && <SearchBar />}

        <div style={styles.rightSection}>
          {isMobile && isMenuOpen && <SearchBar />}
          
          <div style={themeStyles.navLinks}>
            <Link to="/shop" style={themeStyles.link} onClick={() => setIsMenuOpen(false)}>Shop</Link>
            <Link to="/about" style={themeStyles.link} onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/blog" style={themeStyles.link} onClick={() => setIsMenuOpen(false)}>Blog</Link>
            <Link to="/contact" style={themeStyles.link} onClick={() => setIsMenuOpen(false)}>Contact</Link>
            
            {/* Wishlist Button */}
            <WishlistButton />
            
            {/* Cart Button */}
            <Link to="/cart" style={themeStyles.cartLink} onClick={() => setIsMenuOpen(false)}>
              <FaShoppingCart />
              {getCartCount() > 0 && (
                <span style={themeStyles.cartCount}>{getCartCount()}</span>
              )}
            </Link>
          </div>
          
          <ThemeToggle />
          
          <button 
            style={themeStyles.menuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem'
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  }
};

export default Navbar;