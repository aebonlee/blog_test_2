import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogPost from './BlogPost';

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

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

  const fetchSinglePost = async (postId) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      setSelectedPost(response.data);
    } catch (err) {
      console.error('Error fetching single post:', err);
    }
  };

  const createPost = async () => {
    try {
      const newPost = {
        title: '새로운 포스트',
        body: '이것은 axios POST 요청으로 생성된 새 포스트입니다.',
        userId: 1
      };
      
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
      console.log('새 포스트 생성됨:', response.data);
      alert('새 포스트가 성공적으로 생성되었습니다! (가상 API이므로 실제로 저장되지는 않습니다)');
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  const updatePost = async (postId) => {
    try {
      const updatedPost = {
        id: postId,
        title: '수정된 포스트 제목',
        body: '이것은 axios PUT 요청으로 수정된 포스트입니다.',
        userId: 1
      };
      
      const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${postId}`, updatedPost);
      console.log('포스트 수정됨:', response.data);
      alert(`포스트 #${postId}가 수정되었습니다! (가상 API이므로 실제로 저장되지는 않습니다)`);
    } catch (err) {
      console.error('Error updating post:', err);
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      console.log(`포스트 #${postId} 삭제됨`);
      alert(`포스트 #${postId}가 삭제되었습니다! (가상 API이므로 실제로 삭제되지는 않습니다)`);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  if (loading) return <div className="loading">포스트를 불러오는 중...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="blog-container">
      <div className="blog-actions">
        <button onClick={createPost} className="btn btn-create">
          새 포스트 생성 (POST)
        </button>
        <button onClick={fetchPosts} className="btn btn-refresh">
          새로고침 (GET)
        </button>
      </div>

      {selectedPost && (
        <div className="selected-post">
          <h3>선택된 포스트 상세정보</h3>
          <BlogPost post={selectedPost} />
          <button onClick={() => setSelectedPost(null)} className="btn btn-close">
            닫기
          </button>
        </div>
      )}

      <div className="posts-grid">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 100)}...</p>
            <div className="post-actions">
              <button 
                onClick={() => fetchSinglePost(post.id)} 
                className="btn btn-view"
              >
                상세보기
              </button>
              <button 
                onClick={() => updatePost(post.id)} 
                className="btn btn-edit"
              >
                수정 (PUT)
              </button>
              <button 
                onClick={() => deletePost(post.id)} 
                className="btn btn-delete"
              >
                삭제 (DELETE)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;