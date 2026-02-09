"use client"
import React, { useState, useRef, useEffect } from 'react';
import AppleCard from './AppleCard';
import styles from '../styles/AppleCardsCarousel.module.css';

interface CardData {
  category: string;
  title: string;
  src: string;
  content: React.ReactNode;
}

interface AppleCardsCarouselProps {
  items: React.ReactNode[];
}

const AppleCardsCarousel: React.FC<AppleCardsCarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedCard, setExpandedCard] = useState<CardData | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getVisibleCards = () => {
      const width = window.innerWidth;
      if (width >= 1280) return 4;
      if (width >= 1024) return 3;
      if (width >= 768) return 2;
      return 1;
    };
    
    setVisibleCards(getVisibleCards());
    
    const handleResize = () => {
      setVisibleCards(getVisibleCards());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, items.length - visibleCards);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleCardClick = (card: CardData, index: number) => {
    setExpandedCard(card);
    setExpandedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseExpanded = () => {
    setExpandedCard(null);
    setExpandedIndex(null);
    document.body.style.overflow = 'unset';
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (trackRef.current?.offsetLeft || 0));
    setScrollLeft(currentIndex);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (trackRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 0.5;
    const newIndex = Math.max(0, Math.min(maxIndex, scrollLeft - walk / 100));
    setCurrentIndex(Math.round(newIndex));
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].pageX - (trackRef.current?.offsetLeft || 0));
    setScrollLeft(currentIndex);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const x = e.touches[0].pageX - (trackRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 0.5;
    const newIndex = Math.max(0, Math.min(maxIndex, scrollLeft - walk / 100));
    setCurrentIndex(Math.round(newIndex));
  };

  useEffect(() => {
    const handleResize = () => {
      const newMaxIndex = Math.max(0, items.length - visibleCards);
      if (currentIndex > newMaxIndex) {
        setCurrentIndex(newMaxIndex);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex, items.length, visibleCards]);

  useEffect(() => {
    if (trackRef.current) {
      const translateX = -currentIndex * (100 / visibleCards);
      trackRef.current.style.transform = `translateX(${translateX}%)`;
    }
  }, [currentIndex, visibleCards]);

  const totalDots = Math.max(1, items.length - visibleCards + 1);

  return (
    <>
      <div className={styles.carouselContainer} ref={containerRef}>
        <div className={styles.carouselWrapper}>
          <button
            className={`${styles.carouselButton} ${styles.carouselButtonPrev}`}
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <svg className={styles.carouselButtonIcon} viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          
          <button
            className={`${styles.carouselButton} ${styles.carouselButtonNext}`}
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
          >
            <svg className={styles.carouselButtonIcon} viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>

          <div 
            className={styles.carouselTrack} 
            ref={trackRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            {items.map((item, index) => (
              <div key={index} className={styles.carouselCard}>
                {React.isValidElement(item) 
                  ? React.cloneElement(item, {
                      onCardClick: handleCardClick,
                      onClose: handleCloseExpanded,
                      isExpanded: expandedIndex === index
                    } as any)
                  : item
                }
              </div>
            ))}
          </div>
        </div>

        <div className={styles.carouselDots}>
          {Array.from({ length: totalDots }).map((_, index) => (
            <button
              key={index}
              className={`${styles.carouselDot} ${currentIndex === index ? styles.carouselDotActive : ''}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>

      {expandedCard && (
        <AppleCard
          card={expandedCard}
          index={expandedIndex!}
          onCardClick={handleCardClick}
          onClose={handleCloseExpanded}
          isExpanded={true}
        />
      )}
    </>
  );
};

export default AppleCardsCarousel;
