// src/App.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import Home from "./views/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Quote from "./pages/Quote";
// import Gallery from "./components/Gallery";

import "./App.css";

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOutsideClick = (event: MouseEvent) => {
    const menu = document.querySelector(".mobile-menu");
    if (
      isMobileMenuOpen &&
      menu &&
      !menu.contains(event.target as Node) &&
      !menuToggleRef.current?.contains(event.target as Node)
    ) {
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Moving Company</title>
        <meta name="AMB Removals" content="AMB Removals" />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>

      <div className="app-container">
        <header className={`header-content ${isScrolled ? "scrolled" : ""}`}>
          <div className="header-inner">
            <div className="logo">
              <Link to="/">
                <img
                  alt="AMB Removals Limited"
                  className="logo"
                  src="/src/assets/amb.png"
                />
              </Link>
            </div>
            <button
              onClick={toggleMenu}
              className="mobile-menu-toggle"
              ref={menuToggleRef}
            >
              <i
                className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}`}
              />
            </button>
            <nav className="desktop-menu">
              <Link
                className={`el-menu-item ${
                  location.pathname === "/" ? "is-active" : ""
                }`}
                to="/"
              >
                Home
              </Link>
              <Link
                className={`el-menu-item ${
                  location.pathname === "/galery" ? "is-active" : ""
                }`}
                to="/galery"
              >
                Gallery
              </Link>
              <Link
                className={`el-menu-item ${
                  location.pathname === "/about" ? "is-active" : ""
                }`}
                to="/about"
              >
                About Us
              </Link>
              <Link
                className={`el-menu-item ${
                  location.pathname === "/contact" ? "is-active" : ""
                }`}
                to="/contact"
              >
                Contact
              </Link>
              <Link
                className={`el-menu-item ${
                  location.pathname === "/quote" ? "is-active" : ""
                }`}
                to="/quote"
              >
                Request Quote
              </Link>
            </nav>
          </div>
        </header>

        {isMobileMenuOpen && (
          <div className="mobile-menu-overlay">
            <div className="mobile-menu open">
              <Link to="/" onClick={() => handleNavClick("/")}>
                Home
              </Link>
              <Link to="/galery" onClick={() => handleNavClick("/galery")}>
                Gallery
              </Link>
              <Link to="/about" onClick={() => handleNavClick("/about")}>
                About Us
              </Link>
              <Link to="/contact" onClick={() => handleNavClick("/contact")}>
                Contact
              </Link>
              <Link to="/quote" onClick={() => handleNavClick("/quote")}>
                Request Quote
              </Link>
            </div>
          </div>
        )}

        <main className="el-main">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/galery" element={<Gallery />} /> */}
          </Routes>
          <button onClick={scrollToTop} className="scroll-to-top">
            <i className="fas fa-arrow-up" />
          </button>
        </main>

        <footer className="el-footer">
          <div className="footer-content">
            <div className="footer-info">
              <h3>AMB Removals Limited</h3>
              <p>Professional Moving Service</p>
              <p>2025 AMB Removals Limited. All rights reserved.</p>
              <div className="social-links">
                <a
                  href="https://www.facebook.com/ambremovalslimited"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-facebook-f" />
                </a>
                <a
                  href="https://www.instagram.com/ambremovals"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-instagram" />
                </a>
                <a
                  href="https://t.me/ambremovals"
                  title="Telegram"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-telegram-plane" />
                </a>
              </div>
            </div>

            <div className="footer-contact">
              <h4>Contact</h4>
              <p>
                <i className="fas fa-map-marker-alt" /> Leicester, United
                Kingdom
              </p>
              <p>
                <i className="fas fa-phone" /> 0 (116) 456-0653
              </p>
              <p>
                <i className="fas fa-envelope" /> info@ambremovals.com
              </p>
            </div>

            <div className="footer-nav">
              <h4>Navigation</h4>
              <ul>
                <li>
                  <span onClick={() => navigate("/")}>Home</span>
                </li>
                <li>
                  <span onClick={() => navigate("/about")}>About Us</span>
                </li>
                <li>
                  <span onClick={() => navigate("/contact")}>Contact</span>
                </li>
                <li>
                  <span onClick={() => navigate("/galery")}>Gallery</span>
                </li>
                <li>
                  <span onClick={() => navigate("/quote")}>Get a Quote</span>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </HelmetProvider>
  );
};

export default App;
