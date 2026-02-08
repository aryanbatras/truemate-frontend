import React, { useState } from "react";
import styles from "../styles/FocusCards.module.css";

interface Card {
  title: string;
  src: string;
}

interface CardComponentProps {
  card: Card;
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
}

const CardComponent = React.memo(({ card, index, hovered, setHovered }: CardComponentProps) => {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={`${styles.card} ${hovered !== null && hovered !== index ? styles.cardBlurred : ''}`}
    >
      {imageError ? (
        <div className={styles.imageFallback}>
          <div className={styles.fallbackContent}>
            <span className={styles.fallbackIcon}>👤</span>
            <span className={styles.fallbackText}>Photo</span>
          </div>
        </div>
      ) : (
        <img
          src={card.src}
          alt={card.title}
          className={styles.cardImage}
          onError={() => setImageError(true)}
          loading="lazy"
        />
      )}
      <div className={`${styles.cardOverlay} ${hovered === index ? styles.overlayVisible : ''}`}>
        <div className={styles.cardTitle}>
          {card.title}
        </div>
      </div>
    </div>
  );
});

CardComponent.displayName = "CardComponent";

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={styles.focusCardsContainer}>
      {cards.map((card, index) => (
        <CardComponent
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
