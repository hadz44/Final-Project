import './NewsCard.css'
import { useState } from 'react'

function NewsCard({ card, isAuthenticated, isSaved, onSave, onDelete }) {
  const [showTooltip, setShowTooltip] = useState(false)

  if (!card) return null

  // Format date for display (format: "November 19, 2023")
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const handleSaveClick = (e) => {
    e.stopPropagation()
    if (!isAuthenticated) {
      return
    }

    if (isSaved) {
      // Delete article
      if (onDelete && card._id) {
        onDelete(card._id)
      }
    } else {
      // Save article
      if (onSave) {
        onSave({
          keyword: card.keyword || '',
          title: card.title,
          text: card.description || card.content || '',
          date: card.publishedAt || new Date().toISOString(),
          source: card.source?.name || '',
          link: card.url,
          image: card.urlToImage || '',
          url: card.url,
          urlToImage: card.urlToImage,
          publishedAt: card.publishedAt,
        })
      }
    }
  }

  return (
    <article className="news-card">
      <div className="news-card__image-container">
        {card.urlToImage && (
          <img
            src={card.urlToImage}
            alt={card.title || 'News article'}
            className="news-card__image"
            onError={(e) => {
              // Hide image if it fails to load
              e.target.style.display = 'none'
            }}
          />
        )}
        <div className="news-card__save-container">
          <button
            type="button"
            className={`news-card__save-button ${
              !isAuthenticated ? 'news-card__save-button_inactive' : ''
            } ${isSaved ? 'news-card__save-button_saved' : ''}`}
            onClick={handleSaveClick}
            onMouseEnter={() => !isAuthenticated && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            aria-label={isSaved ? 'Remove from saved articles' : 'Save article'}
          >
            <svg
              className="news-card__save-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={isSaved ? '#2F71E5' : 'none'}
              stroke={isSaved ? '#2F71E5' : '#B6BCBF'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
          {showTooltip && !isAuthenticated && (
            <div className="news-card__tooltip">Sign in to save articles</div>
          )}
        </div>
      </div>
      <div className="news-card__content">
        <div className="news-card__header">
          <p className="news-card__date">{formatDate(card.publishedAt)}</p>
          <p className="news-card__source">{card.source?.name || 'Unknown source'}</p>
        </div>
        <h3 className="news-card__title">{card.title || 'No title'}</h3>
        <p className="news-card__text">{card.description || card.content || ''}</p>
        {card.url && (
          <a
            href={card.url}
            target="_blank"
            rel="noopener noreferrer"
            className="news-card__link"
          >
            Read more
          </a>
        )}
      </div>
    </article>
  )
}

export default NewsCard
