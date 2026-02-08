import React from 'react';
import styles from '../../styles/Search.module.css';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import { Input, SearchInput } from '../../components/Input';
import { ProfileCard } from '../../components/Card';
import { FiSearch, FiFilter, FiMapPin, FiCalendar, FiSliders } from 'react-icons/fi';

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showFilters, setShowFilters] = React.useState(false);
  const [sortBy, setSortBy] = React.useState('relevance');
  const [results, setResults] = React.useState<any[]>([]);

  const mockProfiles = [
    {
      id: 1,
      name: 'Sarah Johnson',
      age: 28,
      bio: 'Adventure seeker, coffee lover, and dog mom. Looking for someone who can keep up with my spontaneous trips!',
      image: '/api/placeholder/300/400',
      location: 'New York, NY',
      interests: ['Travel', 'Photography', 'Cooking'],
      online: true,
      verified: true
    },
    {
      id: 2,
      name: 'Michael Chen',
      age: 32,
      bio: 'Tech enthusiast by day, chef by night. Love exploring new restaurants and hiking trails.',
      image: '/api/placeholder/300/400',
      location: 'San Francisco, CA',
      interests: ['Technology', 'Food', 'Hiking'],
      online: false,
      verified: true
    },
    {
      id: 3,
      name: 'Emma Williams',
      age: 25,
      bio: 'Artist and yoga instructor. Seeking meaningful connections and good conversations.',
      image: '/api/placeholder/300/400',
      location: 'Los Angeles, CA',
      interests: ['Art', 'Yoga', 'Meditation'],
      online: true,
      verified: false
    }
  ];

  React.useEffect(() => {
    setResults(mockProfiles);
  }, []);

  const handleSearch = () => {
    const filtered = mockProfiles.filter(profile =>
      profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.bio.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResults(filtered);
  };

  const handleLike = (profileId: string) => {
    console.log('Liked profile:', profileId);
  };

  const handlePass = (profileId: string) => {
    console.log('Passed profile:', profileId);
  };

  return (
    <Layout title="Search" subtitle="Find your perfect match">
      <div className={styles.search}>
        <div className={styles.searchHeader}>
          <div className={styles.searchBar}>
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by name, interests, or location..."
            />
            <Button
              variant="ghost"
              size="small"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter />
            </Button>
          </div>

          <div className={styles.sortOptions}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.sortSelect}
            >
              <option value="relevance">Most Relevant</option>
              <option value="newest">Newest</option>
              <option value="active">Recently Active</option>
              <option value="distance">Nearest</option>
            </select>
          </div>
        </div>

        {showFilters && (
          <div className={styles.filtersPanel}>
            <div className={styles.filterSection}>
              <h4>Age Range</h4>
              <div className={styles.ageRange}>
                <Input
                  type="text"
                  placeholder="Min age"
                />
                <span>-</span>
                <Input
                  type="text"
                  placeholder="Max age"
                />
              </div>
            </div>

            <div className={styles.filterSection}>
              <h4>Location</h4>
              <div className={styles.locationFilter}>
                <FiMapPin className={styles.locationIcon} />
                <Input
                  placeholder="City or ZIP code"
                  value=""
                  onChange={() => {}}
                />
              </div>
            </div>

            <div className={styles.filterSection}>
              <h4>Distance</h4>
              <select className={styles.distanceSelect}>
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

        <div className={styles.quickFilters}>
          <Button variant="ghost" size="small">
            <FiMapPin /> Near Me
          </Button>
          <Button variant="ghost" size="small">
            <FiCalendar /> Online Now
          </Button>
          <Button variant="ghost" size="small">
            <FiSliders /> Advanced
          </Button>
        </div>

        <div className={styles.resultsHeader}>
          <h3>Search Results</h3>
          <span className={styles.resultsCount}>{results.length} profiles found</span>
        </div>

        <div className={styles.resultsGrid}>
          {results.map((profile) => (
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
          ))}
        </div>

        {results.length === 0 && (
          <div className={styles.noResults}>
            <h3>No profiles found</h3>
            <p>Try adjusting your search criteria or filters</p>
            <Button onClick={() => setShowFilters(true)}>
              Adjust Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;
