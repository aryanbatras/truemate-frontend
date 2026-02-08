import React from 'react';
import styles from './Landing.module.css';
import Button from '../components/Button';
import { 
  FiHeart, 
  FiMessageCircle, 
  FiVideo, 
  FiGift,
  FiShield,
  FiZap,
  FiUsers,
  FiTrendingUp,
  FiStar
} from 'react-icons/fi';

const Landing: React.FC = () => {
  const features = [
    {
      icon: <FiHeart />,
      title: 'Smart Matching',
      description: 'Our advanced algorithm connects you with compatible matches based on your preferences and interests.'
    },
    {
      icon: <FiMessageCircle />,
      title: 'Real-time Chat',
      description: 'Instant messaging with typing indicators, read receipts, and rich media support.'
    },
    {
      icon: <FiVideo />,
      title: 'Video & Audio Calls',
      description: 'High-quality video and audio calls with WebRTC technology for seamless connections.'
    },
    {
      icon: <FiGift />,
      title: 'Virtual Gifts',
      description: 'Send beautiful virtual gifts to express your feelings and make connections special.'
    },
    {
      icon: <FiShield />,
      title: 'Safe & Secure',
      description: 'Advanced security measures with profile verification and privacy controls.'
    },
    {
      icon: <FiZap />,
      title: 'Lightning Fast',
      description: 'Optimized performance for smooth experience even on slower connections.'
    }
  ];

  const stats = [
    { number: '10M+', label: 'Active Users' },
    { number: '50M+', label: 'Matches Made' },
    { number: '100K+', label: 'Daily Connections' },
    { number: '4.8★', label: 'App Rating' }
  ];

  return (
    <div>
      <section className={styles.hero}>
        <span className={`${styles.hearts} ${styles.heart1}`}>❤️</span>
        <span className={`${styles.hearts} ${styles.heart2}`}>💕</span>
        <span className={`${styles.hearts} ${styles.heart3}`}>💖</span>
        <span className={`${styles.hearts} ${styles.heart4}`}>💗</span>
        
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Find Your <span className={styles.highlight}>True Love</span>
            <br />with <span className={styles.highlight}>TrueMate</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Connect with amazing people, build meaningful relationships, 
            and discover your perfect match in a safe, modern dating environment.
          </p>
          <div className={styles.heroActions}>
            <Button size="large" onClick={() => console.log('Get Started')}>
              Get Started Now
            </Button>
            <Button variant="secondary" size="large" onClick={() => console.log('Learn More')}>
              Learn More
            </Button>
          </div>
        </div>

        <div className={styles.heroImage}>
          <div className={styles.phoneMockup}>
            <div className={styles.notch} />
            <div className={styles.phoneScreen}>
              <div style={{ 
                flex: 1, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'var(--text-muted)',
                fontSize: '14px',
                textAlign: 'center',
                padding: '20px'
              }}>
                <div>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>❤️</div>
                  <div style={{ fontWeight: '600', marginBottom: '8px' }}>TrueMate</div>
                  <div>Your perfect match awaits</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.stats}>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <span className={styles.statNumber}>{stat.number}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Find Your Perfect Match?</h2>
          <p className={styles.ctaSubtitle}>
            Join millions of users who have already found love through TrueMate
          </p>
          <Button size="large" onClick={() => console.log('Start Dating')}>
            Start Your Journey
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
