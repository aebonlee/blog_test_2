import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError() {
    // 에러가 발생하면 hasError를 true로 설정
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 정보를 state에 저장
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // 에러를 콘솔에 출력
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  render() {
    if (this.state.hasError) {
      const { fallback: Fallback } = this.props;
      
      // 커스텀 fallback 컴포넌트가 제공된 경우
      if (Fallback) {
        return (
          <Fallback 
            error={this.state.error} 
            retry={this.handleRetry}
          />
        );
      }
      
      // 기본 에러 UI
      return (
        <div className="error-boundary">
          <div className="error-content">
            <h2>🚫 앗! 문제가 발생했습니다</h2>
            <p>애플리케이션에서 예기치 않은 오류가 발생했습니다.</p>
            
            <div className="error-actions">
              <button 
                onClick={this.handleRetry}
                className="btn btn-primary"
              >
                다시 시도
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="btn btn-secondary"
              >
                페이지 새로고침
              </button>
            </div>
            
            {import.meta.env.DEV && (
              <details className="error-details">
                <summary>개발자 정보</summary>
                <pre className="error-stack">
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.elementType,
};

export default ErrorBoundary;