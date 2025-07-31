import React from 'react';
import './App.css';

function App() {
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
        {/* Post form will go here */}
      </main>
    </div>
  );
}

export default App;