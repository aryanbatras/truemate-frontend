import React from 'react';
import Link from 'next/link';
import styles from '../styles/CTASection.module.css';
import Button from './Button';

const CTASection: React.FC = () => {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaBackground}>
        <div className={styles.hearts}>
          <span className={`${styles.heart} ${styles.heart1}`}>❤️</span>
          <span className={`${styles.heart} ${styles.heart2}`}>💕</span>
          <span className={`${styles.heart} ${styles.heart3}`}>💖</span>
          <span className={`${styles.heart} ${styles.heart4}`}>💗</span>
        </div>
      </div>
      
      <div className={styles.container}>
        <div className={styles.ctaContent}>
          <div className={styles.ctaImage}>
            <img 
              src="/hands-sun.jpg" 
              alt="Happy Couples" 
              className={styles.coupleImage}
            />
          </div>
          
          <div className={styles.ctaText}>
            <h2 className={styles.ctaTitle}>
              Ready to Find Your Perfect Match?
            </h2>
            <p className={styles.ctaSubtitle}>
              Join millions of users who have already found love through
              TrueMate. Your journey to happiness starts here.
            </p>
            <div className={styles.ctaActions}>
              <a 
                href="https://play.google.com/store" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.playStoreButton}
              >
                <div className={styles.playStoreIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M20.71,7.04C21.12,7.43 21.56,7.85 21.87,8.32L15.97,12L21.87,15.68C21.56,16.15 21.12,16.57 20.71,16.96L14.07,12L20.71,7.04Z"/>
                  </svg>
                </div>
                <div className={styles.playStoreContent}>
                  <span className={styles.playStoreText}>Get it on</span>
                  <span className={styles.playStoreTitle}>Google Play</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
