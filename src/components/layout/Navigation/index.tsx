import React, { useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/components/layout/Navigation.module.css';
import { FiMenu, FiX } from 'react-icons/fi';
import AuthButton from '@/components/auth/AuthButton';
import { useAuth } from '@/contexts/AuthContext';

interface NavigationProps {
  onAuthModalOpen?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onAuthModalOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const publicNavItems = [
    { label: 'Home', href: '/' },
    { label: 'Discover', href: '/discover' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Download', href: '/download' },
  ];

  const privateNavItems = [
    { label: 'Home', href: '/' },
    { label: 'Discover', href: '/discover' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Download', href: '/download' },
    { label: 'Profile', href: '/profile' },
  ];

  const navItems = isAuthenticated ? privateNavItems : publicNavItems;

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavItemClick = () => {
    setIsMenuOpen(false);
  };

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
              onClick={handleNavItemClick}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className={styles.navActions}>
          <AuthButton
            isAuthenticated={isAuthenticated}
            userName={user?.name}
            onLogin={onAuthModalOpen || handleMenuToggle}
            onLogout={logout}
          />
          
          <button 
            className={styles.menuToggle}
            onClick={handleMenuToggle}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
