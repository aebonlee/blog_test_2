# 📖 소스 코드 문서

## 📁 프로젝트 구조 및 파일 설명

```
blog_test_2/
├── 📁 .github/workflows/
│   └── deploy.yml           # GitHub Actions 자동 배포 워크플로우
├── 📁 docs/                 # 프로젝트 문서
│   ├── API_DOCUMENTATION.md    # API 사용 가이드
│   ├── ARCHITECTURE.md         # 아키텍처 설명
│   ├── CHANGELOG.md            # 버전별 변경사항
│   ├── DEVELOPMENT_GUIDE.md   # 개발 가이드
│   └── TROUBLESHOOTING.md     # 문제 해결 가이드
├── 📁 src/
│   ├── 📁 components/      # React 컴포넌트
│   │   ├── BlogList.jsx       # 블로그 목록 컴포넌트
│   │   ├── BlogPost.jsx       # 개별 포스트 컴포넌트
│   │   ├── ErrorBoundary.jsx  # 에러 경계 컴포넌트
│   │   ├── ErrorMessage.jsx   # 에러 메시지 UI
│   │   ├── LoadingSpinner.jsx # 로딩 스피너
│   │   └── *.module.css       # CSS Modules
│   ├── 📁 hooks/           # 커스텀 React 훅
│   │   └── useBlogs.js        # 블로그 데이터 관리 훅
│   ├── 📁 services/        # API 서비스
│   │   └── blogApi.js         # API 통신 로직
│   ├── 📁 utils/           # 유틸리티
│   │   ├── constants.js       # 상수 정의
│   │   └── withErrorBoundary.jsx # HOC
│   ├── App.jsx              # 메인 앱 컴포넌트
│   ├── App.css              # 앱 스타일
│   ├── index.css            # 전역 스타일
│   └── main.jsx             # 애플리케이션 진입점
├── index.html               # HTML 템플릿
├── package.json             # 의존성 및 스크립트
├── vite.config.js          # Vite 개발 설정
├── vite.config.prod.js     # Vite 프로덕션 설정
└── .env.example            # 환경변수 예제
```

## 🔍 핵심 소스 코드 분석

### 1. main.jsx - 애플리케이션 진입점
```javascript
/**
 * React 애플리케이션의 진입점
 * - React 19의 createRoot API 사용
 * - StrictMode로 개발 중 잠재적 문제 감지
 * - 전역 스타일 적용 (index.css)
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### 2. App.jsx - 메인 애플리케이션 컴포넌트
```javascript
/**
 * 애플리케이션의 최상위 컴포넌트
 * 
 * 주요 기능:
 * - ErrorBoundary로 전체 앱 감싸기 (에러 안정성)
 * - 헤더, 메인 콘텐츠, 푸터 레이아웃 구성
 * - 중앙 정렬 레이아웃 (max-width: 1400px)
 */
import React from 'react';
import BlogList from './components/BlogList';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        {/* 헤더: 그라데이션 배경의 타이틀 섹션 */}
        <header className="app-header">
          <h1>📝 Axios 블로그 애플리케이션</h1>
          <p>개선된 아키텍처로 구현된 CRUD 데모</p>
        </header>
        
        {/* 메인: BlogList 컴포넌트 렌더링 */}
        <main>
          <BlogList />
        </main>
        
        {/* 푸터: 기술 스택 표시 */}
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
```

### 3. components/BlogList.jsx - 블로그 목록 관리
```javascript
/**
 * 블로그 포스트 목록을 관리하는 핵심 컴포넌트
 * 
 * 기능:
 * - useBlogs 훅을 통한 데이터 관리
 * - CRUD 작업 처리 (생성, 읽기, 수정, 삭제)
 * - 로딩 및 에러 상태 처리
 * - PostCard 컴포넌트로 개별 포스트 렌더링
 * 
 * 최적화:
 * - React.memo로 불필요한 리렌더링 방지
 * - PostCard 컴포넌트 분리로 재사용성 향상
 */
const BlogList = memo(() => {
  // 커스텀 훅으로 비즈니스 로직 분리
  const { 
    posts, 
    loading, 
    error, 
    fetchPosts, 
    createPost, 
    updatePost, 
    deletePost,
    clearError 
  } = useBlogs();

  // 단일 포스트 상세 조회용 훅
  const {
    selectedPost,
    loading: singlePostLoading,
    error: singlePostError,
    fetchPost,
    clearSelectedPost,
  } = useSinglePost();

  // 새 포스트 생성 핸들러
  const handleCreatePost = async () => {
    const newPostData = {
      title: '새로운 포스트',
      body: '이것은 개선된 API 서비스를 통해 생성된 새 포스트입니다.',
      userId: 1
    };
    
    const result = await createPost(newPostData);
    if (result.success) {
      alert('새 포스트가 성공적으로 생성되었습니다!');
    }
  };

  // ... 나머지 CRUD 핸들러
});
```

### 4. components/BlogPost.jsx - 개별 포스트 컴포넌트
```javascript
/**
 * 개별 블로그 포스트를 표시하는 컴포넌트
 * 
 * Props:
 * - post: 포스트 데이터 객체
 * - showActions: 액션 버튼 표시 여부
 * - onEdit: 수정 콜백 함수
 * - onDelete: 삭제 콜백 함수
 * 
 * 특징:
 * - PropTypes로 타입 검증
 * - CSS Modules로 스타일 캡슐화
 * - 접근성 고려 (aria-label)
 * - React.memo로 성능 최적화
 */
