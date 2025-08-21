import { useState, useEffect, useCallback } from 'react';
import { blogApi } from '../services/blogApi';

export const useBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleError = useCallback((error, defaultMessage) => {
    const errorMessage = error.message || defaultMessage;
    setError(errorMessage);
    console.error('Blog API Error:', error);
  }, []);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await blogApi.getAllPosts();
      setPosts(data);
    } catch (error) {
      handleError(error, '포스트를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const createPost = useCallback(async (postData) => {
    try {
      const newPost = await blogApi.createPost(postData);
      // 실제로는 API에서 새로운 포스트가 추가되지 않으므로 UI 업데이트만
      console.log('새 포스트 생성됨:', newPost);
      return { success: true, data: newPost };
    } catch (error) {
      handleError(error, '포스트 생성에 실패했습니다.');
      return { success: false, error: error.message };
    }
  }, [handleError]);

  const updatePost = useCallback(async (id, postData) => {
    try {
      const updatedPost = await blogApi.updatePost(id, postData);
      console.log('포스트 수정됨:', updatedPost);
      return { success: true, data: updatedPost };
    } catch (error) {
      handleError(error, '포스트 수정에 실패했습니다.');
      return { success: false, error: error.message };
    }
  }, [handleError]);

  const deletePost = useCallback(async (id) => {
    try {
      await blogApi.deletePost(id);
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
      console.log(`포스트 #${id} 삭제됨`);
      return { success: true };
    } catch (error) {
      handleError(error, '포스트 삭제에 실패했습니다.');
      return { success: false, error: error.message };
    }
  }, [handleError]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    clearError: () => setError(null),
  };
};

export const useSinglePost = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPost = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const post = await blogApi.getPostById(id);
      setSelectedPost(post);
    } catch (error) {
      const errorMessage = error.message || '포스트를 불러오는데 실패했습니다.';
      setError(errorMessage);
      console.error('Single Post API Error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSelectedPost = useCallback(() => {
    setSelectedPost(null);
    setError(null);
  }, []);

  return {
    selectedPost,
    loading,
    error,
    fetchPost,
    clearSelectedPost,
  };
};