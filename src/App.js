import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import PostForm from './components/PostForm';
import PostFeed from './components/PostFeed';
import PostDetail from './components/PostDetail';

function App() {
  const [posts, setPosts] = useState([]);
  const [currentSecretKey, setCurrentSecretKey] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate initial data fetch
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1-second delay to show loading animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="app">
        <header>
          <h1>ScienceHistoryHub</h1>
          <div>
            <input type="text" placeholder="Search" />
            <Link to="/">Home</Link>
            <Link to="/create">Create New Post</Link>
          </div>
        </header>
        <main>
          {isLoading && <div className="loading-overlay"><div className="loading-spinner"></div></div>}
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <PostForm posts={posts} setPosts={setPosts} currentSecretKey={currentSecretKey} setCurrentSecretKey={setCurrentSecretKey} />
                  <PostFeed posts={posts} isLoading={isLoading} />
                </>
              }
            />
            <Route
              path="/post/:id"
              element={<PostDetail posts={posts} setPosts={setPosts} currentSecretKey={currentSecretKey} />}
            />
            <Route
              path="/create"
              element={<PostForm posts={posts} setPosts={setPosts} currentSecretKey={currentSecretKey} setCurrentSecretKey={setCurrentSecretKey} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;