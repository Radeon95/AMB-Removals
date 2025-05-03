import styles from "../style/Gallery.module.css";
import React, { lazy, Suspense, useState } from "react";

const Lightbox = lazy(() => import("./Lightbox"));

const images = import.meta.glob("/src/assets/galery/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});
const galleryImages = Object.values(images) as string[];

const Gallery: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const getAltText = (src: string) =>
    src.split("/").pop()?.replace(/[-_]/g, " ").split(".")[0] ??
    "Gallery image";

  return (
    <div className={styles.gallery}>
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

      <h2 className={styles.headingText}>Gallery</h2>
      <div className={styles["image-grid"]}>
        {galleryImages.map((img, index) => (
          <div
            key={index}
            className={styles["image-wrapper"]}
            onClick={() => setLightboxIndex(index)}
          >
            <img src={img} alt={getAltText(img)} loading="lazy" />
          </div>
        ))}
        {lightboxIndex !== null && (
          <Suspense fallback={<div>Loading...</div>}>
            <Lightbox
              images={galleryImages}
              startIndex={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default Gallery;
