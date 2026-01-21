import './StockGraph.css'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

function StockGraph({ symbol, data, isLoading }) {
  if (isLoading) {
    return (
      <div className="stock-graph">
        <div className="stock-graph__loading">Loading chart...</div>
      </div>
    )
  }

  if (!data || !symbol) {
    return (
      <div className="stock-graph">
        <div className="stock-graph__empty">
          Search for a stock symbol to view its graph
        </div>
      </div>
    )
  }

  // Generate sample time-series data if not provided
  // In production, this would come from your API
  const chartData = data.chartData || generateSampleData(data.price)

  return (
    <div className="stock-graph">
      <div className="stock-graph__header">
        <h2 className="stock-graph__symbol">{symbol}</h2>
        {data.price && (
          <div className="stock-graph__price">
            <span className="stock-graph__current-price">${data.price.toFixed(2)}</span>
            {data.change !== undefined && (
              <span
                className={`stock-graph__change ${
                  data.change >= 0 ? 'stock-graph__change_positive' : 'stock-graph__change_negative'
                }`}
              >
                {data.change >= 0 ? '+' : ''}
                {data.change.toFixed(2)} ({data.changePercent?.toFixed(2)}%)
              </span>
            )}
          </div>
        )}
      </div>
      <div className="stock-graph__chart">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
            <XAxis
              dataKey="time"
              stroke="#888"
              tick={{ fill: '#888' }}
              tickFormatter={(value) => {
                // Format time labels
                if (typeof value === 'string') return value
                return new Date(value).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              }}
            />
            <YAxis
              stroke="#888"
              tick={{ fill: '#888' }}
              domain={['auto', 'auto']}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
              formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#2f71e5"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
              name="Stock Price"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// Helper function to generate sample chart data
// In production, replace this with actual API data
function generateSampleData(basePrice) {
  const data = []
  const now = new Date()
  const hours = 24 // 24 hours of data

  for (let i = hours; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000)
    // Generate price with some variation
    const variation = (Math.random() - 0.5) * basePrice * 0.1
    const price = basePrice + variation

    data.push({
      time: time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      price: parseFloat(price.toFixed(2)),
      timestamp: time.getTime(),
    })
  }

  return data
}

export default StockGraph
