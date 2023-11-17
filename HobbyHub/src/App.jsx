import React from 'react';
import CreatePost from './components/CreatePost'; 
import PostList from './components/PostList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostPage from './components/PostPage';
import './index.css'; 
import { Link } from 'react-router-dom';
import EditPost from './components/EditPage'; 

const App = () => {
  return (
    <Router>
      <div className="container">
        <header className="header">
          <h1>Egyptian Myth</h1>
          <nav>
          <Link to="/create-post" className="nav-button">Create New Post</Link>
          <Link to="/" className="nav-button">Home</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;



