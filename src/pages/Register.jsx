import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Register = () => {
  const { registerUser, loading, error } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData.name, formData.email, formData.password);
      navigate('/');
    } catch {
      // error shown via context
    }
  };

  return (
    <main className="page page--auth">
      <div className="auth-container">
        <div className="auth-image-side" style={{ background: 'linear-gradient(135deg, #ec4899, #f43f5e)' }}>
          <div className="auth-image-content">
            <h2>Start Your Story Today.</h2>
            <p>Join over 10,000+ creators sharing their insights with the world.</p>
          </div>
        </div>
        
        <div className="auth-form-side">
          <div className="auth-card">
            <h1 className="auth-card__title">Create Account</h1>
            <p className="auth-card__sub">Sign up to start publishing</p>

            {error && <p className="form-error">{error}</p>}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  minLength={6}
                  required
                />
              </div>

              <button type="submit" className="btn btn--primary btn--full btn--lg" disabled={loading}>
                {loading ? 'Creating account...' : 'Get Started'}
              </button>
            </form>

            <p className="auth-card__switch">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