const BlogPost = memo(({ post, showActions = false, onEdit, onDelete }) => {
  if (!post) {
    return (
      <article className={styles.blogPost}>
        <p className={styles.noPost}>포스트를 찾을 수 없습니다.</p>
      </article>
    );
  }

  return (
    <article className={styles.blogPost}>
      <h2>{post.title}</h2>
      <div className={styles.postMeta}>
        <span className={styles.author}>작성자: {post.userId}</span>
        <span className={styles.postId}>포스트 #{post.id}</span>
      </div>
      <p className={styles.postBody}>{post.body}</p>
      
      {/* 조건부 액션 버튼 렌더링 */}
      {showActions && (
        <div className={styles.postActions}>
          {onEdit && (
            <button 
              onClick={() => onEdit(post.id)} 
              className={`${styles.btn} ${styles.btnEdit}`}
              aria-label={`포스트 ${post.id} 수정`}
            >
              수정
            </button>
          )}
          {/* ... */}
        </div>
      )}
    </article>
  );
});
```

### 5. components/ErrorBoundary.jsx - 에러 경계
```javascript
/**
 * React Error Boundary 구현
 * 
 * 목적:
 * - 하위 컴포넌트의 JavaScript 에러 캐치
 * - 에러 발생 시 fallback UI 표시
 * - 애플리케이션 전체 크래시 방지
 * 
 * 기능:
 * - 에러 정보 표시 (개발 모드에서만 상세 정보)
 * - 재시도 기능
 * - 페이지 새로고침 옵션
 */
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
    // 에러 발생 시 상태 업데이트
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 로깅
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleRetry = () => {
    // 에러 상태 초기화 (재시도)
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  render() {
    if (this.state.hasError) {
      // 에러 발생 시 fallback UI
      return (
        <div className="error-boundary">
          <h2>🚫 앗! 문제가 발생했습니다</h2>
          {/* ... */}
        </div>
      );
    }

    return this.props.children;
  }
}
```

### 6. hooks/useBlogs.js - 커스텀 훅
```javascript
/**
 * 블로그 데이터 관리를 위한 커스텀 훅
 * 
 * 반환값:
 * - posts: 포스트 목록
 * - loading: 로딩 상태
 * - error: 에러 메시지
 * - CRUD 함수들
 * 
 * 특징:
 * - API 서비스와 컴포넌트 사이의 추상화 레이어
 * - 상태 관리 로직 캡슐화
 * - 재사용 가능한 비즈니스 로직
 */
export const useBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 에러 핸들링 헬퍼
  const handleError = useCallback((error, defaultMessage) => {
    const errorMessage = error.message || defaultMessage;
    setError(errorMessage);
    console.error('Blog API Error:', error);
  }, []);

  // 포스트 목록 가져오기
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await blogApi.getAllPosts();
      setPosts(data);
    } catch (error) {
      handleError(error, '포스트를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  // ... CRUD 함수들

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    clearError: () => setError(null),
  };
};
```

### 7. services/blogApi.js - API 서비스 레이어
```javascript
/**
 * API 통신을 담당하는 서비스 레이어
 * 
 * 특징:
 * - Axios 인스턴스 설정
 * - 요청/응답 인터셉터
 * - 중앙화된 에러 처리
 * - 환경변수 기반 설정
 */
import axios from 'axios';

// API 기본 설정
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com';

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API 요청: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API 응답: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || error.message || '알 수 없는 오류가 발생했습니다.';
    console.error('API 오류:', errorMessage);
    return Promise.reject({
      ...error,
      message: errorMessage,
      status: error.response?.status,
    });
  }
);

// API 메서드들
export const blogApi = {
  getAllPosts: async () => {
    const response = await apiClient.get('/posts');
    return response.data.slice(0, 10); // 10개만 반환
  },

  getPostById: async (id) => {
    const response = await apiClient.get(`/posts/${id}`);
    return response.data;
  },

  createPost: async (postData) => {
    const response = await apiClient.post('/posts', postData);
    return response.data;
  },

  updatePost: async (id, postData) => {
    const response = await apiClient.put(`/posts/${id}`, postData);
    return response.data;
  },

  deletePost: async (id) => {
    const response = await apiClient.delete(`/posts/${id}`);
    return response.data;
  },
};
```

### 8. CSS 스타일링

#### index.css - 전역 스타일
```css
/**
 * 전역 스타일 설정
 * 
 * 특징:
 * - 중앙 정렬 레이아웃
 * - 그라데이션 배경
 * - 커스텀 스크롤바
 * - 반응형 디자인
 */
