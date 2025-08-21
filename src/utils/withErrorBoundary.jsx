import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';

// HOC로 사용할 수 있는 withErrorBoundary
export const withErrorBoundary = (Component, fallbackComponent) => {
  const WrappedComponent = (props) => (
    <ErrorBoundary fallback={fallbackComponent}>
      <Component {...props} />
    </ErrorBoundary>
  );
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};

export default withErrorBoundary;