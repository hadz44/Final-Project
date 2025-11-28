# Weather App - Frontend

This is the React frontend for the Weather App full-stack project.

## Features

- React-based weather application
- Clothing item management
- User authentication and profiles
- Like/unlike functionality for clothing items
- Responsive design with modern UI

## Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **CSS3** - Styling

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/hadz44/se_project_react.git
cd se_project_react
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
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run server` - Start json-server for development (simulates backend)

## Project Structure

```
src/
├── components/          # React components
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── assets/             # Static assets
```

## Backend Integration

This frontend connects to a separate Express.js backend API. The backend repository is available at:
- **Backend Repository**: `https://github.com/hadz44/react-backend`

## Development

The application uses Vite for fast development with hot module replacement (HMR).

## Production Build

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.