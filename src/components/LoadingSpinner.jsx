import React from 'react';
import PropTypes from 'prop-types';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = ({ message = '로딩 중...', size = 'medium' }) => {
  const sizeClasses = {
    small: styles.spinnerSmall,
    medium: styles.spinnerMedium,
    large: styles.spinnerLarge
  };

  return (
    <div className={styles.loadingContainer}>
      <div className={`${styles.loadingSpinner} ${sizeClasses[size]}`}>
        <div className={styles.spinner}></div>
      </div>
      <p className={styles.loadingMessage}>{message}</p>
    </div>
  );
};

LoadingSpinner.propTypes = {
  message: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default LoadingSpinner;