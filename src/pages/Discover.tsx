import React, { useState, useRef, useEffect } from 'react';
import styles from './Discover.module.css';
import Layout from '../components/Layout';
import { ProfileCard } from '../components/Card';
import Button from '../components/Button';
import { FiFilter, FiHeart, FiX, FiStar, FiGrid, FiList } from 'react-icons/fi';

interface Profile {
  id: string;
  name: string;
  age: number;
  bio: string;
  photos: string[];
  isOnline?: boolean;
  isVerified?: boolean;
  location?: string;
  interests?: string[];
}

const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'Sarah',
    age: 28,
    bio: 'Adventure seeker, coffee lover, and dog mom. Looking for someone to explore the world with!',
    photos: ['/api/placeholder/400/500'],
    isOnline: true,
    isVerified: true,
    location: 'New York',
    interests: ['Travel', 'Photography', 'Cooking']
  },
  {
    id: '2',
    name: 'Emily',
    age: 25,
    bio: 'Yoga instructor and wellness enthusiast. Love good conversations and deep connections.',
    photos: ['/api/placeholder/400/500'],
    isOnline: false,
    isVerified: true,
    location: 'Los Angeles',
    interests: ['Yoga', 'Meditation', 'Reading']
  },
  {
    id: '3',
    name: 'Jessica',
    age: 30,
    bio: 'Tech entrepreneur by day, foodie by night. Let\'s build something amazing together!',
    photos: ['/api/placeholder/400/500'],
    isOnline: true,
    isVerified: false,
    location: 'San Francisco',
    interests: ['Technology', 'Food', 'Startups']
  },
  {
    id: '4',
    name: 'Amanda',
    age: 27,
    bio: 'Artist and creative soul. I paint, I write, and I dream. Seeking inspiration in every moment.',
    photos: ['/api/placeholder/400/500'],
    isOnline: false,
    isVerified: true,
    location: 'Chicago',
    interests: ['Art', 'Writing', 'Music']
  },
  {
    id: '5',
    name: 'Rachel',
    age: 29,
    bio: 'Fitness enthusiast and nutrition coach. Let\'s crush our goals together!',
    photos: ['/api/placeholder/400/500'],
    isOnline: true,
    isVerified: true,
    location: 'Miami',
    interests: ['Fitness', 'Health', 'Dancing']
  },
  {
    id: '6',
    name: 'Olivia',
    age: 26,
    bio: 'Bookworm and movie buff. Cozy nights in or adventures out - I\'m up for both!',
    photos: ['/api/placeholder/400/500'],
    isOnline: false,
    isVerified: false,
    location: 'Seattle',
    interests: ['Books', 'Movies', 'Travel']
  }
];

