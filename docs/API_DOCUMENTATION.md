# 📚 API 문서

## 🌐 API 서비스 레이어

### 기본 설정
```javascript
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';
const TIMEOUT = 10000; // 10초
```

## 📡 API 엔드포인트

### 1. getAllPosts()
**설명**: 모든 블로그 포스트를 조회합니다.

**요청**
```javascript
GET /posts
```

**응답**
```javascript
[
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere...",
    "body": "quia et suscipit..."
  },
  // ... 최대 10개 포스트
]
```

**사용 예제**
```javascript
import { blogApi } from '@/services/blogApi';

const posts = await blogApi.getAllPosts();
```

### 2. getPostById(id)
**설명**: 특정 ID의 포스트를 조회합니다.

**파라미터**
- `id` (number): 포스트 ID

**요청**
```javascript
GET /posts/{id}
```

**응답**
```javascript
{
  "userId": 1,
  "id": 1,
  "title": "포스트 제목",
  "body": "포스트 내용"
}
```

**사용 예제**
```javascript
const post = await blogApi.getPostById(1);
```

### 3. createPost(postData)
**설명**: 새로운 포스트를 생성합니다.

**파라미터**
```javascript
{
  title: string,    // 포스트 제목
  body: string,     // 포스트 내용
  userId: number    // 작성자 ID
}
```

**요청**
```javascript
POST /posts
Content-Type: application/json

{
  "title": "새 포스트",
  "body": "포스트 내용",
  "userId": 1
}
```

**응답**
```javascript
{
  "id": 101,  // 새로 생성된 ID
  "title": "새 포스트",
  "body": "포스트 내용",
  "userId": 1
}
```

**사용 예제**
```javascript
const newPost = await blogApi.createPost({
  title: "새로운 포스트",
  body: "이것은 새로운 포스트입니다.",
  userId: 1
});
```

### 4. updatePost(id, postData)
**설명**: 기존 포스트를 수정합니다.

**파라미터**
- `id` (number): 수정할 포스트 ID
- `postData` (object): 수정할 데이터

**요청**
```javascript
PUT /posts/{id}
Content-Type: application/json

{
  "id": 1,
  "title": "수정된 제목",
  "body": "수정된 내용",
  "userId": 1
}
```

**응답**
```javascript
{
  "id": 1,
  "title": "수정된 제목",
  "body": "수정된 내용",
  "userId": 1
}
```

**사용 예제**
```javascript
const updatedPost = await blogApi.updatePost(1, {
  id: 1,
  title: "수정된 포스트",
  body: "수정된 내용입니다.",
  userId: 1
});
```

### 5. deletePost(id)
**설명**: 포스트를 삭제합니다.

**파라미터**
- `id` (number): 삭제할 포스트 ID

**요청**
```javascript
DELETE /posts/{id}
```

**응답**
```javascript
{} // 빈 객체 반환
```

**사용 예제**
```javascript
await blogApi.deletePost(1);
```

## 🪝 커스텀 훅 API

### useBlogs()
**설명**: 블로그 포스트 관리를 위한 커스텀 훅

**반환값**
```javascript
{
  posts: Array,        // 포스트 목록
  loading: boolean,    // 로딩 상태
  error: string|null,  // 에러 메시지
  fetchPosts: Function,    // 포스트 목록 새로고침
  createPost: Function,    // 새 포스트 생성
  updatePost: Function,    // 포스트 수정
  deletePost: Function,    // 포스트 삭제
  clearError: Function     // 에러 상태 초기화
}
```

**사용 예제**
```javascript
import { useBlogs } from '@/hooks/useBlogs';

function BlogComponent() {
  const { 
    posts, 
    loading, 
    error, 
    createPost, 
    deletePost 
  } = useBlogs();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      {posts.map(post => (
        <BlogPost key={post.id} post={post} />
      ))}
    </div>
  );
}
```

### useSinglePost()
**설명**: 단일 포스트 조회를 위한 커스텀 훅

**반환값**
```javascript
{
  selectedPost: Object|null,  // 선택된 포스트
  loading: boolean,           // 로딩 상태
  error: string|null,        // 에러 메시지
  fetchPost: Function,       // 포스트 조회
  clearSelectedPost: Function // 선택 초기화
}
```

**사용 예제**
```javascript
import { useSinglePost } from '@/hooks/useBlogs';

function PostDetail({ postId }) {
  const { 
    selectedPost, 
    loading, 
    fetchPost 
  } = useSinglePost();

  useEffect(() => {
    fetchPost(postId);
  }, [postId]);

  if (loading) return <LoadingSpinner />;

  return <BlogPost post={selectedPost} />;
}
```

## 🔄 인터셉터

### 요청 인터셉터
```javascript
// 모든 요청에 자동으로 적용
- Content-Type: application/json 헤더 추가
- 요청 로깅 (개발 환경)
- 타임아웃 설정 (10초)
```

### 응답 인터셉터
```javascript
// 모든 응답에 자동으로 적용
- 성공 응답 로깅
- 에러 응답 처리 및 포맷팅
- 사용자 친화적 에러 메시지 변환
```

## ⚠️ 에러 처리

### 에러 형식
```javascript
{
  message: string,    // 사용자 친화적 메시지
  status: number,     // HTTP 상태 코드
  originalError: Error // 원본 에러 객체
}
```

### 에러 코드
| 코드 | 설명 | 처리 방법 |
|------|------|-----------|
| 400 | Bad Request | 요청 데이터 검증 |
| 404 | Not Found | 리소스 존재 확인 |
| 500 | Server Error | 재시도 또는 알림 |
| TIMEOUT | 타임아웃 | 재시도 권장 |
| NETWORK | 네트워크 오류 | 연결 확인 |

## 🔐 환경 변수

### 설정 가능한 변수
```env
# API 기본 URL
VITE_API_URL=https://jsonplaceholder.typicode.com

# 앱 정보
VITE_APP_NAME=Axios Blog Application
VITE_APP_VERSION=2.0.0
```

### 사용 방법
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
const appName = import.meta.env.VITE_APP_NAME;
```

## 📊 API 제한사항

### JSONPlaceholder 특징
- **읽기 전용**: POST, PUT, DELETE는 시뮬레이션만 수행
- **데이터 영속성 없음**: 새로고침 시 초기 상태로 복원
- **제한된 데이터**: 100개 포스트, 10명 사용자
- **무료 서비스**: 속도 제한 없음, 인증 불필요

### 권장사항
- 실제 프로덕션에서는 자체 백엔드 구축 필요
- 로컬 스토리지를 활용한 데이터 영속성 구현 가능
- Mock 서버 구축으로 개발 환경 개선 가능

## 🧪 테스트 예제

### API 호출 테스트
```javascript
// API 서비스 테스트
describe('blogApi', () => {
  it('should fetch all posts', async () => {
    const posts = await blogApi.getAllPosts();
    expect(posts).toHaveLength(10);
    expect(posts[0]).toHaveProperty('id');
    expect(posts[0]).toHaveProperty('title');
  });

  it('should handle errors', async () => {
    try {
      await blogApi.getPostById(999999);
    } catch (error) {
      expect(error.status).toBe(404);
    }
  });
});
```

### 훅 테스트
```javascript
// 커스텀 훅 테스트
import { renderHook, waitFor } from '@testing-library/react';
import { useBlogs } from '@/hooks/useBlogs';

describe('useBlogs', () => {
  it('should load posts', async () => {
    const { result } = renderHook(() => useBlogs());
    
    expect(result.current.loading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.posts).toHaveLength(10);
    });
  });
});
```