import React from 'react';
import styles from '../../styles/components/ui/Card.module.css';
import { FiHeart, FiX, FiGift } from 'react-icons/fi';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface ProfileCardProps {
  profile: {
    id: string;
    name: string;
    age: number;
    bio: string;
    photos: string[];
    isOnline?: boolean;
    isVerified?: boolean;
  };
  onLike?: (id: string) => void;
  onPass?: (id: string) => void;
  onClick?: (id: string) => void;
}

interface GiftCardProps {
  gift: {
    id: string;
    name: string;
    icon: string;
    price: number;
  };
  onSelect?: (gift: any) => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div className={`${styles.card} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onLike,
  onPass,
  onClick,
}) => {
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike?.(profile.id);
  };

  const handlePass = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPass?.(profile.id);
  };

  const handleClick = () => {
    onClick?.(profile.id);
  };

  return (
    <div className={`${styles.card} ${styles.profileCard}`} onClick={handleClick}>
      {profile.isOnline && <div className={styles.onlineIndicator} />}
      {profile.isVerified && (
        <div className={styles.verifiedBadge}>VERIFIED</div>
      )}
      
      <img
        src={profile.photos[0] || '/api/placeholder/400/300'}
        alt={profile.name}
        className={styles.profileImage}
      />
      
      <div className={styles.profileInfo}>
        <h3 className={styles.profileName}>
          {profile.name}, {profile.age}
        </h3>
        <p className={styles.profileAge}>Active now</p>
        <p className={styles.profileBio}>{profile.bio}</p>
        
        <div className={styles.profileActions}>
          <button
            className={`${styles.actionButton} ${styles.passButton}`}
            onClick={handlePass}
          >
            <FiX size={16} />
          </button>
          <button
            className={`${styles.actionButton} ${styles.likeButton}`}
            onClick={handleLike}
          >
            <FiHeart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const GiftCard: React.FC<GiftCardProps> = ({ gift, onSelect }) => {
  const handleClick = () => {
    onSelect?.(gift);
  };

  return (
    <div className={`${styles.card} ${styles.giftCard}`} onClick={handleClick}>
      <div className={styles.giftIcon}>{gift.icon}</div>
      <div className={styles.giftName}>{gift.name}</div>
      <div className={styles.giftPrice}>{gift.price} tokens</div>
    </div>
  );
};

export { Card, ProfileCard, GiftCard };
export default Card;
