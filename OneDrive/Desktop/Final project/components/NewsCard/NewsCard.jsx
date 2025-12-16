import './NewsCard.css'

function NewsCard({ card }) {
  if (!card) return null

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <article className="news-card">
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


