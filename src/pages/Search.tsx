import React, { useState } from 'react';
import styles from './Search.module.css';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { SearchInput } from '../components/Input';
import { 
  FiSearch, 
  FiFilter, 
  FiMapPin, 
  FiCalendar,
  FiHeart,
  FiMessageCircle,
  FiStar,
  FiUser,
  FiGrid,
  FiList
} from 'react-icons/fi';

interface SearchResult {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  interests: string[];
  photos: string[];
  isOnline?: boolean;
  isVerified?: boolean;
  matchScore?: number;
  distance?: number;
}

const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 28,
    location: 'New York, NY • 2 miles away',
    bio: 'Adventure seeker, coffee lover, and dog mom. Looking for someone to explore the world with!',
    interests: ['Travel', 'Photography', 'Cooking'],
    photos: ['/api/placeholder/300/200'],
    isOnline: true,
    isVerified: true,
    matchScore: 92,
    distance: 2
  },
  {
    id: '2',
    name: 'Emily Chen',
    age: 25,
    location: 'Brooklyn, NY • 5 miles away',
    bio: 'Yoga instructor and wellness enthusiast. Love good conversations and deep connections.',
    interests: ['Yoga', 'Meditation', 'Reading'],
    photos: ['/api/placeholder/300/200'],
    isOnline: false,
    isVerified: true,
    matchScore: 88,
    distance: 5
  },
  {
    id: '3',
    name: 'Jessica Williams',
    age: 30,
    location: 'Manhattan, NY • 3 miles away',
    bio: 'Tech entrepreneur by day, foodie by night. Let\'s build something amazing together!',
    interests: ['Technology', 'Food', 'Startups'],
    photos: ['/api/placeholder/300/200'],
    isOnline: true,
    isVerified: false,
    matchScore: 85,
    distance: 3
  },
  {
    id: '4',
    name: 'Amanda Davis',
    age: 27,
    location: 'Queens, NY • 8 miles away',
    bio: 'Artist and creative soul. I paint, I write, and I dream. Seeking inspiration in every moment.',
    interests: ['Art', 'Writing', 'Music'],
    photos: ['/api/placeholder/300/200'],
    isOnline: false,
    isVerified: true,
    matchScore: 82,
    distance: 8
  },
  {
    id: '5',
    name: 'Rachel Martinez',
    age: 29,
    location: 'Bronx, NY • 12 miles away',
    bio: 'Fitness enthusiast and nutrition coach. Let\'s crush our goals together!',
    interests: ['Fitness', 'Health', 'Dancing'],
    photos: ['/api/placeholder/300/200'],
    isOnline: true,
    isVerified: true,
    matchScore: 79,
    distance: 12
  },
  {
    id: '6',
    name: 'Olivia Taylor',
    age: 26,
    location: 'Staten Island, NY • 15 miles away',
    bio: 'Bookworm and movie buff. Cozy nights in or adventures out - I\'m up for both!',
    interests: ['Books', 'Movies', 'Travel'],
    photos: ['/api/placeholder/300/200'],
    isOnline: false,
    isVerified: false,
    matchScore: 76,
    distance: 15
  }
];

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('match');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    ageMin: 22,
    ageMax: 35,
    maxDistance: 25,
    interestedIn: 'female',
    interests: [],
    minMatchScore: 70
  });

  const [selectedQuickFilter, setSelectedQuickFilter] = useState('all');

  const quickFilters = [
    { id: 'all', label: 'All Profiles' },
    { id: 'online', label: 'Online Now' },
    { id: 'new', label: 'New Members' },
    { id: 'verified', label: 'Verified' },
    { id: 'nearby', label: 'Nearby' }
  ];

  const sortOptions = [
    { id: 'match', label: 'Best Match' },
    { id: 'newest', label: 'Newest' },
    { id: 'active', label: 'Recently Active' },
    { id: 'distance', label: 'Distance' }
  ];

  const handleLike = (profileId: string) => {
    console.log('Like profile:', profileId);
  };

  const handleMessage = (profileId: string) => {
    console.log('Message profile:', profileId);
  };

  const handleProfileClick = (profileId: string) => {
    console.log('View profile:', profileId);
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    console.log('Search with filters:', filters, 'query:', searchQuery);
  };

  const handleClearFilters = () => {
    setFilters({
      ageMin: 22,
      ageMax: 35,
      maxDistance: 25,
      interestedIn: 'female',
      interests: [],
      minMatchScore: 70
    });
    setSearchQuery('');
  };

  const filteredResults = mockSearchResults.filter(result => {
    if (searchQuery && !result.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    if (selectedQuickFilter === 'online' && !result.isOnline) return false;
    if (selectedQuickFilter === 'verified' && !result.isVerified) return false;
    if (selectedQuickFilter === 'nearby' && (result.distance || 0) > 10) return false;
    
    return true;
  });

  return (
    <Layout title="Search" subtitle="Find your perfect match">
      <div className={styles.search}>
        <div className={styles.searchHeader}>
          <h1 className={styles.searchTitle}>Discover People</h1>
          <p className={styles.searchSubtitle}>
            Find amazing people who match your interests and preferences
          </p>
        </div>

        <div className={styles.searchBar}>
          <div className={styles.searchForm}>
            <SearchInput
              placeholder="Search by name, interests, or location..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
            <div className={styles.searchActions}>
              <Button onClick={handleSearch}>
                <FiSearch size={16} />
                Search
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FiFilter size={16} />
                Filters
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.quickFilters}>
          {quickFilters.map((filter) => (
            <button
              key={filter.id}
              className={`${styles.quickFilter} ${
                selectedQuickFilter === filter.id ? styles.active : ''
              }`}
              onClick={() => setSelectedQuickFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {showFilters && (
          <div className={styles.filtersSection}>
            <h3 className={styles.filtersTitle}>
              <FiFilter />
              Advanced Filters
            </h3>
            <div className={styles.filtersGrid}>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Age Range</label>
                <div className={styles.rangeFilter}>
                  <span className={styles.rangeValue}>{filters.ageMin}</span>
                  <input
                    type="range"
                    min="18"
                    max="50"
                    value={filters.ageMin}
                    onChange={(e) => handleFilterChange('ageMin', parseInt(e.target.value))}
                    className={styles.rangeInput}
                  />
                  <input
                    type="range"
                    min="18"
                    max="50"
                    value={filters.ageMax}
                    onChange={(e) => handleFilterChange('ageMax', parseInt(e.target.value))}
                    className={styles.rangeInput}
                  />
                  <span className={styles.rangeValue}>{filters.ageMax}</span>
                </div>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Maximum Distance</label>
                <div className={styles.rangeFilter}>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={filters.maxDistance}
                    onChange={(e) => handleFilterChange('maxDistance', parseInt(e.target.value))}
                    className={styles.rangeInput}
                  />
                  <span className={styles.rangeValue}>{filters.maxDistance} miles</span>
                </div>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Interested In</label>
                <select
                  value={filters.interestedIn}
                  onChange={(e) => handleFilterChange('interestedIn', e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="female">Women</option>
                  <option value="male">Men</option>
                  <option value="both">Everyone</option>
                </select>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Minimum Match Score</label>
                <div className={styles.rangeFilter}>
                  <input
                    type="range"
                    min="50"
                    max="95"
                    value={filters.minMatchScore}
                    onChange={(e) => handleFilterChange('minMatchScore', parseInt(e.target.value))}
                    className={styles.rangeInput}
                  />
                  <span className={styles.rangeValue}>{filters.minMatchScore}%</span>
                </div>
              </div>
            </div>

            <div className={styles.searchActions}>
              <Button onClick={handleSearch}>Apply Filters</Button>
              <Button variant="secondary" onClick={handleClearFilters}>
                Clear All
              </Button>
            </div>
          </div>
        )}

        <div className={styles.resultsHeader}>
          <div className={styles.resultsCount}>
            {filteredResults.length} profiles found
          </div>
          <div className={styles.sortOptions}>
            {sortOptions.map((option) => (
              <button
                key={option.id}
                className={`${styles.sortButton} ${
                  sortBy === option.id ? styles.active : ''
                }`}
                onClick={() => setSortBy(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.resultsGrid}>
          {filteredResults.map((result) => (
            <div
              key={result.id}
              className={styles.resultCard}
              onClick={() => handleProfileClick(result.id)}
            >
              {result.isOnline && <div className={styles.onlineIndicator} />}
              {result.isVerified && (
                <div className={styles.verifiedBadge}>VERIFIED</div>
              )}
              {result.matchScore && (
                <div className={styles.matchScore}>{result.matchScore}%</div>
              )}
              
              <img
                src={result.photos[0]}
                alt={result.name}
                className={styles.resultImage}
              />
              
              <div className={styles.resultInfo}>
                <h3 className={styles.resultName}>
                  {result.name}, {result.age}
                </h3>
                <p className={styles.resultAge}>Active now</p>
                <p className={styles.resultLocation}>
                  <FiMapPin size={12} />
                  {result.location}
                </p>
                <p className={styles.resultBio}>{result.bio}</p>
                
                <div className={styles.resultInterests}>
                  {result.interests.slice(0, 3).map((interest, index) => (
                    <span key={index} className={styles.interestTag}>
                      {interest}
                    </span>
                  ))}
                  {result.interests.length > 3 && (
                    <span className={styles.interestTag}>
                      +{result.interests.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className={styles.resultActions}>
                  <button
                    className={`${styles.actionButton} ${styles.likeButton}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(result.id);
                    }}
                  >
                    <FiHeart size={14} />
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.messageButton}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMessage(result.id);
                    }}
                  >
                    <FiMessageCircle size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredResults.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <h3 className={styles.emptyTitle}>No profiles found</h3>
            <p className={styles.emptyDescription}>
              Try adjusting your filters or search terms to find more matches
            </p>
            <Button onClick={handleClearFilters}>Clear Filters</Button>
          </div>
        )}

        {filteredResults.length > 0 && (
          <div className={styles.loadMore}>
            <Button variant="secondary">Load More Results</Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;
