import React, { useState } from 'react';
import './App.css';
import PostForm from './components/PostForm';

function App() {
  const [posts, setPosts] = useState([]);

  return (
    <div className="app">
      <header>
        <h1>ScienceHistoryHub</h1>
        <div>
          <input type="text" placeholder="Search" />
          <a href="#">Home</a>
          <a href="#">Create New Post</a>
        </div>
      </header>
      <main>
        <PostForm posts={posts} setPosts={setPosts} />
      </main>
    </div>
  );
}

export default App;