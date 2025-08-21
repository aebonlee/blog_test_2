import React from 'react';
import PropTypes from 'prop-types';
import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ 
  message, 
  onRetry, 
  onDismiss, 
  type = 'error' 
}) => {
  const typeClasses = {
    error: `${styles.errorMessage} ${styles.error}`,
    warning: `${styles.errorMessage} ${styles.warning}`,
    info: `${styles.errorMessage} ${styles.info}`
  };

  const typeIcons = {
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  return (
    <div className={typeClasses[type]}>
      <div className={styles.errorContent}>
        <span className={styles.errorIcon} role="img" aria-label={type}>
          {typeIcons[type]}
        </span>
        <span className={styles.errorText}>{message}</span>
      </div>
      
      <div className={styles.errorActions}>
        {onRetry && (
          <button 
            onClick={onRetry} 
            className={`${styles.btn} ${styles.btnRetry}`}
            aria-label="다시 시도"
          >
            다시 시도
          </button>
        )}
        {onDismiss && (
          <button 
            onClick={onDismiss} 
            className={`${styles.btn} ${styles.btnDismiss}`}
            aria-label="메시지 닫기"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
  onDismiss: PropTypes.func,
  type: PropTypes.oneOf(['error', 'warning', 'info']),
};

export default ErrorMessage;