import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Navigation.module.css';
import { FiMenu, FiX } from 'react-icons/fi';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Discover', href: '/discover' },
    { label: 'About', href: '/about' },
    { label: 'Features', href: '#features' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={styles.navigation}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <img src="/icon.png" alt="TrueMate" className={styles.logoIcon} />
          TrueMate
        </Link>

        <div className={`${styles.navMenu} ${isMenuOpen ? styles.active : ''}`}>
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={styles.navLink}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className={styles.navActions}>
          <button 
            className={styles.menuToggle}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
