import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FaInstagram, FaFacebook, FaTwitter, FaPinterest } from 'react-icons/fa';

const Footer = () => {
  const { isDarkMode } = useTheme();

  const themeStyles = {
    footer: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#f8f8f8',
      padding: '3rem 0 1rem 0',
      marginTop: '3rem',
      borderTop: isDarkMode ? '1px solid #333' : '1px solid #ddd',
      transition: 'all 0.3s ease'
    },
    heading: {
      fontSize: '1.1rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: isDarkMode ? '#e88ca6' : '#333'
    },
    text: {
      color: isDarkMode ? '#cccccc' : '#666',
      lineHeight: '1.6',
      fontSize: '0.9rem'
    },
    link: {
      color: isDarkMode ? '#cccccc' : '#666',
      textDecoration: 'none',
      fontSize: '0.9rem',
      lineHeight: '2',
      transition: 'color 0.3s ease',
      ':hover': {
        color: isDarkMode ? '#e88ca6' : '#333'
      }
    },
    socialLink: {
      color: isDarkMode ? '#cccccc' : '#666',
      fontSize: '1.2rem',
      transition: 'all 0.3s ease',
      ':hover': {
        color: isDarkMode ? '#e88ca6' : '#333',
        transform: 'translateY(-3px)'
      }
    },
    copyright: {
      textAlign: 'center',
      paddingTop: '2rem',
      borderTop: isDarkMode ? '1px solid #333' : '1px solid #ddd',
      color: isDarkMode ? '#999' : '#999',
      fontSize: '0.9rem'
    }
  };

  return (
    <footer style={themeStyles.footer}>
      <div style={styles.container}>
        <div style={styles.grid}>
          {/* About Section */}
          <div style={styles.section}>
            <h3 style={themeStyles.heading}>Neckline Cosmetic</h3>
            <p style={themeStyles.text}>
              Clean beauty for everyone. Empowering you to feel confident, 
              express yourself, and embrace who you are.
            </p>
          </div>

          {/* Quick Links */}
          <div style={styles.section}>
            <h3 style={themeStyles.heading}>Quick Links</h3>
            <ul style={styles.list}>
              <li><Link to="/shop" style={themeStyles.link}>Shop All</Link></li>
              <li><Link to="/about" style={themeStyles.link}>About Us</Link></li>
              <li><Link to="/contact" style={themeStyles.link}>Contact</Link></li>
              {/* <li><Link to="/faq" style={themeStyles.link}>FAQ</Link></li> */}
            </ul>
          </div>

          {/* Categories */}
          <div style={styles.section}>
            <h3 style={themeStyles.heading}>Categories</h3>
            <ul style={styles.list}>
              <li><Link to="/shop?category=face" style={themeStyles.link}>Face</Link></li>
              <li><Link to="/shop?category=lips" style={themeStyles.link}>Lips</Link></li>
              <li><Link to="/shop?category=eyes" style={themeStyles.link}>Eyes</Link></li>
              <li><Link to="/shop?category=skincare" style={themeStyles.link}>Skincare</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div style={styles.section}>
            <h3 style={themeStyles.heading}>Connect With Us</h3>
            <div style={styles.socialLinks}>
              <a href="https://www.instagram.com/necklinecosmetics/" target="_blank" rel="noopener noreferrer" style={themeStyles.socialLink}>
                <FaInstagram />
              </a>
              <a href="https://www.facebook.com/necklinecosmetics/" target="_blank" rel="noopener noreferrer" style={themeStyles.socialLink}>
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={themeStyles.socialLink}>
                <FaTwitter />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" style={themeStyles.socialLink}>
                <FaPinterest />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={themeStyles.copyright}>
          <p>&copy; 2024 Neckline Cosmetic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '2rem',
    marginBottom: '2rem'
  },
  section: {
    display: 'flex',
    flexDirection: 'column'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  socialLinks: {
    display: 'flex',
    gap: '1rem'
  }
};

// Responsive design
const mediaQuery = window.matchMedia('(max-width: 768px)');
if (mediaQuery.matches) {
  styles.grid.gridTemplateColumns = 'repeat(2, 1fr)';
}

const mobileQuery = window.matchMedia('(max-width: 480px)');
if (mobileQuery.matches) {
  styles.grid.gridTemplateColumns = '1fr';
}

export default Footer;