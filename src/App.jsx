import React, { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

// 디버그용 정보 표시
const DebugInfo = () => {
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    setDebugInfo({
      userAgent: navigator.userAgent,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      baseURL: import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com'
    });
  }, []);

  if (import.meta.env.PROD) return null; // 프로덕션에서는 숨김

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'rgba(0,0,0,0.8)', 
      color: 'white', 
      padding: '10px', 
      fontSize: '12px',
      borderRadius: '5px',
      zIndex: 9999 
    }}>
      <div>화면: {debugInfo.windowWidth}x{debugInfo.windowHeight}</div>
      <div>브레이크포인트: {
        debugInfo.windowWidth >= 1200 ? 'Desktop' : 
        debugInfo.windowWidth >= 768 ? 'Tablet' : 'Mobile'
      }</div>
      <div>API: {debugInfo.baseURL}</div>
    </div>
  );
};

function App() {
  console.log('App 컴포넌트 렌더링됨');
  
  return (
    <ErrorBoundary>
      <DebugInfo />
      <div className="App">
        <header className="app-header">
          <h1>📝 Axios 블로그 애플리케이션</h1>
          <p>개선된 아키텍처로 구현된 CRUD 데모 v2.2.0</p>
        </header>
        <main>
          <BlogList />
        </main>
        <footer className="app-footer">
          <p>이 애플리케이션은 개선된 API 서비스와 커스텀 훅을 사용합니다.</p>
          <div className="tech-stack">
            <span>React 19</span>
            <span>Axios</span>
            <span>Vite</span>
            <span>PropTypes</span>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
