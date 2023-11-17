import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import './EditPage.css'
const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '', image_url: '' });

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching post:', error);
    } else {
      setPost({ title: data.title, content: data.content, image_url: data.image_url });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('posts')
      .update({ title: post.title, content: post.content, image_url: post.image_url })
      .match({ id });

    if (error) {
      console.error('Error updating post:', error);
    } else {
      console.log('Post updated:', data);
      navigate(`/post/${id}`);
    }
  };

  return (
    <div className="create-post-form">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          className="create-post-input"
        />
        <textarea
          placeholder="Content"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          className="create-post-textarea"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={post.image_url}
          onChange={(e) => setPost({ ...post, image_url: e.target.value })}
          className="create-post-input"
        />
        <button type="submit" className="create-post-button">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;

