import React from 'react';
import styles from '../styles/StatsSection.module.css';

const StatsSection: React.FC = () => {
  const stats = [
    { number: "10M+", label: "Active Users" },
    { number: "50M+", label: "Matches Made" },
    { number: "100K+", label: "Daily Connections" },
    { number: "4.8★", label: "App Rating" },
  ];

  return (
    <section className={styles.stats}>
      <div className={styles.container}>
        <div className={styles.statsBackground}>
          <img 
            src="/two-mobile-phones-red-no-hands.png" 
            alt="Mobile Phones" 
            className={styles.backgroundImage}
          />
        </div>
        
        <div className={styles.statsContent}>
          <h2 className={styles.sectionTitle}>Join Millions Finding Love</h2>
          <p className={styles.sectionSubtitle}>
            Be part of the world's most trusted dating community
          </p>
          
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
