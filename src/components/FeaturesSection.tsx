import React from 'react';
import { FocusCards } from './FocusCards';
import styles from '../styles/FeaturesSection.module.css';

interface Card {
  title: string;
  src: string;
}

const FeaturesSection: React.FC = () => {
  const cards: Card[] = [
    {
      title: "Smart Matching",
      src: "/man-and-women-sitting-dating-mature-image.png"
    },
    {
      title: "Real-time Chat",
      src: "/man-and-women-sitting-in-table.png"
    },
    {
      title: "Video & Audio Calls",
      src: "/tw-mobile-phones-red-with-hands.png"
    },
    {
      title: "Virtual Gifts",
      src: "/two-mobiles-two-hands-heart-background.png"
    },
    {
      title: "Safe & Secure",
      src: "/mobilephone-in-big-and-2-people-around.png"
    },
    {
      title: "Lightning Fast",
      src: "/many-mobiles-red-theme.png"
    }
  ];

  return (
    <section id="features" className={styles.features}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Why Choose TrueMate?</h2>
          <p className={styles.sectionSubtitle}>
            Discover the features that make us the leading dating platform
          </p>
        </div>
        
        <FocusCards cards={cards} />
      </div>
    </section>
  );
};

export default FeaturesSection;
