import React from 'react';

function BlogPost({ post }) {
  return (
    <article className="blog-post">
      <h2>{post.title}</h2>
      <div className="post-meta">
        <span className="author">작성자: {post.userId}</span>
        <span className="post-id">포스트 #{post.id}</span>
      </div>
      <p className="post-body">{post.body}</p>
    </article>
  );
}

export default BlogPost;