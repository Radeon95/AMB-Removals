import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import styles from "../style/Contact.module.css"; // CSS module import
import FaqSection from "./FaqSection";

// Extend the Window interface to include reCAPTCHA callbacks
declare global {
  interface Window {
    onRecaptchaVerify: (token: string) => void;
    onRecaptchaExpired: () => void;
  }
}

const initialFormState = {
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
  agreement: false,
};

const serviceOptions = [
  { value: "apartment", label: "Residential Moving" },
  { value: "office", label: "Office Moving" },
  { value: "packing", label: "Packing Services" },
  { value: "other", label: "Other" },
];

const Contact: React.FC = () => {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // reCAPTCHA setup
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    window.onRecaptchaVerify = (token: string) => setRecaptchaToken(token);
    window.onRecaptchaExpired = () => setRecaptchaToken("");
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name || form.name.length < 2)
      newErrors.name = "Name must be at least 2 characters";
    const phoneRegex = /^(\+44|0)[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/;
    if (!form.phone || !phoneRegex.test(form.phone))
      newErrors.phone = "Please enter a valid phone number";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRegex.test(form.email))
      newErrors.email = "Please enter a valid email";
    if (!form.service) newErrors.service = "Please select a service";
    if (!form.message || form.message.length < 10)
      newErrors.message = "Message must be at least 10 characters";
    if (!form.agreement) newErrors.agreement = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      alert("Please correct the form errors.");
      return;
    }
    if (!recaptchaToken) {
      alert("Please verify that you are not a robot.");
      return;
    }

    const payload = { ...form, recaptchaToken };

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Error submitting the form");

      alert("Your request has been submitted successfully!");
      setForm(initialFormState);
      setErrors({});
      formRef.current?.reset();
    } catch (err) {
      alert("An error occurred. Please try again.");
      console.error(err);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact MBA Removals</title>
        <meta
          name="description"
          content="Get in touch with MBA Removals for any inquiries about your move."
        />
        <meta property="og:title" content="Contact MBA Removals" />
        <meta
          property="og:description"
          content="We're here to help with all your moving needs."
        />
        <meta
          property="og:image"
          content="https://yourdomain.com/images/social-share.jpg"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/contact" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact MBA Removals" />
        <meta
          name="twitter:description"
          content="We're here to help with all your moving needs."
        />
        <meta
          name="twitter:image"
          content="https://yourdomain.com/images/social-share.jpg"
        />
        <link rel="canonical" href="https://yourdomain.com/contact" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "url": "https://yourdomain.com/contact",
              "contactType": "Customer Support"
            }
          `}
        </script>
      </Helmet>

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

      <div className={styles["contact-container"]}>
        <div className={styles["contact-banner"]}>
          <div className={styles["banner-content"]}>
            <h1>Contact Us</h1>
            <p>
              We are ready to answer all your questions and help with organizing
              your move
            </p>
          </div>
        </div>

        <div className={`${styles.section} ${styles["contact-section"]}`}>
          <div className={styles["contact-info"]}>
            <h2>Contact Information</h2>
            <div className={styles["info-item"]}>
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h3>Address</h3>
                <p>42 Nidderdale, Glasgow G1 4FN</p>
              </div>
            </div>

            <div className={styles["info-item"]}>
              <i className="fas fa-phone"></i>
              <div>
                <h3>Phone</h3>
                <p>0 (116) 456-8363</p>
                <p>+44 (785) 345-7520</p>
              </div>
            </div>

            <div className={styles["info-item"]}>
              <i className="fas fa-envelope"></i>
              <div>
                <h3>Email</h3>
                <a href="mailto:info@bmaremovals.com">info@bmaremovals.com</a>
                <br />
                <a href="mailto:support@ambremovals.com">
                  support@bmaremovals.com
                </a>
              </div>
            </div>

            <div className={styles["info-item"]}>
              <i className="fas fa-clock"></i>
              <div>
                <h3>Working Hours</h3>
                <p>Mon-Fri: 8:00 AM - 6:00 PM</p>
                <p>Sat-Sun: 8:00 AM - 4:00 PM</p>
              </div>
            </div>

            <div className={styles["social-links"]}>
              <h3>Follow Us</h3>
              <div className={styles["social-icons"]}>
                <a
                  href="https://www.facebook.com/yourfacebook"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-facebook-f" />
                </a>
                <a
                  href="https://www.instagram.com/yourinstagram/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-instagram" />
                </a>
                <a
                  href="https://t.me/yourtelegram"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-telegram-plane" />
                </a>
                <a
                  href="https://wa.me/message/yourwhatsapp"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-whatsapp" />
                </a>
              </div>
            </div>
          </div>

          <div className={styles["contact-form"]}>
            <h2>Submit a Request</h2>
            <p>Fill out the form below, and we will contact you shortly</p>
            <form onSubmit={handleSubmit} ref={formRef} noValidate>
              <div className={styles["form-group"]}>
                <label>Your Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <span className={styles.error}>{errors.name}</span>
                )}
              </div>
              <div className={styles["form-group"]}>
                <label>Phone</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+44 (___) ___-____"
                />
                {errors.phone && (
                  <span className={styles.error}>{errors.phone}</span>
                )}
              </div>
              <div className={styles["form-group"]}>
                <label>Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                />
                {errors.email && (
                  <span className={styles.error}>{errors.email}</span>
                )}
              </div>
              <div className={styles["form-group"]}>
                <label>Select Service</label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                >
                  <option value="">Select a service</option>
                  {serviceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <span className={styles.error}>{errors.service}</span>
                )}
              </div>
              <div className={styles["form-group"]}>
                <label>Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                />
                {errors.message && (
                  <span className={styles.error}>{errors.message}</span>
                )}
              </div>
              <div className={`${styles["form-group"]} ${styles.checkbox}`}>
                <label>
                  <input
                    type="checkbox"
                    name="agreement"
                    checked={form.agreement}
                    onChange={handleChange}
                  />
                  I agree to the processing of personal data
                </label>
                {errors.agreement && (
                  <span className={styles.error}>{errors.agreement}</span>
                )}
              </div>
              <div className={styles["form-group"]}>
                <div
                  className="g-recaptcha"
                  data-sitekey="6Ley_t8qAAAAAMEC_NXvJ_fTDtZp1yxtD-spbLVa"
                  data-callback="onRecaptchaVerify"
                  data-expired-callback="onRecaptchaExpired"
                ></div>
                <div className={styles["recaptcha-note"]}>I'm not a robot</div>
              </div>
              <div className={styles["form-actions"]}>
                <button type="submit">Submit Request</button>
                <button type="button" onClick={() => setForm(initialFormState)}>
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className={styles["map-section"]}>
          <h2 className={styles["section-title"]}>Find Us on the Map</h2>
          <div className={styles["map-container"]}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d268442.914637112!2d-1.614417196211072!3d52.53376236482253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4d4ae70306a7fed%3A0xbfcfb2d2858c6b73!2sBMA%20Removals%20Limited!5e0!3m2!1sen!2s!4v1740991540006!5m2!1sen!2s"
              width="100%"
              height="600"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <FaqSection />
      </div>
    </>
  );
};

export default Contact;
