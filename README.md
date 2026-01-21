# Stock Market Analyzer

A modern React application for analyzing stock market data with interactive charts, watchlist management, and user authentication.

## Pitch Video

🔗 **Loom Video**: https://www.loom.com/share/ed12ffb3383344d2b45287a6832adcda

## Features

- 🔐 **User Authentication**: Sign up and sign in functionality
- 📊 **Stock Search**: Search for stocks by symbol and view real-time data
- 📈 **Interactive Charts**: Visualize stock price movements using Recharts
- ⭐ **Watchlist**: Save and manage favorite stocks
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Clean and intuitive user interface

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Recharts** - Chart visualization library
- **Vanilla JavaScript** - API interactions

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd final-project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Structure

```
final-project/
├── components/          # React components
│   ├── App/            # Root component
│   ├── Header/         # Site header
│   ├── Navigation/     # Navigation menu
│   ├── Main/           # Main page content
│   ├── StockGraph/     # Stock chart component
│   ├── Watchlist/      # Watchlist page
│   ├── LoginModal/     # Login modal
│   ├── RegisterModal/  # Registration modal
│   └── ...
├── utils/              # Utility functions
│   ├── api.js          # Backend API calls
│   ├── StockMarketApi.js  # Third-party stock API
│   ├── mockData.js     # Mock data for development
│   └── ...
├── src/                # Source files
│   ├── main.jsx        # Entry point
│   └── style.css       # Global styles
└── public/             # Static assets
```

## API Configuration

### Mock Data Mode (Default)

The application uses mock data by default for development and testing. No API keys are required.

### Real API Setup

To use real APIs:

1. Create a `.env` file in the project root:
```env
VITE_API_URL=http://localhost:3000
VITE_STOCK_API_URL=https://your-stock-api.com
VITE_STOCK_API_KEY=your_api_key_here
VITE_NEWS_API_KEY=your_news_api_key_here
```

2. **News API Setup:**
   - Register at [News API](https://newsapi.org) to get your API key
   - Add `VITE_NEWS_API_KEY` to your `.env` file
   - The app will automatically use the proxy URL in production

3. Set `USE_MOCK_DATA = false` in `utils/api.js` (if using real backend)

4. Update API endpoints in `utils/StockMarketApi.js` to match your chosen provider

See `utils/API_SETUP.md` for detailed API setup instructions.

**Note:** News API free tier only works on localhost. For production, the app automatically uses the proxy URL: `https://nomoreparties.co/news/v2/everything`

## Deployment

### GitHub Pages

1. Install `gh-pages` package:
```bash
npm install --save-dev gh-pages
```

2. Add deploy script to `package.json`:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

3. Update `vite.config.js` with base path:
```javascript
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
})
```

4. Deploy:
```bash
npm run deploy
```

### Netlify

1. Build the project:
```bash
npm run build
```

2. Drag and drop the `dist` folder to [Netlify](https://app.netlify.com/drop)

Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel --prod
```

### Live Demo

🔗 **Deployed Site**: [Add your deployment URL here after deployment]

**Note**: Update this section with your actual deployment URL once the site is live.

## Usage

1. **Sign Up/Login**: Create an account or sign in to access the application
2. **Search Stocks**: Enter a stock symbol (e.g., AAPL, TSLA, MSFT) to view data
3. **View Charts**: See interactive price charts with Recharts
4. **Save to Watchlist**: Add stocks to your watchlist for easy access
5. **Manage Watchlist**: View and remove stocks from your watchlist

## Mock Data

The application includes comprehensive mock data for:
- User authentication (test@example.com, demo@example.com)
- Stock data (AAPL, TSLA, MSFT, GOOGL, AMZN, META, NVDA, NFLX)
- Pre-populated watchlist items

See `utils/MOCK_BACKEND_GUIDE.md` for details on mock backend responses.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a final project submission. For questions or issues, please contact the project maintainer.

## License

This project is part of a course submission.

## Acknowledgments

- Recharts for chart visualization
- React Router for routing
- Vite for build tooling

