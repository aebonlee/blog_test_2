# 🔧 문제 해결 가이드

## 일반적인 문제와 해결 방법

### 1. 404 오류: Failed to load resource
**문제**: 개발 서버에서 `src/main.jsx` 파일을 찾을 수 없음

**원인**: 
- Vite 설정의 `base` 경로가 잘못 설정됨
- GitHub Pages 배포용 설정이 로컬 개발에 영향

**해결 방법**:
```javascript
// vite.config.js - 로컬 개발용
export default defineConfig({
  plugins: [react()],
  // base: '/blog_test_2/', // 주석 처리
})
```

### 2. 포트 충돌
**문제**: `Port 5173 is in use`

**해결 방법**:
1. 다른 포트 사용:
```bash
npm run dev -- --port 3000
```

2. 기존 프로세스 종료:
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5173
kill -9 <PID>
```

### 3. 환경 변수가 적용되지 않음
**문제**: `.env` 파일의 변수가 인식되지 않음

**해결 방법**:
1. 변수명이 `VITE_`로 시작하는지 확인
2. 개발 서버 재시작
3. `.env` 파일이 프로젝트 루트에 있는지 확인

### 4. CSS Modules가 작동하지 않음
**문제**: 스타일이 적용되지 않음

**해결 방법**:
```javascript
// 올바른 import
import styles from './Component.module.css';

// 올바른 사용
<div className={styles.container}>
```

### 5. ESLint 오류
**문제**: `'variable' is defined but never used`

**해결 방법**:
1. 사용하지 않는 변수 제거
2. 필요한 경우 ESLint 규칙 비활성화:
```javascript
// eslint-disable-next-line no-unused-vars
const unusedVariable = 'value';
```

### 6. API 호출 실패
**문제**: CORS 오류 또는 네트워크 오류

**해결 방법**:
1. API URL 확인:
```env
VITE_API_URL=https://jsonplaceholder.typicode.com
```

2. 네트워크 연결 확인

3. 프록시 설정 (필요한 경우):
```javascript
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

### 7. npm install 오류
**문제**: 의존성 설치 실패

**해결 방법**:
```bash
# 캐시 정리
npm cache clean --force

# node_modules 삭제
rm -rf node_modules package-lock.json

# 재설치
npm install
```

### 8. 빌드 오류
**문제**: `npm run build` 실패

**해결 방법**:
1. 문법 오류 확인:
```bash
npm run lint
```

2. import 경로 확인
3. 환경 변수 확인

### 9. GitHub Pages 배포 문제
**문제**: 배포 후 빈 페이지 표시

**해결 방법**:
1. 올바른 빌드 명령 사용:
```bash
npm run build:gh-pages
```

2. `vite.config.prod.js` 확인:
```javascript
export default defineConfig({
  base: '/blog_test_2/', // 리포지토리 이름
})
```

3. GitHub Pages 설정 확인:
- Settings → Pages
- Source: Deploy from a branch
- Branch: gh-pages

### 10. React 19 호환성 문제
**문제**: 일부 라이브러리가 React 19와 호환되지 않음

**해결 방법**:
1. 의존성 업데이트:
```bash
npm update
```

2. peer dependency 경고 무시:
```bash
npm install --legacy-peer-deps
```

## 디버깅 팁

### 1. 콘솔 로그 활용
```javascript
// 개발 환경에서만 로그 출력
if (import.meta.env.DEV) {
  console.log('Debug info:', data);
}
```

### 2. React Developer Tools
- Chrome/Firefox 확장 프로그램 설치
- 컴포넌트 트리 검사
- Props와 State 실시간 확인

### 3. Network 탭 활용
- F12 → Network 탭
- API 요청/응답 확인
- 실패한 요청 분석

### 4. 에러 경계 활용
```javascript
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

## 추가 지원

### 문제가 해결되지 않는 경우:
1. [GitHub Issues](https://github.com/aebonlee/blog_test_2/issues) 확인
2. 새 이슈 생성 시 포함할 정보:
   - 에러 메시지 전체
   - 재현 단계
   - 환경 정보 (OS, Node 버전 등)
   - 관련 코드 스니펫

### 유용한 명령어:
```bash
# 시스템 정보
node --version
npm --version

# 프로젝트 정보
npm list

# 디버그 모드 실행
DEBUG=* npm run dev
```