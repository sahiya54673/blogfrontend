import { Link } from 'react-router-dom';
import { formatDate, truncate, calculateReadTime } from '../utils/helpers';
import useAuth from '../hooks/useAuth';
import { deletePost } from '../services/postService';

const PostCard = ({ post, onDelete }) => {
  const { userInfo } = useAuth();
  const isAuthor = userInfo && post.author && userInfo._id === post.author._id;

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(post._id);
        if (onDelete) onDelete(post._id);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <article className="post-card">
      {post.imageUrl && (
        <div className="post-card__image-wrapper">
          <img src={post.imageUrl} alt={post.title} className="post-card__image" />
        </div>
      )}
      <div className="post-card__body">
        <Link to={`/posts/${post._id}`} className="post-card__title-link">
          <h2 className="post-card__title">{post.title}</h2>
        </Link>
        <p className="post-card__meta">
          {formatDate(post.createdAt)} &bull;{' '}
          <span>{calculateReadTime(post.content)}</span>
        </p>
        <p className="post-card__excerpt">{truncate(post.content)}</p>
      </div>

      <div className="post-card__footer">
        <Link to={`/posts/${post._id}`} className="btn btn--outline">
          Read More
        </Link>
        {isAuthor && (
          <div className="post-card__actions">
            <Link to={`/posts/${post._id}/edit`} className="btn btn--secondary">
              Edit
            </Link>
            <button onClick={handleDelete} className="btn btn--danger">
              Delete
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default PostCard;
