# News Explorer

A modern React application for searching and saving news articles with user authentication and responsive design.

## Features

- 🔐 **User Authentication**: Sign up and sign in functionality
- 🔎 **News Search**: Search for news articles by keyword
- ⭐ **Saved Articles**: Save and manage favorite news
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Clean and intuitive user interface

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **News API** - Third-party news data
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
│   ├── NewsCard/       # News article card
│   ├── SavedNews/      # Saved articles page
│   ├── LoginModal/     # Login modal
│   ├── RegisterModal/  # Registration modal
│   └── ...
├── utils/              # Utility functions
│   ├── api.js          # Backend API calls
│   ├── NewsApi.js      # Third-party news API
│   ├── mockData.js     # Mock data for development
│   └── ...
├── src/                # Source files
│   ├── main.jsx        # Entry point
│   └── style.css       # Global styles
└── public/             # Static assets
```

## API Configuration

### News API Setup

1. Create a `.env` file in the project root:
```env
VITE_API_URL=http://localhost:3000
VITE_NEWS_API_KEY=your_news_api_key_here
```

2. Register at [News API](https://newsapi.org) to get your API key.
3. Add `VITE_NEWS_API_KEY` to your `.env` file.
4. The app will automatically use the proxy URL in production.

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
2. **Search News**: Enter a keyword (e.g., climate, AI, markets) to search articles
3. **Save Articles**: Save articles to your personal list
4. **Manage Saved News**: View and remove saved articles

## Mock Data

The application includes mock data for:
- User authentication (test@example.com, demo@example.com)
- News article results
- Saved articles

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

- News API for article data
- React Router for routing
- Vite for build tooling


Video link for Project Pitch on Loom:
https://www.loom.com/share/ed12ffb3383344d2b45287a6832adcda

