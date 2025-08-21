import React from 'react';
import BlogList from './components/BlogList';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <header className="app-header">
          <h1>📝 Axios 블로그 애플리케이션</h1>
          <p>개선된 아키텍처로 구현된 CRUD 데모</p>
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
