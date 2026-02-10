import React, { useState } from 'react';
import styles from '../../styles/pages/auth/AuthModal.module.css';
import Button from '../ui/Button';
import { FiX, FiMail, FiLock, FiUser, FiCalendar, FiPhone, FiMapPin, FiBook } from 'react-icons/fi';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (credentials: LoginCredentials) => void;
  onRegister: (userData: RegisterData) => void;
  isLoading?: boolean;
  error?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  phone: string;
  bio: string;
  interests: string[];
  hobbies: string[];
  lookingFor: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  authMethod: 'email';
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onRegister,
  isLoading = false,
  error
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginForm, setLoginForm] = useState<LoginCredentials>({
    email: '',
    password: ''
  });
  
  const [registerForm, setRegisterForm] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    gender: 'male',
    dateOfBirth: '',
    phone: '',
    bio: '',
    interests: [],
    hobbies: [],
    lookingFor: 'Serious relationship',
    location: {
      city: '',
      state: '',
      country: ''
    },
    authMethod: 'email'
  });

  const [interestsInput, setInterestsInput] = useState('');
  const [hobbiesInput, setHobbiesInput] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(loginForm);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const interests = interestsInput.split(',').map(i => i.trim()).filter(i => i);
    const hobbies = hobbiesInput.split(',').map(h => h.trim()).filter(h => h);
    
    onRegister({
      ...registerForm,
      interests,
      hobbies
    });
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <FiX size={24} />
        </button>

        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {isLogin ? 'Welcome Back' : 'Join TrueMate'}
          </h2>
          <p className={styles.modalSubtitle}>
            {isLogin 
              ? 'Sign in to continue your love journey' 
              : 'Start your journey to finding true love'
            }
          </p>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}

        {isLogin ? (
          <form onSubmit={handleLoginSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <FiMail className={styles.inputIcon} />
              <input
                type="email"
                placeholder="Email address"
                className={styles.input}
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <FiLock className={styles.inputIcon} />
              <input
                type="password"
                placeholder="Password"
                className={styles.input}
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                required
              />
            </div>

            <Button
              type="submit"
              size="large"
              fullWidth
              loading={isLoading}
              className={styles.submitButton}
            >
              Sign In
            </Button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className={styles.form}>
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <FiUser className={styles.inputIcon} />
                <input
                  type="text"
                  placeholder="Full Name"
                  className={styles.input}
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <FiMail className={styles.inputIcon} />
                <input
                  type="email"
                  placeholder="Email address"
                  className={styles.input}
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <FiLock className={styles.inputIcon} />
                <input
                  type="password"
                  placeholder="Password"
                  className={styles.input}
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                  required
                  minLength={6}
                />
              </div>

              <div className={styles.inputGroup}>
                <select
                  className={styles.input}
                  value={registerForm.gender}
                  onChange={(e) => setRegisterForm({...registerForm, gender: e.target.value as 'male' | 'female' | 'other'})}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <FiCalendar className={styles.inputIcon} />
                <input
                  type="date"
                  placeholder="Date of Birth"
                  className={styles.input}
                  value={registerForm.dateOfBirth}
                  onChange={(e) => setRegisterForm({...registerForm, dateOfBirth: e.target.value})}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <FiPhone className={styles.inputIcon} />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className={styles.input}
                  value={registerForm.phone}
                  onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <FiMapPin className={styles.inputIcon} />
                <input
                  type="text"
                  placeholder="City"
                  className={styles.input}
                  value={registerForm.location.city}
                  onChange={(e) => setRegisterForm({
                    ...registerForm, 
                    location: {...registerForm.location, city: e.target.value}
                  })}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="State"
                  className={styles.input}
                  value={registerForm.location.state}
                  onChange={(e) => setRegisterForm({
                    ...registerForm, 
                    location: {...registerForm.location, state: e.target.value}
                  })}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="Country"
                  className={styles.input}
                  value={registerForm.location.country}
                  onChange={(e) => setRegisterForm({
                    ...registerForm, 
                    location: {...registerForm.location, country: e.target.value}
                  })}
                  required
                />
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <FiBook className={styles.inputIcon} />
                <textarea
                  placeholder="Tell us about yourself..."
                  className={styles.textarea}
                  value={registerForm.bio}
                  onChange={(e) => setRegisterForm({...registerForm, bio: e.target.value})}
                  rows={3}
                />
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <input
                  type="text"
                  placeholder="Interests (comma-separated)"
                  className={styles.input}
                  value={interestsInput}
                  onChange={(e) => setInterestsInput(e.target.value)}
                />
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <input
                  type="text"
                  placeholder="Hobbies (comma-separated)"
                  className={styles.input}
                  value={hobbiesInput}
                  onChange={(e) => setHobbiesInput(e.target.value)}
                />
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <select
                  className={styles.input}
                  value={registerForm.lookingFor}
                  onChange={(e) => setRegisterForm({...registerForm, lookingFor: e.target.value})}
                  required
                >
                  <option value="">Looking for</option>
                  <option value="Serious relationship">Serious relationship</option>
                  <option value="Casual dating">Casual dating</option>
                  <option value="Friendship">Friendship</option>
                  <option value="Marriage">Marriage</option>
                </select>
              </div>
            </div>

            <Button
              type="submit"
              size="large"
              fullWidth
              loading={isLoading}
              className={styles.submitButton}
            >
              Create Account
            </Button>
          </form>
        )}

        <div className={styles.switchAuth}>
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              className={styles.switchButton}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
