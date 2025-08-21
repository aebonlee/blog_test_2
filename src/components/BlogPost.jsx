import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './BlogPost.module.css';

const BlogPost = memo(({ post, showActions = false, onEdit, onDelete }) => {
  if (!post) {
    return (
      <article className={styles.blogPost}>
        <p className={styles.noPost}>포스트를 찾을 수 없습니다.</p>
      </article>
    );
  }

  return (
    <article className={styles.blogPost}>
      <h2>{post.title}</h2>
      <div className={styles.postMeta}>
        <span className={styles.author}>작성자: {post.userId}</span>
        <span className={styles.postId}>포스트 #{post.id}</span>
      </div>
      <p className={styles.postBody}>{post.body}</p>
      
      {showActions && (
        <div className={styles.postActions}>
          {onEdit && (
            <button 
              onClick={() => onEdit(post.id)} 
              className={`${styles.btn} ${styles.btnEdit}`}
              aria-label={`포스트 ${post.id} 수정`}
            >
              수정
            </button>
          )}
          {onDelete && (
            <button 
              onClick={() => onDelete(post.id)} 
              className={`${styles.btn} ${styles.btnDelete}`}
              aria-label={`포스트 ${post.id} 삭제`}
            >
              삭제
            </button>
          )}
        </div>
      )}
    </article>
  );
});

BlogPost.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  }),
  showActions: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

BlogPost.displayName = 'BlogPost';

export default BlogPost;