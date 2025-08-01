import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PostDetail = ({ posts, setPosts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === parseInt(id));
  const [comments, setComments] = useState(post?.comments || []);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (post) {
      setComments(post.comments || []);
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

  if (!post) return <div style={{ padding: '20px' }}>Post not found.</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '20px auto', backgroundColor: 'white', borderRadius: '5px' }}>
      <h2>{post.title}</h2>
      {post.content && <p>{post.content}</p>}
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} style={{ maxWidth: '100%', marginTop: '10px' }} />}
      <p>Posted: {new Date(post.createdAt).toLocaleString()}</p>
      <p>Upvotes: {post.upvotes || 0}</p>
      <button
        onClick={handleUpvote}
        style={{ padding: '5px 10px', backgroundColor: '#26a69a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Upvote
      </button>
      <div style={{ marginTop: '20px' }}>
        <h3>Comments</h3>
        {comments.length === 0 ? (
          <p>No comments yet. Be the first!</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} style={{ marginBottom: '10px' }}>
              <p>{comment.text}</p>
              <small>Posted: {new Date(comment.createdAt).toLocaleString()}</small>
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
      <button
        onClick={() => navigate('/')}
        style={{ padding: '5px 10px', backgroundColor: '#ccc', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
      >
        Back to Home
      </button>
    </div>
  );
};

export default PostDetail;