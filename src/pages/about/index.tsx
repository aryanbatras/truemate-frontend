import React from 'react';
import styles from '../../styles/About.module.css';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
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
      icon: <FiHeart />,
      title: 'Smart Matching',
      description: 'Our advanced algorithm connects you with compatible matches based on your preferences, interests, and personality traits.'
    },
    {
      icon: <FiShield />,
      title: 'Safe & Secure',
      description: 'Profile verification, photo moderation, and advanced privacy controls keep you safe while dating.'
    },
    {
      icon: <FiMessageCircle />,
      title: 'Real-time Chat',
      description: 'Instant messaging with typing indicators, read receipts, and rich media support.'
    },
    {
      icon: <FiZap />,
      title: 'Lightning Fast',
      description: 'Optimized performance ensures smooth experience even on slower connections.'
    },
    {
      icon: <FiAward />,
      title: 'Premium Features',
      description: 'Virtual gifts, video calls, and exclusive features to enhance your dating experience.'
    },
    {
      icon: <FiTarget />,
      title: 'Focused Dating',
      description: 'Designed specifically for meaningful connections, not just swiping.'
    }
  ];

  const stats = [
    { number: '10M+', label: 'Active Users' },
    { number: '50M+', label: 'Matches Made' },
    { number: '100K+', label: 'Daily Connections' },
    { number: '4.8★', label: 'App Rating' }
  ];

  const team = [
    {
      name: 'Alex Chen',
      role: 'CEO & Founder',
      bio: 'Passionate about creating meaningful connections through technology.',
      photo: '/api/placeholder/100/100'
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of Product',
      bio: 'Dedicated to making dating apps more user-friendly and effective.',
      photo: '/api/placeholder/100/100'
    },
    {
      name: 'Michael Davis',
      role: 'Lead Engineer',
      bio: 'Building scalable and secure dating technology for everyone.',
      photo: '/api/placeholder/100/100'
    },
    {
      name: 'Emily Wilson',
      role: 'Community Manager',
      bio: 'Ensuring a safe and welcoming environment for all users.',
      photo: '/api/placeholder/100/100'
    }
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
    <Layout title="About TrueMate" showBottomNav={false}>
      <div className={styles.about}>
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Find Your True Love</h1>
          <p className={styles.heroSubtitle}>
            TrueMate is more than just a dating app – it's a community dedicated to helping 
            people find meaningful connections in a safe, modern, and enjoyable environment.
          </p>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Why Choose TrueMate?</h2>
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

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Meet Our Team</h2>
          <div className={styles.teamGrid}>
            {team.map((member, index) => (
              <div key={index} className={styles.teamMember}>
                <img
                  src={member.photo}
                  alt={member.name}
                  className={styles.memberPhoto}
                />
                <h3 className={styles.memberName}>{member.name}</h3>
                <p className={styles.memberRole}>{member.role}</p>
                <p className={styles.memberBio}>{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>Ready to Find Your Perfect Match?</h2>
          <p className={styles.ctaDescription}>
            Join millions of users who have already found love through TrueMate. 
            Your journey to finding true love starts here.
          </p>
          <Link href="/discover">
                <Button size="large">
                  Get Started Now
                </Button>
              </Link>
        </section>
      </div>
    </Layout>
  );
};

export default About;
