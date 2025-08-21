# 📐 프로젝트 아키텍처

## 🏗️ 전체 구조

```
blog-axios/
├── src/
│   ├── components/          # UI 컴포넌트
│   │   ├── BlogList.jsx    # 블로그 목록 관리
│   │   ├── BlogPost.jsx    # 개별 포스트 표시
│   │   ├── ErrorBoundary.jsx # 에러 경계 처리
│   │   ├── LoadingSpinner.jsx # 로딩 상태 표시
│   │   ├── ErrorMessage.jsx   # 에러 메시지 표시
│   │   └── *.module.css    # CSS Modules
│   ├── services/            # API 서비스 레이어
│   │   └── blogApi.js      # API 통신 로직
│   ├── hooks/               # 커스텀 React 훅
│   │   └── useBlogs.js     # 블로그 상태 관리
│   ├── utils/               # 유틸리티 함수
│   │   ├── constants.js    # 상수 정의
│   │   └── withErrorBoundary.jsx # HOC
│   ├── App.jsx              # 메인 애플리케이션
│   ├── App.css              # 전역 스타일
│   └── main.jsx             # 진입점
├── public/                  # 정적 파일
├── docs/                    # 프로젝트 문서
├── .env.example             # 환경변수 예제
└── package.json             # 의존성 관리
```

## 🔄 데이터 흐름

### 1. API 호출 흐름
```
Component → Custom Hook → API Service → JSONPlaceholder API
    ↑            ↓             ↓                ↓
    └────── State Update ← Response ← ─────────┘
```

### 2. 상태 관리 패턴
- **로컬 상태**: useState를 통한 컴포넌트 레벨 상태 관리
- **커스텀 훅**: 비즈니스 로직과 상태를 캡슐화
- **Props Drilling 최소화**: 필요한 곳에만 props 전달

## 🧩 주요 컴포넌트

### BlogList
- **역할**: 블로그 포스트 목록 관리 및 CRUD 작업 조정
- **기능**:
  - 포스트 목록 표시
  - 생성/수정/삭제 작업 처리
  - 로딩 및 에러 상태 관리

### BlogPost
- **역할**: 개별 포스트 표시
- **특징**:
  - React.memo로 최적화
  - PropTypes로 타입 검증
  - CSS Modules로 스타일 캡슐화

### ErrorBoundary
- **역할**: React 에러 경계 구현
- **기능**:
  - 하위 컴포넌트 에러 캐치
  - 사용자 친화적 에러 표시
  - 재시도 기능 제공

## 🔌 API 서비스 레이어

### blogApi.js
```javascript
// 주요 메서드
- getAllPosts()    // 모든 포스트 조회
- getPostById(id)  // 특정 포스트 조회
- createPost(data) // 새 포스트 생성
- updatePost(id, data) // 포스트 수정
- deletePost(id)   // 포스트 삭제
```

### 특징
- Axios 인터셉터로 요청/응답 처리
- 중앙화된 에러 핸들링
- 환경변수를 통한 설정 관리

## 🪝 커스텀 훅

### useBlogs
- **목적**: 블로그 CRUD 작업 관리
- **반환값**:
  - `posts`: 포스트 목록
  - `loading`: 로딩 상태
  - `error`: 에러 상태
  - CRUD 함수들

### useSinglePost
- **목적**: 단일 포스트 상세 조회
- **특징**: 독립적인 로딩/에러 상태 관리

## 🎨 스타일링 전략

### CSS Modules
- **파일명 규칙**: `[Component].module.css`
- **장점**:
  - 스타일 충돌 방지
  - 컴포넌트별 스타일 캡슐화
  - 빌드 시 자동 최적화

### 스타일 구조
```css
/* 컴포넌트별 모듈 */
.componentClass { }      // 로컬 스코프
:global(.globalClass) { } // 전역 스코프

/* 반응형 디자인 */
@media (max-width: 768px) { }

/* 접근성 고려 */
@media (prefers-reduced-motion: reduce) { }
```

## 🔐 에러 처리 전략

### 3단계 에러 처리
1. **API 레벨**: Axios 인터셉터
2. **훅 레벨**: try-catch 블록
3. **컴포넌트 레벨**: ErrorBoundary

### 에러 타입
- **네트워크 에러**: 연결 실패, 타임아웃
- **API 에러**: 4xx, 5xx 응답
- **런타임 에러**: JavaScript 에러

## ⚡ 성능 최적화

### 적용된 최적화
1. **React.memo**: 불필요한 리렌더링 방지
2. **useCallback**: 함수 재생성 방지
3. **CSS Modules**: 스타일 빌드 최적화
4. **조건부 렌더링**: 필요한 경우만 렌더링

### 번들 최적화
- Vite를 통한 자동 코드 스플리팅
- Tree shaking으로 미사용 코드 제거
- 프로덕션 빌드 시 minification

## 🔧 개발 환경

### 환경 변수
```env
VITE_API_URL=https://jsonplaceholder.typicode.com
VITE_APP_NAME=Axios Blog Application
VITE_APP_VERSION=2.0.0
```

### 스크립트
```json
{
  "dev": "vite",           // 개발 서버
  "build": "vite build",    // 프로덕션 빌드
  "lint": "eslint .",       // 코드 검사
  "preview": "vite preview" // 빌드 미리보기
}
```

## 📦 의존성

### 핵심 의존성
- **React 19.1.1**: UI 라이브러리
- **Axios 1.11.0**: HTTP 클라이언트
- **PropTypes 15.8.1**: 타입 검증

### 개발 의존성
- **Vite 7.1.2**: 빌드 도구
- **ESLint 9.33.0**: 코드 품질 도구
- **@vitejs/plugin-react**: React 지원

## 🚀 배포 고려사항

### 프로덕션 체크리스트
- [x] 환경변수 분리
- [x] 에러 경계 구현
- [x] 코드 최적화
- [x] 빌드 검증
- [ ] 테스트 작성
- [ ] 성능 모니터링
- [ ] 로깅 시스템

### 확장 가능성
- TypeScript 마이그레이션 준비
- 상태 관리 라이브러리 도입 가능
- 테스팅 인프라 추가 용이
- CI/CD 파이프라인 구축 가능