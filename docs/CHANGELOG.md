# 📝 변경 이력 (Changelog)

## [2.1.0] - 2024-08-21

### 🎨 UI/UX 개선 및 배포 수정

#### ✨ 새로운 기능
- **중앙 정렬 레이아웃**
  - 최대 너비 1400px 제한
  - 화면 중앙 정렬
  - 그림자 효과로 깊이감 추가

- **GitHub Actions 자동 배포**
  - `.github/workflows/deploy.yml` 추가
  - main 브랜치 푸시 시 자동 빌드 및 배포

#### 🔧 개선사항
- **스타일링 개선**
  - 배경 그라데이션 효과
  - 커스텀 스크롤바 디자인
  - 포스트 그리드 중앙 정렬
  - 반응형 디자인 최적화

- **빌드 설정 분리**
  - `vite.config.js`: 로컬 개발용
  - `vite.config.prod.js`: GitHub Pages 배포용
  - `build:gh-pages` 스크립트 추가

#### 🐛 버그 수정
- GitHub Pages 404 오류 해결
- index.html 경로 문제 수정
- MIME type 오류 해결
- terser 의존성 추가

---

## [2.0.0] - 2024-08-21

### 🎉 Major Release - 전체 아키텍처 개선

#### ✨ 새로운 기능 (New Features)

##### 🏗️ 아키텍처
- **API 서비스 레이어 구축** (`src/services/blogApi.js`)
  - Axios 인터셉터를 통한 중앙화된 API 관리
  - 요청/응답 로깅 시스템
  - 타임아웃 설정 (10초)
  - 환경변수 기반 URL 구성

- **커스텀 훅 시스템** (`src/hooks/useBlogs.js`)
  - `useBlogs`: 블로그 CRUD 작업 관리
  - `useSinglePost`: 단일 포스트 상세 조회
  - 에러 상태 관리 및 재시도 로직

- **에러 처리 시스템**
  - `ErrorBoundary`: React 에러 경계 구현
  - `ErrorMessage`: 다양한 타입의 에러 메시지 UI
  - 3단계 에러 처리 (API → 훅 → 컴포넌트)

- **UI 컴포넌트**
  - `LoadingSpinner`: 크기별 로딩 인디케이터
  - `PostCard`: 재사용 가능한 포스트 카드 컴포넌트

#### 🔧 개선사항 (Improvements)

##### 코드 품질
- **PropTypes 적용**: 모든 컴포넌트에 타입 검증 추가
- **React.memo 최적화**: 불필요한 리렌더링 방지
- **컴포넌트 분리**: BlogList에서 PostCard 분리

##### 스타일링
- **CSS Modules 도입**
  - `BlogPost.module.css`
  - `LoadingSpinner.module.css`
  - `ErrorMessage.module.css`
- **반응형 디자인 개선**
- **접근성 향상**: aria-label 속성 추가

##### 개발 환경
- **환경 변수 설정**
  - `.env` 파일 지원
  - `.env.example` 템플릿 제공
- **상수 관리** (`src/utils/constants.js`)
  - API 설정
  - 에러 메시지
  - UI 구성

#### 🐛 버그 수정 (Bug Fixes)
- ESLint 오류 수정
- 빌드 경고 제거
- 비동기 에러 처리 개선

#### 📚 문서화 (Documentation)
- `ARCHITECTURE.md`: 프로젝트 구조 및 아키텍처 설명
- `API_DOCUMENTATION.md`: API 엔드포인트 및 사용법
- `DEVELOPMENT_GUIDE.md`: 개발 가이드 및 베스트 프랙티스
- `CHANGELOG.md`: 버전별 변경사항 기록

#### 📦 의존성 (Dependencies)
- ➕ `prop-types@15.8.1` 추가

#### 🏗️ 프로젝트 구조 변경
```
이전:
src/
├── components/
│   ├── BlogList.jsx
│   └── BlogPost.jsx
├── App.jsx
└── main.jsx

현재:
src/
├── components/
│   ├── BlogList.jsx
│   ├── BlogPost.jsx
│   ├── ErrorBoundary.jsx
│   ├── LoadingSpinner.jsx
│   ├── ErrorMessage.jsx
│   └── *.module.css
├── services/
│   └── blogApi.js
├── hooks/
│   └── useBlogs.js
├── utils/
│   ├── constants.js
│   └── withErrorBoundary.jsx
├── App.jsx
└── main.jsx
```

---

## [1.0.0] - 2024-08-20

### 🚀 초기 릴리스 (Initial Release)

#### 기능
- JSONPlaceholder API를 사용한 CRUD 데모
- 블로그 포스트 목록 표시
- 포스트 생성, 수정, 삭제 기능
- 포스트 상세 보기

#### 기술 스택
- React 19.1.1
- Axios 1.11.0
- Vite 7.1.2

#### 컴포넌트
- `BlogList`: 포스트 목록 관리
- `BlogPost`: 개별 포스트 표시
- `App`: 메인 애플리케이션

---

## 버전 관리 정책

### 버전 번호 체계
- **Major (X.0.0)**: 호환되지 않는 API 변경
- **Minor (0.X.0)**: 하위 호환 기능 추가
- **Patch (0.0.X)**: 하위 호환 버그 수정

### 릴리스 사이클
- **개발**: `develop` 브랜치
- **스테이징**: `staging` 브랜치
- **프로덕션**: `main` 브랜치

### 커밋 메시지 규칙
- `feat:` 새로운 기능
- `fix:` 버그 수정
- `docs:` 문서 변경
- `style:` 코드 포맷팅
- `refactor:` 코드 리팩토링
- `test:` 테스트 추가
- `chore:` 빌드 프로세스 변경

---

## 향후 계획 (Roadmap)

### v2.1.0 (예정)
- [ ] TypeScript 마이그레이션
- [ ] 테스트 커버리지 80% 달성
- [ ] 다크 모드 지원

### v2.2.0 (예정)
- [ ] 무한 스크롤 구현
- [ ] 검색 기능 추가
- [ ] 필터링 옵션

### v3.0.0 (예정)
- [ ] Next.js 마이그레이션
- [ ] SSR/SSG 지원
- [ ] 실제 백엔드 연동

---

## 기여자 (Contributors)
- @aebonlee - 프로젝트 리드
- Claude AI Assistant - 아키텍처 개선 및 문서화

---

## 라이선스 (License)
MIT License - 자세한 내용은 [LICENSE](../LICENSE) 파일 참조