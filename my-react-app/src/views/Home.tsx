import { useEffect, useRef, useState } from "react";

import { Helmet } from "react-helmet-async";
import "../style/Home.css";
import React, { lazy, Suspense } from "react";
import { useMultiIntersectionObserver } from "../hooks/useMultiIntersectionObserver";
import heroImage from "../assets/AMBRemovals.jpg";

const Lightbox = lazy(() => import("./Lightbox"));

const images = import.meta.glob("/src/assets/galery/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});
const galleryImages = Object.values(images) as string[];

const Home = () => {
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(
    null
  );

  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const mainGalleryRef = useRef<HTMLDivElement | null>(null);
  const mainImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentHeights = useRef<number[]>([]);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Intersection observer for main images and thumbnails
  const { refs: mainImageRefs, visibleIndexes: mainVisible } =
    useMultiIntersectionObserver<HTMLImageElement>(galleryImages.length);
  const { refs: thumbRefs, visibleIndexes: thumbVisible } =
    useMultiIntersectionObserver<HTMLImageElement>(galleryImages.length);

  useEffect(() => {
    contentRefs.current.forEach((el, index) => {
      if (el) {
        contentHeights.current[index] = el.scrollHeight;
      }
    });
  }, [expandedCardIndex]);

  const toggleCard = (index: number) => {
    if (expandedCardIndex === index) {
      const el = contentRefs.current[index];
      if (el) {
        el.style.maxHeight = `${el.scrollHeight}px`;
        requestAnimationFrame(() => {
          el.style.maxHeight = "96px";
        });
      }
      setTimeout(() => setExpandedCardIndex(null), 100);
    } else {
      setExpandedCardIndex(index);
      const el = contentRefs.current[index];
      if (el) {
        requestAnimationFrame(() => {
          el.style.maxHeight = `${el.scrollHeight + 20}px`;
        });
      }
    }
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const scrollToImage = (index: number) => {
    const targetImage = mainImagesRef.current[index];
    if (targetImage) {
      targetImage.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
      setCurrentGalleryIndex(index);
    }
  };

  const scrollGallery = (direction: "left" | "right") => {
    const total = galleryImages.length;
    let newIndex = currentGalleryIndex;

    if (direction === "left") {
      newIndex = (currentGalleryIndex - 1 + total) % total;
    } else {
      newIndex = (currentGalleryIndex + 1) % total;
    }

    setCurrentGalleryIndex(newIndex);
    scrollToImage(newIndex);
  };

  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const faqItems = [
    {
      question: "How quickly can you organize a move?",
      answer:
        "Depending on the complexity and volume of work, we can organize a move within 1–3 days from the order confirmation.",
    },
    {
      question: "Do you work on weekends and holidays?",
      answer:
        "Yes, we work without days off, including holidays. However, a surcharge may apply on holidays.",
    },
    {
      question: "Do you provide guarantees for your services?",
      answer:
        "Yes, we provide guarantees for all our services. In case of damage to items during the move, we compensate for the damage according to the contract.",
    },
  ];

  const sustainabilityItems = [
    { image: "/Why us/furniture_removals.png" },
    { image: "/Why us/box-pack.png" },
    { image: "/Why us/bubblewrap.png" },
    { image: "/Why us/paper_packing.png" },
    { image: "/Why us/Box-packing.png" },
    { image: "/Why us/wardrobe_boxes.png" },
  ];

  const services = [
    {
      title: "House Moving Services",
      icon: "🚚",
      content: (
        <>
          Moving home can be a stressful experience — but it doesn’t have to be.
          Our expert house moving team is here to make your move smooth,
          efficient, and hassle-free from start to finish.
          <br />
          <ul>
            <li>Fully trained and experienced movers</li>
            <li>High-quality packing materials and secure packaging</li>
            <li>Disassembly and reassembly of furniture</li>
            <li>Scheduling to suit your needs</li>
            <li>Pricing with no hidden fees</li>
          </ul>
        </>
      ),
    },
    {
      title: "Office moving",
      icon: "🏢",
      content: (
        <>
          Relocating your office? We specialize in efficient, organized, and
          secure office moves to minimize downtime.
          <br />
          <ul>
            <li>Handling of IT equipment and sensitive documents</li>
            <li>Reassembly of desks and furniture</li>
            <li>Weekend moves to reduce disruption</li>
            <li>Project management from start to finish</li>
          </ul>
        </>
      ),
    },
    {
      title: "Packing",
      icon: "📦",
      content: (
        <>
          Our packing service saves you time and ensures safety.
          <br />
          <ul>
            <li>Full or partial packing options</li>
            <li>Boxes, bubble wrap, and tape</li>
            <li>Expert handling of fragile items</li>
            <li>Unpacking on request</li>
          </ul>
        </>
      ),
    },
  ];

  //Button animation!!
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>MBA Removals - Fast & Secure Moving Services</title>

        <meta
          name="description"
          content="Professional moving company offering home and office relocation with care."
        />
        <meta
          property="og:title"
          content="MBA Removals - Fast & Secure Moving Services"
        />
        <meta
          property="og:description"
          content="We pack, move, and unpack — your stress-free move starts here!"
        />
        <meta
          property="og:image"
          content="https://yourdomain.com/images/social-share.jpg"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="MBA Removals - Fast & Secure Moving Services"
        />
        <meta
          name="twitter:description"
          content="We pack, move, and unpack — your stress-free move starts here!"
        />
        <meta
          name="twitter:image"
          content="https://yourdomain.com/images/social-share.jpg"
        />
        <link rel="canonical" href="https://yourdomain.com/" />

        <script type="application/ld+json">
          {`
    {
      "@context": "https://schema.org",
      "@type": "MovingCompany",
      "name": "MBA Removals Limited",
      "url": "https://yourdomain.com",
      "logo": "https://yourdomain.com/images/logo.png",
      "description": "Professional moving company offering home and office relocation with care.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "London",
        "addressCountry": "UK"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+44 1234 567890",
        "contactType": "customer service"
      }
    }
    `}
        </script>
        <style>
          {`
            .hero-section {
              min-height: 50vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #f5f5f5;
            }
            .gallery-scroll {
              display: flex;
              overflow-x: auto;
              scroll-behavior: smooth;
            }
            .gallery-image {
              flex: 0 0 auto;
              min-width: 200px;
              min-height: 200px;
              background-color: #eee;
            }
          `}
        </style>
      </Helmet>

      <div className="home-container">
        <div
          className="hero-section"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="hero-content">
            <h1>Welcome to MBA Removals Limited!</h1>
            <p>From A to B, Stress Free!</p>
          </div>
          {/* Floating WhatsApp Button */}
          <a
            href="https://wa.me/447853451275"
            target="_blank"
            rel="noopener noreferrer"
            className={`floating-button whatsapp-float ${
              isScrolled ? "sticky" : ""
            }`}
          >
            <i className="fa-brands fa-whatsapp"></i>
            <span className="button-text">
              {"WhatsApp".split("").map((letter, idx) => (
                <span
                  key={idx}
                  className={`letter ${isScrolled ? "fade-out" : ""}`}
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </a>

          {/* Floating Telegram Button */}
          <a
            href="https://t.me/YourTelegramUsername"
            target="_blank"
            rel="noopener noreferrer"
            className={`floating-button telegram-float ${
              isScrolled ? "sticky" : ""
            }`}
          >
            <i className="fa-brands fa-telegram"></i>
            <span className="button-text">
              {"Telegram".split("").map((letter, idx) => (
                <span
                  key={idx}
                  className={`letter ${isScrolled ? "fade-out" : ""}`}
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </a>
        </div>

        <section className="section services-section">
          <h2 className="section-title">Our services</h2>
          <div className="service-cards">
            {services.map((service, index) => {
              const isExpanded = expandedCardIndex === index;
              return (
                <div
                  key={index}
                  className={`service-card ${isExpanded ? "expanded" : ""}`}
                  onClick={() => toggleCard(index)}
                >
                  <div className="el-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <div
                    className={`clamped-text-wrapper ${
                      isExpanded ? "expanded" : ""
                    }`}
                  >
                    <div
                      className={`clamped-text ${isExpanded ? "no-fade" : ""}`}
                      ref={(el) => {
                        contentRefs.current[index] = el;
                      }}
                    >
                      {service.content}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="section why-us-section">
          <h2 className="section-title">What makes us sustainable?</h2>
          <div className="sustainability-cards">
            {sustainabilityItems.map((item, index) => (
              <div className="feature-card" key={index}>
                <img
                  src={item.image}
                  alt={`Sustainability item ${index + 1}`}
                  className="sustain-icon"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="section gallery-section">
          <h2 className="section-title">Gallery</h2>
          <div className="gallery-wrapper">
            <button
              className="nav-arrow left"
              aria-label="Previous image"
              onClick={() => scrollGallery("left")}
            >
              &#10094;
            </button>
            <div className="gallery-scroll" ref={mainGalleryRef}>
              {galleryImages.map((img, index) => (
                <img
                  key={`main-${index}`}
                  src={mainVisible.includes(index) ? img : undefined}
                  alt={`Gallery image ${index + 1}`}
                  loading="lazy"
                  ref={(el) => {
                    mainImageRefs.current[index] = el;
                    mainImagesRef.current[index] = el;
                  }}
                  onClick={() => openLightbox(index)}
                  className="gallery-image"
                />
              ))}
            </div>
            <button
              className="nav-arrow right"
              aria-label="Next image"
              onClick={() => scrollGallery("right")}
            >
              &#10095;
            </button>
          </div>

          <div className="thumbnail-scroll">
            {galleryImages.map((img, index) => (
              <img
                key={`thumb-${index}`}
                src={thumbVisible.includes(index) ? img : undefined}
                alt={`Thumbnail ${index + 1}`}
                className={`thumbnail ${
                  index === currentGalleryIndex ? "active" : ""
                }`}
                onClick={() => scrollToImage(index)}
                ref={(el) => {
                  thumbRefs.current[index] = el;
                }}
              />
            ))}
          </div>

          {lightboxIndex !== null && (
            <Suspense fallback={<div>Loading...</div>}>
              <Lightbox
                images={galleryImages}
                startIndex={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
              />
            </Suspense>
          )}
        </section>

        <section className="section faq-section">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-container">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className={`faq-item ${
                  expandedFAQ === index ? "expanded" : ""
                }`}
              >
                <div
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  role="button"
                  aria-expanded={expandedFAQ === index}
                >
                  {item.question}
                  <span className="arrow">
                    {expandedFAQ === index ? "▲" : "▼"}
                  </span>
                </div>
                <div
                  className="faq-answer"
                  style={{
                    maxHeight: expandedFAQ === index ? "200px" : "0px",
                    opacity: expandedFAQ === index ? 1 : 0,
                  }}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-section">
          <h2>Ready for moving?</h2>
          <button
            className="el-button"
            onClick={() => (window.location.href = "/contact")}
          >
            Contact Us
          </button>
        </section>
      </div>
    </>
  );
};

export default Home;
