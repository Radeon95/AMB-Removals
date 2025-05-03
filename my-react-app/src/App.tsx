// src/App.tsx
import { useEffect, useRef, useState } from "react";
import {
  Link,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import Home from "./views/Home";
import About from "./views/About";
import Contact from "./views/Contact";
import Quote from "./views/Quote";
import Gallery from "./views/Gallery";
import NotFound from "./views/404";
import BlogHome from "./views/BlogHome";
import BlogPost from "./views/BlogPost";

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
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

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

  // Removed unused handleNavClick function

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
            <a
              href="https://wa.me/447853451275"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-header-button"
            >
              <i className="fa-brands fa-whatsapp"></i> WhatsApp Us
            </a>
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
                  location.pathname === "/gallery" ? "is-active" : ""
                }`}
                to="/gallery"
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
              <Link
                className={`el-menu-item ${
                  location.pathname === "/blog" ? "is-active" : ""
                }`}
                to="/blog"
              >
                Blog
              </Link>
            </nav>
          </div>
        </header>

        {/* ✅ INSERT THIS BLOCK RIGHT HERE */}
        <div
          className={`mobile-menu-overlay ${isMobileMenuOpen ? "open" : ""}`}
        >
          <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)}>
              Gallery
            </Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
              About Us
            </Link>
            <Link to="/quote" onClick={() => setIsMobileMenuOpen(false)}>
              Quote
            </Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </Link>
            <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)}>
              Blog
            </Link>
          </div>
        </div>

        <main className="el-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/blog" element={<BlogHome />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
          <button onClick={scrollToTop} className="scroll-to-top">
            <i className="fas fa-arrow-up" />
          </button>
        </main>

        <footer className="el-footer app-footer">
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
                  <a>
                    <span onClick={() => navigate("/")}>Home</span>
                  </a>
                </li>
                <li>
                  <a>
                    <span onClick={() => navigate("/about")}>About Us</span>
                  </a>
                </li>
                <li>
                  <a>
                    <span onClick={() => navigate("/contact")}>Contact</span>
                  </a>
                </li>
                <li>
                  <a>
                    <span onClick={() => navigate("/gallery")}>Gallery</span>
                  </a>
                </li>
                <li>
                  <a>
                    <span onClick={() => navigate("/quote")}>Get a Quote</span>
                  </a>
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
