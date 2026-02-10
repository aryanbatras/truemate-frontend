import React from 'react';
import styles from '../../styles/pages/about/About.module.css';
import Navigation from '../../components/layout/Navigation';
import Button from '../../components/ui/Button';
import { FocusCards } from '../../components/landing/FocusCards';
import Link from 'next/link';
import { 
  FiHeart, 
  FiShield, 
  FiUsers, 
  FiZap,
  FiAward,
  FiTarget,
  FiStar,
  FiMessageCircle,
  FiGlobe
} from 'react-icons/fi';

const About: React.FC = () => {
  const features = [
    {
      title: 'Smart Matching',
      src: '/man-and-women-sitting-dating-mature-image.png'
    },
    {
      title: 'Safe & Secure',
      src: '/man-and-women-sitting-in-table.png'
    },
    {
      title: 'Real-time Chat',
      src: '/tw-mobile-phones-red-with-hands.png'
    },
    {
      title: 'Lightning Fast',
      src: '/two-mobiles-two-hands-heart-background.png'
    },
    {
      title: 'Premium Features',
      src: '/mobilephone-in-big-and-2-people-around.png'
    },
    {
      title: 'Focused Dating',
      src: '/many-mobiles-red-theme.png'
    }
  ];

  const stats = [
    { number: '10M+', label: 'Active Users' },
    { number: '50M+', label: 'Matches Made' },
    { number: '100K+', label: 'Daily Connections' },
    { number: '4.8★', label: 'App Rating' }
  ];

  const values = [
    {
      icon: <FiHeart />,
      title: 'Authenticity',
      description: 'We encourage genuine connections and real profiles.'
    },
    {
      icon: <FiShield />,
      title: 'Safety First',
      description: 'Your security and privacy are our top priorities.'
    },
    {
      icon: <FiUsers />,
      title: 'Inclusivity',
      description: 'Everyone deserves to find love, regardless of background.'
    },
    {
      icon: <FiStar />,
      title: 'Excellence',
      description: 'We continuously improve to provide the best dating experience.'
    }
  ];

  return (
    <>
      <Navigation />
      <div className={styles.about}>
        <div className={styles.heroSection}>
          <div className={styles.heroBackground}>
            <div className={styles.hearts}>
              <span className={`${styles.heart} ${styles.heart1}`}>💕</span>
              <span className={`${styles.heart} ${styles.heart2}`}>💖</span>
              <span className={`${styles.heart} ${styles.heart3}`}>💗</span>
              <span className={`${styles.heart} ${styles.heart4}`}>❤️</span>
            </div>
          </div>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              About <span className={styles.highlight}>TrueMate</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Find your perfect match in a safe, modern, and enjoyable environment
            </p>
          </div>
        </div>

        <div className={styles.contentSection}>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Why Choose TrueMate?</h2>
            <FocusCards cards={features} />
          </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>By the Numbers</h2>
          <div className={styles.stats}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <span className={styles.statNumber}>{stat.number}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Our Values</h2>
          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
              <div key={index} className={styles.valueCard}>
                <h3 className={styles.valueTitle}>
                  <span className={styles.valueIcon}>{value.icon}</span>
                  {value.title}
                </h3>
                <p className={styles.valueDescription}>{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        </div>
      </div>
    </>
  );
};

export default About;
