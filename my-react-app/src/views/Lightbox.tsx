import React, { useRef, useState, useEffect } from "react";
import styles from "../style/Gallery.module.css"; // Correct path

interface LightboxProps {
  images: string[];
  startIndex: number;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, startIndex, onClose }) => {
  const [index, setIndex] = useState(startIndex);
  const touchStartX = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") scroll("right");
      if (e.key === "ArrowLeft") scroll("left");
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, onClose]);

  const scroll = (direction: "left" | "right") => {
    const total = images.length;
    let newIndex = index;
    if (direction === "left") {
      newIndex = (newIndex - 1 + total) % total;
    } else {
      newIndex = (newIndex + 1) % total;
    }
    setIndex(newIndex);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLImageElement>) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) scroll("right");
    else if (diff < -50) scroll("left");
    touchStartX.current = null;
  };

  return (
    <div
      className={styles.lightbox} // ✅ Module CSS
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${images.length}`}
      tabIndex={0}
    >
      <img
        src={images[index]}
        alt={`Gallery image ${index + 1}`}
        className={styles.lightboxImage} // ✅ Module CSS
        loading="lazy"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />
      {!isMobile && (
        <div className={styles.lightboxControls}>
          {" "}
          {/* ✅ Module CSS */}
          <button
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              scroll("left");
            }}
          >
            ‹
          </button>
          <button
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              scroll("right");
            }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export default Lightbox;
