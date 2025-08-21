# 🚀 개발 가이드

## 📋 목차
1. [시작하기](#시작하기)
2. [개발 환경 설정](#개발-환경-설정)
3. [코드 스타일 가이드](#코드-스타일-가이드)
4. [컴포넌트 개발](#컴포넌트-개발)
5. [상태 관리](#상태-관리)
6. [API 통신](#api-통신)
7. [에러 처리](#에러-처리)
8. [성능 최적화](#성능-최적화)
9. [테스팅](#테스팅)
10. [배포](#배포)

## 🎯 시작하기

### 필수 요구사항
- Node.js 18.0.0 이상
- npm 9.0.0 이상
- Git

### 프로젝트 설치
```bash
# 리포지토리 클론
git clone https://github.com/aebonlee/blog_test_2.git
cd blog_test_2

# 의존성 설치
npm install

# 환경변수 설정
cp .env.example .env

# 개발 서버 실행
npm run dev
```

## 🛠️ 개발 환경 설정

### VS Code 권장 확장
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "dsznajder.es7-react-js-snippets",
    "styled-components.vscode-styled-components",
    "formulahendry.auto-rename-tag"
  ]
}
```

### 환경 변수
```env
# .env.local (개발용)
VITE_API_URL=https://jsonplaceholder.typicode.com
VITE_APP_NAME=Axios Blog Application
VITE_APP_VERSION=2.0.0
```

### npm 스크립트
| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 (포트 5173) |
| `npm run build` | 프로덕션 빌드 |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run lint` | ESLint 실행 |

## 📝 코드 스타일 가이드

### 명명 규칙
```javascript
// 컴포넌트 - PascalCase
const BlogPost = () => { };

// 함수 - camelCase
const fetchPosts = async () => { };

// 상수 - UPPER_SNAKE_CASE
const API_BASE_URL = 'https://...';

// CSS 클래스 - camelCase (CSS Modules)
.blogPost { }
.postTitle { }
```

### 컴포넌트 구조
```javascript
// 1. Import 문
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Component.module.css';

// 2. 컴포넌트 정의
const Component = ({ prop1, prop2 }) => {
  // 3. State 선언
  const [state, setState] = useState();
  
  // 4. 커스텀 훅
  const { data } = useCustomHook();
  
  // 5. Side Effects
  useEffect(() => {
    // ...
  }, []);
  
  // 6. 이벤트 핸들러
  const handleClick = () => { };
  
  // 7. 렌더링
  return <div>...</div>;
};

// 8. PropTypes
Component.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number
};

// 9. Export
export default Component;
```

### Import 순서
```javascript
// 1. React 관련
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// 2. 외부 라이브러리
import axios from 'axios';

// 3. 내부 컴포넌트
import BlogPost from '@/components/BlogPost';

// 4. 훅
import { useBlogs } from '@/hooks/useBlogs';

// 5. 유틸리티
import { formatDate } from '@/utils/helpers';

// 6. 스타일
import styles from './Component.module.css';
```

## 🧩 컴포넌트 개발

### 새 컴포넌트 생성
```bash
# 1. 컴포넌트 파일 생성
touch src/components/NewComponent.jsx

# 2. 스타일 파일 생성 (CSS Modules)
touch src/components/NewComponent.module.css

# 3. 테스트 파일 생성
touch src/components/__tests__/NewComponent.test.jsx
```

### 컴포넌트 템플릿
```javascript
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './NewComponent.module.css';

const NewComponent = memo(({ title, children }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
});

NewComponent.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node
};

NewComponent.displayName = 'NewComponent';

export default NewComponent;
```

### CSS Modules 사용
```css
/* NewComponent.module.css */
.container {
  padding: 1rem;
  border-radius: 8px;
  background: white;
}

.title {
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

/* 전역 스타일 사용 */
:global(.app-header) .title {
  font-size: 2rem;
}

/* 조건부 스타일 */
.active {
  composes: container;
  border: 2px solid blue;
}
```

## 📊 상태 관리

### 로컬 상태
```javascript
// 단순 상태
const [count, setCount] = useState(0);

// 객체 상태
const [user, setUser] = useState({
  name: '',
  email: ''
});

// 상태 업데이트
setUser(prev => ({ ...prev, name: 'John' }));
```

### 커스텀 훅 생성
```javascript
// hooks/useCounter.js
export const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);
  
  const decrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);
  
  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);
  
  return { count, increment, decrement, reset };
};
```

## 🌐 API 통신

### API 서비스 확장
```javascript
// services/userApi.js
import axios from 'axios';

const userApi = {
  getUsers: async () => {
    const response = await axios.get('/users');
    return response.data;
  },
  
  getUserById: async (id) => {
    const response = await axios.get(`/users/${id}`);
    return response.data;
  }
};

export default userApi;
```

### 데이터 페칭 패턴
```javascript
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);
  
  return { data, loading, error };
};
```

## ⚠️ 에러 처리

### 에러 경계 사용
```javascript
// App.jsx
import ErrorBoundary from '@/components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <YourComponent />
    </ErrorBoundary>
  );
}
```

### 커스텀 에러 클래스
```javascript
// utils/errors.js
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}
```

## ⚡ 성능 최적화

### 메모이제이션
```javascript
// React.memo
const ExpensiveComponent = memo(({ data }) => {
  return <div>{/* 복잡한 렌더링 */}</div>;
});

// useMemo
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// useCallback
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

### 지연 로딩
```javascript
// 컴포넌트 지연 로딩
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// 사용
<Suspense fallback={<LoadingSpinner />}>
  <HeavyComponent />
</Suspense>
```

### 이미지 최적화
```javascript
// 지연 로딩
<img loading="lazy" src={imageUrl} alt="Description" />

// 반응형 이미지
<picture>
  <source media="(max-width: 768px)" srcSet={mobileImage} />
  <source media="(min-width: 769px)" srcSet={desktopImage} />
  <img src={fallbackImage} alt="Description" />
</picture>
```

## 🧪 테스팅

### 컴포넌트 테스트
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import BlogPost from '@/components/BlogPost';

describe('BlogPost', () => {
  const mockPost = {
    id: 1,
    title: 'Test Post',
    body: 'Test content'
  };
  
  it('renders post title', () => {
    render(<BlogPost post={mockPost} />);
    expect(screen.getByText('Test Post')).toBeInTheDocument();
  });
  
  it('calls onDelete when delete button clicked', () => {
    const handleDelete = jest.fn();
    render(<BlogPost post={mockPost} onDelete={handleDelete} />);
    
    fireEvent.click(screen.getByText('삭제'));
    expect(handleDelete).toHaveBeenCalledWith(1);
  });
});
```

### 훅 테스트
```javascript
import { renderHook, act } from '@testing-library/react';
import { useCounter } from '@/hooks/useCounter';

describe('useCounter', () => {
  it('increments counter', () => {
    const { result } = renderHook(() => useCounter(0));
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
});
```

## 📦 배포

### 빌드 최적화
```bash
# 프로덕션 빌드
npm run build

# 빌드 분석
npm run build -- --analyze

# 빌드 결과 확인
npm run preview
```

### 환경별 설정
```javascript
// 개발 환경
if (import.meta.env.DEV) {
  console.log('Development mode');
}

// 프로덕션 환경
if (import.meta.env.PROD) {
  console.log('Production mode');
}
```

### GitHub Pages 배포
```bash
# gh-pages 패키지 설치
npm install --save-dev gh-pages

# package.json에 추가
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# 배포
npm run deploy
```

### Vercel 배포
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

## 🐛 디버깅

### React DevTools
```javascript
// 컴포넌트 이름 설정 (디버깅 용이)
Component.displayName = 'MyComponent';

// 개발 모드 로깅
if (import.meta.env.DEV) {
  console.log('Debug info:', data);
}
```

### 성능 프로파일링
```javascript
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration) {
  console.log(`${id} (${phase}) took ${actualDuration}ms`);
}

<Profiler id="BlogList" onRender={onRenderCallback}>
  <BlogList />
</Profiler>
```

## 📚 추가 리소스

### 문서
- [React 공식 문서](https://react.dev)
- [Vite 공식 문서](https://vitejs.dev)
- [Axios 공식 문서](https://axios-http.com)

### 학습 자료
- [React Patterns](https://reactpatterns.com)
- [JavaScript Info](https://javascript.info)
- [MDN Web Docs](https://developer.mozilla.org)

### 도구
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Redux DevTools](https://github.com/reduxjs/redux-devtools)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)