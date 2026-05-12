import { useState, useEffect } from 'react';
import { getAllPosts } from '../services/postService';
import PostCard from '../components/PostCard';
import { getErrorMessage } from '../utils/helpers';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const { userInfo } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Tech', 'Design', 'Lifestyle', 'Coding', 'Minimalism', 'Mental Health'];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = (deletedId) => {
    setPosts((prev) => prev.filter((p) => p._id !== deletedId));
  };

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(p => p.category === selectedCategory);

  return (
    <main className="page page--home">
      <section className="hero">
        <div className="aurora-bg">
          <div className="aurora-bg__item"></div>
          <div className="aurora-bg__item"></div>
          <div className="aurora-bg__item"></div>
        </div>
        
        <div className="hero__content">
          <span className="hero__tag">Future of Writing</span>
          <h1 className="hero__title">
            Where <span>Stories</span> Meet the <span>World</span>
          </h1>
          <p className="hero__text">
            Explore the latest insights from top creators, designers, and developers. 
            Join our community to share your own unique voice.
          </p>
          <div className="hero__actions">
            {!userInfo ? (
              <>
                <Link to="/register" className="btn btn--primary btn--lg">Get Started</Link>
                <Link to="/login" className="btn btn--outline btn--lg">Sign In</Link>
              </>
            ) : (
              <Link to="/create" className="btn btn--primary btn--lg">+ Create New Post</Link>
            )}
          </div>
        </div>
      </section>

      <section className="spotlight">
        <div className="spotlight__image-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" 
            alt="Famous Blogger" 
            className="spotlight__image"
          />
        </div>
        <div className="spotlight__content">
          <span className="spotlight__badge">Featured Blogger</span>
          <h2 className="spotlight__title">A Personal Welcome.</h2>
          <p className="spotlight__quote">
            "The secret to great writing is simply being brave enough to tell your own truth. This platform is where your voice finally finds its home."
          </p>
          <div className="spotlight__author">
            <div className="spotlight__author-info">
              <h4>Ava Sterling</h4>
              <p>Author of "The Digital Nomad's Heart"</p>
            </div>
          </div>
        </div>
      </section>

      <div className="page__header">
        <h1 className="page__heading">Latest Stories</h1>
      </div>

      <div className="home-layout">
        <aside className="sidebar">
          <ul className="sidebar__list">
            {categories.map(cat => (
              <li key={cat}>
                <button 
                  className={`sidebar__btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="home-content">
          {loading && <p className="status-msg">Loading posts...</p>}
          {error && <p className="status-msg status-msg--error">{error}</p>}
          {!loading && !error && filteredPosts.length === 0 && (
            <p className="status-msg">No posts found in this category.</p>
          )}

          <div className="post-grid">
            {filteredPosts.map((post) => (
              <PostCard key={post._id} post={post} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      </div>

      <section className="newsletter-section">
        <h2 className="newsletter__title">Stay in the Loop</h2>
        <p className="newsletter__text">
          Get the latest insights on design, tech, and creative writing delivered straight to your inbox.
        </p>
        <form className="newsletter__form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group" style={{ flex: 1 }}>
            <input type="email" placeholder="your@email.com" required />
          </div>
          <button type="submit" className="btn btn--primary">Subscribe</button>
        </form>
      </section>
    </main>
  );
};

export default Home;
