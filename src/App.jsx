import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate, NavLink, useLocation } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateEditPost from './pages/CreateEditPost';
import Bloggers from './pages/Bloggers';

// Automatically scrolls to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Global Page Transition Overlay
const PageTransition = () => {
  const { pathname } = useLocation();
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  React.useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 600); // Matches CSS transition duration
    return () => clearTimeout(timer);
  }, [pathname]);

  return <div className={`page-transition ${isTransitioning ? 'active' : ''}`}></div>;
};

// Guard: redirects to /login if not authenticated
const PrivateRoute = ({ children }) => {
  const { userInfo } = useAuth();
  return userInfo ? children : <Navigate to="/login" replace />;
};

const Navbar = () => {
  const { userInfo, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);

  const handleLogout = () => {
    logoutUser();
    setIsUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleSwitchUser = () => {
    logoutUser();
    setIsUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          <span className="navbar__brand-icon">✨</span>
          <span className="navbar__brand-text">BlogApp</span>
        </Link>

        {/* Mobile Toggle */}
        <button 
          className="navbar__toggle" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <nav className={`navbar__links ${isMobileMenuOpen ? 'navbar__links--open' : ''}`}>
          <NavLink to="/" className="navbar__nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
          <NavLink to="/bloggers" className="navbar__nav-link" onClick={() => setIsMobileMenuOpen(false)}>Bloggers</NavLink>
          {userInfo ? (
            <div className="navbar__user-container">
              <button 
                className="navbar__user-trigger"
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              >
                <div className="user-avatar">{userInfo.name.charAt(0).toUpperCase()}</div>
                <span className="navbar__user-name">{userInfo.name}</span>
                <span className={`chevron ${isUserDropdownOpen ? 'up' : ''}`}>▼</span>
              </button>
              
              {isUserDropdownOpen && (
                <div className="user-dropdown">
                  <Link to="/create" className="dropdown-item" onClick={() => setIsUserDropdownOpen(false)}>
                    <span>✍️</span> New Post
                  </Link>
                  <button className="dropdown-item" onClick={handleSwitchUser}>
                    <span>🔄</span> Switch User
                  </button>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item dropdown-item--danger" onClick={handleLogout}>
                    <span>🚪</span> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="navbar__auth-links">
              <Link to="/login" className="btn btn--ghost btn--sm" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
              <Link to="/register" className="btn btn--primary btn--sm" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

const Footer = () => (
  <footer className="footer">
    <div className="footer__inner">
      <div className="footer__col">
        <Link to="/" className="footer__brand navbar__brand">
          <span className="navbar__brand-icon">✨</span>
          <span className="navbar__brand-text">BlogApp</span>
        </Link>
        <p className="footer__about">
          A platform for creators, designers, and developers to share their stories and insights with the world.
        </p>
      </div>
      <div className="footer__col">
        <h3 className="footer__heading">Quick Links</h3>
        <ul className="footer__links">
          <li><Link to="/" className="footer__link">Latest Posts</Link></li>
          <li><Link to="/login" className="footer__link">Sign In</Link></li>
          <li><Link to="/register" className="footer__link">Join Community</Link></li>
        </ul>
      </div>
      <div className="footer__col">
        <h3 className="footer__heading">Support</h3>
        <ul className="footer__links">
          <li><a href="#" className="footer__link">Privacy Policy</a></li>
          <li><a href="#" className="footer__link">Terms of Use</a></li>
          <li><a href="#" className="footer__link">Contact Us</a></li>
        </ul>
      </div>
    </div>
    <div className="footer__bottom">
      <p>&copy; {new Date().getFullYear()} BlogApp. All rights reserved.</p>
      <p>Built with ❤️ for creators.</p>
    </div>
  </footer>
);

function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <PageTransition />
      <div className={`preloader ${!loading ? 'preloader--hidden' : ''}`}>
        <div className="preloader__logo">✨</div>
        <div className="preloader__bar">
          <div className="preloader__fill"></div>
        </div>
      </div>

      <Navbar />
      <div className={`app-container ${!loading ? 'app-entrance' : ''}`}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/bloggers" element={<Bloggers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private routes */}
          <Route
            path="/create"
            element={<PrivateRoute><CreateEditPost /></PrivateRoute>}
          />
          <Route
            path="/posts/:id/edit"
            element={<PrivateRoute><CreateEditPost /></PrivateRoute>}
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