const Discover: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>(mockProfiles);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'swipe'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentSwipeIndex, setCurrentSwipeIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);
  const [filters, setFilters] = useState({
    ageMin: 18,
    ageMax: 50,
    location: 'all',
    interests: 'all'
  });

  const handleLike = (profileId: string) => {
    const profile = profiles.find(p => p.id === profileId);
    if (profile && Math.random() > 0.7) {
      setMatchedProfile(profile);
      setShowMatch(true);
      setTimeout(() => setShowMatch(false), 3000);
    }
    
    setProfiles(prev => prev.filter(p => p.id !== profileId));
    setCurrentSwipeIndex(prev => Math.min(prev + 1, profiles.length - 1));
  };

  const handlePass = (profileId: string) => {
    setProfiles(prev => prev.filter(p => p.id !== profileId));
    setCurrentSwipeIndex(prev => Math.min(prev + 1, profiles.length - 1));
  };

  const handleProfileClick = (profileId: string) => {
    console.log('View profile:', profileId);
  };

  const handleSuperLike = () => {
    if (profiles[currentSwipeIndex]) {
      handleLike(profiles[currentSwipeIndex].id);
    }
  };

  const handleSwipeLike = () => {
    if (profiles[currentSwipeIndex]) {
      handleLike(profiles[currentSwipeIndex].id);
    }
  };

  const handleSwipePass = () => {
    if (profiles[currentSwipeIndex]) {
      handlePass(profiles[currentSwipeIndex].id);
    }
  };

  const currentProfile = profiles[currentSwipeIndex];

  return (
    <Layout title="Discover" subtitle="Find your perfect match">
      <div className={styles.discover}>
        <div className={styles.viewToggle}>
          <button
            className={`${styles.toggleButton} ${viewMode === 'grid' ? styles.active : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <FiGrid /> Grid
          </button>
          <button
            className={`${styles.toggleButton} ${viewMode === 'list' ? styles.active : ''}`}
            onClick={() => setViewMode('list')}
          >
            <FiList /> List
          </button>
          <button
            className={`${styles.toggleButton} ${viewMode === 'swipe' ? styles.active : ''}`}
            onClick={() => setViewMode('swipe')}
          >
            <FiHeart /> Swipe
          </button>
        </div>

        <div className={styles.filters}>
          <div className={styles.filterHeader}>
            <h3 className={styles.filterTitle}>Filters</h3>
            <button
              className={styles.filterToggle}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter /> {showFilters ? 'Hide' : 'Show'}
            </button>
          </div>
          
          {showFilters && (
            <div className={styles.filterContent}>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Age Range</label>
                <select 
                  className={styles.filterSelect}
                  value={filters.ageMin}
                  onChange={(e) => setFilters(prev => ({ ...prev, ageMin: parseInt(e.target.value) }))}
                >
                  <option value={18}>18</option>
                  <option value={25}>25</option>
                  <option value={30}>30</option>
                  <option value={35}>35</option>
                </select>
                <select 
                  className={styles.filterSelect}
                  value={filters.ageMax}
                  onChange={(e) => setFilters(prev => ({ ...prev, ageMax: parseInt(e.target.value) }))}
                >
                  <option value={30}>30</option>
                  <option value={40}>40</option>
                  <option value={50}>50</option>
                  <option value={60}>60</option>
                </select>
              </div>
              
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Location</label>
                <select 
                  className={styles.filterSelect}
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                >
                  <option value="all">All Locations</option>
                  <option value="nearby">Nearby</option>
                  <option value="same-city">Same City</option>
                </select>
              </div>
              
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Interests</label>
                <select 
                  className={styles.filterSelect}
                  value={filters.interests}
                  onChange={(e) => setFilters(prev => ({ ...prev, interests: e.target.value }))}
                >
                  <option value="all">All Interests</option>
                  <option value="travel">Travel</option>
                  <option value="fitness">Fitness</option>
                  <option value="arts">Arts</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {viewMode === 'grid' && (
          <div className={styles.profilesGrid}>
            {profiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onLike={handleLike}
                onPass={handlePass}
                onClick={handleProfileClick}
              />
            ))}
          </div>
        )}

        {viewMode === 'list' && (
          <div className={styles.profilesList}>
            {profiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onLike={handleLike}
                onPass={handlePass}
                onClick={handleProfileClick}
              />
            ))}
          </div>
        )}

        {viewMode === 'swipe' && (
          <div className={styles.swipeContainer}>
            {currentProfile ? (
              <ProfileCard
                profile={currentProfile}
                onLike={handleSwipeLike}
                onPass={handleSwipePass}
                onClick={handleProfileClick}
              />
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>💔</div>
                <h3 className={styles.emptyTitle}>No more profiles</h3>
                <p className={styles.emptyDescription}>
                  Check back later for more potential matches!
                </p>
                <Button onClick={() => window.location.reload()}>
                  Refresh
                </Button>
              </div>
            )}
            
            {currentProfile && (
              <div className={styles.swipeActions}>
                <button
                  className={`${styles.swipeButton} ${styles.pass}`}
                  onClick={handleSwipePass}
                >
                  <FiX />
                </button>
                <button
                  className={`${styles.swipeButton} ${styles.superLike}`}
                  onClick={handleSuperLike}
                >
                  <FiStar />
                </button>
                <button
                  className={`${styles.swipeButton} ${styles.like}`}
                  onClick={handleSwipeLike}
                >
                  <FiHeart />
                </button>
              </div>
            )}
          </div>
        )}

        {profiles.length === 0 && viewMode !== 'swipe' && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>💔</div>
            <h3 className={styles.emptyTitle}>No profiles found</h3>
            <p className={styles.emptyDescription}>
              Try adjusting your filters or check back later!
            </p>
            <Button onClick={() => window.location.reload()}>
              Refresh
            </Button>
          </div>
        )}

        {showMatch && matchedProfile && (
          <div className={styles.matchAnimation}>
            <h2 className={styles.matchTitle}>It's a Match!</h2>
            <div className={styles.matchProfiles}>
              <img
                src="/api/placeholder/80/80"
                alt="You"
                className={styles.matchProfile}
              />
              <div className={styles.matchHeart}>❤️</div>
              <img
                src={matchedProfile.photos[0]}
                alt={matchedProfile.name}
                className={styles.matchProfile}
              />
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              You and {matchedProfile.name} liked each other!
            </p>
            <div className={styles.matchActions}>
              <Button onClick={() => console.log('Send message')}>
                Send Message
              </Button>
              <Button variant="secondary" onClick={() => setShowMatch(false)}>
                Keep Swiping
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Discover;
