import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { 
  FaArrowLeft, FaTruck, FaCreditCard, FaMoneyBill, 
  FaUniversity, FaQrcode, FaLock, FaShieldAlt,
  FaCheckCircle, FaGooglePay, FaAmazonPay, FaUpload
} from 'react-icons/fa';
import { SiPaytm, SiPhonepe } from 'react-icons/si';

const Checkout = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { cartItems, getCartTotal, clearCart } = useCart();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [qrCodeSrc, setQrCodeSrc] = useState('/assets/images/payment/qr-code.jpeg'); // Default QR code path
  const [qrError, setQrError] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    saveInfo: false
  });

  const [errors, setErrors] = useState({});

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && !orderComplete) {
      navigate('/cart');
    }
  }, [cartItems, navigate, orderComplete]);

  // Calculate totals
  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 40;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.pincode) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const initiatePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Generate random order ID
      const newOrderId = 'ORD' + Math.random().toString(36).substring(2, 10).toUpperCase();
      setOrderId(newOrderId);
      setOrderComplete(true);
      clearCart();
      setProcessing(false);
    }, 2000);
  };

  const handlePlaceOrder = async () => {
    if (currentStep === 2) {
      await initiatePayment();
    }
  };

  const handleUPIPayment = () => {
    if (upiId) {
      // Here you would integrate with UPI payment gateway
      alert(`Initiating payment to UPI ID: ${upiId}`);
      setProcessing(true);
      setTimeout(() => {
        setPaymentConfirmed(true);
        setProcessing(false);
      }, 1500);
    }
  };

  const handleQRPayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setPaymentConfirmed(true);
      setProcessing(false);
    }, 1500);
  };

  // Helper function to get step number style
  const getStepNumberStyle = (step) => {
    if (step < currentStep) {
      return {
        backgroundColor: '#4caf50',
        color: '#ffffff'
      };
    }
    if (step === currentStep) {
      return {
        backgroundColor: '#e88ca6',
        color: '#ffffff'
      };
    }
    return {
      backgroundColor: isDarkMode ? '#404040' : '#e0e0e0',
      color: isDarkMode ? '#ffffff' : '#333333'
    };
  };

  // Helper function to get step label style
  const getStepLabelStyle = (step) => {
    if (step <= currentStep) {
      return {
        color: isDarkMode ? '#ffffff' : '#333333',
        fontWeight: step === currentStep ? '600' : '400'
      };
    }
    return {
      color: isDarkMode ? '#666' : '#999',
      fontWeight: '400'
    };
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

    // Header
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '2rem'
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      border: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
      borderRadius: '2rem',
      color: isDarkMode ? '#ffffff' : '#333333',
      textDecoration: 'none',
      fontSize: '0.95rem',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#e88ca6',
        color: '#ffffff',
        borderColor: '#e88ca6'
      }
    },
    title: {
      fontSize: '2rem',
      fontWeight: '700',
      color: isDarkMode ? '#e88ca6' : '#333333',
      margin: 0
    },

    // Checkout Grid
    checkoutGrid: {
      display: 'grid',
      gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '2fr 1fr',
      gap: '2rem'
    },

    // Steps
    stepsContainer: {
      marginBottom: '2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative'
    },
    step: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      zIndex: 2,
      flex: 1
    },
    stepNumber: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '600',
      marginBottom: '0.5rem'
    },
    stepLabel: {
      fontSize: '0.9rem',
      textAlign: 'center'
    },
    stepLine: {
      position: 'absolute',
      top: '20px',
      left: '0',
      right: '0',
      height: '2px',
      backgroundColor: isDarkMode ? '#404040' : '#e0e0e0',
      zIndex: 1
    },
    stepLineFill: {
      position: 'absolute',
      top: '20px',
      left: '0',
      height: '2px',
      backgroundColor: '#e88ca6',
      width: `${(currentStep - 1) * 50}%`,
      transition: 'width 0.3s ease',
      zIndex: 1
    },

    // Form Section
    formSection: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '1rem',
      padding: '2rem',
      marginBottom: '2rem'
    },
    sectionTitle: {
      fontSize: '1.3rem',
      fontWeight: '600',
      marginBottom: '1.5rem',
      color: isDarkMode ? '#e88ca6' : '#333333',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1rem'
    },
    formGroup: {
      marginBottom: '1rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontSize: '0.95rem',
      color: isDarkMode ? '#cccccc' : '#666666'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`,
      borderRadius: '0.5rem',
      fontSize: '1rem',
      color: isDarkMode ? '#ffffff' : '#333333',
      transition: 'all 0.3s ease',
      outline: 'none',
      ':focus': {
        borderColor: '#e88ca6',
        boxShadow: '0 0 0 3px rgba(232,140,166,0.2)'
      }
    },
    error: {
      color: '#ff4444',
      fontSize: '0.85rem',
      marginTop: '0.25rem'
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      cursor: 'pointer',
      color: isDarkMode ? '#cccccc' : '#666666'
    },

    // Payment Methods
    paymentMethods: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem'
    },
    paymentMethod: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '1.5rem',
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      border: `2px solid ${isDarkMode ? '#555' : '#e0e0e0'}`,
      borderRadius: '1rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 5px 15px rgba(232,140,166,0.2)'
      }
    },
    activePaymentMethod: {
      borderColor: '#e88ca6',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#fff5f7'
    },
    paymentIcon: {
      fontSize: '2rem',
      color: '#e88ca6'
    },
    paymentName: {
      fontSize: '0.9rem',
      fontWeight: '500',
      color: isDarkMode ? '#ffffff' : '#333333'
    },

    // UPI Section
    upiSection: {
      marginTop: '2rem',
      padding: '2rem',
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      borderRadius: '1rem',
      textAlign: 'center'
    },
    qrCode: {
      width: '250px',
      height: '250px',
      margin: '0 auto 1.5rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `2px solid ${isDarkMode ? '#555' : '#ddd'}`,
      overflow: 'hidden',
      padding: '1rem'
    },
    qrImage: {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain'
    },
    qrPlaceholder: {
      textAlign: 'center',
      color: isDarkMode ? '#999' : '#666'
    },
    qrUploadButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1.5rem',
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      border: 'none',
      borderRadius: '2rem',
      fontSize: '0.95rem',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '1rem',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#d47a94',
        transform: 'translateY(-2px)'
      }
    },
    upiInput: {
      display: 'flex',
      gap: '1rem',
      maxWidth: '400px',
      margin: '1rem auto'
    },
    verifyButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap',
      ':hover': {
        backgroundColor: '#d47a94',
        transform: 'translateY(-2px)'
      }
    },
    paymentConfirmed: {
      marginTop: '1rem',
      padding: '1rem',
      backgroundColor: '#4caf50',
      color: '#ffffff',
      borderRadius: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },

    // Order Summary
    summary: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '1rem',
      padding: '1.5rem',
      position: 'sticky',
      top: '100px'
    },
    summaryTitle: {
      fontSize: '1.3rem',
      fontWeight: '600',
      marginBottom: '1.5rem',
      color: isDarkMode ? '#e88ca6' : '#333333'
    },
    summaryItem: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem',
      color: isDarkMode ? '#cccccc' : '#666666'
    },
    summaryDivider: {
      height: '1px',
      backgroundColor: isDarkMode ? '#404040' : '#e0e0e0',
      margin: '1rem 0'
    },
    summaryTotal: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '1.2rem',
      fontWeight: '700',
      color: isDarkMode ? '#e88ca6' : '#333333',
      marginTop: '1rem'
    },
    productItem: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '1rem',
      paddingBottom: '1rem',
      borderBottom: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
      ':last-child': {
        borderBottom: 'none',
        marginBottom: 0,
        paddingBottom: 0
      }
    },
    productImage: {
      width: '60px',
      height: '60px',
      borderRadius: '0.5rem',
      objectFit: 'cover'
    },
    productDetails: {
      flex: 1
    },
    productName: {
      fontSize: '0.95rem',
      fontWeight: '600',
      marginBottom: '0.25rem',
      color: isDarkMode ? '#ffffff' : '#333333'
    },
    productMeta: {
      fontSize: '0.85rem',
      color: isDarkMode ? '#999' : '#999',
      marginBottom: '0.25rem'
    },
    productPrice: {
      fontSize: '0.95rem',
      fontWeight: '600',
      color: '#e88ca6'
    },

    // Action Buttons
    actionButtons: {
      display: 'flex',
      gap: '1rem',
      marginTop: '2rem'
    },
    primaryButton: {
      flex: 1,
      padding: '1rem',
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#d47a94',
        transform: 'translateY(-2px)'
      },
      ':disabled': {
        opacity: 0.5,
        cursor: 'not-allowed'
      }
    },
    secondaryButton: {
      flex: 1,
      padding: '1rem',
      backgroundColor: 'transparent',
      color: isDarkMode ? '#ffffff' : '#333333',
      border: `1px solid ${isDarkMode ? '#404040' : '#ddd'}`,
      borderRadius: '0.5rem',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: isDarkMode ? '#404040' : '#f8f8f8'
      }
    },

    // Security Badge
    securityBadge: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      marginTop: '2rem',
      padding: '1rem',
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      borderRadius: '0.5rem',
      color: isDarkMode ? '#cccccc' : '#666666',
      fontSize: '0.9rem'
    },

    // Order Complete
    orderComplete: {
      textAlign: 'center',
      padding: '4rem 2rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '2rem'
    },
    successIcon: {
      fontSize: '5rem',
      color: '#4caf50',
      marginBottom: '1.5rem'
    },
    orderNumber: {
      fontSize: '1.2rem',
      color: isDarkMode ? '#e88ca6' : '#333333',
      margin: '1rem 0',
      padding: '1rem',
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      borderRadius: '0.5rem',
      display: 'inline-block'
    }
  };

  // Function to handle QR code upload
  const handleQrUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQrCodeSrc(reader.result);
        setQrError(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Render order complete screen
  if (orderComplete) {
    return (
      <div style={themeStyles.container}>
        <div style={themeStyles.orderComplete}>
          <FaCheckCircle style={themeStyles.successIcon} />
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Order Placed Successfully!</h2>
          <p style={{ color: isDarkMode ? '#ccc' : '#666', marginBottom: '1rem' }}>
            Thank you for your purchase. We'll send you an email with order details.
          </p>
          <div style={themeStyles.orderNumber}>
            Order ID: {orderId}
          </div>
          <Link 
            to="/shop" 
            style={{
              ...themeStyles.primaryButton,
              display: 'inline-block',
              width: 'auto',
              marginTop: '2rem',
              textDecoration: 'none'
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={themeStyles.container}>
      {/* Header */}
      <div style={themeStyles.header}>
        <Link to="/cart" style={themeStyles.backButton}>
          <FaArrowLeft /> Back to Cart
        </Link>
        <h1 style={themeStyles.title}>Checkout</h1>
      </div>

      {/* Progress Steps */}
      <div style={themeStyles.stepsContainer}>
        <div style={themeStyles.stepLine} />
        <div style={themeStyles.stepLineFill} />
        
        <div style={themeStyles.step}>
          <div style={{...themeStyles.stepNumber, ...getStepNumberStyle(1)}}>1</div>
          <div style={{...themeStyles.stepLabel, ...getStepLabelStyle(1)}}>Shipping</div>
        </div>
        <div style={themeStyles.step}>
          <div style={{...themeStyles.stepNumber, ...getStepNumberStyle(2)}}>2</div>
          <div style={{...themeStyles.stepLabel, ...getStepLabelStyle(2)}}>Payment</div>
        </div>
        <div style={themeStyles.step}>
          <div style={{...themeStyles.stepNumber, ...getStepNumberStyle(3)}}>3</div>
          <div style={{...themeStyles.stepLabel, ...getStepLabelStyle(3)}}>Confirm</div>
        </div>
      </div>

      {/* Main Content */}
      <div style={themeStyles.checkoutGrid}>
        {/* Left Column - Forms */}
        <div>
          {/* Step 1: Shipping Information */}
          {currentStep === 1 && (
            <div style={themeStyles.formSection}>
              <h2 style={themeStyles.sectionTitle}>
                <FaTruck /> Shipping Information
              </h2>
              
              <div style={themeStyles.formGrid}>
                <div style={themeStyles.formGroup}>
                  <label style={themeStyles.label}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={themeStyles.input}
                    placeholder="your@email.com"
                  />
                  {errors.email && <div style={themeStyles.error}>{errors.email}</div>}
                </div>

                <div style={themeStyles.formGroup}>
                  <label style={themeStyles.label}>Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={themeStyles.input}
                    placeholder="10 digit mobile number"
                  />
                  {errors.phone && <div style={themeStyles.error}>{errors.phone}</div>}
                </div>

                <div style={themeStyles.formGroup}>
                  <label style={themeStyles.label}>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    style={themeStyles.input}
                    placeholder="First name"
                  />
                  {errors.firstName && <div style={themeStyles.error}>{errors.firstName}</div>}
                </div>

                <div style={themeStyles.formGroup}>
                  <label style={themeStyles.label}>Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    style={themeStyles.input}
                    placeholder="Last name"
                  />
                  {errors.lastName && <div style={themeStyles.error}>{errors.lastName}</div>}
                </div>

                <div style={{ ...themeStyles.formGroup, gridColumn: '1 / -1' }}>
                  <label style={themeStyles.label}>Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    style={themeStyles.input}
                    placeholder="Street address"
                  />
                  {errors.address && <div style={themeStyles.error}>{errors.address}</div>}
                </div>

                <div style={{ ...themeStyles.formGroup, gridColumn: '1 / -1' }}>
                  <label style={themeStyles.label}>Apartment, suite, etc. (optional)</label>
                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    style={themeStyles.input}
                    placeholder="Apartment, suite, unit, etc."
                  />
                </div>

                <div style={themeStyles.formGroup}>
                  <label style={themeStyles.label}>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    style={themeStyles.input}
                    placeholder="City"
                  />
                  {errors.city && <div style={themeStyles.error}>{errors.city}</div>}
                </div>

                <div style={themeStyles.formGroup}>
                  <label style={themeStyles.label}>State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    style={themeStyles.input}
                    placeholder="State"
                  />
                  {errors.state && <div style={themeStyles.error}>{errors.state}</div>}
                </div>

                <div style={themeStyles.formGroup}>
                  <label style={themeStyles.label}>Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    style={themeStyles.input}
                    placeholder="6 digit pincode"
                  />
                  {errors.pincode && <div style={themeStyles.error}>{errors.pincode}</div>}
                </div>

                <div style={{ ...themeStyles.formGroup, gridColumn: '1 / -1' }}>
                  <label style={themeStyles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="saveInfo"
                      checked={formData.saveInfo}
                      onChange={handleInputChange}
                    />
                    Save this information for next time
                  </label>
                </div>
              </div>

              <div style={themeStyles.actionButtons}>
                <Link to="/cart" style={themeStyles.secondaryButton}>
                  Cancel
                </Link>
                <button onClick={handleNextStep} style={themeStyles.primaryButton}>
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Payment Method */}
          {currentStep === 2 && (
            <div style={themeStyles.formSection}>
              <h2 style={themeStyles.sectionTitle}>
                <FaCreditCard /> Payment Method
              </h2>

              <div style={themeStyles.paymentMethods}>
                <div
                  style={{
                    ...themeStyles.paymentMethod,
                    ...(paymentMethod === 'card' && themeStyles.activePaymentMethod)
                  }}
                  onClick={() => setPaymentMethod('card')}
                >
                  <FaCreditCard style={themeStyles.paymentIcon} />
                  <span style={themeStyles.paymentName}>Credit/Debit Card</span>
                </div>

                <div
                  style={{
                    ...themeStyles.paymentMethod,
                    ...(paymentMethod === 'upi' && themeStyles.activePaymentMethod)
                  }}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <FaQrcode style={themeStyles.paymentIcon} />
                  <span style={themeStyles.paymentName}>UPI</span>
                </div>

                <div
                  style={{
                    ...themeStyles.paymentMethod,
                    ...(paymentMethod === 'netbanking' && themeStyles.activePaymentMethod)
                  }}
                  onClick={() => setPaymentMethod('netbanking')}
                >
                  <FaUniversity style={themeStyles.paymentIcon} />
                  <span style={themeStyles.paymentName}>Net Banking</span>
                </div>

                <div
                  style={{
                    ...themeStyles.paymentMethod,
                    ...(paymentMethod === 'wallet' && themeStyles.activePaymentMethod)
                  }}
                  onClick={() => setPaymentMethod('wallet')}
                >
                  <FaMoneyBill style={themeStyles.paymentIcon} />
                  <span style={themeStyles.paymentName}>Wallet</span>
                </div>
              </div>

              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <div style={themeStyles.formGrid}>
                  <div style={{ ...themeStyles.formGroup, gridColumn: '1 / -1' }}>
                    <label style={themeStyles.label}>Card Number</label>
                    <input
                      type="text"
                      style={themeStyles.input}
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div style={themeStyles.formGroup}>
                    <label style={themeStyles.label}>Expiry Date</label>
                    <input
                      type="text"
                      style={themeStyles.input}
                      placeholder="MM/YY"
                    />
                  </div>

                  <div style={themeStyles.formGroup}>
                    <label style={themeStyles.label}>CVV</label>
                    <input
                      type="text"
                      style={themeStyles.input}
                      placeholder="123"
                    />
                  </div>

                  <div style={{ ...themeStyles.formGroup, gridColumn: '1 / -1' }}>
                    <label style={themeStyles.label}>Name on Card</label>
                    <input
                      type="text"
                      style={themeStyles.input}
                      placeholder="As shown on card"
                    />
                  </div>
                </div>
              )}

              {/* UPI Payment with Custom QR Code */}
              {paymentMethod === 'upi' && (
                <div style={themeStyles.upiSection}>
                  <h3 style={{ marginBottom: '1rem', color: isDarkMode ? '#ffffff' : '#333333' }}>
                    Scan QR Code to Pay
                  </h3>
                  
                  {/* QR Code Display */}
                  <div style={themeStyles.qrCode}>
                    {!qrError ? (
                      <img 
                        src={qrCodeSrc} 
                        alt="Payment QR Code"
                        style={themeStyles.qrImage}
                        onError={() => setQrError(true)}
                      />
                    ) : (
                      <div style={themeStyles.qrPlaceholder}>
                        <FaQrcode style={{ fontSize: '3rem', marginBottom: '0.5rem' }} />
                        <p>QR Code not found</p>
                      </div>
                    )}
                  </div>

                  {/* QR Code Upload Option */}
                  <div>
                    <input
                      type="file"
                      id="qr-upload"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleQrUpload}
                    />
                    <label htmlFor="qr-upload" style={themeStyles.qrUploadButton}>
                      <FaUpload /> Upload Your QR Code
                    </label>
                  </div>

                  <p style={{ margin: '1rem 0', color: isDarkMode ? '#ccc' : '#666' }}>
                    Or enter UPI ID manually
                  </p>

                  {/* UPI ID Input */}
                  <div style={themeStyles.upiInput}>
                    <input
                      type="text"
                      style={themeStyles.input}
                      placeholder="username@okhdfcbank"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                    <button 
                      style={themeStyles.verifyButton}
                      onClick={handleUPIPayment}
                      disabled={processing}
                    >
                      Pay
                    </button>
                  </div>

                  {/* Payment Confirmation */}
                  {paymentConfirmed && (
                    <div style={themeStyles.paymentConfirmed}>
                      <FaCheckCircle /> Payment Successful! Click Place Order to continue.
                    </div>
                  )}

                  {/* QR Payment Button */}
                  {!paymentConfirmed && (
                    <button 
                      style={{...themeStyles.verifyButton, marginTop: '1rem'}}
                      onClick={handleQRPayment}
                      disabled={processing}
                    >
                      I have scanned and paid
                    </button>
                  )}
                </div>
              )}

              {/* Net Banking */}
              {paymentMethod === 'netbanking' && (
                <div>
                  <select style={{ ...themeStyles.input, marginBottom: '1rem' }}>
                    <option value="">Select your bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="kotak">Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}

              {/* Wallet */}
              {paymentMethod === 'wallet' && (
                <div style={themeStyles.paymentMethods}>
                  <div style={themeStyles.paymentMethod}>
                    <SiPhonepe style={{ ...themeStyles.paymentIcon, color: '#5F259F' }} />
                    <span style={themeStyles.paymentName}>PhonePe</span>
                  </div>
                  <div style={themeStyles.paymentMethod}>
                    <SiPaytm style={{ ...themeStyles.paymentIcon, color: '#00BAF2' }} />
                    <span style={themeStyles.paymentName}>Paytm</span>
                  </div>
                  <div style={themeStyles.paymentMethod}>
                    <FaGooglePay style={{ ...themeStyles.paymentIcon, color: '#4285F4' }} />
                    <span style={themeStyles.paymentName}>Google Pay</span>
                  </div>
                  <div style={themeStyles.paymentMethod}>
                    <FaAmazonPay style={{ ...themeStyles.paymentIcon, color: '#FF9900' }} />
                    <span style={themeStyles.paymentName}>Amazon Pay</span>
                  </div>
                </div>
              )}

              <div style={themeStyles.actionButtons}>
                <button onClick={handlePreviousStep} style={themeStyles.secondaryButton}>
                  Back
                </button>
                <button 
                  onClick={handlePlaceOrder}
                  style={themeStyles.primaryButton}
                  disabled={processing || (paymentMethod === 'upi' && !paymentConfirmed)}
                >
                  {processing ? 'Processing...' : `Place Order • ₹${total.toFixed(2)}`}
                </button>
              </div>

              {/* Security Badge */}
              <div style={themeStyles.securityBadge}>
                <FaLock /> <FaShieldAlt />
                <span>Your payment information is secure. 256-bit encrypted.</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Order Summary */}
        <div style={themeStyles.summary}>
          <h2 style={themeStyles.summaryTitle}>Order Summary</h2>
          
          {/* Products */}
          <div style={{ marginBottom: '1.5rem' }}>
            {cartItems.map(item => (
              <div key={`${item.id}-${item.selectedShade}`} style={themeStyles.productItem}>
                <img 
                  src={item.image} 
                  alt={item.name}
                  style={themeStyles.productImage}
                />
                <div style={themeStyles.productDetails}>
                  <div style={themeStyles.productName}>{item.name}</div>
                  {item.selectedShade && (
                    <div style={themeStyles.productMeta}>Shade: {item.selectedShade}</div>
                  )}
                  <div style={themeStyles.productMeta}>Qty: {item.quantity}</div>
                  <div style={themeStyles.productPrice}>
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={themeStyles.summaryDivider} />

          {/* Price Breakdown */}
          <div style={themeStyles.summaryItem}>
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div style={themeStyles.summaryItem}>
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
          </div>
          <div style={themeStyles.summaryItem}>
            <span>Tax (18% GST)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>

          <div style={themeStyles.summaryDivider} />

          <div style={themeStyles.summaryTotal}>
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          {subtotal > 500 && (
            <div style={{
              marginTop: '1rem',
              padding: '0.75rem',
              backgroundColor: '#4caf50',
              color: '#ffffff',
              borderRadius: '0.5rem',
              textAlign: 'center',
              fontSize: '0.9rem'
            }}>
              🎉 Free Shipping Applied!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;