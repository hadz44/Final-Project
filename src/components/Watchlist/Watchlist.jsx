import './Watchlist.css'
import StockGraph from '../StockGraph/StockGraph'

function Watchlist({ savedStocks, onRemoveStock }) {
  return (
    <main className="watchlist">
      <div className="watchlist__container">
        <h1 className="watchlist__title">My Watchlist</h1>
        {savedStocks && savedStocks.length > 0 ? (
          <>
            <p className="watchlist__count">
              {savedStocks.length} saved {savedStocks.length === 1 ? 'stock' : 'stocks'}
            </p>
            <div className="watchlist__stocks">
              {savedStocks.map((stock, index) => (
                <div className="watchlist__stock-card" key={stock._id || index}>
                  <StockGraph
                    symbol={stock.symbol}
                    data={stock.data}
                    isLoading={false}
                  />
                  <button
                    type="button"
                    className="watchlist__remove-button"
                    onClick={() => onRemoveStock && onRemoveStock(stock._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="watchlist__empty">
            <p>You haven't saved any stocks to your watchlist yet.</p>
            <p>Search for stocks on the home page and add them to your watchlist.</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default Watchlist

