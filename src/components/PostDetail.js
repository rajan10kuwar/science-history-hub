import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const posts = JSON.parse(searchParams.get('posts') || '[]'); // Temporary: Get posts from URL query
  const post = posts.find(p => p.id === parseInt(id));

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '20px auto', backgroundColor: 'white', borderRadius: '5px' }}>
      <h2>Post Detail - ID: {id}</h2>
      {post ? (
        <>
          <h3>{post.title}</h3>
          {post.content && <p>{post.content}</p>}
          {post.imageUrl && <img src={post.imageUrl} alt={post.title} style={{ maxWidth: '100%', marginTop: '10px' }} />}
          <p>Posted: {new Date(post.createdAt).toLocaleString()}</p>
          <p>Upvotes: {post.upvotes}</p>
        </>
      ) : (
        <p>Post not found.</p>
      )}
    </div>
  );
};

export default PostDetail;