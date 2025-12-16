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

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [stockData, setStockData] = useState(null)
  const [stockResults, setStockResults] = useState([]) // Array of stock results
  const [error, setError] = useState(null)
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
    setStockData(null)
    setSavedStocks([])
  }

  const handleSearch = async (symbol) => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true)
      return
    }

    setIsLoading(true)
    setError(null)
    setStockData(null)
    setStockResults([])
    const token = getToken()

    try {
      // Fetch stock data and chart data
      const [stockInfo, chartData] = await Promise.all([
        stockApi.searchStock(symbol, token),
        stockApi.getStockChartData(symbol, '1d', token),
      ])

      // Check if we got valid data
      if (!stockInfo || (!stockInfo.price && !stockInfo.close && !stockInfo.currentPrice)) {
        setStockResults([])
        setError(null)
        return
      }

      // Transform API response to match component expectations
      const transformedData = {
        symbol: symbol.toUpperCase(),
        price: stockInfo.price || stockInfo.close || stockInfo.currentPrice,
        change: stockInfo.change || stockInfo.changeAmount || 0,
        changePercent: stockInfo.changePercent || stockInfo.changePercentage || 0,
        chartData: Array.isArray(chartData) ? chartData : formatChartData(stockInfo.historicalData),
      }

      // For single stock search, set both stockData and stockResults
      setStockData(transformedData)
      setStockResults([transformedData])
    } catch (error) {
      console.error('Stock search error:', error)
      setError(
        'Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.'
      )
      setStockData(null)
      setStockResults([])
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to format chart data
  function formatChartData(data) {
    if (!data || !Array.isArray(data)) return null
    return data.map((point) => ({
      time: new Date(point.timestamp || point.time).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      price: parseFloat(point.price || point.close || point.value),
      timestamp: new Date(point.timestamp || point.time).getTime(),
    }))
  }

  // Helper function to generate sample chart data
  function generateSampleChartData(basePrice, change) {
    const chartData = []
    const now = new Date()
    for (let i = 24; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000)
      const variation = (Math.random() - 0.5) * basePrice * 0.1
      const price = basePrice + variation + (i / 24) * change

      chartData.push({
        time: time.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        price: parseFloat(price.toFixed(2)),
        timestamp: time.getTime(),
      })
    }
    return chartData
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
                stockData={stockData}
                stockResults={stockResults}
                error={error}
                onSearch={handleSearch}
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
