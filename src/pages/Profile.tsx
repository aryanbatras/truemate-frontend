import React, { useState } from 'react';
import styles from './Profile.module.css';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { 
  FiEdit2, 
  FiCamera, 
  FiTrash2, 
  FiStar,
  FiSettings,
  FiShield,
  FiBell,
  FiLock,
  FiLogOut,
  FiHeart,
  FiMapPin,
  FiCalendar,
  FiUser,
  FiPlus,
  FiCheck
} from 'react-icons/fi';

interface Photo {
  id: string;
  url: string;
  isMain: boolean;
}

const mockProfile = {
  id: '1',
  name: 'John Doe',
  age: 28,
  bio: 'Adventure seeker, coffee lover, and dog mom. Looking for someone to explore the world with! 🌍✈️',
  location: 'New York, NY',
  joinDate: 'January 2024',
  photos: [
    { id: '1', url: '/api/placeholder/200/200', isMain: true },
    { id: '2', url: '/api/placeholder/200/200', isMain: false },
    { id: '3', url: '/api/placeholder/200/200', isMain: false },
    { id: '4', url: '/api/placeholder/200/200', isMain: false }
  ] as Photo[],
  interests: ['Travel', 'Photography', 'Cooking', 'Hiking', 'Music', 'Reading'],
  stats: {
    matches: 127,
    likes: 842,
    messages: 156
  },
  preferences: {
    ageMin: 22,
    ageMax: 35,
    maxDistance: 50,
    interestedIn: 'female'
  }
};

