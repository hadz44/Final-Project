import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import Watchlist from '../Watchlist/Watchlist'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import { authApi, stockApi } from '../../utils/api.js'
import { getToken, saveToken, saveUserName, clearAuth } from '../../utils/auth.js'
import { searchNews } from '../../utils/NewsApi.js'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [newsArticles, setNewsArticles] = useState([]) // Array of news articles
  const [searchError, setSearchError] = useState(null) // Search form validation error
  const [apiError, setApiError] = useState(null) // API request error
  const [savedStocks, setSavedStocks] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState('')
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  // Check for existing authentication on mount and load saved stocks
  useEffect(() => {
    const token = getToken()
    const name = localStorage.getItem('userName')
    if (token && name) {
      // Verify token is still valid
      authApi
        .checkToken(token)
        .then((isValid) => {
          if (isValid) {
            setIsAuthenticated(true)
            setUserName(name)
            // Load saved stocks
            loadSavedStocks(token)
          } else {
            clearAuth()
          }
        })
        .catch(() => {
          clearAuth()
        })
    }
  }, [])

  // Load saved stocks from API
  const loadSavedStocks = async (token) => {
    try {
      const stocks = await stockApi.getSavedStocks(token)
      setSavedStocks(stocks || [])
    } catch (error) {
      console.error('Error loading saved stocks:', error)
      setSavedStocks([])
    }
  }

  const handleLogin = async ({ email, password }) => {
    try {
      const response = await authApi.login({ email, password })
      
      if (response.token) {
        saveToken(response.token)
        // Handle both response formats: { token, data: { name } } or { token, name }
        const name = response.data?.name || response.name || response.user?.name || email.split('@')[0]
        saveUserName(name)
        setIsAuthenticated(true)
        setUserName(name)
        setIsLoginModalOpen(false)
        
        // Load saved stocks after login
        loadSavedStocks(response.token)
      } else {
        throw new Error('No token received from server')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert(error.message || 'Login failed. Please try again.')
    }
  }

  const handleRegister = async ({ email, password, name }) => {
    try {
      const response = await authApi.register({ email, password, name })
      
      if (response.token) {
        saveToken(response.token)
        // Handle both response formats: { token, data: { name } } or { token, name }
        const userName = response.data?.name || response.name || name
        saveUserName(userName)
        setIsAuthenticated(true)
        setUserName(userName)
        setIsRegisterModalOpen(false)
        
        // Load saved stocks after registration
        loadSavedStocks(response.token)
      } else {
        throw new Error('No token received from server')
      }
    } catch (error) {
      console.error('Registration error:', error)
      alert(error.message || 'Registration failed. Please try again.')
    }
  }

  const handleLogout = () => {
    clearAuth()
    setIsAuthenticated(false)
    setUserName('')
    setNewsArticles([])
    setSearchError(null)
    setApiError(null)
    setSavedStocks([])
  }

  const handleSearch = async (keyword, validationError) => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true)
      return
    }

    // Handle validation error from SearchForm
    if (validationError) {
      setSearchError(validationError)
      setApiError(null)
      setNewsArticles([])
      return
    }

    // Clear previous errors
    setSearchError(null)
    setApiError(null)
    setNewsArticles([])
    setIsLoading(true)

    try {
      // Fetch news articles from News API
      const response = await searchNews(keyword)

      // Check if we got articles
      if (!response.articles || response.articles.length === 0) {
        setNewsArticles([])
        setApiError(null)
      } else {
        setNewsArticles(response.articles)
      }
    } catch (error) {
      console.error('News search error:', error)
      
      // Check if it's a validation error or API error
      if (error.message === 'Please enter a keyword') {
        setSearchError(error.message)
      } else {
        setApiError(
          'Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.'
        )
      }
      setNewsArticles([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearSearchError = () => {
    setSearchError(null)
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Header
          isAuthenticated={isAuthenticated}
          userName={userName}
          onLoginClick={() => setIsLoginModalOpen(true)}
          onRegisterClick={() => setIsRegisterModalOpen(true)}
          onLogout={handleLogout}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                isLoading={isLoading}
                newsArticles={newsArticles}
                searchError={searchError}
                apiError={apiError}
                onSearch={handleSearch}
                onClearSearchError={handleClearSearchError}
                isAuthenticated={isAuthenticated}
                isLoginModalOpen={isLoginModalOpen}
                isRegisterModalOpen={isRegisterModalOpen}
                onLoginClick={() => setIsLoginModalOpen(true)}
                onRegisterClick={() => setIsRegisterModalOpen(true)}
                onCloseModal={() => {
                  setIsLoginModalOpen(false)
                  setIsRegisterModalOpen(false)
                }}
                onLogin={handleLogin}
                onRegister={handleRegister}
              />
            }
          />
          <Route
            path="/watchlist"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Watchlist
                  savedStocks={savedStocks}
                  onDeleteStock={async (stockId) => {
                    const token = getToken()
                    try {
                      await stockApi.deleteStock(stockId, token)
                      loadSavedStocks(token)
                    } catch (error) {
                      console.error('Error deleting stock:', error)
                      alert('Failed to delete stock. Please try again.')
                    }
                  }}
                />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
