// Third-party Stock Market API interactions
// This file handles all requests to external stock market API services
// Examples: Alpha Vantage, IEX Cloud, Finnhub, Polygon.io, etc.

import { API_CONFIG } from './constants.js'

// Get API key from environment variables
const STOCK_API_KEY = API_CONFIG.STOCK_API_KEY
const STOCK_API_BASE_URL = API_CONFIG.STOCK_API_URL

/**
 * Helper function to handle API responses
 * @param {Response} response - Fetch API response object
 * @returns {Promise} Parsed JSON data or throws error
 */
async function handleApiResponse(response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: `API Error: ${response.status} ${response.statusText}`,
    }))
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
  }
  return response.json()
}

/**
 * Get current stock quote by symbol
 * @param {string} symbol - Stock symbol (e.g., 'AAPL', 'TSLA')
 * @returns {Promise<Object>} Stock quote data
 */
export async function getStockQuote(symbol) {
  try {
    // Example API endpoint structure - adjust based on your chosen API
    // Alpha Vantage example: `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${STOCK_API_KEY}`
    // IEX Cloud example: `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${STOCK_API_KEY}`
    // Finnhub example: `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${STOCK_API_KEY}`
    
    const url = `${STOCK_API_BASE_URL}/quote?symbol=${symbol}&apikey=${STOCK_API_KEY}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await handleApiResponse(response)
    
    // Transform API response to standardized format
    // Adjust this based on your API's response structure
    return {
      symbol: data.symbol || symbol.toUpperCase(),
      price: data.price || data['05. price'] || data.c || data.currentPrice,
      change: data.change || data['09. change'] || data.d || data.changeAmount,
      changePercent: data.changePercent || data['10. change percent'] || data.dp || data.changePercentage,
      high: data.high || data['03. high'] || data.h || data.highPrice,
      low: data.low || data['04. low'] || data.l || data.lowPrice,
      open: data.open || data['02. open'] || data.o || data.openPrice,
      close: data.close || data['08. previous close'] || data.pc || data.previousClose,
      volume: data.volume || data['06. volume'] || data.v || data.volume,
      timestamp: data.timestamp || data.t || Date.now(),
    }
  } catch (error) {
    console.error('Error fetching stock quote:', error)
    throw error
  }
}

/**
 * Get stock chart/historical data
 * @param {string} symbol - Stock symbol
 * @param {string} timeframe - Time period (e.g., '1d', '1w', '1m', '1y')
 * @returns {Promise<Array>} Array of price data points
 */
export async function getStockChartData(symbol, timeframe = '1d') {
  try {
    // Example API endpoint structure - adjust based on your chosen API
    // Alpha Vantage example: `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=60min&apikey=${STOCK_API_KEY}`
    // IEX Cloud example: `https://cloud.iexapis.com/stable/stock/${symbol}/chart/${timeframe}?token=${STOCK_API_KEY}`
    // Finnhub example: `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=60&from=${from}&to=${to}&token=${STOCK_API_KEY}`
    
    const url = `${STOCK_API_BASE_URL}/chart?symbol=${symbol}&timeframe=${timeframe}&apikey=${STOCK_API_KEY}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await handleApiResponse(response)
    
    // Transform API response to standardized format for Recharts
    // Adjust this based on your API's response structure
    const chartData = []
    
    // Handle different API response formats
    if (Array.isArray(data)) {
      // If API returns array directly
      data.forEach((point) => {
        chartData.push({
          time: new Date(point.timestamp || point.time || point.date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          price: parseFloat(point.price || point.close || point.c || point.value),
          timestamp: new Date(point.timestamp || point.time || point.date).getTime(),
        })
      })
    } else if (data['Time Series (60min)'] || data['Time Series (Daily)']) {
      // Alpha Vantage format
      const timeSeries = data['Time Series (60min)'] || data['Time Series (Daily)']
      Object.keys(timeSeries).forEach((key) => {
        const point = timeSeries[key]
        chartData.push({
          time: new Date(key).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          price: parseFloat(point['4. close'] || point.close),
          timestamp: new Date(key).getTime(),
        })
      })
      chartData.sort((a, b) => a.timestamp - b.timestamp)
    } else if (data.c) {
      // Finnhub format
      data.t.forEach((timestamp, index) => {
        chartData.push({
          time: new Date(timestamp * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          price: parseFloat(data.c[index]),
          timestamp: timestamp * 1000,
        })
      })
    }
    
    return chartData
  } catch (error) {
    console.error('Error fetching stock chart data:', error)
    throw error
  }
}

/**
 * Search for stocks by symbol or company name
 * @param {string} query - Search query (symbol or company name)
 * @returns {Promise<Array>} Array of matching stocks
 */
export async function searchStocks(query) {
  try {
    // Example API endpoint structure
    // Alpha Vantage example: `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${STOCK_API_KEY}`
    // IEX Cloud example: `https://cloud.iexapis.com/stable/search/${query}?token=${STOCK_API_KEY}`
    
    const url = `${STOCK_API_BASE_URL}/search?query=${encodeURIComponent(query)}&apikey=${STOCK_API_KEY}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await handleApiResponse(response)
    
    // Transform API response to standardized format
    // Adjust this based on your API's response structure
    if (Array.isArray(data)) {
      return data.map((stock) => ({
        symbol: stock.symbol || stock['1. symbol'],
        name: stock.name || stock['2. name'],
        type: stock.type || stock['3. type'],
        region: stock.region || stock['4. region'],
      }))
    } else if (data.bestMatches) {
      // Alpha Vantage format
      return data.bestMatches.map((stock) => ({
        symbol: stock['1. symbol'],
        name: stock['2. name'],
        type: stock['3. type'],
        region: stock['4. region'],
      }))
    }
    
    return []
  } catch (error) {
    console.error('Error searching stocks:', error)
    throw error
  }
}

/**
 * Get company profile/overview
 * @param {string} symbol - Stock symbol
 * @returns {Promise<Object>} Company profile data
 */
export async function getCompanyProfile(symbol) {
  try {
    // Example API endpoint structure
    // Alpha Vantage example: `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${STOCK_API_KEY}`
    // IEX Cloud example: `https://cloud.iexapis.com/stable/stock/${symbol}/company?token=${STOCK_API_KEY}`
    
    const url = `${STOCK_API_BASE_URL}/company?symbol=${symbol}&apikey=${STOCK_API_KEY}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await handleApiResponse(response)
    
    return {
      symbol: data.Symbol || data.symbol,
      name: data.Name || data.companyName,
      description: data.Description || data.description,
      sector: data.Sector || data.sector,
      industry: data.Industry || data.industry,
      marketCap: data.MarketCapitalization || data.marketCap,
      website: data.Website || data.website,
    }
  } catch (error) {
    console.error('Error fetching company profile:', error)
    throw error
  }
}

/**
 * Get real-time stock price (if API supports it)
 * @param {string} symbol - Stock symbol
 * @returns {Promise<Object>} Real-time price data
 */
export async function getRealTimePrice(symbol) {
  try {
    const url = `${STOCK_API_BASE_URL}/realtime?symbol=${symbol}&apikey=${STOCK_API_KEY}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await handleApiResponse(response)
    
    return {
      symbol: data.symbol || symbol.toUpperCase(),
      price: data.price || data.lastPrice,
      timestamp: data.timestamp || Date.now(),
    }
  } catch (error) {
    console.error('Error fetching real-time price:', error)
    throw error
  }
}

// Export all functions
export default {
  getStockQuote,
  getStockChartData,
  searchStocks,
  getCompanyProfile,
  getRealTimePrice,
}

