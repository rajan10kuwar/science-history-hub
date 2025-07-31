import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import PostForm from './components/PostForm';
import PostFeed from './components/PostFeed';
import PostDetail from './components/PostDetail';

function App() {
  const [posts, setPosts] = useState([]);

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
          <Routes>
            <Route exact path="/" element={
              <>
                <PostForm posts={posts} setPosts={setPosts} />
                <PostFeed posts={posts} />
              </>
            } />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/create" element={<PostForm posts={posts} setPosts={setPosts} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;