import React from 'react';
import styles from '../../styles/components/ui/Input.module.css';
import { FiSearch, FiAlertCircle } from 'react-icons/fi';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'search';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

interface TextareaProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  rows?: number;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  error,
  disabled = false,
  className = '',
  icon,
  fullWidth = true,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const inputClasses = [
    styles.input,
    icon && styles.inputWithIcon,
    type === 'search' && styles.searchInput,
    error && styles.error,
    fullWidth && styles.fullWidth,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={fullWidth ? styles.inputGroup : ''}>
      {label && <label className={styles.inputLabel}>{label}</label>}
      {icon && <div className={styles.inputIcon}>{icon}</div>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={inputClasses}
      />
      {error && (
        <div className={styles.inputError}>
          <FiAlertCircle size={14} />
          {error}
        </div>
      )}
    </div>
  );
};

const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  value,
  onChange,
  label,
  error,
  disabled = false,
  className = '',
  rows = 4,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  const textareaClasses = [
    styles.input,
    styles.textarea,
    error && styles.error,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.inputGroup}>
      {label && <label className={styles.inputLabel}>{label}</label>}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        rows={rows}
        className={textareaClasses}
      />
      {error && (
        <div className={styles.inputError}>
          <FiAlertCircle size={14} />
          {error}
        </div>
      )}
    </div>
  );
};

const SearchInput: React.FC<Omit<InputProps, 'type'>> = (props) => {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchIcon}>
        <FiSearch size={18} />
      </div>
      <Input type="search" {...props} />
    </div>
  );
};

export { Input, Textarea, SearchInput };
export default Input;
