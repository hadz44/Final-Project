import './Watchlist.css'
import StockGraph from '../StockGraph/StockGraph'

function Watchlist({ savedStocks }) {
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
                <StockGraph
                  key={index}
                  symbol={stock.symbol}
                  data={stock.data}
                  isLoading={false}
                />
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

