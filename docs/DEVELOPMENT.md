# 개발 문서 - Axios 블로그 애플리케이션

## 📋 개발 개요

이 프로젝트는 React와 Axios를 활용하여 RESTful API와의 통신을 학습하고 구현하는 것을 목표로 개발되었습니다. JSONPlaceholder의 무료 API를 활용하여 실제 서버와의 통신을 시뮬레이션합니다.

## 🏗️ 아키텍처

### 컴포넌트 구조

```
App.jsx (메인 컴포넌트)
    ├── Header (애플리케이션 제목 및 설명)
    ├── BlogList.jsx (포스트 목록 관리)
    │   └── BlogPost.jsx (개별 포스트 표시)
    └── Footer (기술 스택 정보)
```

### 데이터 흐름

1. **컴포넌트 마운트** → useEffect 훅 실행
2. **API 호출** → Axios를 통한 HTTP 요청
3. **상태 업데이트** → useState를 통한 데이터 관리
4. **UI 렌더링** → React 컴포넌트 리렌더링

## 💻 구현 상세

### 1. Axios 설정 및 사용

#### 기본 GET 요청
```javascript
const fetchPosts = async () => {
  try {
    setLoading(true);
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setPosts(response.data.slice(0, 10));
    setError(null);
  } catch (err) {
    setError('포스트를 불러오는데 실패했습니다.');
    console.error('Error fetching posts:', err);
  } finally {
    setLoading(false);
  }
};
```

#### POST 요청 (생성)
```javascript
const createPost = async () => {
  try {
    const newPost = {
      title: '새로운 포스트',
      body: '이것은 axios POST 요청으로 생성된 새 포스트입니다.',
      userId: 1
    };
    
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
    console.log('새 포스트 생성됨:', response.data);
  } catch (err) {
    console.error('Error creating post:', err);
  }
};
```

#### PUT 요청 (수정)
```javascript
const updatePost = async (postId) => {
  try {
    const updatedPost = {
      id: postId,
      title: '수정된 포스트 제목',
      body: '이것은 axios PUT 요청으로 수정된 포스트입니다.',
      userId: 1
    };
    
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${postId}`, 
      updatedPost
    );
    console.log('포스트 수정됨:', response.data);
  } catch (err) {
    console.error('Error updating post:', err);
  }
};
```

#### DELETE 요청 (삭제)
```javascript
const deletePost = async (postId) => {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    setPosts(posts.filter(post => post.id !== postId));
  } catch (err) {
    console.error('Error deleting post:', err);
  }
};
```

### 2. 상태 관리

컴포넌트에서 관리하는 주요 상태:

- `posts`: 포스트 목록 배열
- `loading`: 로딩 상태 표시
- `error`: 에러 메시지 저장
- `selectedPost`: 선택된 개별 포스트

### 3. 에러 처리

모든 API 호출에 try-catch 블록을 사용하여 에러 처리:

- 네트워크 에러
- 서버 응답 에러
- 타임아웃 에러

### 4. UI/UX 개선사항

#### 로딩 상태 표시
```jsx
if (loading) return <div className="loading">포스트를 불러오는 중...</div>;
```

#### 에러 상태 표시
```jsx
if (error) return <div className="error">{error}</div>;
```

#### 반응형 그리드 레이아웃
```css
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
```

## 🎨 스타일링 전략

### 색상 팔레트
- 주요 색상: 그라데이션 (#667eea → #764ba2)
- 배경색: #f7f8fc
- 텍스트 색상: #2d3748, #4a5568, #718096

### 컴포넌트 스타일링
- BEM 명명 규칙 사용
- 모듈화된 CSS 클래스
- 호버 효과 및 트랜지션 애니메이션

## 🧪 테스트 시나리오

### 수동 테스트 체크리스트

1. ✅ 페이지 로드 시 포스트 목록 표시
2. ✅ 새 포스트 생성 버튼 동작
3. ✅ 개별 포스트 상세보기
4. ✅ 포스트 수정 기능
5. ✅ 포스트 삭제 기능
6. ✅ 새로고침 버튼 동작
7. ✅ 에러 상황 처리
8. ✅ 로딩 상태 표시

## 🚀 성능 최적화

### 구현된 최적화
- 컴포넌트 지연 로딩 고려
- 불필요한 리렌더링 방지
- API 호출 최소화 (첫 10개 포스트만 로드)

### 향후 개선 사항
- React.memo를 사용한 컴포넌트 메모이제이션
- 무한 스크롤 구현
- 페이지네이션 추가
- 캐싱 전략 구현

## 📝 코드 컨벤션

### JavaScript/React
- 함수형 컴포넌트 사용
- React Hooks 활용 (useState, useEffect)
- async/await 패턴 사용
- 의미있는 변수명 사용

### CSS
- 클래스 기반 스타일링
- rem 단위 사용
- Flexbox와 Grid 레이아웃 활용

## 🔧 트러블슈팅

### 해결된 이슈

1. **CORS 에러**
   - 문제: 로컬 개발 중 CORS 정책 위반
   - 해결: JSONPlaceholder API는 CORS를 허용하므로 별도 설정 불필요

2. **상태 업데이트 지연**
   - 문제: setState 비동기 특성으로 인한 즉시 반영 안됨
   - 해결: useEffect 의존성 배열 활용

## 📚 참고 자료

- [Axios 공식 문서](https://axios-http.com/)
- [React 공식 문서](https://react.dev/)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)
- [Vite 공식 문서](https://vitejs.dev/)

## 🔄 버전 히스토리

### v1.0.0 (2025-08-21)
- 초기 프로젝트 구조 설정
- Axios를 사용한 CRUD 기능 구현
- 반응형 UI 디자인 적용
- 기본 에러 처리 및 로딩 상태 구현

## 📌 TODO

- [ ] TypeScript 마이그레이션
- [ ] 단위 테스트 추가 (Jest, React Testing Library)
- [ ] 상태 관리 라이브러리 도입 (Redux/Zustand)
- [ ] 인터셉터를 활용한 글로벌 에러 처리
- [ ] 검색 및 필터링 기능 추가
- [ ] 다크 모드 지원
- [ ] PWA 변환