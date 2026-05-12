import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, createPost, updatePost } from '../services/postService';
import { getErrorMessage } from '../utils/helpers';

const CreateEditPost = () => {
  const { id } = useParams(); // id present = edit mode
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({ title: '', content: '', imageUrl: '' });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isEditMode) return;
    const fetchPost = async () => {
      try {
        const post = await getPostById(id);
        setFormData({ title: post.title, content: post.content, imageUrl: post.imageUrl || '' });
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setFetchLoading(false);
      }
    };
    fetchPost();
  }, [id, isEditMode]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isEditMode) {
        const updated = await updatePost(id, formData);
        navigate(`/posts/${updated._id}`);
      } else {
        const created = await createPost(formData);
        navigate(`/posts/${created._id}`);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <p className="status-msg">Loading post...</p>;

  return (
    <main className="page page--form">
      <div className="form-card">
        <h1 className="form-card__title">{isEditMode ? 'Edit Post' : 'Create New Post'}</h1>

        {error && <p className="form-error">{error}</p>}

        <form className="post-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter an engaging title..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">Image URL (optional)</label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/photo..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              rows={12}
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your post content here..."
              required
            />
          </div>

          <div className="post-form__actions">
            <button type="button" className="btn btn--outline" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary" disabled={loading}>
              {loading ? 'Saving...' : isEditMode ? 'Update Post' : 'Publish Post'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateEditPost;
