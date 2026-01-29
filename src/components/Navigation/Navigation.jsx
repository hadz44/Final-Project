import './Navigation.css'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

function Navigation({ isAuthenticated, userName, onLoginClick, onRegisterClick, onLogout }) {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const isWatchlistPage = location.pathname === '/watchlist'
  const isSavedNewsPage = location.pathname === '/saved-news'
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className="navigation">
      <Link to="/" className="navigation__logo">
        Market & News
      </Link>
      <button
        type="button"
        className="navigation__toggle"
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        onClick={toggleMenu}
      >
        <span className="navigation__toggle-line" />
        <span className="navigation__toggle-line" />
        <span className="navigation__toggle-line" />
      </button>
      <div className={`navigation__links ${isMenuOpen ? 'navigation__links_open' : ''}`}>
        <Link
          to="/"
          className={`navigation__link ${isHomePage ? 'navigation__link_active' : ''}`}
          onClick={closeMenu}
        >
          Home
        </Link>
        {isAuthenticated && (
          <Link
            to="/watchlist"
            className={`navigation__link ${isWatchlistPage ? 'navigation__link_active' : ''}`}
            onClick={closeMenu}
          >
            Watchlist
          </Link>
        )}
        {isAuthenticated && (
          <Link
            to="/saved-news"
            className={`navigation__link ${isSavedNewsPage ? 'navigation__link_active' : ''}`}
            onClick={closeMenu}
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
              onClick={() => {
                onLogout()
                closeMenu()
              }}
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="navigation__auth">
            <button
              type="button"
              className="navigation__button navigation__button_login"
              onClick={() => {
                onLoginClick()
                closeMenu()
              }}
            >
              Sign in
            </button>
            <button
              type="button"
              className="navigation__button navigation__button_register"
              onClick={() => {
                onRegisterClick()
                closeMenu()
              }}
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
