# 📝 Axios 블로그 애플리케이션

React와 Axios를 활용한 RESTful API 통신 데모 애플리케이션입니다. JSONPlaceholder API를 사용하여 CRUD(Create, Read, Update, Delete) 작업을 구현했습니다.

## 🚀 주요 기능

- **GET 요청**: 블로그 포스트 목록 조회 및 개별 포스트 상세 조회
- **POST 요청**: 새로운 블로그 포스트 생성
- **PUT 요청**: 기존 포스트 수정
- **DELETE 요청**: 포스트 삭제
- 반응형 카드 레이아웃 디자인
- 모던한 그라데이션 UI/UX

## 🛠️ 기술 스택

- **React** (v19.1.1) - 사용자 인터페이스 구축
- **Axios** (v1.11.0) - HTTP 클라이언트 라이브러리
- **Vite** (v7.1.2) - 빌드 도구 및 개발 서버
- **JSONPlaceholder** - 테스트용 REST API

## 📦 설치 방법

```bash
# 저장소 클론
git clone [repository-url]
cd blog-axios

# 의존성 설치
npm install
```

## 🏃‍♂️ 실행 방법

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과물 미리보기
npm run preview

# 코드 린팅
npm run lint
```

## 📁 프로젝트 구조

```
blog-axios/
├── src/
│   ├── components/
│   │   ├── BlogList.jsx    # 블로그 포스트 목록 컴포넌트
│   │   └── BlogPost.jsx    # 개별 포스트 표시 컴포넌트
│   ├── App.jsx              # 메인 애플리케이션 컴포넌트
│   ├── App.css              # 애플리케이션 스타일
│   ├── index.css            # 전역 스타일
│   └── main.jsx             # 애플리케이션 진입점
├── public/                  # 정적 파일
├── docs/                    # 프로젝트 문서
│   └── DEVELOPMENT.md       # 개발 상세 문서
├── package.json             # 프로젝트 의존성 및 스크립트
└── vite.config.js           # Vite 설정 파일
```

## 🎯 주요 컴포넌트 설명

### BlogList.jsx
- Axios를 사용한 API 통신 로직 구현
- 포스트 목록 조회, 생성, 수정, 삭제 기능
- 로딩 상태 및 에러 처리

### BlogPost.jsx
- 개별 포스트 데이터 표시
- 포스트 제목, 내용, 메타 정보 렌더링

### App.jsx
- 애플리케이션 메인 레이아웃
- 헤더, 메인 콘텐츠, 푸터 구조

## 🌐 API 엔드포인트

애플리케이션은 JSONPlaceholder의 다음 엔드포인트를 사용합니다:

- `GET /posts` - 모든 포스트 조회
- `GET /posts/{id}` - 특정 포스트 조회
- `POST /posts` - 새 포스트 생성
- `PUT /posts/{id}` - 포스트 수정
- `DELETE /posts/{id}` - 포스트 삭제

## 📝 라이센스

MIT License

## 👨‍💻 개발자

- Axios를 활용한 REST API 통신 학습 프로젝트

## 📚 추가 문서

자세한 개발 내역과 구현 상세는 [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md)를 참조하세요.
