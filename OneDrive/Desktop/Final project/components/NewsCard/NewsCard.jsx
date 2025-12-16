import './NewsCard.css'

function NewsCard({ card }) {
  if (!card) return null

  return (
    <article className="news-card">
      {card.urlToImage && (
        <img
          src={card.urlToImage}
          alt={card.title}
          className="news-card__image"
        />
      )}
      <div className="news-card__content">
        <p className="news-card__date">{card.publishedAt}</p>
        <h3 className="news-card__title">{card.title}</h3>
        <p className="news-card__text">{card.description}</p>
        <p className="news-card__source">{card.source?.name}</p>
      </div>
    </article>
  )
}

export default NewsCard

