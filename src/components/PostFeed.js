import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/PostFeed.css';

const PostFeed = ({ posts, isLoading }) => {
  const [sortBy, setSortBy] = useState('creation');
  const [searchTerm, setSearchTerm] = useState('');

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === 'creation') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === 'upvotes') {
      return b.upvotes - a.upvotes;
    }
    return 0;
  });

  const filteredPosts = sortedPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="post-feed">
      <h2>ScienceHistory Feed</h2>
      <div className="feed-controls">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
          <option value="creation">Sort by Creation Time</option>
          <option value="upvotes">Sort by Upvotes</option>
        </select>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      {filteredPosts.length === 0 ? (
        <p>No posts yet. Create one or adjust your search!</p>
      ) : (
        filteredPosts.map((post) => (
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