import React from 'react';
import styles from '../../styles/Profile.module.css';
import Navigation from '../../components/Navigation';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { FiCamera, FiEdit2, FiSettings, FiMapPin, FiCalendar, FiHeart, FiX } from 'react-icons/fi';

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('photos');

  const [profile, setProfile] = React.useState({
    name: 'John Doe',
    age: 28,
    bio: 'Adventure seeker, coffee lover, and dog mom. Looking for someone who can keep up with my spontaneous trips!',
    location: 'New York, NY',
    job: 'Software Engineer',
    education: 'Bachelor\'s in Computer Science',
    interests: ['Travel', 'Photography', 'Cooking', 'Hiking'],
    photos: [
      '/api/placeholder/400/400',
      '/api/placeholder/400/400',
      '/api/placeholder/400/400',
      '/api/placeholder/400/400'
    ],
    preferences: {
      ageRange: { min: 25, max: 35 },
      maxDistance: 50,
      relationshipType: 'Serious',
      interests: ['Travel', 'Music', 'Food']
    }
  });

  const handleSaveProfile = () => {
    console.log('Saving profile:', profile);
    setIsEditing(false);
  };

  const handlePhotoUpload = () => {
    console.log('Uploading photo...');
  };

  const handleAddInterest = () => {
    const newInterest = prompt('Add new interest:');
    if (newInterest) {
      setProfile(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest]
      }));
    }
  };

  const handleRemoveInterest = (index: number) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index)
    }));
  };

  return (
    <>
      <Navigation />
      <div className={styles.profile}>
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
              Your <span className={styles.highlight}>Profile</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Manage your profile and find your perfect match
            </p>
          </div>
        </div>

        <div className={styles.contentSection}>
        <div className={styles.profileHeader}>
          <div className={styles.profileInfo}>
            <div className={styles.avatarSection}>
              <img
                src="/api/placeholder/150/150"
                alt="Profile"
                className={styles.avatar}
              />
              <Button
                variant="ghost"
                size="small"
                className={styles.cameraButton}
                onClick={handlePhotoUpload}
              >
                <FiCamera />
              </Button>
            </div>
            
            <div className={styles.basicInfo}>
              {isEditing ? (
                <div className={styles.editForm}>
                  <Input
                    type="text"
                    placeholder="Name"
                    value={profile.name}
                    onChange={(value) => setProfile(prev => ({ ...prev, name: value }))}
                  />
                  <Input
                    type="text"
                    placeholder="Age"
                    value={profile.age.toString()}
                    onChange={(value) => setProfile(prev => ({ ...prev, age: parseInt(value) || 0 }))}
                  />
                  <Input
                    type="text"
                    placeholder="Location"
                    value={profile.location}
                    onChange={(value) => setProfile(prev => ({ ...prev, location: value }))}
                  />
                </div>
              ) : (
                <div className={styles.displayInfo}>
                  <h2 className={styles.profileName}>{profile.name}, {profile.age}</h2>
                  <div className={styles.profileLocation}>
                    <FiMapPin className={styles.locationIcon} />
                    {profile.location}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={styles.profileActions}>
            {isEditing ? (
              <Button onClick={handleSaveProfile}>
                Save Profile
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <FiEdit2 /> Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div className={styles.profileTabs}>
          {['photos', 'info', 'preferences', 'settings'].map((tab) => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className={styles.profileContent}>
          {activeTab === 'photos' && (
            <div className={styles.photosSection}>
              <div className={styles.photosGrid}>
                {profile.photos.map((photo, index) => (
                  <div key={index} className={styles.photoItem}>
                    <img src={photo} alt={`Photo ${index + 1}`} />
                    <Button
                      variant="ghost"
                      size="small"
                      className={styles.deletePhoto}
                    >
                      <FiX />
                    </Button>
                  </div>
                ))}
                <div className={styles.addPhoto}>
                  <Button variant="ghost" onClick={handlePhotoUpload}>
                    <FiCamera /> Add Photo
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'info' && (
            <div className={styles.infoSection}>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <h4>Bio</h4>
                  {isEditing ? (
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                      className={styles.bioTextarea}
                      rows={4}
                    />
                  ) : (
                    <p>{profile.bio}</p>
                  )}
                </div>

                <div className={styles.infoItem}>
                  <h4>Job</h4>
                  {isEditing ? (
                    <Input
                      type="text"
                      value={profile.job}
                      onChange={(value) => setProfile(prev => ({ ...prev, job: value }))}
                    />
                  ) : (
                    <p>{profile.job}</p>
                  )}
                </div>

                <div className={styles.infoItem}>
                  <h4>Education</h4>
                  {isEditing ? (
                    <Input
                      type="text"
                      value={profile.education}
                      onChange={(value) => setProfile(prev => ({ ...prev, education: value }))}
                    />
                  ) : (
                    <p>{profile.education}</p>
                  )}
                </div>

                <div className={styles.infoItem}>
                  <h4>Interests</h4>
                  <div className={styles.interestsList}>
                    {profile.interests.map((interest, index) => (
                      <span key={index} className={styles.interestTag}>
                        {interest}
                        {isEditing && (
                          <button
                            className={styles.removeInterest}
                            onClick={() => handleRemoveInterest(index)}
                          >
                            <FiX size={12} />
                          </button>
                        )}
                      </span>
                    ))}
                    {isEditing && (
                      <Button variant="ghost" size="small" onClick={handleAddInterest}>
                        + Add Interest
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className={styles.preferencesSection}>
              <div className={styles.preferencesGrid}>
                <div className={styles.preferenceItem}>
                  <h4>Age Range</h4>
                  <div className={styles.ageRange}>
                    <Input
                      type="text"
                      placeholder="Min"
                      value={profile.preferences.ageRange.min.toString()}
                      onChange={(value) => setProfile(prev => ({
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          ageRange: { ...prev.preferences.ageRange, min: parseInt(value) || 18 }
                        }
                      }))}
                    />
                    <span>-</span>
                    <Input
                      type="text"
                      placeholder="Max"
                      value={profile.preferences.ageRange.max.toString()}
                      onChange={(value) => setProfile(prev => ({
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          ageRange: { ...prev.preferences.ageRange, max: parseInt(value) || 100 }
                        }
                      }))}
                    />
                  </div>
                </div>

                <div className={styles.preferenceItem}>
                  <h4>Max Distance</h4>
                  <select
                    value={profile.preferences.maxDistance}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        maxDistance: parseInt(e.target.value)
                      }
                    }))}
                    className={styles.distanceSelect}
                  >
                    <option value={10}>10 miles</option>
                    <option value={25}>25 miles</option>
                    <option value={50}>50 miles</option>
                    <option value={100}>100 miles</option>
                  </select>
                </div>

                <div className={styles.preferenceItem}>
                  <h4>Relationship Type</h4>
                  <select
                    value={profile.preferences.relationshipType}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        relationshipType: e.target.value
                      }
                    }))}
                    className={styles.relationshipSelect}
                  >
                    <option value="Casual">Casual</option>
                    <option value="Serious">Serious</option>
                    <option value="Marriage">Marriage</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className={styles.settingsSection}>
              <div className={styles.settingsGrid}>
                <div className={styles.settingItem}>
                  <h4>Privacy</h4>
                  <div className={styles.settingOptions}>
                    <label className={styles.settingOption}>
                      <input type="checkbox" defaultChecked />
                      <span>Profile visible to everyone</span>
                    </label>
                    <label className={styles.settingOption}>
                      <input type="checkbox" defaultChecked />
                      <span>Show online status</span>
                    </label>
                    <label className={styles.settingOption}>
                      <input type="checkbox" />
                      <span>Allow messages from anyone</span>
                    </label>
                  </div>
                </div>

                <div className={styles.settingItem}>
                  <h4>Notifications</h4>
                  <div className={styles.settingOptions}>
                    <label className={styles.settingOption}>
                      <input type="checkbox" defaultChecked />
                      <span>New matches</span>
                    </label>
                    <label className={styles.settingOption}>
                      <input type="checkbox" defaultChecked />
                      <span>Messages</span>
                    </label>
                    <label className={styles.settingOption}>
                      <input type="checkbox" />
                      <span>Profile views</span>
                    </label>
                  </div>
                </div>

                <div className={styles.settingItem}>
                  <h4>Account</h4>
                  <div className={styles.settingActions}>
                    <Button variant="secondary">Change Password</Button>
                    <Button variant="secondary">Two-Factor Auth</Button>
                    <Button variant="ghost">Delete Account</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
