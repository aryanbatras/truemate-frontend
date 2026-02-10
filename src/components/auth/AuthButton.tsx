import React from 'react';
import Button from '../ui/Button';
import { FiUser, FiLogOut, FiSettings } from 'react-icons/fi';
import styles from '../../styles/pages/auth/AuthButton.module.css';

interface AuthButtonProps {
  isAuthenticated: boolean;
  userName?: string;
  onLogin: () => void;
  onLogout: () => void;
  onProfile?: () => void;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  isAuthenticated,
  userName,
  onLogin,
  onLogout,
  onProfile
}) => {
  if (isAuthenticated) {
    return (
      <div className={styles.authContainer}>
        {/* <span className={styles.userName}>
          <FiUser size={16} />
          {userName}
        </span> */}
        
        {onProfile && (
          <Button
            variant="ghost"
            size="small"
            onClick={onProfile}
            className={styles.profileButton}
          >
            <FiSettings size={12} />
            Profile
          </Button>
        )}
        
        <Button
          variant="secondary"
          size="small"
          onClick={onLogout}
          className={styles.logoutButton}
        >
          <FiLogOut size={12} />
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="primary"
      size="medium"
      onClick={onLogin}
      className={styles.loginButton}
    >
      <FiUser size={16} />
      Sign In
    </Button>
  );
};

export default AuthButton;
