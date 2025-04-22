import React, { useEffect, useState, useRef } from "react";
import "../style/Gallery.css";

const images = import.meta.glob("/src/assets/galery/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});
const galleryImages = Object.values(images) as string[];

const Gallery: React.FC = () => {
  const [lightboxActive, setLightboxActive] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxActive(true);
  };

  const closeLightbox = () => {
    setLightboxActive(false);
  };

  const scrollLightbox = (direction: "left" | "right") => {
    const total = galleryImages.length;
    let newIndex = lightboxIndex;
    if (direction === "left") {
      newIndex = (newIndex - 1 + total) % total;
    } else {
      newIndex = (newIndex + 1) % total;
    }
    setLightboxIndex(newIndex);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLImageElement>) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      scrollLightbox("right");
    } else if (diff < -50) {
      scrollLightbox("left");
    }
    touchStartX.current = null;
  };

  const getAltText = (src: string) =>
    src.split("/").pop()?.replace(/[-_]/g, " ").split(".")[0] ??
    "Gallery image";

  return (
    <div className="gallery">
      <h2 className="text-blk headingText">Gallery</h2>
      <div className="image-grid">
        {galleryImages.map((img, index) => (
          <div
            key={index}
            className="image-wrapper"
            onClick={() => openLightbox(index)}
          >
            <img src={img} alt={getAltText(img)} loading="lazy" />
          </div>
        ))}
      </div>

      {lightboxActive && (
        <div className="lightbox" onClick={closeLightbox}>
          <img
            src={galleryImages[lightboxIndex]}
            className="lightbox-image"
            alt="Zoomed gallery"
            loading="lazy"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          />
          {!isMobile && (
            <div className="lightbox-controls">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  scrollLightbox("left");
                }}
              >
                ‹
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  scrollLightbox("right");
                }}
              >
                ›
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Gallery;
