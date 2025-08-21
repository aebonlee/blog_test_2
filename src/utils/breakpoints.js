/**
 * 반응형 브레이크포인트 상수
 * 
 * 디바이스별 화면 크기 기준:
 * - Desktop: 1600px 이상 (대형 모니터, 데스크톱)
 * - Tablet: 1024px ~ 1599px (태블릿, 소형 노트북)  
 * - Mobile: 1023px 이하 (스마트폰, 소형 태블릿)
 */

export const BREAKPOINTS = {
  // 픽셀 값 - 더 실용적인 브레이크포인트로 수정
  DESKTOP: 1200,  // 1600px → 1200px (대부분의 데스크톱 화면)
  TABLET: 768,    // 1024px → 768px (표준 태블릿 크기)
  MOBILE_MAX: 767, // 1023px → 767px (모바일 최대 크기)
  
  // CSS 미디어 쿼리 문자열
  DESKTOP_UP: `(min-width: 1200px)`,
  TABLET_ONLY: `(min-width: 768px) and (max-width: 1199px)`,
  MOBILE_DOWN: `(max-width: 767px)`,
  
  // 컨테이너 최대 너비
  CONTAINER: {
    DESKTOP: '1400px',
    TABLET: '900px', 
    MOBILE: '100%'
  },
  
  // 그리드 열 수
  GRID_COLUMNS: {
    DESKTOP: 3,
    TABLET: 2,
    MOBILE: 1
  },
  
  // 패딩/마진
  SPACING: {
    DESKTOP: '2rem',
    TABLET: '1.5rem',
    MOBILE: '1rem'
  }
};

/**
 * 브레이크포인트 유틸리티 함수
 */
export const mediaQuery = {
  desktop: `@media ${BREAKPOINTS.DESKTOP_UP}`,
  tablet: `@media ${BREAKPOINTS.TABLET_ONLY}`,
  mobile: `@media ${BREAKPOINTS.MOBILE_DOWN}`,
};

export default BREAKPOINTS;