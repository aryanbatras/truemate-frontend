import React, { useState, useRef } from 'react';
import { authService } from '../../lib/auth';
import { FiCamera, FiTrash2, FiStar, FiUpload } from 'react-icons/fi';
import Button from '../ui/Button';
import styles from '../../styles/pages/profile/ProfilePhotoUpload.module.css';

interface ProfilePhotoUploadProps {
  photos: Array<{
    url: string;
    isMain: boolean;
    isVerified: boolean;
    id?: string;
    _id?: string;
  }>;
  onPhotoUpdate: () => void;
}

const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({ photos, onPhotoUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      setError('Image size must be less than 5MB');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.uploadProfilePhoto(file);
      
      if (response.success) {
        onPhotoUpdate();
      } else {
        setError(response.message || 'Failed to upload photo');
      }
    } catch (err) {
      setError('Failed to upload photo. Please try again.');
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeletePhoto = async (photo: { url: string; isMain: boolean; isVerified: boolean; id?: string; _id?: string }) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;

    setIsLoading(true);
    setError(null);

    try {
      // Use MongoDB _id if available, otherwise fallback to filename
      const photoId = photo._id || photo.id || photo.url.split('/').pop() || '';
      
      // console.log('Attempting to delete photo with ID:', photoId, 'from URL:', photo.url, 'available IDs:', { _id: photo._id, id: photo.id });
      
      const response = await authService.deleteProfilePhoto(photoId);
      
      if (response.success) {
        onPhotoUpdate();
      } else {
        setError(response.message || 'Failed to delete photo');
      }
    } catch (err) {
      console.error('Delete photo error:', err);
      setError('Failed to delete photo. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetMainPhoto = async (photo: { url: string; isMain: boolean; isVerified: boolean; id?: string; _id?: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      // Use MongoDB _id if available, otherwise fallback to filename
      const photoId = photo._id || photo.id || photo.url.split('/').pop() || '';
      
      // console.log('Attempting to set main photo with ID:', photoId, 'from URL:', photo.url, 'available IDs:', { _id: photo._id, id: photo.id });
      
      const response = await authService.setMainProfilePhoto(photoId);
      
      if (response.success) {
        onPhotoUpdate();
      } else {
        setError(response.message || 'Failed to set main photo');
      }
    } catch (err) {
      console.error('Set main photo error:', err);
      setError('Failed to set main photo. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.photoUploadContainer}>
      <div className={styles.photoHeader}>
        <h3 className={styles.photoTitle}>Profile Photos</h3>
        <Button
          variant="primary"
          size="small"
          onClick={triggerFileInput}
          loading={isLoading}
          className={styles.uploadButton}
        >
          <FiUpload size={14} />
          Add Photo
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className={styles.fileInput}
        />
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.photoGrid}>
        {photos.length === 0 ? (
          <div className={styles.noPhotos}>
            <FiCamera size={48} />
            <p>No photos yet</p>
            <p className={styles.noPhotosHint}>Add photos to get more matches!</p>
          </div>
        ) : (
          photos.map((photo, index) => (
            <div key={photo.id || index} className={styles.photoItem}>
              <div className={styles.photoWrapper}>
                <img
                  src={photo.url.startsWith('http') ? photo.url : `http://localhost:3000${photo.url}`}
                  alt={`Profile photo ${index + 1}`}
                  className={styles.photoImage}
                  onError={(e) => {
                    console.error('Image failed to load:', photo.url);
                    const target = e.target as HTMLImageElement;
                    target.src = `http://localhost:3000${photo.url}`;
                  }}
                />
                
                <div className={styles.photoOverlay}>
                  <div className={styles.photoActions}>
                    {!photo.isMain && (
                      <button
                        className={styles.actionButton}
                        onClick={() => handleSetMainPhoto(photo)}
                        title="Set as main photo"
                      >
                        <FiStar size={16} />
                      </button>
                    )}
                    <button
                      className={styles.actionButton}
                      onClick={() => handleDeletePhoto(photo)}
                      title="Delete photo"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>

                {photo.isMain && (
                  <div className={styles.mainPhotoBadge}>
                    <FiStar size={12} />
                    Main
                  </div>
                )}

                {photo.isVerified && (
                  <div className={styles.verifiedBadge}>
                    ✓ Verified
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className={styles.photoTips}>
        <h4>Photo Tips:</h4>
        <ul>
          <li>Use clear, recent photos</li>
          <li>Show your face clearly</li>
          <li>Add photos that show your interests</li>
          <li>Avoid group photos</li>
          <li>Maximum file size: 5MB</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;
