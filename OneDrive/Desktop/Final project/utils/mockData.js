// Mock API data for development
// This simulates the structure of real API responses

// Mock stock data
export const mockStocks = {
  AAPL: {
    symbol: 'AAPL',
    price: 175.43,
    change: 2.15,
    changePercent: 1.24,
    name: 'Apple Inc.',
    marketCap: '2.8T',
    volume: 45234567,
    high: 176.50,
    low: 173.20,
    open: 174.10,
    close: 175.43,
  },
  TSLA: {
    symbol: 'TSLA',
    price: 248.50,
    change: -5.20,
    changePercent: -2.05,
    name: 'Tesla, Inc.',
    marketCap: '790B',
    volume: 89234567,
    high: 255.30,
    low: 245.80,
    open: 253.70,
    close: 248.50,
  },
  MSFT: {
    symbol: 'MSFT',
    price: 378.85,
    change: 3.42,
    changePercent: 0.91,
    name: 'Microsoft Corporation',
    marketCap: '2.8T',
    volume: 23456789,
    high: 380.20,
    low: 375.50,
    open: 376.10,
    close: 378.85,
  },
  GOOGL: {
    symbol: 'GOOGL',
    price: 142.56,
    change: 1.23,
    changePercent: 0.87,
    name: 'Alphabet Inc.',
    marketCap: '1.8T',
    volume: 34567890,
    high: 143.20,
    low: 141.30,
    open: 142.10,
    close: 142.56,
  },
  AMZN: {
    symbol: 'AMZN',
    price: 151.94,
    change: -1.05,
    changePercent: -0.69,
    name: 'Amazon.com Inc.',
    marketCap: '1.6T',
    volume: 45678901,
    high: 153.50,
    low: 150.20,
    open: 152.80,
    close: 151.94,
  },
  META: {
    symbol: 'META',
    price: 485.20,
    change: 8.50,
    changePercent: 1.78,
    name: 'Meta Platforms Inc.',
    marketCap: '1.2T',
    volume: 12345678,
    high: 487.50,
    low: 478.30,
    open: 480.10,
    close: 485.20,
  },
  NVDA: {
    symbol: 'NVDA',
    price: 875.30,
    change: 25.40,
    changePercent: 2.99,
    name: 'NVIDIA Corporation',
    marketCap: '2.2T',
    volume: 56789012,
    high: 880.50,
    low: 855.20,
    open: 860.10,
    close: 875.30,
  },
  NFLX: {
    symbol: 'NFLX',
    price: 485.75,
    change: -3.25,
    changePercent: -0.66,
    name: 'Netflix, Inc.',
    marketCap: '215B',
    volume: 34567890,
    high: 490.20,
    low: 482.50,
    open: 488.10,
    close: 485.75,
  },
}

// Generate mock chart data for a stock
export function generateMockChartData(symbol, basePrice, change) {
  const data = []
  const now = new Date()
  const hours = 24 // 24 hours of data

  // Calculate starting price (basePrice - change, since we're going forward in time)
  let currentPrice = basePrice - change

  for (let i = 0; i <= hours; i++) {
    const time = new Date(now.getTime() - (hours - i) * 60 * 60 * 1000)
    
    // Simulate price movement with some randomness
    const randomVariation = (Math.random() - 0.5) * basePrice * 0.02 // ±1% variation
    const trend = (change / hours) * i // Linear trend
    currentPrice = basePrice - change + trend + randomVariation

    data.push({
      time: time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      price: parseFloat(currentPrice.toFixed(2)),
      timestamp: time.getTime(),
      volume: Math.floor(Math.random() * 1000000) + 500000, // Mock volume
    })
  }

  return data
}

// Get mock stock data with chart
export function getMockStockData(symbol) {
  const stock = mockStocks[symbol.toUpperCase()]
  
  if (!stock) {
    // Generate random data for unknown symbols
    const basePrice = 100 + Math.random() * 200
    const change = (Math.random() - 0.5) * 10
    const changePercent = (change / basePrice) * 100

    return {
      symbol: symbol.toUpperCase(),
      price: parseFloat(basePrice.toFixed(2)),
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat(changePercent.toFixed(2)),
      name: `${symbol.toUpperCase()} Stock`,
      chartData: generateMockChartData(symbol, basePrice, change),
    }
  }

  return {
    ...stock,
    chartData: generateMockChartData(stock.symbol, stock.price, stock.change),
  }
}

