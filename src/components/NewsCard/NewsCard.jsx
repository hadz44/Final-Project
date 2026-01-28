import './NewsCard.css'
import { useState } from 'react'

const FALLBACK_IMAGES = [
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22220%22%20viewBox%3D%220%200%20400%20220%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g1%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%232f71e5%22/%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23764ba2%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width%3D%22400%22%20height%3D%22220%22%20fill%3D%22url(%23g1)%22/%3E%3Ctext%20x%3D%2220%22%20y%3D%22120%22%20fill%3D%22%23ffffff%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2224%22%20opacity%3D%220.9%22%3ENews%20Highlights%3C/text%3E%3C/svg%3E',
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22220%22%20viewBox%3D%220%200%20400%20220%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g2%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2320c997%22/%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%232f71e5%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width%3D%22400%22%20height%3D%22220%22%20fill%3D%22url(%23g2)%22/%3E%3Ctext%20x%3D%2220%22%20y%3D%22120%22%20fill%3D%22%23ffffff%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2224%22%20opacity%3D%220.9%22%3EMarket%20News%3C/text%3E%3C/svg%3E',
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22220%22%20viewBox%3D%220%200%20400%20220%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g3%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ffb347%22/%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23ff5f6d%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width%3D%22400%22%20height%3D%22220%22%20fill%3D%22url(%23g3)%22/%3E%3Ctext%20x%3D%2220%22%20y%3D%22120%22%20fill%3D%22%23ffffff%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2224%22%20opacity%3D%220.9%22%3ETop%20Stories%3C/text%3E%3C/svg%3E',
]

function NewsCard({ card, isAuthenticated, isSaved, onSave, onDelete, index = 0 }) {
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

    const sourceName = card.source?.name || card.sourceName || card.source || 'Unknown source'

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
          source: sourceName,
          link: card.url,
          image: card.urlToImage || '',
          url: card.url,
          urlToImage: card.urlToImage,
          publishedAt: card.publishedAt,
        })
      }
    }
  }

  const imageSrc =
    card.urlToImage ||
    card.image ||
    FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]

  return (
    <article className="news-card">
      <div className="news-card__image-container">
        <img
          src={imageSrc}
          alt={card.title || 'News article'}
          className="news-card__image"
          onError={(e) => {
            e.target.src = FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]
          }}
        />
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
          <p className="news-card__source">
            {card.source?.name || card.sourceName || card.source || 'Unknown source'}
          </p>
        </div>
        <h3 className="news-card__title">{card.title || 'No title'}</h3>
        <p className="news-card__text">
          {card.description || card.text || card.content || ''}
        </p>
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
