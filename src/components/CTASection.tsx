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
              src="/main-image.jpg" 
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
              <Link href="/discover">
                <Button size="large">Start Your Journey</Button>
              </Link>
              <Link href="/about">
                <Button variant="secondary" size="large">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
