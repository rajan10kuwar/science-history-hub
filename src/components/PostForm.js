import React, { useState } from 'react';
import './styles/PostForm.css';

const PostForm = ({ posts, setPosts }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Title is required!');
      return;
    }
    const newPost = { 
      id: Date.now(), 
      title, 
      content, 
      imageUrl, 
      upvotes: 0, 
      createdAt: new Date().toISOString() 
    };
    setPosts([...posts, newPost]);
    setTitle('');
    setContent('');
    setImageUrl('');
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
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default PostForm;