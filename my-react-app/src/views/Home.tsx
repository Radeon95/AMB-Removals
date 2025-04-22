import  { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import "../style/Home.css";
// import "./Home.css"; // Move your styles here or use module CSS

const images = import.meta.glob("/src/assets/galery/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});
const galleryImages = Object.values(images) as string[];

const Home = () => {
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(
    null
  );
  const [lightboxActive, setLightboxActive] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const mainGalleryRef = useRef<HTMLDivElement | null>(null);
  const mainImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]); // ✅ service card refs
  const contentHeights = useRef<number[]>([]);
  useEffect(() => {
    contentRefs.current.forEach((el, index) => {
      if (el) {
        contentHeights.current[index] = el.scrollHeight;
      }
    });
  }, [expandedCardIndex]);

  const toggleCard = (index: number) => {
    if (expandedCardIndex === index) {
      // collapsing
      const el = contentRefs.current[index];
      if (el) {
        el.style.maxHeight = `${el.scrollHeight}px`; // set to current height
        requestAnimationFrame(() => {
          el.style.maxHeight = "96px"; // then collapse to base height
        });
      }
      setTimeout(() => setExpandedCardIndex(null), 100); // match CSS transition time
    } else {
      // expanding
      setExpandedCardIndex(index);
      const el = contentRefs.current[index];
      if (el) {
        requestAnimationFrame(() => {
          el.style.maxHeight = `${el.scrollHeight + 20}px`; // expand
        });
      }
    }
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxActive(true);
  };

  const scrollToImage = (index: number) => {
    const container = mainGalleryRef.current;
    const targetImage = mainImagesRef.current[index];
    if (container && targetImage) {
      const scrollOffset = targetImage.offsetLeft - container.offsetLeft;
      container.scrollTo({ left: scrollOffset, behavior: "smooth" });
    }
  };

  const scrollGallery = (direction: "left" | "right") => {
    const total = galleryImages.length;
    let newIndex = lightboxIndex;
    if (direction === "left") {
      newIndex = (newIndex - 1 + total) % total;
    } else {
      newIndex = (newIndex + 1) % total;
    }
    scrollToImage(newIndex);
    setLightboxIndex(newIndex);
  };

  // ✅ Optional autoplay
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       scrollGallery("right");
  //     }, 5000);
  //     return () => clearInterval(interval);
  //   }, []);
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
    {
      image: "/Why us/furniture_removals.png",
    },
    { image: "/Why us/box-pack.png" },
    { image: "/Why us/bubblewrap.png" },
    {
      image: "/Why us/paper_packing.png",
    },
    { image: "/Why us/Box-packing.png" },
    {
      image: "/Why us/wardrobe_boxes.png",
    },
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
          We offer:
          <ul>
            <li>Fully trained and experienced movers</li>
            <li>High-quality packing materials and secure packaging</li>
            <li>Disassembly and reassembly of furniture</li>
            <li>scheduling to suit your needs</li>
            <li>pricing with no hidden fees</li>
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
          We offer:
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
          We offer:
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

  return (
    <>
      <Helmet>
        <title>AMB Removals - Fast & Secure Moving Services</title>
        <meta
          name="description"
          content="Professional moving company offering home and office relocation with care."
        />
        <meta
          property="og:title"
          content="Home - Fast & Secure Moving Services"
        />
        <meta
          property="og:description"
          content="We pack, move, and unpack — your stress-free move starts here!"
        />
        <meta
          property="og:image"
          content="https://yourdomain.com/images/van.jpg"
        />
      </Helmet>

      <div className="home-container">
        {/* Hero */}
        <div className="hero-section">
          <div className="hero-content">
            <h1>Welcome to AMB Removals Limited!</h1>
            <p>From A to B, Stress Free!</p>
          </div>
        </div>

        {/* Services */}
        <section className="section services-section">
          <h2 className="section-title">Our services</h2>
          <div className="service-cards">
            {services.map((service, index) => {
              const isExpanded = expandedCardIndex === index;
              //   const contentHeight =
              //     contentRefs.current[index]?.scrollHeight || 96;

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

        {/* Sustainability */}
        <section className="section why-us-section">
          <h2 className="section-title">What makes us sustainable?</h2>
          <div className="sustainability-cards">
            {sustainabilityItems.map((item, index) => (
              <div className="feature-card" key={index}>
                <img
                  src={item.image}
                  //   alt={item.text}    SORT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                  className="sustain-icon"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="section gallery-section">
          <h2 className="section-title">Gallery</h2>
          <div className="gallery-wrapper">
            <button
              className="nav-arrow left"
              onClick={() => scrollGallery("left")}
            >
              &#10094;
            </button>
            <div className="gallery-scroll" ref={mainGalleryRef}>
              {galleryImages.map((img, index) => (
                <img
                  key={`main-${index}`}
                  src={img}
                  alt={`Gallery image ${index + 1}`}
                  loading="lazy"
                  ref={(el) => {
                    mainImagesRef.current[index] = el;
                  }}
                  onClick={() => openLightbox(index)}
                  className="gallery-image"
                />
              ))}
            </div>
            <button
              className="nav-arrow right"
              onClick={() => scrollGallery("right")}
            >
              &#10095;
            </button>
          </div>

          <div className="thumbnail-scroll">
            {galleryImages.map((img, index) => (
              <img
                key={`thumb-${index}`}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`thumbnail ${
                  index === lightboxIndex ? "active" : ""
                }`}
                onClick={() => scrollToImage(index)}
              />
            ))}
          </div>

          {lightboxActive && (
            <div className="lightbox" onClick={() => setLightboxActive(false)}>
              <img
                src={galleryImages[lightboxIndex]}
                alt="Zoomed gallery image"
                loading="lazy"
              />
            </div>
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

        {/* CTA */}
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
