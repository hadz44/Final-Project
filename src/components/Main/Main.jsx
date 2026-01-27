import './Main.css'
import { useState, useEffect } from 'react'
import SearchForm from '../SearchForm/SearchForm'
import NewsCard from '../NewsCard/NewsCard'
import StockGraph from '../StockGraph/StockGraph'
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
  savedArticles,
  onSaveArticle,
  onDeleteArticle,
  stockData,
  isStockLoading,
  stockError,
  onSearchStock,
  onSaveStock,
  onRemoveStock,
  savedStocks,
  isLoginModalOpen,
  isRegisterModalOpen,
  onLoginClick,
  onRegisterClick,
  onCloseModal,
  onLogin,
  onRegister,
}) {
  const [displayedCount, setDisplayedCount] = useState(3)
  const [stockSymbol, setStockSymbol] = useState('')

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
            <h1 className="main__title">Welcome to Market & News Explorer</h1>
            <p className="main__subtitle">
              Please sign up or sign in to access stocks, charts, and news
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
        <h1 className="main__title">Market & News Explorer</h1>
        <p className="main__subtitle">
          Enter a keyword to search financial news articles
        </p>
        <SearchForm
          onSearch={onSearch}
          error={searchError}
          onErrorClear={onClearSearchError}
        />
      </section>

      <section className="main__stock-section">
        <h2 className="main__stock-title">Search for a stock</h2>
        <form
          className="main__stock-form"
          onSubmit={(e) => {
            e.preventDefault()
            onSearchStock(stockSymbol)
          }}
        >
          <div className="main__stock-input-group">
            <input
              type="text"
              className={`main__stock-input ${
                stockError ? 'main__stock-input_error' : ''
              }`}
              placeholder="Enter stock symbol (e.g., AAPL)"
              value={stockSymbol}
              onChange={(e) => setStockSymbol(e.target.value)}
            />
            {stockError && (
              <span className="main__stock-error">{stockError}</span>
            )}
          </div>
          <button type="submit" className="main__stock-button">
            Search Stock
          </button>
        </form>

        {isStockLoading ? (
          <Preloader text="Searching for stock..." />
        ) : stockData ? (
          <div className="main__stock-result">
            <StockGraph
              symbol={stockData.symbol}
              data={stockData}
              isLoading={false}
            />
            {(() => {
              const savedStock = savedStocks.find(
                (stock) => stock.symbol === stockData.symbol
              )
              if (savedStock) {
                return (
                  <button
                    type="button"
                    className="main__save-stock-button main__save-stock-button_saved"
                    onClick={() => onRemoveStock(savedStock._id)}
                  >
                    Remove from Watchlist
                  </button>
                )
              }
              return (
                <button
                  type="button"
                  className="main__save-stock-button"
                  onClick={() => onSaveStock(stockData)}
                >
                  Add to Watchlist
                </button>
              )
            })()}
          </div>
        ) : null}
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
            {displayedArticles.map((article, index) => {
              // Check if article is saved by comparing URL
              const savedArticle = savedArticles.find(
                (saved) => (saved.url || saved.link) === article.url
              )
              const isSaved = !!savedArticle
              
              return (
                <NewsCard
                  key={article.url || index}
                  index={index}
                  card={{
                    ...article,
                    _id: savedArticle?._id, // Add saved article ID if it exists
                  }}
                  isAuthenticated={isAuthenticated}
                  isSaved={isSaved}
                  onSave={onSaveArticle}
                  onDelete={onDeleteArticle}
                />
              )
            })}
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
