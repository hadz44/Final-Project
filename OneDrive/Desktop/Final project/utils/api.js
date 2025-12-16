import { API_CONFIG, ERROR_MESSAGES } from './constants.js'
import {
  getMockStockData,
  getMockSavedStocks,
  addMockSavedStock,
  removeMockSavedStock,
  getMockAuthResponse,
  getMockCurrentUser,
  getMockSavedArticles,
  addMockSavedArticle,
  removeMockSavedArticle,
} from './mockData.js'
import {
  getStockQuote,
  getStockChartData as getThirdPartyChartData,
  searchStocks,
} from './StockMarketApi.js'

// API configuration
const API_BASE_URL = API_CONFIG.BASE_URL
const STOCK_API_KEY = API_CONFIG.STOCK_API_KEY
const STOCK_API_URL = API_CONFIG.STOCK_API_URL

// Flag to use mock data (set to false when real API is ready)
const USE_MOCK_DATA = true

// Helper function to handle API responses
async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: `Error: ${response.status} ${response.statusText}`,
    }))
    throw new Error(error.message || 'Something went wrong')
  }
  return response.json()
}

// Authentication API calls
export const authApi = {
  // Register a new user
  async register({ email, password, name }) {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      return getMockAuthResponse(email, password, name)
    }

    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    })

    return handleResponse(response)
  },

  // Login user
  async login({ email, password }) {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      return getMockAuthResponse(email, password)
    }

    const response = await fetch(`${API_BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    return handleResponse(response)
  },

  // Get current user info
  async getCurrentUser(token) {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))
      return getMockCurrentUser(token)
    }

    const response = await fetch(`${API_BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    return handleResponse(response)
  },

  // Check if token is valid
  async checkToken(token) {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 200))
      // Simulate token validation - check if token exists and is valid format
      if (!token) return false
      if (!token.startsWith('mock-jwt-token')) return false
      
      // Check if token corresponds to a user
      try {
        getMockCurrentUser(token)
        return true
      } catch {
        return false
      }
    }

    const response = await fetch(`${API_BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    return response.ok
  },
}

// Stock API calls
export const stockApi = {
  // Search for stock by symbol
  async searchStock(symbol, token) {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))
      const mockData = getMockStockData(symbol)
      return {
        symbol: mockData.symbol,
        price: mockData.price,
        change: mockData.change,
        changeAmount: mockData.change,
        changePercent: mockData.changePercent,
        changePercentage: mockData.changePercent,
        name: mockData.name,
        marketCap: mockData.marketCap,
        volume: mockData.volume,
        high: mockData.high,
        low: mockData.low,
        open: mockData.open,
        close: mockData.close,
        currentPrice: mockData.price,
      }
    }

    // Use third-party stock market API
    try {
      const stockData = await getStockQuote(symbol)
      return {
        symbol: stockData.symbol,
        price: stockData.price,
        change: stockData.change,
        changeAmount: stockData.change,
        changePercent: stockData.changePercent,
        changePercentage: stockData.changePercent,
        name: stockData.name || symbol,
        marketCap: stockData.marketCap,
        volume: stockData.volume,
        high: stockData.high,
        low: stockData.low,
        open: stockData.open,
        close: stockData.close,
        currentPrice: stockData.price,
      }
    } catch (error) {
      console.error('Third-party API error, falling back to mock data:', error)
      // Fallback to mock data if API fails
      const mockData = getMockStockData(symbol)
      return {
        symbol: mockData.symbol,
        price: mockData.price,
        change: mockData.change,
        changeAmount: mockData.change,
        changePercent: mockData.changePercent,
        changePercentage: mockData.changePercent,
        name: mockData.name,
        marketCap: mockData.marketCap,
        volume: mockData.volume,
        high: mockData.high,
        low: mockData.low,
        open: mockData.open,
        close: mockData.close,
        currentPrice: mockData.price,
      }
    }
  },

  // Get stock chart data
  async getStockChartData(symbol, timeframe = '1d', token) {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 600))
      const mockData = getMockStockData(symbol)
      return mockData.chartData
    }

    // Use third-party stock market API
    try {
      const chartData = await getThirdPartyChartData(symbol, timeframe)
      return chartData
    } catch (error) {
      console.error('Third-party API error, falling back to mock data:', error)
      // Fallback to mock data if API fails
      const mockData = getMockStockData(symbol)
      return mockData.chartData
    }
  },

  // Save stock to watchlist
  async saveStock(stockData, token) {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      try {
        const result = addMockSavedStock(stockData)
        // Return in format matching backend: { data: {...} } or just the data
        return result.data || result
      } catch (error) {
        throw new Error(error.message || 'Failed to save stock')
      }
    }

    const response = await fetch(`${API_BASE_URL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(stockData),
    })

    return handleResponse(response)
  },

  // Get saved stocks (watchlist)
  async getSavedStocks(token) {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      return getMockSavedStocks()
    }

    const response = await fetch(`${API_BASE_URL}/articles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    return handleResponse(response)
  },

  // Get saved articles
  async getSavedArticles(token) {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      return getMockSavedArticles()
    }

    const response = await fetch(`${API_BASE_URL}/articles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    return handleResponse(response)
  },

  // Delete stock from watchlist
  async deleteStock(stockId, token) {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))
      return removeMockSavedStock(stockId)
    }

    const response = await fetch(`${API_BASE_URL}/articles/${stockId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    return handleResponse(response)
  },

  // Save article to saved articles
  async saveArticle(articleData, token) {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      try {
        const result = addMockSavedArticle(articleData)
        return result.data || result
      } catch (error) {
        throw new Error(error.message || 'Failed to save article')
      }
    }

    const response = await fetch(`${API_BASE_URL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(articleData),
    })

    return handleResponse(response)
  },

  // Delete article from saved articles
  async deleteArticle(articleId, token) {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))
      return removeMockSavedArticle(articleId)
    }

    const response = await fetch(`${API_BASE_URL}/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    return handleResponse(response)
  },
}

// Export default API object
export default {
  auth: authApi,
  stock: stockApi,
}

