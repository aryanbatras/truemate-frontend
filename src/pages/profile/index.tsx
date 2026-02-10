import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/pages/profile/Profile.module.css';
import { Navigation, Button, Input } from '../../components';
import { ProfilePhotoUpload } from '../../components/profile';
import { useAuth } from '../../contexts/AuthContext';
import { authService, User } from '../../lib/auth';
import { FiCamera, FiEdit2, FiSettings, FiMapPin, FiCalendar, FiHeart, FiX, FiSave, FiUser } from 'react-icons/fi';

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('photos');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [profile, setProfile] = useState<User | null>(null);

  const [editForm, setEditForm] = useState({
    name: '',
    bio: '',
    interests: [] as string[],
    hobbies: [] as string[],
    lookingFor: '',
    location: {
      city: '',
      state: '',
      country: ''
    },
    preferences: {
      ageMin: 18,
      ageMax: 50,
      maxDistance: 100,
      interestedIn: ''
    },
    dateOfBirth: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
      return;
    }
    fetchProfile();
  }, [isAuthenticated, router]);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await authService.getProfile();
      
      if (response.success && response.user) {
        setProfile(response.user);
        setEditForm({
          name: response.user.name || '',
          bio: response.user.bio || '',
          interests: response.user.interests || [],
          hobbies: response.user.hobbies || [],
          lookingFor: response.user.lookingFor || '',
          location: response.user.location || { city: '', state: '', country: '' },
          preferences: response.user.preferences || { 
            ageMin: 18, 
            ageMax: 50, 
            maxDistance: 100, 
            interestedIn: '' 
          },
          dateOfBirth: response.user.dateOfBirth || ''
        });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await authService.updateProfile(editForm);
      
      if (response.success) {
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
        await fetchProfile(); // Refresh profile data
        
        // Update auth context if user data changed
        if (updateUser && response.data) {
          updateUser(response.data);
        }
      } else {
        setError(response.message || 'Failed to update profile');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoUpdate = async () => {
    await fetchProfile(); // Refresh profile to get updated photos
  };

  const handleAddInterest = (interest: string) => {
    if (interest && !editForm.interests.includes(interest)) {
      setEditForm(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }));
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setEditForm(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const handleAddHobby = (hobby: string) => {
    if (hobby && !editForm.hobbies.includes(hobby)) {
      setEditForm(prev => ({
        ...prev,
        hobbies: [...prev.hobbies, hobby]
      }));
    }
  };

  const handleRemoveHobby = (hobby: string) => {
    setEditForm(prev => ({
      ...prev,
      hobbies: prev.hobbies.filter(h => h !== hobby)
    }));
  };

  if (isLoading && !profile) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className={styles.errorContainer}>
        <p>Failed to load profile. Please try again.</p>
        <Button onClick={() => router.push('/')}>Go Home</Button>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className={styles.profileContainer}>
        <div className={styles.profileBackground}>
          <div className={styles.profileOverlay}></div>
        </div>
        
        <div className={styles.profileContent}>
          {/* Header */}
          <div className={styles.profileHeader}>
            <div className={styles.profileInfo}>
              <div className={styles.profileAvatar}>
                {profile.profilePhotos?.find(p => p.isMain)?.url ? (
                  <img 
                    src={profile.profilePhotos.find(p => p.isMain)?.url?.startsWith('http') 
                      ? profile.profilePhotos.find(p => p.isMain)?.url 
                      : `http://localhost:3000${profile.profilePhotos.find(p => p.isMain)?.url}`
                    } 
                    alt={profile.name}
                    className={styles.avatarImage}
                    onError={(e) => {
                      console.error('Avatar failed to load:', profile.profilePhotos?.find(p => p.isMain)?.url);
                      const target = e.target as HTMLImageElement;
                      const mainPhotoUrl = profile.profilePhotos?.find(p => p.isMain)?.url;
                      if (mainPhotoUrl) {
                        target.src = `http://localhost:3000${mainPhotoUrl}`;
                      }
                    }}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    <FiUser size={40} />
                  </div>
                )}
                {profile.isVerified && (
                  <div className={styles.verifiedBadge}>
                    ✓
                  </div>
                )}
              </div>
              
              <div className={styles.profileDetails}>
                <h1 className={styles.profileName}>{profile.name}</h1>
                <p className={styles.profileAge}>{profile.age} years old</p>
                <div className={styles.profileLocation}>
                  <FiMapPin size={6} />
                  <span>{profile.location?.city}, {profile.location?.country}</span>
                </div>
                <div className={styles.profileStats}>
                  <div className={styles.stat}>
                    <FiHeart size={16} />
                    <span>{profile.tokens} tokens</span>
                  </div>
                  <div className={styles.stat}>
                    <span> {profile.isOnline ? 'Online' : 'Offline'}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* <div className={styles.profileActions}>
              {activeTab === 'info' && (
                <Button 
                  onClick={() => {
                    setIsEditing(!isEditing);
                    // if (activeTab === 'preferences') {
                    //   setIsEditing(false);
                    // }
                  }}
                  variant={isEditing ? 'secondary' : 'primary'}
                >
                  {isEditing ? <FiX size={16} /> : <FiEdit2 size={16} />}
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              )}
            </div> */}
          </div>

          {/* Tabs */}
          <div className={styles.profileTabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'photos' ? styles.active : ''}`}
              onClick={() => {
                setActiveTab('photos');
                setIsEditing(false);
              }}
            >
              <FiCamera size={16} />
              Photos
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'info' ? styles.active : ''}`}
              onClick={() => {
                setActiveTab('info');
                setIsEditing(false);
              }}
            >
              <FiUser size={16} />
              Information
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'preferences' ? styles.active : ''}`}
              onClick={() => {
                setActiveTab('preferences');
                setIsEditing(false);
              }}
            >
              <FiSettings size={16} />
              Preferences
            </button>
          </div>

          {/* Content */}
          <div className={styles.tabContent}>
            {activeTab === 'photos' && (
              <div className={styles.photosSection}>
                <ProfilePhotoUpload 
                  photos={profile.profilePhotos || []}
                  onPhotoUpdate={handlePhotoUpdate}
                />
              </div>
            )}

            {activeTab === 'info' && (
              <div className={styles.infoSection}>
                <div className={styles.infoHeader}>
                  <h2>Profile Information</h2>
                  {!isEditing && (
                    <Button 
                      onClick={() => setIsEditing(true)}
                      variant="primary"
                      size="small"
                    >
                      <FiEdit2 size={14} />
                      Edit Profile
                    </Button>
                  )}
                </div>
                {isEditing ? (
                  <div className={styles.editForm}>
                    <div className={styles.formGroup}>
                      <label>Name</label>
                      <Input
                        value={editForm.name}
                        onChange={(value) => setEditForm(prev => ({ ...prev, name: value }))}
                        placeholder="Your name"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>Bio</label>
                      <textarea
                        value={editForm.bio}
                        onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                        placeholder="Tell us about yourself..."
                        className={styles.textarea}
                        rows={4}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>Interests</label>
                      <div className={styles.tagInput}>
                        <input
                          type="text"
                          placeholder="Add interest..."
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddInterest((e.target as HTMLInputElement).value);
                              (e.target as HTMLInputElement).value = '';
                            }
                          }}
                          className={`${styles.input} ${styles.tagInputField}`}
                        />
                        <div className={styles.tags}>
                          {editForm.interests.map((interest, index) => (
                            <span key={index} className={styles.tag}>
                              {interest}
                              <button 
                                onClick={() => handleRemoveInterest(interest)}
                                className={styles.removeTag}
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Hobbies</label>
                      <div className={styles.tagInput}>
                        <input
                          type="text"
                          placeholder="Add hobby..."
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddHobby((e.target as HTMLInputElement).value);
                              (e.target as HTMLInputElement).value = '';
                            }
                          }}
                          className={styles.input}
                        />
                        <div className={styles.tags}>
                          {editForm.hobbies.map((hobby, index) => (
                            <span key={index} className={styles.tag}>
                              {hobby}
                              <button 
                                onClick={() => handleRemoveHobby(hobby)}
                                className={styles.removeTag}
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Looking For</label>
                      <select
                        value={editForm.lookingFor}
                        onChange={(e) => setEditForm(prev => ({ ...prev, lookingFor: e.target.value }))}
                        className={styles.select}
                      >
                        <option value="">Select...</option>
                        <option value="Serious relationship">Serious relationship</option>
                        <option value="Casual dating">Casual dating</option>
                        <option value="Friendship">Friendship</option>
                        <option value="Marriage">Marriage</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Location</label>
                      <div className={styles.locationInputs}>
                        <Input
                          value={editForm.location.city}
                          onChange={(value) => setEditForm(prev => ({ 
                            ...prev, 
                            location: { ...prev.location, city: value } 
                          }))}
                          placeholder="City"
                        />
                        <Input
                          value={editForm.location.state}
                          onChange={(value) => setEditForm(prev => ({ 
                            ...prev, 
                            location: { ...prev.location, state: value } 
                          }))}
                          placeholder="State"
                        />
                        <Input
                          value={editForm.location.country}
                          onChange={(value) => setEditForm(prev => ({ 
                            ...prev, 
                            location: { ...prev.location, country: value } 
                          }))}
                          placeholder="Country"
                        />
                      </div>
                    </div>

                    <div className={styles.formActions}>
                      <Button 
                        onClick={handleSaveProfile}
                        disabled={isLoading}
                        loading={isLoading}
                      >
                        <FiSave size={16} />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.displayInfo}>
                    <div className={styles.infoItem}>
                      <h3>Bio</h3>
                      <p>{profile.bio || 'No bio added yet'}</p>
                    </div>
                    
                    <div className={styles.infoItem}>
                      <h3>Interests</h3>
                      <div className={styles.infoTags}>
                        {profile.interests?.length > 0 ? (
                          profile.interests.map((interest, index) => (
                            <span key={index} className={styles.infoTag}>{interest}</span>
                          ))
                        ) : (
                          <p>No interests added yet</p>
                        )}
                      </div>
                    </div>
                    
                    <div className={styles.infoItem}>
                      <h3>Hobbies</h3>
                      <div className={styles.infoTags}>
                        {profile.hobbies?.length > 0 ? (
                          profile.hobbies.map((hobby, index) => (
                            <span key={index} className={styles.infoTag}>{hobby}</span>
                          ))
                        ) : (
                          <p>No hobbies added yet</p>
                        )}
                      </div>
                    </div>
                    
                    <div className={styles.infoItem}>
                      <h3>Looking For</h3>
                      <p>{profile.lookingFor || 'Not specified'}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className={styles.preferencesSection}>
                <div className={styles.preferencesHeader}>
                  <h2>Dating Preferences</h2>
                  <Button 
                    onClick={() => setIsEditing(!isEditing)}
                    variant={isEditing ? 'secondary' : 'primary'}
                    size="small"
                  >
                    {isEditing ? <FiX size={14} /> : <FiEdit2 size={14} />}
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </div>
                
                {isEditing ? (
                  <div className={styles.editForm}>
                    <div className={styles.formGroup}>
                      <label>Interested In</label>
                      <select
                        value={editForm.preferences.interestedIn}
                        onChange={(e) => setEditForm(prev => ({ 
                          ...prev, 
                          preferences: { ...prev.preferences, interestedIn: e.target.value } 
                        }))}
                        className={styles.select}
                      >
                        <option value="">Select...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Age Range</label>
                      <div className={styles.rangeInputs}>
                          <input
                            type="number"
                            value={editForm.preferences.ageMin}
                            onChange={(e) => setEditForm(prev => ({ 
                              ...prev, 
                              preferences: { ...prev.preferences, ageMin: parseInt(e.target.value) || 18 } 
                            }))}
                            placeholder="Min age"
                            className={styles.input}
                          />
                        <span>to</span>
                        <input
                            type="number"
                            value={editForm.preferences.ageMax}
                            onChange={(e) => setEditForm(prev => ({ 
                              ...prev, 
                              preferences: { ...prev.preferences, ageMax: parseInt(e.target.value) || 50 } 
                            }))}
                            placeholder="Max age"
                            className={styles.input}
                          />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Maximum Distance</label>
                      <input
                        type="number"
                        value={editForm.preferences.maxDistance}
                        onChange={(e) => setEditForm(prev => ({ 
                          ...prev, 
                          preferences: { ...prev.preferences, maxDistance: parseInt(e.target.value) || 100 } 
                        }))}
                        placeholder="Maximum distance (km)"
                        className={styles.input}
                      />
                    </div>

                      <div className={styles.formActions}>
                        <Button 
                          onClick={handleSaveProfile}
                          disabled={isLoading}
                          loading={isLoading}
                        >
                          <FiSave size={16} />
                          Save Preferences
                        </Button>
                      </div>
                    </div>
                ) : (
                  <div className={styles.displayInfo}>
                    <div className={styles.infoItem}>
                      <h3>Interested In</h3>
                      <p>{editForm.preferences.interestedIn || 'Not specified'}</p>
                    </div>
                    
                    <div className={styles.infoItem}>
                      <h3>Age Range</h3>
                      <p>{editForm.preferences.ageMin} - {editForm.preferences.ageMax} years</p>
                    </div>
                    
                    <div className={styles.infoItem}>
                      <h3>Maximum Distance</h3>
                      <p>{editForm.preferences.maxDistance} km</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Messages */}
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}
          
          {success && (
            <div className={styles.successMessage}>
              {success}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
