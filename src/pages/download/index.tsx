import React from 'react';
import styles from '../../styles/Download.module.css';
import Navigation from '../../components/Navigation';
import Button from '../../components/Button';
import Link from 'next/link';
import { 
  FiDownload, 
  FiPlay, 
  FiMessageCircle, 
  FiVideo, 
  FiPhone, 
  FiHeart, 
  FiShield, 
  FiStar,
  FiCheckCircle,
  FiUsers,
  FiZap,
  FiAward
} from 'react-icons/fi';

const DownloadPage: React.FC = () => {
  const features = [
    {
      icon: <FiVideo />,
      title: 'HD Video Calls',
      description: 'Crystal clear video quality for intimate conversations with your matches'
    },
    {
      icon: <FiPhone />,
      title: 'Voice Calls',
      description: 'Connect through voice when you want to hear their voice and emotions'
    },
    {
      icon: <FiMessageCircle />,
      title: 'Real-time Chat',
      description: 'Instant messaging with typing indicators and read receipts'
    },
    {
      icon: <FiShield />,
      title: 'Safe & Secure',
      description: 'End-to-end encryption and profile verification for your safety'
    },
    {
      icon: <FiUsers />,
      title: 'Millions of Users',
      description: 'Join thousands of people finding love every day'
    },
    {
      icon: <FiZap />,
      title: 'Lightning Fast',
      description: 'Optimized performance for smooth experience even on slower connections'
    }
  ];

  const stats = [
    { number: '5M+', label: 'Happy Users' },
    { number: '10M+', label: 'Matches Made' },
    { number: '50K+', label: 'Daily Active' },
    { number: '4.9★', label: 'App Rating' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      text: 'TrueMate changed my life! The video calls made me feel connected even before meeting in person.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      text: 'The voice call feature is amazing. We talked for hours before our first date.',
      rating: 5
    },
    {
      name: 'Emma Williams',
      text: 'Found my soulmate through this app. The video and voice features made all the difference!',
      rating: 5
    }
  ];

  return (
    <>
      <Navigation />
      <div className={styles.download}>
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
              Download <span className={styles.highlight}>TrueMate</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Experience love like never before with HD video calls, voice chats, and thousands of amazing features
            </p>
            <div className={styles.downloadButtons}>
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

        <div className={styles.contentSection}>
          <section className={styles.featuresSection}>
            <h2 className={styles.sectionTitle}>Amazing Features</h2>
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

          <section className={styles.statsSection}>
            <h2 className={styles.sectionTitle}>Join the Love Revolution</h2>
            <div className={styles.statsGrid}>
              {stats.map((stat, index) => (
                <div key={index} className={styles.statCard}>
                  <span className={styles.statNumber}>{stat.number}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.testimonialsSection}>
            <h2 className={styles.sectionTitle}>Love Stories</h2>
            <div className={styles.testimonialsGrid}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className={styles.testimonialCard}>
                  <div className={styles.testimonialRating}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar key={i} className={styles.starIcon} />
                    ))}
                  </div>
                  <p className={styles.testimonialText}>"{testimonial.text}"</p>
                  <p className={styles.testimonialAuthor}>- {testimonial.name}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.ctaSection}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Ready to Find Your True Love?</h2>
              <p className={styles.ctaDescription}>
                Join millions of users who have already found their perfect match through TrueMate. 
                Download now and start your journey to finding true love!
              </p>
              {/* <div className={styles.ctaButtons}>
                <a 
                  href="https://play.google.com/store" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.primaryButton}
                >
                  <FiDownload />
                  Download Now
                </a>
                <Link href="/discover" className={styles.secondaryButton}>
                  Explore First
                </Link>
              </div> */}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default DownloadPage;
