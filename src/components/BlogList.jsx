import React, { memo } from 'react';
import PropTypes from 'prop-types';
import BlogPost from './BlogPost';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { useBlogs, useSinglePost } from '../hooks/useBlogs';

const BlogList = memo(() => {
  const { 
    posts, 
    loading, 
    error, 
    fetchPosts, 
    createPost, 
    updatePost, 
    deletePost,
    clearError 
  } = useBlogs();

  const {
    selectedPost,
    loading: singlePostLoading,
    error: singlePostError,
    fetchPost,
    clearSelectedPost,
  } = useSinglePost();

  const handleCreatePost = async () => {
    const newPostData = {
      title: '새로운 포스트',
      body: '이것은 개선된 API 서비스를 통해 생성된 새 포스트입니다.',
      userId: 1
    };
    
    const result = await createPost(newPostData);
    if (result.success) {
      alert('새 포스트가 성공적으로 생성되었습니다! (가상 API이므로 실제로 저장되지는 않습니다)');
    }
  };

  const handleUpdatePost = async (postId) => {
    const updatedData = {
      id: postId,
      title: '수정된 포스트 제목',
      body: '이것은 개선된 API 서비스를 통해 수정된 포스트입니다.',
      userId: 1
    };
    
    const result = await updatePost(postId, updatedData);
    if (result.success) {
      alert(`포스트 #${postId}가 수정되었습니다! (가상 API이므로 실제로 저장되지는 않습니다)`);
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm(`포스트 #${postId}를 삭제하시겠습니까?`)) {
      const result = await deletePost(postId);
      if (result.success) {
        alert(`포스트 #${postId}가 삭제되었습니다! (가상 API이므로 실제로 삭제되지는 않습니다)`);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner message="포스트를 불러오는 중..." />;
  }

  if (error) {
    return (
      <ErrorMessage 
        message={error} 
        onRetry={fetchPosts}
        onDismiss={clearError}
      />
    );
  }

  return (
    <div className="blog-container">
      <div className="blog-actions">
        <button onClick={handleCreatePost} className="btn btn-create">
          새 포스트 생성 (POST)
        </button>
        <button onClick={fetchPosts} className="btn btn-refresh">
          새로고침 (GET)
        </button>
      </div>

      {selectedPost && (
        <div className="selected-post">
          <h3>선택된 포스트 상세정보</h3>
          {singlePostLoading && <LoadingSpinner size="small" />}
          {singlePostError && <ErrorMessage message={singlePostError} type="warning" />}
          {!singlePostLoading && !singlePostError && <BlogPost post={selectedPost} />}
          <button onClick={clearSelectedPost} className="btn btn-close">
            닫기
          </button>
        </div>
      )}

      <div className="posts-grid">
        {posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            onView={fetchPost}
            onEdit={handleUpdatePost}
            onDelete={handleDeletePost}
          />
        ))}
      </div>
    </div>
  );
});

// PostCard 컴포넌트를 분리하여 재사용성 향상
const PostCard = memo(({ post, onView, onEdit, onDelete }) => (
  <div className="post-card">
    <h3>{post.title}</h3>
    <p>{post.body.substring(0, 100)}...</p>
    <div className="post-actions">
      <button 
        onClick={() => onView(post.id)} 
        className="btn btn-view"
        aria-label={`포스트 ${post.id} 상세보기`}
      >
        상세보기
      </button>
      <button 
        onClick={() => onEdit(post.id)} 
        className="btn btn-edit"
        aria-label={`포스트 ${post.id} 수정`}
      >
        수정 (PUT)
      </button>
      <button 
        onClick={() => onDelete(post.id)} 
        className="btn btn-delete"
        aria-label={`포스트 ${post.id} 삭제`}
      >
        삭제 (DELETE)
      </button>
    </div>
  </div>
));

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

PostCard.displayName = 'PostCard';

BlogList.displayName = 'BlogList';

export default BlogList;