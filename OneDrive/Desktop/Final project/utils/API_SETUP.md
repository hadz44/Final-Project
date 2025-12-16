# API Setup Guide

This document explains how to configure and use the third-party Stock Market API.

## Third-Party API Configuration

The project uses `StockMarketApi.js` to interact with external stock market data providers.

### Supported APIs

The code is designed to work with multiple stock market APIs. Examples include:

- **Alpha Vantage**: Free tier available, good for development
- **IEX Cloud**: Professional API with free tier
- **Finnhub**: Free tier with rate limits
- **Polygon.io**: Real-time and historical data
- **Yahoo Finance** (unofficial): No API key required but less reliable

### Setup Steps

1. **Choose an API Provider**
   - Sign up for an account with your chosen provider
   - Get your API key from their dashboard

2. **Configure Environment Variables**
   Create a `.env` file in the project root:
   ```env
   VITE_STOCK_API_URL=https://your-api-provider.com/api
   VITE_STOCK_API_KEY=your_api_key_here
   ```

3. **Update API Endpoints**
   Edit `utils/StockMarketApi.js` and update the URL patterns to match your chosen API:
   - Replace placeholder URLs with actual API endpoints
   - Adjust response transformation logic based on your API's data format

### Example: Alpha Vantage Setup

```env
VITE_STOCK_API_URL=https://www.alphavantage.co/query
VITE_STOCK_API_KEY=your_alpha_vantage_key
```

Then update `StockMarketApi.js`:
```javascript
// For getStockQuote
const url = `${STOCK_API_BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${STOCK_API_KEY}`

// For getStockChartData
const url = `${STOCK_API_BASE_URL}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=60min&apikey=${STOCK_API_KEY}`
```

### Example: IEX Cloud Setup

```env
VITE_STOCK_API_URL=https://cloud.iexapis.com/stable
VITE_STOCK_API_KEY=your_iex_token
```

Then update `StockMarketApi.js`:
```javascript
// For getStockQuote
const url = `${STOCK_API_BASE_URL}/stock/${symbol}/quote?token=${STOCK_API_KEY}`

// For getStockChartData
const url = `${STOCK_API_BASE_URL}/stock/${symbol}/chart/1d?token=${STOCK_API_KEY}`
```

### API Functions

#### `getStockQuote(symbol)`
Fetches current stock quote data.
- **Parameters**: `symbol` (string) - Stock symbol (e.g., 'AAPL')
- **Returns**: Object with price, change, volume, etc.

#### `getStockChartData(symbol, timeframe)`
Fetches historical price data for charts.
- **Parameters**: 
  - `symbol` (string) - Stock symbol
  - `timeframe` (string) - Time period ('1d', '1w', '1m', '1y')
- **Returns**: Array of price data points formatted for Recharts

#### `searchStocks(query)`
Searches for stocks by symbol or company name.
- **Parameters**: `query` (string) - Search term
- **Returns**: Array of matching stocks

#### `getCompanyProfile(symbol)`
Fetches company information and profile.
- **Parameters**: `symbol` (string) - Stock symbol
- **Returns**: Object with company details

#### `getRealTimePrice(symbol)`
Fetches real-time stock price (if API supports it).
- **Parameters**: `symbol` (string) - Stock symbol
- **Returns**: Object with current price and timestamp

### Error Handling

The API functions include error handling that:
- Catches network errors
- Transforms API responses to a standardized format
- Falls back to mock data if the API fails (when `USE_MOCK_DATA` is enabled)

### Testing

1. Set `USE_MOCK_DATA = false` in `utils/api.js`
2. Configure your API credentials in `.env`
3. Test with a known stock symbol (e.g., 'AAPL')
4. Check browser console for any API errors

### Rate Limits

Most free-tier APIs have rate limits:
- **Alpha Vantage**: 5 API calls per minute, 500 per day
- **IEX Cloud**: Varies by plan
- **Finnhub**: 60 calls per minute (free tier)

Consider implementing request caching or rate limiting if needed.

