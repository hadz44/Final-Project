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
            <div className="saved-news__grid">
              {savedArticles.map((article, index) => (
                <NewsCard
                  key={article._id || article.url}
                  index={index}
                  card={article}
                  isAuthenticated
                  isSaved
                  onDelete={onDeleteArticle}
                />
              ))}
            </div>
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

