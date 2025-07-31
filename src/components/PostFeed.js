import React from 'react';
import { Link } from 'react-router-dom';
import './styles/PostFeed.css';

const PostFeed = ({ posts }) => {
  return (
    <div className="post-feed">
      <h2>Science History Feed</h2>
      {posts.length === 0 ? (
        <p>No posts yet. Create one!</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post-item">
            <Link to={`/post/${post.id}?posts=${encodeURIComponent(JSON.stringify(posts))}`} className="post-title">
              {post.title}
            </Link>
            <p>Posted: {new Date(post.createdAt).toLocaleString()}</p>
            <p>Upvotes: {post.upvotes}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PostFeed;