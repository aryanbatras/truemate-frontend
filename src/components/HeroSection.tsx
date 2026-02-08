import React from 'react';
import Link from 'next/link';
import styles from '../styles/HeroSection.module.css';
import Button from './Button';

const HeroSection: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <img 
          src="/main-image.jpg" 
          alt="Dating App Background" 
          className={styles.backgroundImage}
        />
        <div className={styles.overlay} />
        <div className={styles.hearts}>
          <span className={`${styles.heart} ${styles.heart1}`}>❤️</span>
          <span className={`${styles.heart} ${styles.heart2}`}>💕</span>
          <span className={`${styles.heart} ${styles.heart3}`}>💖</span>
          <span className={`${styles.heart} ${styles.heart4}`}>💗</span>
        </div>
      </div>
      
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              <img src="/icon.png" alt="TrueMate Icon" className={styles.heroIcon} />
              Find Your <span className={styles.highlight}>True Love</span>
              <br />
              with <span className={styles.highlight}>TrueMate</span>
            </h1>
            <div className={styles.heroActions}>
              <Link href="/discover">
                <Button size="large">The dating app designed to feel connected.</Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
