import React from 'react';
import styles from './Layout.module.css';
import { 
  FiHome, 
  FiSearch, 
  FiMessageCircle, 
  FiGift, 
  FiUser, 
  FiBell,
  FiHeart
} from 'react-icons/fi';

interface LayoutProps {
  children: React.ReactNode;
  showBottomNav?: boolean;
  showHeader?: boolean;
  title?: string;
  subtitle?: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Discover', icon: <FiHome />, href: '/' },
  { id: 'search', label: 'Search', icon: <FiSearch />, href: '/search' },
  { id: 'chat', label: 'Chat', icon: <FiMessageCircle />, href: '/chat' },
  { id: 'gifts', label: 'Gifts', icon: <FiGift />, href: '/gifts' },
  { id: 'profile', label: 'Profile', icon: <FiUser />, href: '/profile' },
];

const Layout: React.FC<LayoutProps> = ({
  children,
  showBottomNav = true,
  showHeader = true,
  title,
  subtitle,
}) => {
  const [activeNav, setActiveNav] = React.useState('home');
  const [notificationCount] = React.useState(3);

  const handleNavClick = (itemId: string) => {
    setActiveNav(itemId);
  };

  return (
    <div className={styles.layout}>
      {showHeader && (
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <a href="/" className={styles.logo}>
              <span className={styles.logoIcon}>❤️</span>
              TrueMate
            </a>
            
            <div className={styles.navActions}>
              <button className={styles.notificationButton}>
                <FiBell size={20} />
                {notificationCount > 0 && (
                  <span className={styles.notificationBadge}>
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>
      )}

      <main className={styles.mainContent}>
        {title && (
          <div className={styles.container}>
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>{title}</h1>
              {subtitle && <p className={styles.pageSubtitle}>{subtitle}</p>}
            </div>
          </div>
        )}
        {children}
      </main>

      {showBottomNav && (
        <nav className={styles.bottomNavigation}>
          <div className={styles.navItems}>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`${styles.navItem} ${
                  activeNav === item.id ? styles.active : ''
                }`}
                onClick={() => handleNavClick(item.id)}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
              </a>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
};

export default Layout;
