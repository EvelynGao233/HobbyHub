import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import './PostPage.css'
import { Link } from 'react-router-dom';

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchPost();
    fetchComments();
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
      setPost(data);
    }
  };

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching comments:', error);
    } else {
      setComments(data);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('comments')
      .insert([{ post_id: id, content: newComment }]);
  
    if (error) {
      console.error('Error adding comment:', error);
    } else {
      setNewComment(''); 
      // Refetch the comments to include the new one
      fetchComments();
    }
  };

  const handleUpvote = async () => {
    // Optimistically update the UI
    setPost({ ...post, upvotes: (post.upvotes || 0) + 1 });

    // Then send the update to the server
    const { data, error } = await supabase
      .from('posts')
      .update({ upvotes: (post.upvotes || 0) + 1 })
      .eq('id', id);

    if (error) {
      // If the server update fails, revert the optimistic update
      setPost({ ...post, upvotes: (post.upvotes || 0) - 1 });
      console.error('Error updating upvotes:', error);
    }
  };

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from('posts')
      .delete()
      .match({ id: id }); // Ensure this matches the column name in your database
  
    if (error) {
      console.error('Error deleting post:', error.message);
    } else {
      console.log('Post deleted:', data);
      navigate('/');
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-page">
      <article className="post">
        <h2 className="post-title">{post.title}</h2>
        {post.content && <p className="post-content">{post.content}</p>}
        {post.image_url && <img src={post.image_url} alt={post.title} className="post-image" />}
        <div className="post-actions">
          <button onClick={handleUpvote} className="button">Upvote</button>
          <span>Upvotes: {post.upvotes}</span>
          <button onClick={handleDelete} className="button">Delete Post</button>
          <Link to={`/edit/${post.id}`} className="button edit-button">Edit Post</Link>
        </div>
      </article>
      <section className="comments">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            {comment.content}
          </div>
        ))}
      </section>
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
        <button type="submit">Add Comment</button>
      </form>

      <Link to="/">Back to posts</Link>
    </div>
  );
};

export default PostPage;