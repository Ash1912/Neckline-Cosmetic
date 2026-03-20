import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Add useLocation
import { useTheme } from '../context/ThemeContext';
import { 
  FaInstagram, FaFacebook, FaTwitter, FaPinterest, 
  FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex, FaApple,
  FaGooglePay, FaAmazonPay, FaArrowUp, FaHeart, FaLeaf
} from 'react-icons/fa';
import { SiRazorpay, SiPaytm, SiPhonepe } from 'react-icons/si';

const Footer = () => {
  const { isDarkMode } = useTheme();
  const location = useLocation(); // Add useLocation hook
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [email, setEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Add smooth scrolling
    });
  }, [location.pathname]); // Trigger when pathname changes

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setNewsletterSubscribed(true);
      setEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle link click with scroll to top
  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Get responsive grid columns
  const getGridColumns = () => {
    if (windowWidth <= 480) return '1fr';
    if (windowWidth <= 768) return 'repeat(2, 1fr)';
    if (windowWidth <= 1024) return 'repeat(4, 1fr)';
    return 'repeat(4, 1fr)';
  };

  // Get responsive font sizes
  const getHeadingSize = () => {
    if (windowWidth <= 480) return '1rem';
    return '1.1rem';
  };

  const getTextSize = () => {
    if (windowWidth <= 480) return '0.85rem';
    return '0.9rem';
  };

  const themeStyles = {
    footer: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      padding: windowWidth <= 480 ? '2rem 0 0.5rem 0' : '3rem 0 1rem 0',
      marginTop: '3rem',
      borderTop: isDarkMode ? '1px solid #333' : '1px solid #e0e0e0',
      transition: 'all 0.3s ease',
      position: 'relative'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: windowWidth <= 480 ? '0 0.75rem' : '0 1rem'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: getGridColumns(),
      gap: windowWidth <= 480 ? '1.5rem' : '2rem',
      marginBottom: '2rem'
    },
    section: {
      display: 'flex',
      flexDirection: 'column'
    },
    heading: {
      fontSize: getHeadingSize(),
      fontWeight: '700',
      marginBottom: '1rem',
      color: isDarkMode ? '#e88ca6' : '#333',
      position: 'relative',
      paddingBottom: '0.5rem',
      borderBottom: `2px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`
    },
    text: {
      color: isDarkMode ? '#cccccc' : '#666',
      lineHeight: '1.6',
      fontSize: getTextSize(),
      marginBottom: '1rem'
    },
    list: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    listItem: {
      marginBottom: '0.5rem'
    },
    link: {
      color: isDarkMode ? '#cccccc' : '#666',
      textDecoration: 'none',
      fontSize: getTextSize(),
      lineHeight: '2',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      cursor: 'pointer',
      ':hover': {
        color: isDarkMode ? '#e88ca6' : '#e88ca6',
        transform: windowWidth <= 768 ? 'none' : 'translateX(5px)'
      }
    },
    contactInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      marginTop: '0.5rem'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      color: isDarkMode ? '#cccccc' : '#666',
      fontSize: getTextSize()
    },
    contactIcon: {
      color: '#e88ca6',
      fontSize: windowWidth <= 480 ? '1rem' : '1.1rem',
      minWidth: '20px'
    },
    socialLinks: {
      display: 'flex',
      gap: windowWidth <= 480 ? '0.75rem' : '1rem',
      flexWrap: 'wrap',
      marginTop: '0.5rem'
    },
    socialLink: {
      color: isDarkMode ? '#cccccc' : '#666',
      fontSize: windowWidth <= 480 ? '1.2rem' : '1.3rem',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: windowWidth <= 480 ? '32px' : '36px',
      height: windowWidth <= 480 ? '32px' : '36px',
      borderRadius: '50%',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f0f0f0',
      ':hover': {
        color: '#ffffff',
        backgroundColor: '#e88ca6',
        transform: windowWidth <= 768 ? 'none' : 'translateY(-3px)'
      }
    },

    // Newsletter Section
    newsletterSection: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      padding: windowWidth <= 480 ? '1.5rem' : '2rem',
      borderRadius: '1rem',
      marginBottom: '2rem',
      textAlign: 'center'
    },
    newsletterTitle: {
      fontSize: windowWidth <= 480 ? '1.1rem' : '1.2rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: isDarkMode ? '#e88ca6' : '#333'
    },
    newsletterText: {
      fontSize: getTextSize(),
      color: isDarkMode ? '#cccccc' : '#666',
      marginBottom: '1rem'
    },
    newsletterForm: {
      display: 'flex',
      gap: '0.5rem',
      maxWidth: '500px',
      margin: '0 auto',
      flexDirection: windowWidth <= 480 ? 'column' : 'row'
    },
    newsletterInput: {
      flex: 1,
      padding: windowWidth <= 480 ? '0.75rem' : '0.6rem 1rem',
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`,
      borderRadius: windowWidth <= 480 ? '2rem' : '2rem',
      color: isDarkMode ? '#ffffff' : '#333',
      fontSize: getTextSize(),
      outline: 'none',
      ':focus': {
        borderColor: '#e88ca6'
      }
    },
    newsletterButton: {
      padding: windowWidth <= 480 ? '0.75rem' : '0.6rem 1.5rem',
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      border: 'none',
      borderRadius: windowWidth <= 480 ? '2rem' : '2rem',
      fontSize: getTextSize(),
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap',
      ':hover': {
        backgroundColor: '#d47a94',
        transform: windowWidth <= 768 ? 'none' : 'translateY(-2px)'
      }
    },
    newsletterSuccess: {
      marginTop: '0.5rem',
      padding: '0.5rem',
      backgroundColor: '#4caf50',
      color: '#ffffff',
      borderRadius: '2rem',
      fontSize: getTextSize(),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },

    // Payment Methods
    paymentSection: {
      marginTop: '2rem',
      padding: '1.5rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '1rem',
      textAlign: 'center'
    },
    paymentTitle: {
      fontSize: windowWidth <= 480 ? '0.9rem' : '1rem',
      fontWeight: '600',
      marginBottom: '1rem',
      color: isDarkMode ? '#cccccc' : '#666'
    },
    paymentIcons: {
      display: 'flex',
      gap: windowWidth <= 480 ? '0.5rem' : '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    paymentIcon: {
      fontSize: windowWidth <= 480 ? '1.5rem' : '2rem',
      color: isDarkMode ? '#666' : '#999',
      transition: 'color 0.3s ease',
      ':hover': {
        color: '#e88ca6'
      }
    },

    // Footer Bottom
    footerBottom: {
      display: 'flex',
      flexDirection: windowWidth <= 768 ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '1rem',
      padding: '1.5rem 0',
      borderTop: `1px solid ${isDarkMode ? '#333' : '#e0e0e0'}`,
      marginTop: '2rem'
    },
    copyright: {
      color: isDarkMode ? '#999' : '#999',
      fontSize: windowWidth <= 480 ? '0.8rem' : '0.85rem',
      textAlign: windowWidth <= 768 ? 'center' : 'left'
    },
    footerLinks: {
      display: 'flex',
      gap: '1.5rem',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    footerLink: {
      color: isDarkMode ? '#999' : '#999',
      textDecoration: 'none',
      fontSize: windowWidth <= 480 ? '0.8rem' : '0.85rem',
      transition: 'color 0.3s ease',
      cursor: 'pointer',
      ':hover': {
        color: '#e88ca6'
      }
    },

    // Back to Top Button
    backToTop: {
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      width: windowWidth <= 480 ? '40px' : '50px',
      height: windowWidth <= 480 ? '40px' : '50px',
      borderRadius: '50%',
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      display: showBackToTop ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      border: 'none',
      fontSize: windowWidth <= 480 ? '1.2rem' : '1.5rem',
      boxShadow: '0 4px 12px rgba(232,140,166,0.3)',
      transition: 'all 0.3s ease',
      zIndex: 100,
      ':hover': {
        backgroundColor: '#d47a94',
        transform: 'scale(1.1)'
      }
    },

    // Badge
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.3rem',
      padding: '0.2rem 0.5rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f0f0f0',
      borderRadius: '1rem',
      fontSize: '0.7rem',
      color: isDarkMode ? '#cccccc' : '#666'
    }
  };

  return (
    <footer style={themeStyles.footer}>
      <div style={themeStyles.container}>
        {/* Newsletter Section */}
        <div style={themeStyles.newsletterSection}>
          <h3 style={themeStyles.newsletterTitle}>Subscribe to Our Newsletter</h3>
          <p style={themeStyles.newsletterText}>
            Get 10% off your first order and receive beauty tips & exclusive offers
          </p>
          <form style={themeStyles.newsletterForm} onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Your email address"
              style={themeStyles.newsletterInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" style={themeStyles.newsletterButton}>
              Subscribe
            </button>
          </form>
          {newsletterSubscribed && (
            <div style={themeStyles.newsletterSuccess}>
              <FaHeart /> Thanks for subscribing!
            </div>
          )}
        </div>

        {/* Main Footer Grid */}
        <div style={themeStyles.grid}>
          {/* About Section */}
          <div style={themeStyles.section}>
            <h3 style={themeStyles.heading}>Neckline Cosmetic</h3>
            <p style={themeStyles.text}>
              Clean beauty for everyone. Empowering you to feel confident, 
              express yourself, and embrace who you are.
            </p>
            <div style={themeStyles.badge}>
              <FaLeaf /> Cruelty Free
            </div>
            <div style={themeStyles.contactInfo}>
              <div style={themeStyles.contactItem}>
                <FaMapMarkerAlt style={themeStyles.contactIcon} />
                <span>J-34 Sec-2, Bawana, Delhi - 110039</span>
              </div>
              <div style={themeStyles.contactItem}>
                <FaPhone style={themeStyles.contactIcon} />
                <span>+91-9911150517</span>
              </div>
              <div style={themeStyles.contactItem}>
                <FaEnvelope style={themeStyles.contactIcon} />
                <span>info@necklinecosmetic.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div style={themeStyles.section}>
            <h3 style={themeStyles.heading}>Quick Links</h3>
            <ul style={themeStyles.list}>
              <li style={themeStyles.listItem}>
                <Link 
                  to="/shop" 
                  style={themeStyles.link}
                  onClick={handleLinkClick}
                >
                  Shop All
                </Link>
              </li>
              <li style={themeStyles.listItem}>
                <Link 
                  to="/about" 
                  style={themeStyles.link}
                  onClick={handleLinkClick}
                >
                  About Us
                </Link>
              </li>
              <li style={themeStyles.listItem}>
                <Link 
                  to="/blog" 
                  style={themeStyles.link}
                  onClick={handleLinkClick}
                >
                  Blog
                </Link>
              </li>
              <li style={themeStyles.listItem}>
                <Link 
                  to="/contact" 
                  style={themeStyles.link}
                  onClick={handleLinkClick}
                >
                  Contact
                </Link>
              </li>
              <li style={themeStyles.listItem}>
                <Link 
                  to="/wishlist" 
                  style={themeStyles.link}
                  onClick={handleLinkClick}
                >
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div style={themeStyles.section}>
            <h3 style={themeStyles.heading}>Categories</h3>
            <ul style={themeStyles.list}>
              <li style={themeStyles.listItem}>
                <Link 
                  to="/shop?category=face" 
                  style={themeStyles.link}
                  onClick={handleLinkClick}
                >
                  Face
                </Link>
              </li>
              <li style={themeStyles.listItem}>
                <Link 
                  to="/shop?category=lips" 
                  style={themeStyles.link}
                  onClick={handleLinkClick}
                >
                  Lips
                </Link>
              </li>
              <li style={themeStyles.listItem}>
                <Link 
                  to="/shop?category=eyes" 
                  style={themeStyles.link}
                  onClick={handleLinkClick}
                >
                  Eyes
                </Link>
              </li>
              <li style={themeStyles.listItem}>
                <Link 
                  to="/shop?category=skincare" 
                  style={themeStyles.link}
                  onClick={handleLinkClick}
                >
                  Skincare
                </Link>
              </li>
              <li style={themeStyles.listItem}>
                <Link 
                  to="/shop?category=nails" 
                  style={themeStyles.link}
                  onClick={handleLinkClick}
                >
                  Nails
                </Link>
              </li>
              <li style={themeStyles.listItem}>
                <Link 
                  to="/shop?category=sindoor" 
                  style={themeStyles.link}
                  onClick={handleLinkClick}
                >
                  Sindoor
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div style={themeStyles.section}>
            <h3 style={themeStyles.heading}>Connect With Us</h3>
            <div style={themeStyles.socialLinks}>
              <a 
                href="https://www.instagram.com/necklinecosmetics/" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={themeStyles.socialLink}
                aria-label="Instagram"
                onClick={handleLinkClick}
              >
                <FaInstagram />
              </a>
              <a 
                href="https://www.facebook.com/necklinecosmetics/" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={themeStyles.socialLink}
                aria-label="Facebook"
                onClick={handleLinkClick}
              >
                <FaFacebook />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={themeStyles.socialLink}
                aria-label="Twitter"
                onClick={handleLinkClick}
              >
                <FaTwitter />
              </a>
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={themeStyles.socialLink}
                aria-label="Pinterest"
                onClick={handleLinkClick}
              >
                <FaPinterest />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={themeStyles.socialLink}
                aria-label="YouTube"
                onClick={handleLinkClick}
              >
                <FaYoutube />
              </a>
            </div>

            {/* Payment Methods */}
            <div style={themeStyles.paymentSection}>
              <h4 style={themeStyles.paymentTitle}>We Accept</h4>
              <div style={themeStyles.paymentIcons}>
                <FaCcVisa style={themeStyles.paymentIcon} />
                <FaCcMastercard style={themeStyles.paymentIcon} />
                <FaCcPaypal style={themeStyles.paymentIcon} />
                <FaCcAmex style={themeStyles.paymentIcon} />
                <FaApple style={themeStyles.paymentIcon} />
                <FaGooglePay style={themeStyles.paymentIcon} />
                <FaAmazonPay style={themeStyles.paymentIcon} />
                <SiRazorpay style={themeStyles.paymentIcon} />
                <SiPaytm style={themeStyles.paymentIcon} />
                <SiPhonepe style={themeStyles.paymentIcon} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div style={themeStyles.footerBottom}>
          <div style={themeStyles.copyright}>
            <p>&copy; {new Date().getFullYear()} Neckline Cosmetic. All rights reserved.</p>
          </div>
          <div style={themeStyles.footerLinks}>
            <Link 
              to="/privacy" 
              style={themeStyles.footerLink}
              onClick={handleLinkClick}
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              style={themeStyles.footerLink}
              onClick={handleLinkClick}
            >
              Terms of Service
            </Link>
            <Link 
              to="/shipping" 
              style={themeStyles.footerLink}
              onClick={handleLinkClick}
            >
              Shipping Policy
            </Link>
            <Link 
              to="/returns" 
              style={themeStyles.footerLink}
              onClick={handleLinkClick}
            >
              Returns
            </Link>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button 
        style={themeStyles.backToTop}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
};

export default Footer;