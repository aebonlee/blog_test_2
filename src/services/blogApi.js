import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com';

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

export const blogApi = {
  // GET 요청들
  getAllPosts: async () => {
    const response = await apiClient.get('/posts');
    return response.data.slice(0, 10);
  },

  getPostById: async (id) => {
    const response = await apiClient.get(`/posts/${id}`);
    return response.data;
  },

  // POST 요청
  createPost: async (postData) => {
    const response = await apiClient.post('/posts', postData);
    return response.data;
  },

  // PUT 요청
  updatePost: async (id, postData) => {
    const response = await apiClient.put(`/posts/${id}`, postData);
    return response.data;
  },

  // DELETE 요청
  deletePost: async (id) => {
    const response = await apiClient.delete(`/posts/${id}`);
    return response.data;
  },

  // 기타 유틸리티
  getPostsByUserId: async (userId) => {
    const response = await apiClient.get(`/posts?userId=${userId}`);
    return response.data;
  },
};

export default blogApi;