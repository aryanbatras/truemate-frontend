import React from 'react';
import styles from '../../styles/pages/discover/Discover.module.css';
import Navigation from '../../components/layout/Navigation';
import Button from '../../components/ui/Button';
import { FocusCards } from '../../components/landing/FocusCards';
import { FiSearch, FiFilter, FiGrid, FiList, FiHeart } from 'react-icons/fi';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  image: string;
  address: {
    city: string;
    state: string;
  };
  company: {
    title: string;
  };
}

interface Card {
  title: string;
  src: string;
}

const DiscoverPage: React.FC = () => {
  const [viewMode, setViewMode] = React.useState<'grid' | 'list' | 'swipe'>('grid');
  const [showFilters, setShowFilters] = React.useState(false);
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Unsplash images for diverse profiles (verified working URLs)
  const unsplashImages = [
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1517841905240-472488bdf63e?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b332c2ca?w=400&h=600&fit=crop&crop=face'
  ];

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users?limit=12');
        const data = await response.json();
        
        // Transform user data to match our format and assign Unsplash images
        const transformedUsers = data.users.map((user: User, index: number) => ({
          ...user,
          image: unsplashImages[index % unsplashImages.length]
        }));
        
        setUsers(transformedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        // Fallback to some default data if API fails
        setUsers([
          {
            id: 1,
            firstName: 'Sarah',
            lastName: 'Johnson',
            age: 28,
            gender: 'female',
            image: unsplashImages[0],
            address: { city: 'New York', state: 'NY' },
            company: { title: 'Designer' }
          },
          {
            id: 2,
            firstName: 'Michael',
            lastName: 'Chen',
            age: 32,
            gender: 'male',
            image: unsplashImages[1],
            address: { city: 'San Francisco', state: 'CA' },
            company: { title: 'Developer' }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Transform users to cards format for FocusCards
  const profileCards: Card[] = users.map(user => ({
    title: `${user.firstName} ${user.lastName}, ${user.age} • ${user.address.city}, ${user.address.state}`,
    src: user.image
  }));

  const handleLike = (index: number) => {
    // console.log('Liked profile:', profileCards[index].title);
  };

  const handlePass = (index: number) => {
    // console.log('Passed profile:', profileCards[index].title);
  };

  return (
    <>
      <Navigation />
      <div className={styles.discover}>
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
              Discover Your <span className={styles.highlight}>True Love</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Browse through amazing profiles and find your perfect match
            </p>
          </div>
        </div>

        <div className={styles.contentSection}>
          <div className={styles.profilesContainer}>
            <div className={styles.profilesGrid}>
              {loading ? (
                <div className={styles.loadingState}>
                  <div className={styles.loadingSpinner}></div>
                  <p>Loading amazing profiles...</p>
                </div>
              ) : (
                <FocusCards cards={profileCards} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscoverPage;
