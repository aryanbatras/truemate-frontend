import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Navigation, Button } from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import { authService, BlockedUser, UserStats } from '../../lib/auth';
import { FiSettings, FiUsers, FiShield, FiTrash2, FiEye, FiHeart, FiMessageCircle, FiTrendingUp, FiCalendar, FiMapPin, FiDollarSign, FiUserX } from 'react-icons/fi';
import styles from '../../styles/pages/settings/Settings.module.css';

const SettingsPage: NextPage = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);
  const [activeTab, setActiveTab] = useState<'stats' | 'blocked'>('stats');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
      return;
    }

    loadUserData();
  }, [isAuthenticated, router]);

  const loadUserData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [statsResponse, blockedResponse] = await Promise.all([
        authService.getUserStats(),
        authService.getBlockedUsers()
      ]);

      if (statsResponse.success && statsResponse.stats) {
        setUserStats(statsResponse.stats);
      }

      if (blockedResponse.success && blockedResponse.users) {
        setBlockedUsers(blockedResponse.users);
      }
    } catch (err: any) {
      setError('Failed to load user data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlockUser = async (userId: string, userName: string) => {
    try {
      setIsLoading(true);
      const response = await authService.blockUser(userId);
      
      if (response.success) {
        setSuccess(`${userName} has been blocked`);
        // Refresh blocked users list
        const blockedResponse = await authService.getBlockedUsers();
        if (blockedResponse.success && blockedResponse.users) {
          setBlockedUsers(blockedResponse.users);
        }
      } else {
        setError(response.message || 'Failed to block user');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to block user');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnblockUser = async (userId: string, userName: string) => {
    try {
      setIsLoading(true);
      const response = await authService.unblockUser(userId);
      
      if (response.success) {
        setSuccess(`${userName} has been unblocked`);
        // Refresh blocked users list
        const blockedResponse = await authService.getBlockedUsers();
        if (blockedResponse.success && blockedResponse.users) {
          setBlockedUsers(blockedResponse.users);
        }
      } else {
        setError(response.message || 'Failed to unblock user');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to unblock user');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className={styles.settingsContainer}>
        <div className={styles.settingsBackground}>
          <div className={styles.settingsOverlay}></div>
        </div>
        
        <div className={styles.settingsContent}>
          {/* Header */}
          <div className={styles.settingsHeader}>
            <div className={styles.settingsInfo}>
              <h1 className={styles.settingsTitle}>
                <FiSettings size={24} />
                Settings
              </h1>
              <p className={styles.settingsSubtitle}>
                Manage your account settings and preferences
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className={styles.settingsTabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'stats' ? styles.active : ''}`}
              onClick={() => setActiveTab('stats')}
            >
              <FiTrendingUp size={16} />
              Statistics
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'blocked' ? styles.active : ''}`}
              onClick={() => setActiveTab('blocked')}
            >
              <FiShield size={16} />
              Blocked Users
            </button>
          </div>

          {/* Content */}
          <div className={styles.tabContent}>
            {activeTab === 'stats' && userStats && (
              <div className={styles.statsSection}>
                <div className={styles.statsGrid}>
                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                      <FiUsers size={24} />
                    </div>
                    <div className={styles.statInfo}>
                      <h3>Total Matches</h3>
                      <p className={styles.statNumber}>{userStats.totalMatches}</p>
                    </div>
                  </div>

                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                      <FiHeart size={24} />
                    </div>
                    <div className={styles.statInfo}>
                      <h3>Connections</h3>
                      <p className={styles.statNumber}>{userStats.totalConnections}</p>
                    </div>
                  </div>

                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                      <FiShield size={24} />
                    </div>
                    <div className={styles.statInfo}>
                      <h3>Blocked Users</h3>
                      <p className={styles.statNumber}>{userStats.totalBlocked}</p>
                    </div>
                  </div>

                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                      <FiEye size={24} />
                    </div>
                    <div className={styles.statInfo}>
                      <h3>Profile Views</h3>
                      <p className={styles.statNumber}>{userStats.profileViews}</p>
                    </div>
                  </div>

                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                      <FiDollarSign size={24} />
                    </div>
                    <div className={styles.statInfo}>
                      <h3>Tokens Earned</h3>
                      <p className={styles.statNumber}>{userStats.tokensEarned}</p>
                    </div>
                  </div>

                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                      <FiMessageCircle size={24} />
                    </div>
                    <div className={styles.statInfo}>
                      <h3>Tokens Spent</h3>
                      <p className={styles.statNumber}>{userStats.tokensSpent}</p>
                    </div>
                  </div>

                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                      <FiCalendar size={24} />
                    </div>
                    <div className={styles.statInfo}>
                      <h3>Account Age</h3>
                      <p className={styles.statNumber}>{userStats.accountAge}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'blocked' && (
              <div className={styles.blockedSection}>
                {blockedUsers.length === 0 ? (
                  <div className={styles.emptyState}>
                    <FiShield size={48} />
                    <h3>No Blocked Users</h3>
                    <p>You haven't blocked any users yet.</p>
                  </div>
                ) : (
                  <div className={styles.blockedList}>
                    <h3>Blocked Users ({blockedUsers.length})</h3>
                    <div className={styles.blockedUsersGrid}>
                      {blockedUsers.map((blockedUser) => (
                        <div key={blockedUser.id} className={styles.blockedUserCard}>
                          <div className={styles.blockedUserInfo}>
                            <div className={styles.blockedAvatar}>
                              {blockedUser.profilePhotos?.find(p => p.isMain)?.url ? (
                                <img 
                                  src={blockedUser.profilePhotos.find(p => p.isMain)?.url} 
                                  alt={blockedUser.name}
                                  className={styles.blockedAvatarImage}
                                />
                              ) : (
                                <div className={styles.blockedAvatarPlaceholder}>
                                  <FiUserX size={20} />
                                </div>
                              )}
                            </div>
                            
                            <div className={styles.blockedDetails}>
                              <h4>{blockedUser.name}</h4>
                              <p>{blockedUser.email}</p>
                              <div className={styles.blockedMeta}>
                                <span className={styles.blockedAge}>{blockedUser.age} years old</span>
                                <span className={styles.blockedGender}>{blockedUser.gender}</span>
                                <span className={styles.blockedDate}>
                                  Blocked on {new Date(blockedUser.blockedAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className={styles.blockedActions}>
                            <Button 
                              onClick={() => handleUnblockUser(blockedUser.id, blockedUser.name)}
                              variant="secondary"
                              size="small"
                              disabled={isLoading}
                            >
                              Unblock
                            </Button>
                          </div>
                        </div>
                      ))}
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

          {/* Loading Overlay */}
          {isLoading && (
            <div className={styles.loadingOverlay}>
              <div className={styles.loadingSpinner}></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
