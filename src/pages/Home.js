import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import {
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
  FaStar,
} from "react-icons/fa";

const Home = () => {
  const { isDarkMode } = useTheme();
  const { addToCart } = useCart();

  // Refs for scrolling
  const valuesSectionRef = useRef(null);

  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Responsive state
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [imageErrors, setImageErrors] = useState({});

  // Slider images - Using local images from public/assets/images/home/
  const sliderImages = [
    {
      url: "/assets/images/home/Foundation.jpg",
      alt: "Flawless Foundation",
      title: "Flawless Foundation",
      objectPosition: "center",
    },
    {
      url: "/assets/images/home/Kajal-Mascara.jpg",
      alt: "Intense Kajal",
      title: "Intense Kajal",
      objectPosition: "center",
    },
    {
      url: "/assets/images/home/LonglastingLipstick.jpg",
      alt: "Long-lasting Lipstick",
      title: "Long-lasting Lipsticks",
      objectPosition: "center",
    },
    {
      url: "/assets/images/home/Makeup-Fixer.jpg",
      alt: "Makeup Fixer Spray",
      title: "Makeup Fixer",
      objectPosition: "center",
    },
    {
      url: "/assets/images/home/Nail-Polish.jpg",
      alt: "Nail Polish Collection",
      title: "Nail Polish",
      objectPosition: "center",
    },
    {
      url: "/assets/images/home/Sindoor.jpg",
      alt: "Traditional Sindoor",
      title: "Premium Sindoor",
      objectPosition: "center",
    },
  ];

  // Categories for Shop by Category section
  const categories = [
    {
      name: "Face",
      image: "/assets/images/categories/face.png",
      productCount: 15,
      color: "#FFB6C1",
    },
    {
      name: "Eyes",
      image: "/assets/images/categories/eyes.png",
      productCount: 12,
      color: "#C1E1C1",
    },
    {
      name: "Lips",
      image: "/assets/images/categories/lips.png",
      productCount: 18,
      color: "#FFC3A0",
    },
    {
      name: "Nails",
      image: "/assets/images/categories/nails.png",
      productCount: 8,
      color: "#D4A5F0",
    },
    {
      name: "Sindoor",
      image: "/assets/images/categories/sindoor.png",
      productCount: 5,
      color: "#FF9AA2",
    },
    {
      name: "Extras",
      image: "/assets/images/categories/extras.jpg",
      productCount: 10,
      color: "#B5EAD7",
    },
    {
      name: "Palettes",
      image: "/assets/images/categories/palette.jpg",
      productCount: 7,
      color: "#FBC1C1",
    },
  ];

  // Best selling products
  const bestSellingProducts = products.slice(0, 8).map((p) => ({
    ...p,
    bestSeller: true,
    rating: 4.5,
  }));

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, sliderImages.length]);

  // Manual navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + sliderImages.length) % sliderImages.length,
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Handle image error
  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  // Scroll to values section
  const scrollToValues = (e) => {
    e.preventDefault();
    valuesSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Values with updated UI styling
  const values = [
    {
      icon: "✨",
      title: "Authenticity",
      description:
        "Raw, unfiltered beauty. No unrealistic standards, just you, enhanced.",
      color: "#FFB6C1",
    },
    {
      icon: "🌱",
      title: "Sustainability",
      description:
        "We prioritize eco-friendly practices and responsible sourcing.",
      color: "#C1E1C1",
    },
    {
      icon: "💪",
      title: "Empowerment",
      description:
        "Every product is designed to make you feel bold, confident, and unstoppable.",
      color: "#FFC3A0",
    },
    {
      icon: "🌈",
      title: "Inclusivity",
      description: "We embrace all skin tones, types, and identities.",
      color: "#D4A5F0",
    },
    {
      icon: "🔍",
      title: "Integrity",
      description: "Transparency at the core of everything we do.",
      color: "#FF9AA2",
    },
    {
      icon: "🚀",
      title: "Innovation",
      description:
        "Constantly pushing boundaries to create game-changing products.",
      color: "#B5EAD7",
    },
  ];

  // Get responsive values based on window width
  const getResponsiveStyles = () => {
    if (windowWidth <= 480) {
      return {
        heroSectionGrid: "1fr",
        heroLeftPadding: "2rem 1.5rem",
        heroRightHeight: "300px",
        heroStatsFlexDirection: "column",
        heroStatsGap: "1rem",
        heroButtonsFlexDirection: "column",
        primaryButtonWidth: "100%",
        secondaryButtonWidth: "100%",
        valuesGridColumns: "1fr",
        categoriesGridColumns: "repeat(2, 1fr)",
        productsGridColumns: "1fr",
        heroSectionHeight: "auto",
        heroMinHeight: "520px",
        heroMarginTop: "1rem",
        sliderImageHeight: "300px",
        valuesGridGap: "1rem",
        valuesPadding: "0.5rem",
      };
    } else if (windowWidth <= 768) {
      return {
        heroSectionGrid: "1fr",
        heroLeftPadding: "2.5rem 2rem",
        heroRightHeight: "380px",
        heroStatsFlexDirection: "row",
        heroStatsGap: "2rem",
        heroButtonsFlexDirection: "row",
        primaryButtonWidth: "auto",
        secondaryButtonWidth: "auto",
        valuesGridColumns: "repeat(2, 1fr)",
        categoriesGridColumns: "repeat(3, 1fr)",
        productsGridColumns: "repeat(2, 1fr)",
        heroSectionHeight: "auto",
        heroMinHeight: "620px",
        heroMarginTop: "1.5rem",
        sliderImageHeight: "380px",
        valuesGridGap: "1.5rem",
        valuesPadding: "1rem",
      };
    } else if (windowWidth <= 1024) {
      return {
        heroSectionGrid: "1fr 1fr",
        heroLeftPadding: "3rem",
        heroRightHeight: "480px",
        heroStatsFlexDirection: "row",
        heroStatsGap: "2rem",
        heroButtonsFlexDirection: "row",
        primaryButtonWidth: "auto",
        secondaryButtonWidth: "auto",
        valuesGridColumns: "repeat(3, 1fr)",
        categoriesGridColumns: "repeat(4, 1fr)",
        productsGridColumns: "repeat(3, 1fr)",
        heroSectionHeight: "550px",
        heroMinHeight: "550px",
        heroMarginTop: "2rem",
        sliderImageHeight: "480px",
        valuesGridGap: "2rem",
        valuesPadding: "1.5rem",
      };
    } else {
      return {
        heroSectionGrid: "1fr 1fr",
        heroLeftPadding: "4rem",
        heroRightHeight: "520px",
        heroStatsFlexDirection: "row",
        heroStatsGap: "2.5rem",
        heroButtonsFlexDirection: "row",
        primaryButtonWidth: "auto",
        secondaryButtonWidth: "auto",
        valuesGridColumns: "repeat(3, 1fr)",
        categoriesGridColumns: "repeat(4, 1fr)",
        productsGridColumns: "repeat(4, 1fr)",
        heroSectionHeight: "570px",
        heroMinHeight: "570px",
        heroMarginTop: "2rem",
        sliderImageHeight: "520px",
        valuesGridGap: "2.5rem",
        valuesPadding: "2rem",
      };
    }
  };

  const responsive = getResponsiveStyles();

  const themeStyles = {
    container: {
      backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff",
      color: isDarkMode ? "#ffffff" : "#333333",
      minHeight: "100vh",
      transition: "all 0.3s ease",
      overflowX: "hidden",
      paddingTop: "20px",
    },
    // Hero Section
    heroSection: {
      display: "grid",
      gridTemplateColumns: responsive.heroSectionGrid,
      height: responsive.heroSectionHeight,
      minHeight: responsive.heroMinHeight,
      maxHeight: "650px",
      position: "relative",
      backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff",
      borderRadius: "0 0 3rem 3rem",
      overflow: "hidden",
      margin: `${responsive.heroMarginTop} 1rem 0 1rem`,
      boxShadow: isDarkMode
        ? "0 10px 30px rgba(0,0,0,0.3)"
        : "0 10px 30px rgba(232,140,166,0.15)",
    },
    heroLeft: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: responsive.heroLeftPadding,
      backgroundColor: isDarkMode ? "#2d2d2d" : "#fff5f7",
      position: "relative",
      zIndex: 2,
      borderTopLeftRadius: "3rem",
      borderBottomLeftRadius: windowWidth <= 768 ? "0" : "3rem",
      borderTopRightRadius: windowWidth <= 768 ? "3rem" : "0",
      borderBottomRightRadius: windowWidth <= 768 ? "3rem" : "0",
      boxShadow: isDarkMode
        ? "inset 0 2px 10px rgba(0,0,0,0.2)"
        : "inset 0 2px 10px rgba(232,140,166,0.1)",
    },
    heroTitle: {
      fontSize: "clamp(2rem, 4vw, 3.2rem)",
      fontWeight: "800",
      lineHeight: "1.2",
      marginBottom: "1rem",
      color: isDarkMode ? "#e88ca6" : "#333333",
      position: "relative",
      "::after": {
        content: '""',
        position: "absolute",
        bottom: "-0.5rem",
        left: "0",
        width: "80px",
        height: "4px",
        background: "linear-gradient(90deg, #e88ca6, #ffb6c1)",
        borderRadius: "2px",
      },
    },
    heroSubtitle: {
      fontSize: "1rem",
      color: isDarkMode ? "#cccccc" : "#666666",
      lineHeight: "1.6",
      marginBottom: "1.5rem",
      maxWidth: "450px",
    },
    heroStats: {
      display: "flex",
      flexDirection: responsive.heroStatsFlexDirection,
      gap: responsive.heroStatsGap,
      marginBottom: "1.5rem",
    },
    statItem: {
      textAlign: "left",
      backgroundColor: isDarkMode ? "#404040" : "#ffffff",
      padding: "0.75rem 1.25rem",
      borderRadius: "1rem",
      boxShadow: isDarkMode
        ? "0 4px 8px rgba(0,0,0,0.2)"
        : "0 4px 8px rgba(232,140,166,0.1)",
      transition: "transform 0.3s ease",
      ":hover": {
        transform: "translateY(-3px)",
      },
    },
    statNumber: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#e88ca6",
      lineHeight: "1",
    },
    statLabel: {
      fontSize: "0.8rem",
      color: isDarkMode ? "#cccccc" : "#666666",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    heroButtons: {
      display: "flex",
      flexDirection: responsive.heroButtonsFlexDirection,
      gap: "1rem",
      flexWrap: "wrap",
    },
    primaryButton: {
      padding: "0.875rem 2rem",
      backgroundColor: "#e88ca6",
      color: "#ffffff",
      textDecoration: "none",
      borderRadius: "2rem",
      fontSize: "1rem",
      fontWeight: "600",
      transition: "all 0.3s ease",
      border: "2px solid transparent",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      width: responsive.primaryButtonWidth,
      cursor: "pointer",
      boxShadow: "0 4px 15px rgba(232,140,166,0.3)",
      ":hover": {
        backgroundColor: "transparent",
        borderColor: "#e88ca6",
        color: "#e88ca6",
        transform: "translateY(-3px)",
        boxShadow: "0 8px 25px rgba(232,140,166,0.4)",
      },
    },
    secondaryButton: {
      padding: "0.875rem 2rem",
      backgroundColor: "transparent",
      color: isDarkMode ? "#ffffff" : "#333333",
      textDecoration: "none",
      borderRadius: "2rem",
      fontSize: "1rem",
      fontWeight: "600",
      transition: "all 0.3s ease",
      border: `2px solid ${isDarkMode ? "#ffffff" : "#e88ca6"}`,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      width: responsive.secondaryButtonWidth,
      cursor: "pointer",
      ":hover": {
        backgroundColor: isDarkMode ? "#ffffff" : "#e88ca6",
        color: isDarkMode ? "#333333" : "#ffffff",
        transform: "translateY(-3px)",
        boxShadow: "0 8px 25px rgba(232,140,166,0.2)",
      },
    },
    // Right Side - Image Slider
    heroRight: {
      position: "relative",
      overflow: "hidden",
      backgroundColor: isDarkMode ? "#1a1a1a" : "#f0f0f0",
      height: responsive.heroRightHeight,
      borderTopRightRadius: "3rem",
      borderBottomRightRadius: windowWidth <= 768 ? "3rem" : "3rem",
      borderTopLeftRadius: windowWidth <= 768 ? "3rem" : "0",
      borderBottomLeftRadius: windowWidth <= 768 ? "0" : "3rem",
      boxShadow: isDarkMode
        ? "inset 0 2px 10px rgba(0,0,0,0.3)"
        : "inset 0 2px 10px rgba(232,140,166,0.1)",
    },
    sliderContainer: {
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden",
    },
    sliderTrack: {
      display: "flex",
      transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      height: "100%",
      transform: `translateX(-${currentSlide * 100}%)`,
    },
    sliderSlide: {
      flex: "0 0 100%",
      height: "100%",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDarkMode ? "#2d2d2d" : "#f8f8f8",
    },
    sliderImage: {
      maxWidth: "100%",
      maxHeight: "100%",
      width: "auto",
      height: "auto",
      objectFit: "contain",
      objectPosition: "center",
      display: "block",
      margin: "0 auto",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    },
    imageOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background:
        "linear-gradient(135deg, rgba(232,140,166,0.2) 0%, rgba(0,0,0,0.2) 100%)",
      pointerEvents: "none",
    },
    slideContent: {
      position: "absolute",
      bottom: "1.5rem",
      right: "1.5rem",
      color: "#ffffff",
      textAlign: "right",
      textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
      backgroundColor: "rgba(232,140,166,0.8)",
      padding: "0.5rem 1.5rem",
      borderRadius: "2rem",
      backdropFilter: "blur(5px)",
      zIndex: 2,
    },
    slideTitle: {
      fontSize: "1.2rem",
      fontWeight: "600",
      marginBottom: "0.2rem",
    },
    sliderControls: {
      position: "absolute",
      bottom: "1rem",
      left: "1rem",
      display: "flex",
      gap: "0.75rem",
      zIndex: 10,
    },
    controlButton: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      backgroundColor: "rgba(255,255,255,0.25)",
      border: "2px solid #ffffff",
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
      backdropFilter: "blur(5px)",
      fontSize: "0.9rem",
      ":hover": {
        backgroundColor: "#e88ca6",
        borderColor: "#e88ca6",
        transform: "scale(1.1)",
      },
    },
    dotsContainer: {
      position: "absolute",
      bottom: "1rem",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: "0.5rem",
      zIndex: 10,
      backgroundColor: "rgba(0,0,0,0.2)",
      padding: "0.4rem 1rem",
      borderRadius: "2rem",
      backdropFilter: "blur(5px)",
    },
    dot: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      backgroundColor: "rgba(255,255,255,0.5)",
      border: "2px solid transparent",
      cursor: "pointer",
      transition: "all 0.3s ease",
      padding: 0,
    },
    activeDot: {
      width: "24px",
      borderRadius: "12px",
      backgroundColor: "#e88ca6",
      borderColor: "#ffffff",
    },
    playPauseButton: {
      position: "absolute",
      top: "1rem",
      right: "1rem",
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      backgroundColor: "rgba(232,140,166,0.9)",
      border: "none",
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
      zIndex: 10,
      backdropFilter: "blur(5px)",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      ":hover": {
        backgroundColor: "#e88ca6",
        transform: "scale(1.1)",
      },
    },
    // Section Titles
    sectionTitle: {
      fontSize: "2.5rem",
      textAlign: "center",
      marginBottom: "3rem",
      color: isDarkMode ? "#e88ca6" : "#333333",
      position: "relative",
      paddingBottom: "1.5rem",
      fontWeight: "700",
      "::after": {
        content: '""',
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "120px",
        height: "4px",
        background:
          "linear-gradient(90deg, transparent, #e88ca6, #ffb6c1, #e88ca6, transparent)",
        borderRadius: "2px",
      },
      "::before": {
        content: '""',
        position: "absolute",
        bottom: "-10px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "60px",
        height: "4px",
        background: "#e88ca6",
        borderRadius: "2px",
        opacity: "0.5",
      },
    },
    // Values Section
    valuesSection: {
      padding: "4rem 2rem",
      maxWidth: "1200px",
      margin: "0 auto",
      scrollMarginTop: "80px", // Adds offset for fixed navbar
    },
    valuesHeader: {
      textAlign: "center",
      marginBottom: "3rem",
    },
    valuesTitle: {
      fontSize: "2.5rem",
      color: isDarkMode ? "#e88ca6" : "#333333",
      marginBottom: "1rem",
      fontWeight: "700",
    },
    valuesGrid: {
      display: "grid",
      gridTemplateColumns: responsive.valuesGridColumns,
      gap: responsive.valuesGridGap,
      marginTop: "2rem",
    },
    valueItem: {
      backgroundColor: isDarkMode ? "#2d2d2d" : "#ffffff",
      borderRadius: "1.5rem",
      padding: responsive.valuesPadding,
      boxShadow: isDarkMode
        ? "0 10px 30px rgba(0,0,0,0.2)"
        : "0 10px 30px rgba(232,140,166,0.1)",
      transition: "all 0.3s ease",
      border: `1px solid ${isDarkMode ? "#404040" : "#f0f0f0"}`,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      ":hover": {
        transform: "translateY(-5px)",
        boxShadow: isDarkMode
          ? "0 15px 40px rgba(0,0,0,0.3)"
          : "0 15px 40px rgba(232,140,166,0.15)",
        borderColor: "#e88ca6",
      },
    },
    valueIconContainer: {
      width: "60px",
      height: "60px",
      borderRadius: "1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "1.5rem",
      fontSize: "2rem",
      transition: "all 0.3s ease",
    },
    valueTitle: {
      fontSize: "1.3rem",
      fontWeight: "700",
      marginBottom: "0.75rem",
      color: isDarkMode ? "#ffffff" : "#333333",
      position: "relative",
    },
    valueTitleUnderline: {
      width: "40px",
      height: "3px",
      borderRadius: "2px",
      marginTop: "0.25rem",
      marginBottom: "0.75rem",
    },
    valueDescription: {
      fontSize: "0.95rem",
      color: isDarkMode ? "#cccccc" : "#666666",
      lineHeight: "1.6",
      marginBottom: "1rem",
    },
    valueLink: {
      color: "#e88ca6",
      textDecoration: "none",
      fontSize: "0.9rem",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      marginTop: "auto",
      transition: "all 0.3s ease",
      cursor: "pointer",
      background: "none",
      border: "none",
      padding: 0,
      ":hover": {
        gap: "0.75rem",
        color: isDarkMode ? "#ffb6c1" : "#d47a94",
      },
    },
    // Shop by Category Section
    categoriesSection: {
      padding: "4rem 2rem",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    categoriesGrid: {
      display: "grid",
      gridTemplateColumns: responsive.categoriesGridColumns,
      gap: "1.5rem",
      marginTop: "2rem",
    },
    categoryCard: {
      position: "relative",
      borderRadius: "1.5rem",
      overflow: "hidden",
      cursor: "pointer",
      aspectRatio: "1/1",
      boxShadow: isDarkMode
        ? "0 10px 20px rgba(0,0,0,0.2)"
        : "0 10px 20px rgba(232,140,166,0.1)",
      transition: "all 0.3s ease",
      ":hover": {
        transform: "scale(1.05)",
        boxShadow: isDarkMode
          ? "0 15px 30px rgba(0,0,0,0.3)"
          : "0 15px 30px rgba(232,140,166,0.2)",
      },
    },
    categoryImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.5s ease",
    },
    categoryOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background:
        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "1.5rem",
      color: "#ffffff",
    },
    categoryName: {
      fontSize: "1.3rem",
      fontWeight: "700",
      marginBottom: "0.25rem",
    },
    categoryCount: {
      fontSize: "0.9rem",
      opacity: "0.9",
      display: "flex",
      alignItems: "center",
      gap: "0.25rem",
    },
    // Products Section
    productsSection: {
      padding: "4rem 2rem",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    productsGrid: {
      display: "grid",
      gridTemplateColumns: responsive.productsGridColumns,
      gap: "2rem",
      marginBottom: "3rem",
    },
    viewAllContainer: {
      textAlign: "center",
    },
  };

  return (
    <div style={themeStyles.container}>
      {/* Hero Section */}
      <section style={themeStyles.heroSection}>
        <div style={themeStyles.heroLeft}>
          <h1 style={themeStyles.heroTitle}>
            Welcome To The World Of Color Cosmetics
          </h1>
          <p style={themeStyles.heroSubtitle}>
            Discover your perfect look with Neckline Cosmetics. Premium quality,
            cruelty-free beauty products that let your true colors shine.
          </p>

          <div style={themeStyles.heroStats}>
            <div style={themeStyles.statItem}>
              <div style={themeStyles.statNumber}>50+</div>
              <div style={themeStyles.statLabel}>Products</div>
            </div>
            <div style={themeStyles.statItem}>
              <div style={themeStyles.statNumber}>10k+</div>
              <div style={themeStyles.statLabel}>Happy Customers</div>
            </div>
            <div style={themeStyles.statItem}>
              <div style={themeStyles.statNumber}>100%</div>
              <div style={themeStyles.statLabel}>Cruelty Free</div>
            </div>
          </div>

          <div style={themeStyles.heroButtons}>
            <Link to="/shop" style={themeStyles.primaryButton}>
              Shop Now <FaArrowRight />
            </Link>
            <button
              onClick={scrollToValues}
              style={themeStyles.secondaryButton}
            >
              Learn More <FaArrowRight />
            </button>
          </div>
        </div>

        <div style={themeStyles.heroRight}>
          <button
            style={themeStyles.playPauseButton}
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isAutoPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <div style={themeStyles.sliderControls}>
            <button
              style={themeStyles.controlButton}
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <FaChevronLeft />
            </button>
            <button
              style={themeStyles.controlButton}
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <FaChevronRight />
            </button>
          </div>

          <div style={themeStyles.dotsContainer}>
            {sliderImages.map((_, index) => (
              <button
                key={index}
                style={{
                  ...themeStyles.dot,
                  ...(currentSlide === index ? themeStyles.activeDot : {}),
                }}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div
            style={themeStyles.sliderContainer}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div style={themeStyles.sliderTrack}>
              {sliderImages.map((image, index) => (
                <div key={index} style={themeStyles.sliderSlide}>
                  {!imageErrors[index] ? (
                    <img
                      src={image.url}
                      alt={image.alt}
                      style={{
                        ...themeStyles.sliderImage,
                        objectPosition: image.objectPosition || "center",
                      }}
                      loading={index === 0 ? "eager" : "lazy"}
                      onError={() => handleImageError(index)}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: isDarkMode ? "#404040" : "#f0f0f0",
                        color: isDarkMode ? "#ffffff" : "#666666",
                        fontSize: "1.2rem",
                        textAlign: "center",
                      }}
                    >
                      {image.title}
                    </div>
                  )}
                  <div style={themeStyles.imageOverlay} />
                  <div style={themeStyles.slideContent}>
                    <h3 style={themeStyles.slideTitle}>{image.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Why Makes Us Different */}
      <section ref={valuesSectionRef} style={themeStyles.valuesSection}>
        <div style={themeStyles.valuesHeader}>
          <h2 style={themeStyles.valuesTitle}>Why Makes Us Different</h2>
        </div>
        <div style={themeStyles.valuesGrid}>
          {values.map((value, index) => (
            <div key={index} style={themeStyles.valueItem}>
              <div
                style={{
                  ...themeStyles.valueIconContainer,
                  backgroundColor: isDarkMode
                    ? `${value.color}30`
                    : `${value.color}20`,
                  color: value.color,
                }}
              >
                <span>{value.icon}</span>
              </div>
              <h3 style={themeStyles.valueTitle}>{value.title}</h3>
              <div
                style={{
                  ...themeStyles.valueTitleUnderline,
                  backgroundColor: value.color,
                }}
              />
              <p style={themeStyles.valueDescription}>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by Category Section */}
      <section style={themeStyles.categoriesSection}>
        <h2 style={themeStyles.sectionTitle}>Shop By Category</h2>
        <div style={themeStyles.categoriesGrid}>
          {categories.map((category, index) => (
            <Link
              to={`/shop?category=${category.name.toLowerCase()}`}
              key={index}
              style={{ textDecoration: "none" }}
            >
              <div style={themeStyles.categoryCard}>
                <img
                  src={category.image}
                  alt={category.name}
                  style={themeStyles.categoryImage}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/400x400/f8f8f8/e88ca6?text=" +
                      category.name;
                  }}
                />
                <div style={themeStyles.categoryOverlay}>
                  <h3 style={themeStyles.categoryName}>{category.name}</h3>
                  <p style={themeStyles.categoryCount}>
                    <FaStar style={{ fontSize: "0.8rem" }} />{" "}
                    {category.productCount} Products
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Selling Products Section */}
      {/* Best Selling Products Section */}
      <section style={themeStyles.productsSection}>
        <h2 style={themeStyles.sectionTitle}>Best Selling Products</h2>
        <div style={themeStyles.productsGrid}>
          {bestSellingProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() =>
                addToCart(
                  product,
                  Array.isArray(product.shades) ? product.shades[0] : "",
                  1,
                )
              }
              showBadge={true}
              badgeText="Best Seller"
            />
          ))}
        </div>
        <div style={themeStyles.viewAllContainer}>
          <Link to="/shop?sort=best-selling" style={themeStyles.primaryButton}>
            View All Best Sellers <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