// Mock saved stocks (watchlist) - stored in memory
let mockSavedStocks = [
  {
    _id: '1',
    symbol: 'AAPL',
    keyword: 'Apple',
    title: 'Apple Inc. Stock Analysis',
    text: 'Apple Inc. is a technology company that designs, develops, and sells consumer electronics, computer software, and online services.',
    date: new Date().toISOString(),
    source: 'Stock Market API',
    link: 'https://example.com/stock/AAPL',
    image: 'https://example.com/images/aapl.jpg',
    data: getMockStockData('AAPL'),
  },
  {
    _id: '2',
    symbol: 'TSLA',
    keyword: 'Tesla',
    title: 'Tesla Inc. Stock Analysis',
    text: 'Tesla, Inc. is an electric vehicle and clean energy company based in Austin, Texas.',
    date: new Date().toISOString(),
    source: 'Stock Market API',
    link: 'https://example.com/stock/TSLA',
    image: 'https://example.com/images/tsla.jpg',
    data: getMockStockData('TSLA'),
  },
  {
    _id: '3',
    symbol: 'MSFT',
    keyword: 'Microsoft',
    title: 'Microsoft Corporation Stock Analysis',
    text: 'Microsoft Corporation is an American multinational technology corporation which produces computer software, consumer electronics, personal computers, and related services.',
    date: new Date().toISOString(),
    source: 'Stock Market API',
    link: 'https://example.com/stock/MSFT',
    image: 'https://example.com/images/msft.jpg',
    data: getMockStockData('MSFT'),
  },
]

// Get saved stocks
export function getMockSavedStocks() {
  return [...mockSavedStocks]
}

// Add stock to watchlist
export function addMockSavedStock(stockData) {
  // Validate required fields
  if (!stockData || !stockData.symbol) {
    throw new Error('Stock symbol is required')
  }

  // Check if stock already exists in watchlist
  const existingStock = mockSavedStocks.find(
    (stock) => stock.symbol === stockData.symbol.toUpperCase()
  )
  
  if (existingStock) {
    throw new Error('Stock already in watchlist')
  }

  // Create new stock entry matching backend response format
  const newStock = {
    _id: Date.now().toString(),
    keyword: stockData.keyword || stockData.symbol,
    title: stockData.title || `${stockData.symbol} Stock Analysis`,
    text: stockData.text || `Stock information for ${stockData.symbol}`,
    date: new Date().toISOString(),
    source: stockData.source || 'Stock Market API',
    link: stockData.link || `https://example.com/stock/${stockData.symbol}`,
    image: stockData.image || `https://example.com/images/${stockData.symbol.toLowerCase()}.jpg`,
    symbol: stockData.symbol.toUpperCase(),
    data: stockData.data || getMockStockData(stockData.symbol),
  }

  mockSavedStocks.push(newStock)
  
  // Return response matching backend format
  return {
    data: newStock,
    message: 'Stock saved successfully',
  }
}

// Remove stock from watchlist
export function removeMockSavedStock(stockId) {
  if (!stockId) {
    throw new Error('Stock ID is required')
  }

  const index = mockSavedStocks.findIndex((stock) => stock._id === stockId)
  
  if (index === -1) {
    throw new Error('Stock not found')
  }

  const deletedStock = mockSavedStocks[index]
  mockSavedStocks.splice(index, 1)
  
  // Return response matching backend format
  return {
    message: 'Stock deleted successfully',
    data: {
      _id: deletedStock._id,
      symbol: deletedStock.symbol,
    },
  }
}

// Mock user data
export const mockUsers = {
  test: {
    _id: '1',
    name: 'Test User',
    email: 'test@example.com',
    token: 'mock-jwt-token-test-user',
  },
  demo: {
    _id: '2',
    name: 'Demo User',
    email: 'demo@example.com',
    token: 'mock-jwt-token-demo-user',
  },
}

// Mock authentication responses
export function getMockAuthResponse(email, password, name) {
  // Simulate validation errors
  if (!email || !email.includes('@')) {
    throw new Error('Invalid email format')
  }
  
  if (!password || password.length < 8) {
    throw new Error('Password must be at least 8 characters')
  }

  // Check if user exists (for login)
  const existingUser = mockUsers[email.split('@')[0]]
  
  // For registration, check if email already exists
  if (name && existingUser && existingUser.email === email) {
    throw new Error('User with this email already exists')
  }

  // Simulate successful login/register
  const user = existingUser || {
    _id: Date.now().toString(),
    name: name || email.split('@')[0],
    email: email,
    token: `mock-jwt-token-${Date.now()}`,
  }

  // Store new user in mockUsers for future logins
  if (!existingUser && name) {
    mockUsers[email.split('@')[0]] = user
  }

  // Return response matching typical backend format
  return {
    token: user.token,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  }
}

// Mock getCurrentUser response
export function getMockCurrentUser(token) {
  if (!token || !token.startsWith('mock-jwt-token')) {
    throw new Error('Invalid token')
  }

  // Find user by token
  const user = Object.values(mockUsers).find((u) => u.token === token)
  
  if (!user) {
    throw new Error('User not found')
  }

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
  }
}

