import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PostDetail = ({ posts, setPosts, currentSecretKey }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === parseInt(id));
  const [comments, setComments] = useState(post?.comments || []);
  const [newComment, setNewComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post?.title || '');
  const [editedContent, setEditedContent] = useState(post?.content || '');
  const [editedImageUrl, setEditedImageUrl] = useState(post?.imageUrl || '');
  const [authKey, setAuthKey] = useState('');
  const [isDeletingPost, setIsDeletingPost] = useState(false);
  const [isDeletingComment, setIsDeletingComment] = useState(null); // Track which comment to delete

  useEffect(() => {
    if (post) {
      setComments(post.comments || []);
      setEditedTitle(post.title || '');
      setEditedContent(post.content || '');
      setEditedImageUrl(post.imageUrl || '');
    }
  }, [post]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const updatedComments = [...(post?.comments || []), { id: Date.now(), text: newComment, createdAt: new Date().toISOString() }];
      const updatedPosts = posts.map(p =>
        p.id === post.id ? { ...p, comments: updatedComments } : p
      );
      setPosts(updatedPosts);
      setComments(updatedComments);
      setNewComment('');
    }
  };

  const handleUpvote = () => {
    const updatedPosts = posts.map(p =>
      p.id === post.id ? { ...p, upvotes: (p.upvotes || 0) + 1 } : p
    );
    setPosts(updatedPosts);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (editedTitle.trim()) {
      if (!authKey || (post.secretKey && post.secretKey !== authKey)) {
        alert('Unauthorized! Please enter the correct secret key.');
        return;
      }
      const updatedPosts = posts.map(p =>
        p.id === post.id ? { ...p, title: editedTitle, content: editedContent, imageUrl: editedImageUrl } : p
      );
      setPosts(updatedPosts);
      setIsEditing(false);
      setAuthKey('');
    } else {
      alert('Title is required!');
    }
  };

  const handleDeletePost = () => {
    setIsDeletingPost(true);
  };

  const handleConfirmDeletePost = (e) => {
    e.preventDefault();
    if (post.secretKey !== authKey) {
      alert('Unauthorized! Please enter the correct secret key.');
      setIsDeletingPost(false);
      setAuthKey('');
      return;
    }
    if (window.confirm('Are you sure you want to delete this post?')) {
      const updatedPosts = posts.filter(p => p.id !== post.id);
      setPosts(updatedPosts);
      navigate('/');
    }
    setIsDeletingPost(false);
    setAuthKey('');
  };

  const handleDeleteComment = (commentId) => {
    setIsDeletingComment(commentId);
  };

  const handleConfirmDeleteComment = (e) => {
    e.preventDefault();
    if (post.secretKey !== authKey) {
      alert('Unauthorized! Please enter the correct secret key.');
      setIsDeletingComment(null);
      setAuthKey('');
      return;
    }
    const updatedComments = comments.filter(c => c.id !== isDeletingComment);
    const updatedPosts = posts.map(p =>
      p.id === post.id ? { ...p, comments: updatedComments } : p
    );
    setPosts(updatedPosts);
    setComments(updatedComments);
    setIsDeletingComment(null);
    setAuthKey('');
  };

  if (!post) return <div style={{ padding: '20px' }}>Post not found.</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '20px auto', backgroundColor: 'white', borderRadius: '5px' }}>
      {isEditing ? (
        <form onSubmit={handleSaveEdit}>
          <div>
            <label>Secret Key</label>
            <input
              type="password"
              value={authKey}
              onChange={(e) => setAuthKey(e.target.value)}
              placeholder="Enter secret key to edit"
              required
            />
          </div>
          <div>
            <label>Title</label>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Content (Optional)</label>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          </div>
          <div>
            <label>Image URL (Optional)</label>
            <input
              type="url"
              value={editedImageUrl}
              onChange={(e) => setEditedImageUrl(e.target.value)}
            />
          </div>
          <button type="submit" style={{ padding: '5px 10px', backgroundColor: '#26a69a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            style={{ padding: '5px 10px', backgroundColor: '#ccc', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px' }}
          >
            Cancel
          </button>
        </form>
      ) : isDeletingPost ? (
        <form onSubmit={handleConfirmDeletePost}>
          <div>
            <label>Secret Key</label>
            <input
              type="password"
              value={authKey}
              onChange={(e) => setAuthKey(e.target.value)}
              placeholder="Enter secret key to delete"
              required
            />
          </div>
          <button type="submit" style={{ padding: '5px 10px', backgroundColor: '#ff4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Confirm Delete
          </button>
          <button
            type="button"
            onClick={() => setIsDeletingPost(false)}
            style={{ padding: '5px 10px', backgroundColor: '#ccc', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px' }}
          >
            Cancel
          </button>
        </form>
      ) : isDeletingComment !== null ? (
        <form onSubmit={handleConfirmDeleteComment}>
          <div>
            <label>Secret Key</label>
            <input
              type="password"
              value={authKey}
              onChange={(e) => setAuthKey(e.target.value)}
              placeholder="Enter secret key to delete comment"
              required
            />
          </div>
          <button type="submit" style={{ padding: '5px 10px', backgroundColor: '#ff4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Confirm Delete Comment
          </button>
          <button
            type="button"
            onClick={() => setIsDeletingComment(null)}
            style={{ padding: '5px 10px', backgroundColor: '#ccc', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px' }}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h2>{post.title}</h2>
          {post.content && <p>{post.content}</p>}
          {post.imageUrl && <img src={post.imageUrl} alt={post.title} style={{ maxWidth: '100%', marginTop: '10px' }} />}
          <p>Posted: {new Date(post.createdAt).toLocaleString()}</p>
          <p>Upvotes: {post.upvotes || 0}</p>
          <button
            onClick={handleUpvote}
            style={{ padding: '5px 10px', backgroundColor: '#26a69a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}
          >
            Upvote
          </button>
          <button
            onClick={handleEdit}
            style={{ padding: '5px 10px', backgroundColor: '#ffeb3b', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}
          >
            Edit
          </button>
          <button
            onClick={handleDeletePost}
            style={{ padding: '5px 10px', backgroundColor: '#ff4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Delete
          </button>
        </>
      )}
      <div style={{ marginTop: '20px' }}>
        <h3>Comments</h3>
        {comments.length === 0 ? (
          <p>No comments yet. Be the first!</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '5px' }}>
              <p>{comment.text}</p>
              <small>Posted: {new Date(comment.createdAt).toLocaleString()}</small>
              <button
                onClick={() => handleDeleteComment(comment.id)}
                style={{ padding: '3px 6px', backgroundColor: '#ff4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '5px' }}
              >
                Delete Comment
              </button>
            </div>
          ))
        )}
        <form onSubmit={handleAddComment} style={{ marginTop: '10px' }}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <button
            type="submit"
            style={{ padding: '5px 10px', backgroundColor: '#26a69a', color: 'white', border: 'none', borderRadius: '4px', marginTop: '5px' }}
          >
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostDetail;