import React from 'react';
import styles from '@/styles/components/landing/AppleCard.module.css';

interface CardData {
  category: string;
  title: string;
  src: string;
  content: React.ReactNode;
}

interface AppleCardProps {
  card: CardData;
  index: number;
  onCardClick?: (card: CardData, index: number) => void;
  onClose?: () => void;
  isExpanded?: boolean;
}

const AppleCard: React.FC<AppleCardProps> = ({ 
  card, 
  index, 
  onCardClick, 
  onClose, 
  isExpanded = false 
}) => {
  const handleClick = () => {
    if (onCardClick && !isExpanded) {
      onCardClick(card, index);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClose) {
      onClose();
    }
  };

  if (isExpanded) {
    return (
      <>
        <div className={styles.cardOverlay} onClick={onClose} />
        <div className={`${styles.card} ${styles.cardExpanded}`}>
          <button className={styles.cardCloseButton} onClick={handleClose}>
            <svg className={styles.cardCloseIcon} viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
          <img 
            src={card.src} 
            alt={card.title}
            className={styles.cardImage}
          />
          <div className={styles.cardContent}>
            <div className={styles.cardCategory}>{card.category}</div>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <div className={styles.cardDescription}>
              {card.content}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className={styles.card} onClick={handleClick}>
      <img 
        src={card.src} 
        alt={card.title}
        className={styles.cardImage}
      />
      <div className={styles.cardContent}>
        <div className={styles.cardCategory}>{card.category}</div>
        <h3 className={styles.cardTitle}>{card.title}</h3>
        <div className={styles.cardDescription}>
          Click to explore more about {card.title.toLowerCase()}
        </div>
      </div>
    </div>
  );
};

export default AppleCard;
