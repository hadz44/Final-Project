import './Navigation.css'
import { Link, useLocation } from 'react-router-dom'

function Navigation({ isAuthenticated, userName, onLoginClick, onRegisterClick, onLogout }) {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const isWatchlistPage = location.pathname === '/watchlist'
  const isSavedNewsPage = location.pathname === '/saved-news'

  return (
    <nav className="navigation">
      <Link to="/" className="navigation__logo">
        StockMarket
      </Link>
      <div className="navigation__links">
        <Link
          to="/"
          className={`navigation__link ${isHomePage ? 'navigation__link_active' : ''}`}
        >
          Home
        </Link>
        {isAuthenticated && (
          <Link
            to="/watchlist"
            className={`navigation__link ${isWatchlistPage ? 'navigation__link_active' : ''}`}
          >
            Watchlist
          </Link>
        )}
        {isAuthenticated && (
          <Link
            to="/saved-news"
            className={`navigation__link ${isSavedNewsPage ? 'navigation__link_active' : ''}`}
          >
            Saved News
          </Link>
        )}
        {isAuthenticated ? (
          <div className="navigation__user">
            <span className="navigation__user-name">{userName}</span>
            <button
              type="button"
              className="navigation__button navigation__button_logout"
              onClick={onLogout}
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="navigation__auth">
            <button
              type="button"
              className="navigation__button navigation__button_login"
              onClick={onLoginClick}
            >
              Sign in
            </button>
            <button
              type="button"
              className="navigation__button navigation__button_register"
              onClick={onRegisterClick}
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
