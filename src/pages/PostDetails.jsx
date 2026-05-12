import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, deletePost } from '../services/postService';
import { getCommentsByPost } from '../services/commentService';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import { formatDate, getErrorMessage } from '../utils/helpers';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postData, commentData] = await Promise.all([
          getPostById(id),
          getCommentsByPost(id),
        ]);
        setPost(postData);
        setComments(commentData);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleDeletePost = async () => {
    if (window.confirm('Delete this post?')) {
      try {
        await deletePost(id);
        navigate('/');
      } catch (err) {
        setError(getErrorMessage(err));
      }
    }
  };

  const handleCommentAdded = (newComment) => {
    setComments((prev) => [...prev, newComment]);
  };

  const handleCommentDeleted = (deletedId) => {
    setComments((prev) => prev.filter((c) => c._id !== deletedId));
  };

  if (loading) return <p className="status-msg">Loading post...</p>;
  if (error) return <p className="status-msg status-msg--error">{error}</p>;
  if (!post) return null;

  const isAuthor = userInfo && post.author && userInfo._id === post.author._id;

  return (
    <main className="page page--detail">
      <article className="post-detail">
        <h1 className="post-detail__title">{post.title}</h1>
        <p className="post-detail__meta">
          By <span>{post.author?.name}</span> &bull; {formatDate(post.createdAt)}
        </p>

        {post.imageUrl && (
          <div className="post-detail__image-wrapper">
            <img src={post.imageUrl} alt={post.title} className="post-detail__image" />
          </div>
        )}

        {isAuthor && (
          <div className="post-detail__actions">
            <Link to={`/posts/${id}/edit`} className="btn btn--secondary">
              Edit
            </Link>
            <button onClick={handleDeletePost} className="btn btn--danger">
              Delete
            </button>
          </div>
        )}

        <div className="post-detail__content">{post.content}</div>
      </article>

      <section className="comments-section">
        <h2 className="comments-section__heading">Comments ({comments.length})</h2>
        <CommentList comments={comments} onDelete={handleCommentDeleted} />
        <CommentForm postId={id} onCommentAdded={handleCommentAdded} />
      </section>
    </main>
  );
};

export default PostDetails;
