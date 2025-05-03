// src/views/About.tsx
import { Helmet } from "react-helmet-async";
// import { useRef } from "react";
import "../style/About.css";

const partnerLogos = [
  "https://www.pinlocal.com/front/images/pinlocal_logo.png",
  "https://prsubmissionsite.com/wp-content/uploads/2018/10/Removals-Index-Logo.jpg",
  "https://www.comparemymove.com/assets/img/svg/logo.svg",
  "https://www.moveassured.com/img/MA-logo-header.png",
];

const partnerAltTexts = [
  "Pinlocal Logo",
  "Removals Index Logo",
  "Compare My Move Logo",
  "Move Assured Logo",
];
const About = () => {
  return (
    <div className="about-page">
      <a
        href="https://wa.me/447853451275"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-button whatsapp-float sticky no-text"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>

      <a
        href="https://t.me/YourTelegramUsername"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-button telegram-float sticky no-text"
      >
        <i className="fa-brands fa-telegram"></i>
      </a>
      <Helmet>
        <title>About Us - AMB Removals</title>
        <meta
          name="description"
          content="Learn more about AMB Removals, your trusted moving company."
        />
        <meta property="og:title" content="About Us - AMB Removals" />
        <meta
          property="og:description"
          content="Discover why AMB Removals is the right choice for your move."
        />
        <meta
          property="og:image"
          content="https://yourdomain.com/images/social-share.jpg"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us - AMB Removals" />
        <meta
          name="twitter:description"
          content="Discover why AMB Removals is the right choice for your move."
        />
        <meta
          name="twitter:image"
          content="https://yourdomain.com/images/social-share.jpg"
        />
        <link rel="canonical" href="https://yourdomain.com/about" />

        <script type="application/ld+json">
          {`
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About AMB Removals",
      "url": "https://yourdomain.com/about"
    }
    `}
        </script>
      </Helmet>

      <section className="banner">
        <div className="banner-content">
          <h1>About AMB Removals</h1>
          <p>Reliable. Professional. Trusted Moving Services Across the UK</p>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <h2>Why Choose AMB Removals?</h2>
          <p>
            AMB Removals is a family-run removal company in Leicester that
            serves clients across the UK. We pride ourselves on offering a
            personal, reliable, and fully insured service. Our experienced team
            ensures your move is stress-free, whether local or long-distance.
          </p>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose Us</h2>
        <div className="features">
          <div className="feature-card">
            <i className="fas fa-users fa-2x feature-icon"></i>
            <h3>Experienced Team</h3>
            <p>Our trained movers bring efficiency and care to every move.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-shield-alt fa-2x feature-icon"></i>
            <h3>Fully Insured</h3>
            <p>We are fully licensed and insured for your peace of mind.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-tags fa-2x feature-icon"></i>
            <h3>Affordable Rates</h3>
            <p>Transparent pricing with no hidden fees or surprises.</p>
          </div>
        </div>
      </section>

      <section className="values-section">
        <h2>Our Values</h2>
        <div className="values-container">
          <div className="value-card">
            <i className="far fa-star fa-2x"></i>
            <h3>Quality</h3>
            <p>
              We strive for excellence and guarantee high service standards.
            </p>
          </div>
          <div className="value-card">
            <i className="fas fa-user fa-2x"></i>
            <h3>Customer Focus</h3>
            <p>We always prioritize our customers and exceed expectations.</p>
          </div>
          <div className="value-card">
            <i className="fas fa-lightbulb fa-2x"></i>
            <h3>Development</h3>
            <p>We continuously improve through innovation and technology.</p>
          </div>
        </div>
      </section>

      <section className="achievements-section">
        <h2>Our Achievements</h2>
        <div className="achievements-container">
          <div className="achievement">
            <i className="fas fa-truck  fa-fade fa-2x" />
            <strong>100+</strong>
            <p>Successful Moves</p>
          </div>
          <div className="achievement">
            <i className="fa-solid fa-fade fa-face-grin-stars fa-2x" />
            <strong>98%</strong>
            <p>Satisfied Clients</p>
          </div>
          <div className="achievement">
            <i className="fas fa-trophy fa-fade fa-2x" />
            <strong>100+</strong>
            <p>Successful Moves</p>
          </div>
        </div>
      </section>

      <section className="partners-section">
        <h2>Our Trusted Partners</h2>
        <div className="partners-logos">
          {partnerLogos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={partnerAltTexts[index]}
              className="partner-logo"
            />
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Become Our Client?</h2>
        <p>Contact us today and find out how we can help with your move</p>
        <a
          href="/contact"
          className="cta-button"
          aria-label="Contact AMB Removals"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
};

export default About;
