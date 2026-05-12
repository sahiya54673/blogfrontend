import { useState } from 'react';
import { createComment } from '../services/commentService';
import { getErrorMessage } from '../utils/helpers';
import useAuth from '../hooks/useAuth';

const CommentForm = ({ postId, onCommentAdded }) => {
  const { userInfo } = useAuth();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!userInfo) {
    return (
      <p className="comment-form__login-prompt">
        Please <a href="/login">log in</a> to leave a comment.
      </p>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const newComment = await createComment(text, postId);
      setText('');
      if (onCommentAdded) onCommentAdded(newComment);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <h3 className="comment-form__title">Leave a Comment</h3>
      {error && <p className="form-error">{error}</p>}
      <textarea
        className="comment-form__textarea"
        rows={4}
        placeholder="Write your comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button type="submit" className="btn btn--primary" disabled={loading}>
        {loading ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
};

export default CommentForm;