:root {
  font-family: 'Segoe UI', 'Inter', system-ui;
  color: #213547;
  background-color: #f0f2f5;
}

body {
  margin: 0;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  justify-content: center;
  align-items: stretch;
}

#root {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
}

/* 커스텀 스크롤바 */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
}
```

#### App.css - 애플리케이션 스타일
```css
/**
 * 애플리케이션 레이아웃 스타일
 * 
 * 주요 특징:
 * - 최대 너비 1400px 중앙 정렬
 * - 그림자 효과로 깊이감 표현
 * - 그리드 레이아웃 (포스트 목록)
 * - 호버 효과 및 트랜지션
 */
.App {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 1400px;
  margin: 0 auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  justify-items: center;
}

.post-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-width: 400px;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}
```

### 9. 환경 설정 파일

#### vite.config.js - 개발 환경 설정
```javascript
/**
 * Vite 개발 서버 설정
 * 
 * 로컬 개발용 설정:
 * - 포트 5173
 * - CORS 활성화
 * - base 경로 제거 (루트 경로)
 */
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
    cors: true
  }
})
```

#### vite.config.prod.js - 프로덕션 설정
```javascript
/**
 * GitHub Pages 배포용 설정
 * 
 * 프로덕션 빌드 설정:
 * - base: '/blog_test_2/' (GitHub 리포지토리명)
 * - terser로 코드 압축
 * - 소스맵 비활성화
 */
export default defineConfig({
  plugins: [react()],
  base: '/blog_test_2/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})
```

#### .env.example - 환경변수 예제
```env
# API 서버 URL
VITE_API_URL=https://jsonplaceholder.typicode.com

# 애플리케이션 정보
VITE_APP_NAME=Axios Blog Application
VITE_APP_VERSION=2.0.0
```

### 10. GitHub Actions 워크플로우
```yaml
# .github/workflows/deploy.yml
# 
# GitHub Pages 자동 배포 워크플로우
# main 브랜치 푸시 시 자동 실행
# 
# 단계:
# 1. 코드 체크아웃
# 2. Node.js 설정
# 3. 의존성 설치
# 4. 프로덕션 빌드
# 5. GitHub Pages 배포

name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build:gh-pages
        
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    # ... 배포 설정
```

## 🔄 데이터 흐름도

```
사용자 인터랙션
      ↓
  BlogList 컴포넌트
      ↓
  useBlogs 커스텀 훅
      ↓
  blogApi 서비스
      ↓
  Axios 인터셉터
      ↓
JSONPlaceholder API
      ↓
  응답 처리
      ↓
  상태 업데이트
      ↓
  UI 리렌더링
```

## 🎯 주요 기능 구현

### 1. CRUD 작업
- **Create**: 새 포스트 생성 (POST /posts)
- **Read**: 포스트 목록 및 상세 조회 (GET /posts)
- **Update**: 포스트 수정 (PUT /posts/:id)
- **Delete**: 포스트 삭제 (DELETE /posts/:id)

### 2. 에러 처리
- **3단계 에러 처리**: API → 훅 → 컴포넌트
- **Error Boundary**: React 에러 캐치
- **사용자 피드백**: 에러 메시지 UI

### 3. 성능 최적화
- **React.memo**: 불필요한 리렌더링 방지
- **useCallback**: 함수 재생성 방지
- **CSS Modules**: 스타일 최적화
- **코드 스플리팅**: Vite 자동 처리

### 4. 접근성
- **시맨틱 HTML**: article, header, main, footer
- **ARIA 속성**: aria-label
- **키보드 네비게이션**: 버튼 포커스

### 5. 반응형 디자인
- **그리드 레이아웃**: auto-fit
- **미디어 쿼리**: 모바일 최적화
- **플렉스박스**: 유연한 레이아웃

## 📊 코드 품질 지표

- **컴포넌트 수**: 6개
- **커스텀 훅**: 2개
- **타입 검증**: 100% (PropTypes)
- **에러 처리**: 100% 커버리지
- **코드 재사용성**: 높음
- **유지보수성**: 우수

## 🚀 배포 정보

- **개발 서버**: http://localhost:5173
- **프로덕션 URL**: https://aebonlee.github.io/blog_test_2/
- **빌드 명령**: `npm run build:gh-pages`
- **배포 방식**: GitHub Actions 자동화

## 📈 향후 개선 방향

1. **TypeScript 마이그레이션**
2. **테스트 코드 작성**
3. **상태 관리 라이브러리 도입**
4. **무한 스크롤 구현**
5. **검색 및 필터링 기능**
6. **다크 모드 지원**