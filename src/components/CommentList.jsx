import { formatDate } from '../utils/helpers';
import useAuth from '../hooks/useAuth';
import { deleteComment } from '../services/commentService';

const CommentList = ({ comments, onDelete }) => {
  const { userInfo } = useAuth();

  if (!comments || comments.length === 0) {
    return <p className="no-comments">No comments yet. Be the first to comment!</p>;
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this comment?')) {
      try {
        await deleteComment(id);
        if (onDelete) onDelete(id);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <ul className="comment-list">
      {comments.map((comment) => (
        <li key={comment._id} className="comment-item">
          <div className="comment-item__header">
            <span className="comment-item__author">{comment.author?.name ?? 'Anonymous'}</span>
            <span className="comment-item__date">{formatDate(comment.createdAt)}</span>
          </div>
          <p className="comment-item__text">{comment.text}</p>
          {userInfo && userInfo._id === comment.author?._id && (
            <button
              onClick={() => handleDelete(comment._id)}
              className="btn btn--danger btn--sm"
            >
              Delete
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
