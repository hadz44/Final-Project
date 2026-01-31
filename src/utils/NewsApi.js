// News API interactions
// Handles requests to News API (newsapi.org)

// Determine base URL based on environment
const newsApiBaseUrl =
  import.meta.env.MODE === 'production'
    ? 'https://nomoreparties.co/news/v2/everything'
    : 'https://newsapi.org/v2/everything'

// Get API key from environment variables
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || ''

// Flag to use mock data if API key is not available
const USE_MOCK_NEWS = !NEWS_API_KEY

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
 * Get date string in YYYY-MM-DD format
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Generate mock news articles
 * @param {string} keyword - Search keyword
 * @returns {Array} Mock news articles
 */
function generateMockNewsArticles(keyword) {
  const mockArticles = [
    {
      source: { id: 'tech-crunch', name: 'TechCrunch' },
      author: 'John Doe',
      title: `${keyword} continues to dominate the market with innovative strategies`,
      description: `Recent developments in ${keyword} have shown significant growth and market expansion. Industry experts are watching closely.`,
      url: `https://example.com/news/${keyword.toLowerCase()}-1`,
      urlToImage: 'https://via.placeholder.com/400x200?text=News+Image',
      publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      content: `This is a detailed article about ${keyword} and its impact on the current market trends.`,
    },
    {
      source: { id: 'bloomberg', name: 'Bloomberg' },
      author: 'Jane Smith',
      title: `Analysis: How ${keyword} is reshaping the industry landscape`,
      description: `A comprehensive analysis of ${keyword} reveals interesting patterns and future predictions.`,
      url: `https://example.com/news/${keyword.toLowerCase()}-2`,
      urlToImage: 'https://via.placeholder.com/400x200?text=News+Image',
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      content: `Bloomberg analysts provide insights into ${keyword} market dynamics.`,
    },
    {
      source: { id: 'reuters', name: 'Reuters' },
      author: 'Mike Johnson',
      title: `${keyword} sees record-breaking performance this quarter`,
      description: `Quarterly reports show ${keyword} has exceeded expectations with strong financial results.`,
      url: `https://example.com/news/${keyword.toLowerCase()}-3`,
      urlToImage: 'https://via.placeholder.com/400x200?text=News+Image',
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      content: `Reuters covers the latest developments in ${keyword}.`,
    },
    {
      source: { id: 'wsj', name: 'Wall Street Journal' },
      author: 'Sarah Williams',
      title: `Investors eye ${keyword} as next big opportunity`,
      description: `Market analysts are recommending ${keyword} as a promising investment opportunity.`,
      url: `https://example.com/news/${keyword.toLowerCase()}-4`,
      urlToImage: 'https://via.placeholder.com/400x200?text=News+Image',
      publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      content: `WSJ reports on investment trends related to ${keyword}.`,
    },
    {
      source: { id: 'cnbc', name: 'CNBC' },
      author: 'David Brown',
      title: `${keyword} announces major strategic partnership`,
      description: `Breaking news: ${keyword} has entered into a significant partnership that could change the industry.`,
      url: `https://example.com/news/${keyword.toLowerCase()}-5`,
      urlToImage: 'https://via.placeholder.com/400x200?text=News+Image',
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      content: `CNBC covers the strategic partnership announcement from ${keyword}.`,
    },
    {
      source: { id: 'forbes', name: 'Forbes' },
      author: 'Emily Davis',
      title: `The future of ${keyword}: Expert predictions and trends`,
      description: `Industry leaders share their predictions about where ${keyword} is heading in the next decade.`,
      url: `https://example.com/news/${keyword.toLowerCase()}-6`,
      urlToImage: 'https://via.placeholder.com/400x200?text=News+Image',
      publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      content: `Forbes explores the future outlook for ${keyword}.`,
    },
  ]

  // Return random selection of articles (between 3-6 articles)
  const count = Math.floor(Math.random() * 4) + 3
  return mockArticles.slice(0, count)
}

/**
 * Search for news articles
 * @param {string} keyword - Search keyword
 * @returns {Promise<Object>} News articles data
 */
export async function searchNews(keyword) {
  if (!keyword || !keyword.trim()) {
    throw new Error('Please enter a keyword')
  }

  // Use mock data if API key is not configured
  if (USE_MOCK_NEWS) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const articles = generateMockNewsArticles(keyword)
    return {
      articles: articles,
      totalResults: articles.length,
      status: 'ok',
    }
  }

  // Calculate date range (7 days ago to today)
  const today = new Date()
  const sevenDaysAgo = new Date(today)
  sevenDaysAgo.setDate(today.getDate() - 7)

  const fromDate = formatDate(sevenDaysAgo)
  const toDate = formatDate(today)

  // Build query parameters (focus on financial/business news)
  const financeQuery = `${keyword.trim()} AND (stock OR market OR finance OR economy OR business)`
  const params = new URLSearchParams({
    q: financeQuery,
    apiKey: NEWS_API_KEY,
    from: fromDate,
    to: toDate,
    pageSize: '100',
    language: 'en',
    sortBy: 'publishedAt',
    searchIn: 'title,description',
  })

  const url = `${newsApiBaseUrl}?${params.toString()}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await handleApiResponse(response)

    // Return articles array
    return {
      articles: data.articles || [],
      totalResults: data.totalResults || 0,
      status: data.status,
    }
  } catch (error) {
    console.error('News API error:', error)
    throw error
  }
}

// Export default
export default {
  searchNews,
}

