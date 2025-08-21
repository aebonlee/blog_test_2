import React from 'react'
import BlogList from './components/BlogList'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>📝 Axios 블로그 애플리케이션</h1>
        <p>JSONPlaceholder API를 활용한 CRUD 데모</p>
      </header>
      <main>
        <BlogList />
      </main>
      <footer className="app-footer">
        <p>이 애플리케이션은 axios를 사용하여 REST API와 통신합니다.</p>
        <div className="tech-stack">
          <span>React</span>
          <span>Axios</span>
          <span>Vite</span>
        </div>
      </footer>
    </div>
  )
}

export default App
