// API 설정
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com',
  TIMEOUT: 10000,
  POSTS_LIMIT: 10,
};

// 앱 정보
export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || 'Axios Blog Application',
  VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
};

// HTTP 상태 코드
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// 에러 메시지
export const ERROR_MESSAGES = {
  NETWORK: '네트워크 연결을 확인해주세요.',
  TIMEOUT: '요청 시간이 초과되었습니다.',
  UNKNOWN: '알 수 없는 오류가 발생했습니다.',
  FETCH_POSTS: '포스트를 불러오는데 실패했습니다.',
  CREATE_POST: '포스트 생성에 실패했습니다.',
  UPDATE_POST: '포스트 수정에 실패했습니다.',
  DELETE_POST: '포스트 삭제에 실패했습니다.',
};

// UI 상수
export const UI_CONFIG = {
  POST_PREVIEW_LENGTH: 100,
  LOADING_DELAY: 500,
  SUCCESS_MESSAGE_DURATION: 3000,
};

// 키보드 이벤트
export const KEYBOARD_KEYS = {
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  SPACE: ' ',
};