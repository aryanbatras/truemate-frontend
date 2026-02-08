import React from 'react';
import styles from '../../styles/Discover.module.css';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import { ProfileCard } from '../../components/Card';
import { FiSearch, FiFilter, FiGrid, FiList, FiHeart } from 'react-icons/fi';

const DiscoverPage: React.FC = () => {
  const [viewMode, setViewMode] = React.useState<'grid' | 'list' | 'swipe'>('grid');
  const [showFilters, setShowFilters] = React.useState(false);

  const profiles = [
    {
      id: 1,
      name: 'Sarah Johnson',
      age: 28,
      bio: 'Adventure seeker, coffee lover, and dog mom. Looking for someone who can keep up with my spontaneous trips!',
      image: '/api/placeholder/300/400',
      interests: ['Travel', 'Photography', 'Cooking'],
      location: 'New York, NY',
      online: true,
      verified: true
    },
    {
      id: 2,
      name: 'Michael Chen',
      age: 32,
      bio: 'Tech enthusiast by day, chef by night. Love exploring new restaurants and hiking trails.',
      image: '/api/placeholder/300/400',
      interests: ['Technology', 'Food', 'Hiking'],
      location: 'San Francisco, CA',
      online: false,
      verified: true
    },
    {
      id: 3,
      name: 'Emma Williams',
      age: 25,
      bio: 'Artist and yoga instructor. Seeking meaningful connections and good conversations.',
      image: '/api/placeholder/300/400',
      interests: ['Art', 'Yoga', 'Meditation'],
      location: 'Los Angeles, CA',
      online: true,
      verified: false
    },
    {
      id: 4,
      name: 'David Martinez',
      age: 30,
      bio: 'Musician and teacher. Love live concerts, jazz bars, and deep conversations.',
      image: '/api/placeholder/300/400',
      interests: ['Music', 'Teaching', 'Reading'],
      location: 'Austin, TX',
      online: true,
      verified: true
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      age: 27,
      bio: 'Fitness coach and nutritionist. Looking for someone who values health and wellness.',
      image: '/api/placeholder/300/400',
      interests: ['Fitness', 'Nutrition', 'Wellness'],
      location: 'Miami, FL',
      online: false,
      verified: true
    },
    {
      id: 6,
      name: 'James Wilson',
      age: 29,
      bio: 'Software engineer and gamer. Love coding challenges and weekend adventures.',
      image: '/api/placeholder/300/400',
      interests: ['Gaming', 'Coding', 'Movies'],
      location: 'Seattle, WA',
      online: true,
      verified: false
    }
  ];

  const handleLike = (profileId: number) => {
    console.log('Liked profile:', profileId);
  };

  const handlePass = (profileId: number) => {
    console.log('Passed profile:', profileId);
  };

  const renderProfileCard = (profile: any) => (
    <ProfileCard
      key={profile.id}
      profile={{
        id: profile.id.toString(),
        name: profile.name,
        age: profile.age,
        bio: profile.bio,
        photos: [profile.image],
        isOnline: profile.online,
        isVerified: profile.verified
      }}
      onLike={() => handleLike(profile.id)}
      onPass={() => handlePass(profile.id)}
    />
  );

  const renderListView = (profile: any) => (
    <div key={profile.id} className={styles.profileListItem}>
      <img src={profile.image} alt={profile.name} className={styles.profileListImage} />
      <div className={styles.profileListInfo}>
        <div className={styles.profileListHeader}>
          <h3 className={styles.profileListName}>
            {profile.name}, {profile.age}
            {profile.verified && <span className={styles.verifiedBadge}>✓</span>}
          </h3>
          <span className={`${styles.onlineIndicator} ${profile.online ? styles.online : ''}`} />
        </div>
        <p className={styles.profileListBio}>{profile.bio}</p>
        <div className={styles.profileListInterests}>
          {profile.interests.map((interest: string, index: number) => (
            <span key={index} className={styles.interestTag}>
              {interest}
            </span>
          ))}
        </div>
        <div className={styles.profileListActions}>
          <Button variant="ghost" size="small" onClick={() => handleLike(profile.id)}>
            <FiHeart /> Like
          </Button>
          <Button variant="primary" size="small">
            View Profile
          </Button>
        </div>
      </div>
    </div>
  );

  const renderSwipeView = () => {
    const [currentProfileIndex, setCurrentProfileIndex] = React.useState(0);
    const currentProfile = profiles[currentProfileIndex];

    const handleSwipeLeft = () => {
      handlePass(currentProfile.id);
      setCurrentProfileIndex((prev) => (prev + 1) % profiles.length);
    };

    const handleSwipeRight = () => {
      handleLike(currentProfile.id);
      setCurrentProfileIndex((prev) => (prev + 1) % profiles.length);
    };

    if (!currentProfile) return null;

    return (
      <div className={styles.swipeContainer}>
        <div className={styles.swipeCard}>
          <ProfileCard
            profile={{
              id: currentProfile.id.toString(),
              name: currentProfile.name,
              age: currentProfile.age,
              bio: currentProfile.bio,
              photos: [currentProfile.image],
              isOnline: currentProfile.online,
              isVerified: currentProfile.verified
            }}
          />
          <div className={styles.swipeActions}>
            <Button
              variant="secondary"
              size="large"
              className={styles.swipeButton}
              onClick={handleSwipeLeft}
            >
              Pass
            </Button>
            <Button
              variant="primary"
              size="large"
              className={styles.swipeButton}
              onClick={handleSwipeRight}
            >
              Like
            </Button>
          </div>
        </div>
        </div>
    );
  };

  return (
    <Layout title="Discover" subtitle="Find your perfect match">
      <div className={styles.discover}>
        <div className={styles.discoverHeader}>
          <div className={styles.searchBar}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search profiles..."
              className={styles.searchInput}
            />
            <Button
              variant="ghost"
              size="small"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter />
            </Button>
          </div>

          <div className={styles.viewModes}>
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="small"
              onClick={() => setViewMode('grid')}
            >
              <FiGrid />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="small"
              onClick={() => setViewMode('list')}
            >
              <FiList />
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className={styles.filtersPanel}>
            <div className={styles.filterSection}>
              <h4>Age Range</h4>
              <div className={styles.ageRange}>
                <input type="number" placeholder="Min" min="18" max="100" />
                <span>-</span>
                <input type="number" placeholder="Max" min="18" max="100" />
              </div>
            </div>

            <div className={styles.filterSection}>
              <h4>Distance</h4>
              <select>
                <option>Within 5 miles</option>
                <option>Within 10 miles</option>
                <option>Within 25 miles</option>
                <option>Within 50 miles</option>
                <option>Within 100 miles</option>
              </select>
            </div>

            <div className={styles.filterSection}>
              <h4>Interests</h4>
              <div className={styles.interestFilters}>
                {['Travel', 'Music', 'Food', 'Fitness', 'Art', 'Technology', 'Gaming', 'Reading'].map((interest) => (
                  <label key={interest} className={styles.interestFilter}>
                    <input type="checkbox" />
                    <span>{interest}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className={styles.profilesContainer}>
          {viewMode === 'grid' && (
            <div className={styles.profilesGrid}>
              {profiles.map(renderProfileCard)}
            </div>
          )}

          {viewMode === 'list' && (
            <div className={styles.profilesList}>
              {profiles.map(renderListView)}
            </div>
          )}

          {viewMode === 'swipe' && renderSwipeView()}
        </div>
      </div>
    </Layout>
  );
};

export default DiscoverPage;
