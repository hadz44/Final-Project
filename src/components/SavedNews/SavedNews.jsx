import './SavedNews.css'
import NewsCard from '../NewsCard/NewsCard'

function SavedNews({ savedArticles, onDeleteArticle }) {
  return (
    <main className="saved-news">
      <div className="saved-news__container">
        <h1 className="saved-news__title">Saved articles</h1>
        {savedArticles && savedArticles.length > 0 ? (
          <>
            <p className="saved-news__count">
              {savedArticles.length} saved articles
            </p>
            <ul className="saved-news__list">
              {savedArticles.map((article, index) => (
                <li className="saved-news__item" key={article._id || article.url}>
                  <NewsCard
                    index={index}
                    card={article}
                    isAuthenticated
                    isSaved
                    onDelete={onDeleteArticle}
                  />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="saved-news__empty">
            <p>You haven't saved any articles yet.</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default SavedNews

