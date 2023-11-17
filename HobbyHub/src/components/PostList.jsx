import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from "../supabaseClient";
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState('created_at');
  const [search, setSearch] = useState('');

  
  useEffect(() => {
    fetchPosts();
  }, [sort]); // Refetch posts when sort changes

  const fetchPosts = async () => {
    let query = supabase
      .from('posts')
      .select('id, title, created_at, upvotes');

    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    if (sort === 'upvotes') {
      query = query.order(sort, { ascending: false }); // Sort by upvotes: highest to lowest
    } else {
      query = query.order(sort, { ascending: false }); // Sort by date: latest to oldest
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    fetchPosts();
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select onChange={handleSortChange} value={sort} className="sort-select">
          <option value="created_at">Sort by Date</option>
          <option value="upvotes">Sort by Upvotes</option>
        </select>
      </div>
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <Link to={`/post/${post.id}`} className="post-title">{post.title}</Link>
          <p className="post-metadata">Created at: {new Date(post.created_at).toLocaleString()}</p>
          <p className="post-metadata">Upvotes: {post.upvotes}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
