import React, { useState } from 'react';
import './styles/PostForm.css';

const PostForm = ({ posts, setPosts, currentSecretKey, setCurrentSecretKey }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [secretKey, setSecretKey] = useState(''); // Initialize as empty string, independent of currentSecretKey

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Title is required!');
      return;
    }
    if (!secretKey.trim()) {
      alert('Secret key is required!');
      return;
    }
    const newPost = {
      id: Date.now(),
      title,
      content,
      imageUrl,
      upvotes: 0,
      comments: [],
      secretKey: secretKey, // Mandatory secret key
      createdAt: new Date().toISOString(),
    };
    setPosts([...posts, newPost]);
    setCurrentSecretKey(secretKey); // Update the session's secret key
    setTitle('');
    setContent('');
    setImageUrl('');
    setSecretKey(''); // Explicitly clear secretKey
  };

  return (
    <div className="post-form">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter post title"
          />
        </div>
        <div>
          <label>Content (Optional)</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add optional content"
          />
        </div>
        <div>
          <label>Image URL (Optional)</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
          />
        </div>
        <div>
          <label>Secret Key (Required)</label>
          <input
            type="password"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            required
            placeholder="Set a secret key (required for editing/deleting)"
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default PostForm;