const Profile: React.FC = () => {
  const [profile, setProfile] = useState(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editBio, setEditBio] = useState(profile.bio);
  const [notifications, setNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState(true);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setProfile(prev => ({ ...prev, bio: editBio }));
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditBio(profile.bio);
    setIsEditing(false);
  };

  const handlePhotoUpload = () => {
    console.log('Upload photo clicked');
  };

  const handleDeletePhoto = (photoId: string) => {
    setProfile(prev => ({
      ...prev,
      photos: prev.photos.filter(p => p.id !== photoId)
    }));
  };

  const handleSetMainPhoto = (photoId: string) => {
    setProfile(prev => ({
      ...prev,
      photos: prev.photos.map(p => ({
        ...p,
        isMain: p.id === photoId
      }))
    }));
  };

  const handleAddInterest = () => {
    const newInterest = prompt('Enter new interest:');
    if (newInterest && !profile.interests.includes(newInterest)) {
      setProfile(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest]
      }));
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const handlePreferenceChange = (key: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  return (
    <Layout title="Profile" subtitle="Manage your profile and settings">
      <div className={styles.profile}>
        <div className={styles.profileHeader}>
          <div className={styles.profileContent}>
            <div className={styles.profileAvatarContainer}>
              <img
                src={profile.photos[0]?.url || '/api/placeholder/120/120'}
                alt={profile.name}
                className={styles.profileAvatar}
              />
              <button className={styles.editAvatarButton} onClick={handlePhotoUpload}>
                <FiCamera size={16} />
              </button>
            </div>
            
            <h1 className={styles.profileName}>{profile.name}, {profile.age}</h1>
            <p className={styles.profileAge}>
              <FiMapPin size={14} style={{ marginRight: '4px' }} />
              {profile.location}
            </p>
            
            {isEditing ? (
              <div style={{ maxWidth: '500px', margin: '0 auto 24px' }}>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className={styles.formInput}
                  rows={3}
                  style={{ resize: 'vertical' }}
                />
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px' }}>
                  <Button onClick={handleSaveProfile}>Save</Button>
                  <Button variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
                </div>
              </div>
            ) : (
              <p className={styles.profileBio}>{profile.bio}</p>
            )}
            
            <div className={styles.profileActions}>
              {!isEditing && (
                <Button onClick={handleEditProfile}>
                  <FiEdit2 size={16} />
                  Edit Profile
                </Button>
              )}
              <Button variant="secondary">
                <FiSettings size={16} />
                Settings
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.profileStats}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{profile.stats.matches}</span>
            <span className={styles.statLabel}>Matches</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{profile.stats.likes}</span>
            <span className={styles.statLabel}>Likes</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{profile.stats.messages}</span>
            <span className={styles.statLabel}>Messages</span>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <FiCamera className={styles.sectionIcon} />
            Photos
          </h2>
          <div className={styles.photoGallery}>
            {profile.photos.map((photo) => (
              <div key={photo.id} className={styles.photoItem}>
                {photo.isMain && (
                  <div className={styles.mainPhotoBadge}>Main</div>
                )}
                <img src={photo.url} alt="Profile" className={styles.photoImage} />
                <div className={styles.photoActions}>
                  {!photo.isMain && (
                    <button
                      className={styles.photoActionButton}
                      onClick={() => handleSetMainPhoto(photo.id)}
                      title="Set as main photo"
                    >
                      <FiStar size={14} />
                    </button>
                  )}
                  <button
                    className={styles.photoActionButton}
                    onClick={() => handleDeletePhoto(photo.id)}
                    title="Delete photo"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
            <div className={styles.addPhoto} onClick={handlePhotoUpload}>
              <div className={styles.addPhotoIcon}>
                <FiPlus size={24} />
              </div>
              <div className={styles.addPhotoText}>Add Photo</div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <FiHeart className={styles.sectionIcon} />
            Interests
          </h2>
          <div className={styles.interestsGrid}>
            {profile.interests.map((interest) => (
              <div
                key={interest}
                className={styles.interestTag}
                onClick={() => handleRemoveInterest(interest)}
              >
                {interest}
              </div>
            ))}
            <div className={`${styles.interestTag} ${styles.addInterest}`} onClick={handleAddInterest}>
              <FiPlus size={14} style={{ marginRight: '4px' }} />
              Add Interest
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <FiSettings className={styles.sectionIcon} />
            Preferences
          </h2>
          <div className={styles.preferencesForm}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Age Range</label>
              <div className={styles.formRange}>
                <span>{profile.preferences.ageMin}</span>
                <input
                  type="range"
                  min="18"
                  max="50"
                  value={profile.preferences.ageMin}
                  onChange={(e) => handlePreferenceChange('ageMin', parseInt(e.target.value))}
                  className={styles.rangeInput}
                />
                <input
                  type="range"
                  min="18"
                  max="50"
                  value={profile.preferences.ageMax}
                  onChange={(e) => handlePreferenceChange('ageMax', parseInt(e.target.value))}
                  className={styles.rangeInput}
                />
                <span>{profile.preferences.ageMax}</span>
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Maximum Distance</label>
              <div className={styles.formRange}>
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={profile.preferences.maxDistance}
                  onChange={(e) => handlePreferenceChange('maxDistance', parseInt(e.target.value))}
                  className={styles.rangeInput}
                />
                <span className={styles.rangeValue}>{profile.preferences.maxDistance} km</span>
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Interested In</label>
              <select
                value={profile.preferences.interestedIn}
                onChange={(e) => handlePreferenceChange('interestedIn', e.target.value)}
                className={styles.formSelect}
              >
                <option value="female">Women</option>
                <option value="male">Men</option>
                <option value="both">Everyone</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <FiSettings className={styles.sectionIcon} />
            Settings
          </h2>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <FiBell className={styles.settingIcon} />
                <div className={styles.settingDetails}>
                  <div className={styles.settingTitle}>Push Notifications</div>
                  <div className={styles.settingDescription}>Get notified about new matches and messages</div>
                </div>
              </div>
              <div
                className={`${styles.settingToggle} ${notifications ? styles.active : ''}`}
                onClick={() => setNotifications(!notifications)}
              >
                <div className={styles.toggleSlider} />
              </div>
            </div>
            
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <FiMapPin className={styles.settingIcon} />
                <div className={styles.settingDetails}>
                  <div className={styles.settingTitle}>Location Sharing</div>
                  <div className={styles.settingDescription}>Share your location with potential matches</div>
                </div>
              </div>
              <div
                className={`${styles.settingToggle} ${locationSharing ? styles.active : ''}`}
                onClick={() => setLocationSharing(!locationSharing)}
              >
                <div className={styles.toggleSlider} />
              </div>
            </div>
            
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <FiUser className={styles.settingIcon} />
                <div className={styles.settingDetails}>
                  <div className={styles.settingTitle}>Profile Visibility</div>
                  <div className={styles.settingDescription}>Make your profile visible to other users</div>
                </div>
              </div>
              <div
                className={`${styles.settingToggle} ${profileVisibility ? styles.active : ''}`}
                onClick={() => setProfileVisibility(!profileVisibility)}
              >
                <div className={styles.toggleSlider} />
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.section} ${styles.dangerZone}`}>
          <h2 className={styles.sectionTitle}>
            <FiShield className={styles.sectionIcon} />
            Privacy & Security
          </h2>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <FiLock className={styles.settingIcon} />
                <div className={styles.settingDetails}>
                  <div className={styles.settingTitle}>Change Password</div>
                  <div className={styles.settingDescription}>Update your account password</div>
                </div>
              </div>
              <Button variant="secondary" size="small">
                Change
              </Button>
            </div>
            
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <FiLogOut className={styles.settingIcon} />
                <div className={styles.settingDetails}>
                  <div className={styles.settingTitle}>Log Out</div>
                  <div className={styles.settingDescription}>Sign out of your account</div>
                </div>
              </div>
              <Button variant="ghost" size="small">
                Log Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
