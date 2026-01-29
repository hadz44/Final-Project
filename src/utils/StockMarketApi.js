// Third-party Stock Market API interactions
// This file handles all requests to external stock market API services
// Examples: Alpha Vantage, IEX Cloud, Finnhub, Polygon.io, etc.

import { API_CONFIG } from './constants.js'

// Finnhub API configuration
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
    const upperSymbol = symbol.trim().toUpperCase()
    const url = `${STOCK_API_BASE_URL}/quote?symbol=${upperSymbol}&token=${STOCK_API_KEY}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await handleApiResponse(response)

    // Finnhub quote response: { c, d, dp, h, l, o, pc, t }
    return {
      symbol: upperSymbol,
      price: data.c,
      change: data.d,
      changePercent: data.dp,
      high: data.h,
      low: data.l,
      open: data.o,
      close: data.pc,
      volume: data.v,
      timestamp: data.t ? data.t * 1000 : Date.now(),
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
    const upperSymbol = symbol.trim().toUpperCase()
    const now = Math.floor(Date.now() / 1000)
    let resolution = '60'
    let from = now - 60 * 60 * 24

    switch (timeframe) {
      case '1w':
        resolution = '60'
        from = now - 60 * 60 * 24 * 7
        break
      case '1m':
        resolution = 'D'
        from = now - 60 * 60 * 24 * 30
        break
      case '3m':
        resolution = 'D'
        from = now - 60 * 60 * 24 * 90
        break
      case '1y':
        resolution = 'W'
        from = now - 60 * 60 * 24 * 365
        break
      default:
        resolution = '60'
        from = now - 60 * 60 * 24
    }

    const url = `${STOCK_API_BASE_URL}/stock/candle?symbol=${upperSymbol}&resolution=${resolution}&from=${from}&to=${now}&token=${STOCK_API_KEY}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await handleApiResponse(response)

    if (data.s !== 'ok') {
      return []
    }

    return data.t.map((timestamp, index) => ({
      time: new Date(timestamp * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      price: parseFloat(data.c[index]),
      timestamp: timestamp * 1000,
    }))
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
    const url = `${STOCK_API_BASE_URL}/search?q=${encodeURIComponent(query)}&token=${STOCK_API_KEY}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await handleApiResponse(response)

    if (!data?.result) return []

    return data.result.map((stock) => ({
      symbol: stock.symbol,
      name: stock.description,
      type: stock.type,
      region: stock.primaryExchange,
    }))
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
    const upperSymbol = symbol.trim().toUpperCase()
    const url = `${STOCK_API_BASE_URL}/stock/profile2?symbol=${upperSymbol}&token=${STOCK_API_KEY}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await handleApiResponse(response)

    return {
      symbol: data.ticker || upperSymbol,
      name: data.name,
      description: data.description,
      sector: data.finnhubIndustry,
      industry: data.finnhubIndustry,
      marketCap: data.marketCapitalization,
      website: data.weburl,
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
    const upperSymbol = symbol.trim().toUpperCase()
    const url = `${STOCK_API_BASE_URL}/quote?symbol=${upperSymbol}&token=${STOCK_API_KEY}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await handleApiResponse(response)

    return {
      symbol: upperSymbol,
      price: data.c,
      timestamp: data.t ? data.t * 1000 : Date.now(),
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

