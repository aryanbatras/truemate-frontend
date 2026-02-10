import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/pages/profile/Profile.module.css';
import { Navigation, Button, Input, ProfilePhotoUpload } from '@/components';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/lib/auth';
import { useAsyncState } from '@/hooks/useAsyncState';
import { UserProfile } from '@/types/api';
import { getImageUrl } from '@/lib/api';
import { FiCamera, FiEdit2, FiSettings, FiMapPin, FiCalendar, FiHeart, FiX, FiSave, FiUser } from 'react-icons/fi';

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('photos');
  const [success, setSuccess] = useState<string | null>(null);
  const [interestsInput, setInterestsInput] = useState('');
  const [hobbiesInput, setHobbiesInput] = useState('');
  
  const profileState = useAsyncState<UserProfile>();
  const updateState = useAsyncState<UserProfile>();

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
    await profileState.executeAsync(async () => {
      const response = await authService.getProfile();
      
      if (response.success && response.user) {
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
        return response.user;
      }
      throw new Error(response.message || 'Failed to load profile');
    });
  };

  const handleSaveProfile = async () => {
    const result = await updateState.executeAsync(async () => {
      const response = await authService.updateProfile(editForm);
      
      if (response.success) {
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
        return response.data;
      }
      throw new Error(response.message || 'Failed to update profile');
    });
    
    if (result) {
      updateUser(result);
      await fetchProfile();
    }
  };

  const handlePhotoUpdate = async () => {
    await fetchProfile();
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

  const handleTabSwitch = (tab: string) => {
    setActiveTab(tab);
    setIsEditing(false); // Reset editing state when switching tabs
  };

  const handleInterestsInputChange = (value: string) => {
    setInterestsInput(value);
    if (value.includes(',')) {
      const interests = value.split(',').map(i => i.trim()).filter(i => i);
      interests.forEach(interest => handleAddInterest(interest));
      setInterestsInput(''); // Clear input after adding
    }
  };

  const handleHobbiesInputChange = (value: string) => {
    setHobbiesInput(value);
    if (value.includes(',')) {
      const hobbies = value.split(',').map(i => i.trim()).filter(i => i);
      hobbies.forEach(hobby => handleAddHobby(hobby));
      setHobbiesInput(''); // Clear input after adding
    }
  };

  if (profileState.loading && !profileState.data) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  if (!profileState.data) {
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
          <div className={styles.profileHeader}>
            <div className={styles.profileInfo}>
              <div className={styles.profileAvatar}>
                {profileState.data.profilePhotos?.find(p => p.isMain)?.url ? (
                  <img 
                    src={getImageUrl(profileState.data.profilePhotos.find(p => p.isMain)?.url || '')}
                    alt={profileState.data.name}
                    className={styles.avatarImage}
                    onError={(e) => {
                      console.error('Avatar failed to load:', profileState.data.profilePhotos?.find(p => p.isMain)?.url);
                      const target = e.target as HTMLImageElement;
                      const mainPhotoUrl = profileState.data.profilePhotos?.find(p => p.isMain)?.url;
                      if (mainPhotoUrl) {
                        target.src = getImageUrl(mainPhotoUrl);
                      }
                    }}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    <FiUser size={40} />
                  </div>
                )}
                {profileState.data.isVerified && (
                  <div className={styles.verifiedBadge}>
                    ✓
                  </div>
                )}
              </div>
              
              <div className={styles.profileDetails}>
                <h1 className={styles.profileName}>{profileState.data.name}</h1>
                <p className={styles.profileAge}>{profileState.data.age} years old</p>
                <div className={styles.profileLocation}>
                  <FiMapPin size={16} />
                  <span>{profileState.data.location?.city}, {profileState.data.location?.country}</span>
                </div>
                <div className={styles.profileStats}>
                  <div className={styles.stat}>
                    <FiHeart size={16} />
                    <span>{profileState.data.tokens} tokens</span>
                  </div>
                  <div className={styles.stat}>
                    <span> {profileState.data.isOnline ? 'Online' : 'Offline'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.profileTabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'photos' ? styles.active : ''}`}
              onClick={() => handleTabSwitch('photos')}
            >
              <FiCamera size={16} />
              Photos
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'info' ? styles.active : ''}`}
              onClick={() => handleTabSwitch('info')}
            >
              <FiUser size={16} />
              Info
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'preferences' ? styles.active : ''}`}
              onClick={() => handleTabSwitch('preferences')}
            >
              <FiSettings size={16} />
              Preferences
            </button>
          </div>

          <div className={styles.tabContent}>
            {activeTab === 'photos' && (
              <div className={styles.photosSection}>
                <ProfilePhotoUpload 
                  photos={profileState.data.profilePhotos || []}
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
                      <Input
                        label="Name"
                        value={editForm.name}
                        onChange={(value) => setEditForm(prev => ({ ...prev, name: value }))}
                        placeholder="Your name"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>Bio</label>
                      <textarea
                        value={editForm.bio}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                        placeholder="Tell us about yourself"
                        rows={4}
                        className={styles.textarea}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>Interests</label>
                      <div className={styles.tagInput}>
                        <Input
                          value={interestsInput}
                          onChange={handleInterestsInputChange}
                          placeholder="Add interests (comma separated)"
                        />
                        <div className={styles.tags}>
                          {editForm.interests.map((interest, index) => (
                            <span key={index} className={styles.tag}>
                              {interest}
                              <button onClick={() => handleRemoveInterest(interest)}>
                                <FiX size={12} />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Hobbies</label>
                      <div className={styles.tagInput}>
                        <Input
                          value={hobbiesInput}
                          onChange={handleHobbiesInputChange}
                          placeholder="Add hobbies (comma separated)"
                        />
                        <div className={styles.tags}>
                          {editForm.hobbies.map((hobby, index) => (
                            <span key={index} className={styles.tag}>
                              {hobby}
                              <button onClick={() => handleRemoveHobby(hobby)}>
                                <FiX size={12} />
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
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEditForm(prev => ({ ...prev, lookingFor: e.target.value }))}
                        className={styles.select}
                      >
                        <option value="">Select what you're looking for</option>
                        <option value="Serious relationship">Serious relationship</option>
                        <option value="Casual dating">Casual dating</option>
                        <option value="Friendship">Friendship</option>
                        <option value="Marriage">Marriage</option>
                        <option value="Long-term relationship">Long-term relationship</option>
                        <option value="Short-term relationship">Short-term relationship</option>
                        <option value="Just exploring">Just exploring</option>
                      </select>
                    </div>

                    <div className={styles.formActions}>
                      <Button 
                        onClick={handleSaveProfile}
                        loading={updateState.loading}
                        variant="primary"
                      >
                        <FiSave size={16} />
                        Save Changes
                      </Button>
                      <Button 
                        onClick={() => setIsEditing(false)}
                        variant="secondary"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.displayInfo}>
                    <div className={styles.infoItem}>
                      <h3>Bio</h3>
                      <p>{profileState.data.bio || 'No bio added yet'}</p>
                    </div>
                    
                    <div className={styles.infoItem}>
                      <h3>Interests</h3>
                      <div className={styles.infoTags}>
                        {profileState.data.interests?.length > 0 ? (
                          profileState.data.interests.map((interest, index) => (
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
                        {profileState.data.hobbies?.length > 0 ? (
                          profileState.data.hobbies.map((hobby, index) => (
                            <span key={index} className={styles.infoTag}>{hobby}</span>
                          ))
                        ) : (
                          <p>No hobbies added yet</p>
                        )}
                      </div>
                    </div>
                    
                    <div className={styles.infoItem}>
                      <h3>Looking For</h3>
                      <p>{profileState.data.lookingFor || 'Not specified'}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className={styles.preferencesSection}>
                <div className={styles.preferencesHeader}>
                  <h2>Dating Preferences</h2>
                  <p>Set your dating preferences to find better matches</p>
                  {!isEditing && (
                    <Button 
                      onClick={() => setIsEditing(true)}
                      variant="primary"
                      size="small"
                    >
                      <FiEdit2 size={14} />
                      Edit Preferences
                    </Button>
                  )}
                </div>

                {isEditing ? (
                  <div className={styles.editForm}>
                    <div className={styles.formGroup}>
                      <label>Dating Preferences</label>
                      <div className={styles.rangeInputs}>
                        <label style={{ fontSize: '0.8rem', marginBottom: '0.25rem' }}>Age Range</label>
                        <div className={styles.rangeInputs}>
                          <input
                            type="number"
                            value={editForm.preferences.ageMin}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm(prev => ({ 
                              ...prev, 
                              preferences: { ...prev.preferences, ageMin: parseInt(e.target.value) || 18 }
                            }))}
                            placeholder="Min"
                            min="18"
                            max="100"
                            className={styles.input}
                            style={{ width: '100px' }}
                          />
                          <span>to</span>
                          <input
                            type="number"
                            value={editForm.preferences.ageMax}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm(prev => ({ 
                              ...prev, 
                              preferences: { ...prev.preferences, ageMax: parseInt(e.target.value) || 50 }
                            }))}
                            placeholder="Max"
                            min="18"
                            max="100"
                            className={styles.input}
                            style={{ width: '100px' }}
                          />
                        </div>
                      </div>
                      <div style={{ marginTop: '1rem' }}>
                        <label style={{ fontSize: '0.8rem', marginBottom: '0.25rem', display: 'block' }}>Max Distance (km)</label>
                        <input
                          type="number"
                          value={editForm.preferences.maxDistance}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm(prev => ({ 
                            ...prev, 
                            preferences: { ...prev.preferences, maxDistance: parseInt(e.target.value) || 100 }
                          }))}
                          placeholder="Distance"
                          min="1"
                          max="500"
                          className={styles.input}
                        />
                      </div>
                      <div style={{ marginTop: '1rem' }}>
                        <label style={{ fontSize: '0.8rem', marginBottom: '0.25rem', display: 'block' }}>Interested In</label>
                        <select
                          value={editForm.preferences.interestedIn}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEditForm(prev => ({ 
                            ...prev, 
                            preferences: { ...prev.preferences, interestedIn: e.target.value }
                          }))}
                          className={styles.select}
                        >
                          <option value="">Select preference</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="everyone">Everyone</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.formActions}>
                      <Button 
                        onClick={handleSaveProfile}
                        loading={updateState.loading}
                        variant="primary"
                      >
                        <FiSave size={16} />
                        Save Preferences
                      </Button>
                      <Button 
                        onClick={() => setIsEditing(false)}
                        variant="secondary"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.infoSection}>
                    <div className={styles.infoItem}>
                      <h3>Age Range</h3>
                      <p>{profileState.data.preferences?.ageMin || 18} - {profileState.data.preferences?.ageMax || 50} years</p>
                    </div>
                    <div className={styles.infoItem}>
                      <h3>Max Distance</h3>
                      <p>{profileState.data.preferences?.maxDistance || 100} km</p>
                    </div>
                    <div className={styles.infoItem}>
                      <h3>Interested In</h3>
                      <p>{profileState.data.preferences?.interestedIn || 'Not specified'}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {success && (
        <div className={styles.successMessage}>
          {success}
          <button onClick={() => setSuccess(null)}>
            <FiX size={16} />
          </button>
        </div>
      )}

      {(profileState.error.message || updateState.error.message) && (
        <div className={styles.errorMessage}>
          {profileState.error.message || updateState.error.message}
          <button onClick={() => {
            profileState.clearError();
            updateState.clearError();
          }}>
            <FiX size={16} />
          </button>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
