import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { loginUser, loading, error } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(formData.email, formData.password);
      navigate('/');
    } catch {
      // error shown via context
    }
  };

  return (
    <main className="page page--auth">
      <div className="auth-container">
        <div className="auth-image-side">
          <div className="auth-image-content">
            <h2>Welcome Back to the Future.</h2>
            <p>Continue your journey with the world's most creative community.</p>
          </div>
        </div>
        
        <div className="auth-form-side">
          <div className="auth-card">
            <h1 className="auth-card__title">Sign In</h1>
            <p className="auth-card__sub">Enter your credentials to continue</p>

            {error && <p className="form-error">{error}</p>}

            <form className="auth-form" onSubmit={handleSubmit}>
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
                  placeholder="••••••••"
                  required
                />
              </div>

              <button type="submit" className="btn btn--primary btn--full btn--lg" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="auth-card__switch">
              New here? <Link to="/register">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
