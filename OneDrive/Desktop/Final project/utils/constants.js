// API Configuration Constants
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  STOCK_API_KEY: import.meta.env.VITE_STOCK_API_KEY || '',
  STOCK_API_URL: import.meta.env.VITE_STOCK_API_URL || 'https://api.example.com',
}

// Error messages
export const ERROR_MESSAGES = {
  LOGIN_FAILED: 'Login failed. Please check your credentials and try again.',
  REGISTER_FAILED: 'Registration failed. Please try again.',
  STOCK_SEARCH_FAILED: 'Failed to fetch stock data. Please try again.',
  SAVE_STOCK_FAILED: 'Failed to save stock to watchlist.',
  DELETE_STOCK_FAILED: 'Failed to delete stock from watchlist.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized. Please log in again.',
}

// Success messages
export const SUCCESS_MESSAGES = {
  STOCK_SAVED: 'Stock saved to watchlist!',
  STOCK_DELETED: 'Stock removed from watchlist.',
}

