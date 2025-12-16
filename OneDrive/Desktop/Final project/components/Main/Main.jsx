import './Main.css'
import { useState, useEffect } from 'react'
import SearchForm from '../SearchForm/SearchForm'
import NewsCard from '../NewsCard/NewsCard'
import About from '../About/About'
import Preloader from '../Preloader/Preloader'
import LoginModal from '../LoginModal/LoginModal'
import RegisterModal from '../RegisterModal/RegisterModal'

function Main({
  isLoading,
  newsArticles,
  searchError,
  apiError,
  onSearch,
  onClearSearchError,
  isAuthenticated,
  isLoginModalOpen,
  isRegisterModalOpen,
  onLoginClick,
  onRegisterClick,
  onCloseModal,
  onLogin,
  onRegister,
}) {
  const [displayedCount, setDisplayedCount] = useState(3)

  // Reset displayed count when newsArticles change
  useEffect(() => {
    setDisplayedCount(3)
  }, [newsArticles])

  // Handle "Show more" button click
  const handleShowMore = () => {
    setDisplayedCount((prev) => prev + 3)
  }

  // Get displayed articles (3 at a time)
  const displayedArticles = newsArticles.slice(0, displayedCount)
  const hasMore = newsArticles.length > displayedCount

  if (!isAuthenticated) {
    return (
      <main className="main">
        <section className="main__auth-required">
          <div className="main__auth-message">
            <h1 className="main__title">Welcome to Stock Market Analyzer</h1>
            <p className="main__subtitle">
              Please sign up or sign in to access stock market graphs and data
            </p>
            <div className="main__auth-buttons">
              <button
                type="button"
                className="main__auth-button main__auth-button_primary"
                onClick={onRegisterClick}
              >
                Sign up
              </button>
              <button
                type="button"
                className="main__auth-button main__auth-button_secondary"
                onClick={onLoginClick}
              >
                Sign in
              </button>
            </div>
          </div>
        </section>
        <About />
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={onCloseModal}
          onLogin={onLogin}
          onSwitchToRegister={onRegisterClick}
        />
        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={onCloseModal}
          onRegister={onRegister}
          onSwitchToLogin={onLoginClick}
        />
      </main>
    )
  }

  return (
    <main className="main">
      <section className="main__search-section">
        <h1 className="main__title">Stock Market Analyzer</h1>
        <p className="main__subtitle">
          Enter a keyword to search for news articles
        </p>
        <SearchForm
          onSearch={onSearch}
          error={searchError}
          onErrorClear={onClearSearchError}
        />
      </section>

      {isLoading ? (
        <Preloader text="Searching for news..." />
      ) : apiError ? (
        <section className="main__error-section">
          <p className="main__error-message">{apiError}</p>
        </section>
      ) : newsArticles.length === 0 && !isLoading ? (
        <section className="main__no-results-section">
          <p className="main__no-results-message">Nothing found</p>
        </section>
      ) : (
        <section className="main__results-section">
          <div className="main__results-grid">
            {displayedArticles.map((article, index) => (
              <NewsCard key={article.url || index} card={article} />
            ))}
          </div>
          {hasMore && (
            <div className="main__show-more-container">
              <button
                type="button"
                className="main__show-more-button"
                onClick={handleShowMore}
              >
                Show more
              </button>
            </div>
          )}
        </section>
      )}

      <About />
    </main>
  )
}

export default Main
