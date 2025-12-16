# Deployment Guide

This guide provides step-by-step instructions for deploying the Stock Market Analyzer application.

## Deployment Options

### Option 1: GitHub Pages (Recommended for Stage 1)

#### Prerequisites
- GitHub account
- Repository created on GitHub

#### Steps

1. **Install gh-pages package:**
```bash
npm install --save-dev gh-pages
```

2. **Update vite.config.js:**
Uncomment and set the base path to match your repository name:
```javascript
export default defineConfig({
  base: '/your-repo-name/',  // Replace with your actual repo name
  // ... rest of config
})
```

3. **Update package.json:**
The deploy script is already added:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

4. **Deploy:**
```bash
npm run deploy
```

5. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to Settings > Pages
   - Under "Source", select "gh-pages" branch
   - Save

6. **Access your site:**
   - Your site will be available at: `https://yourusername.github.io/your-repo-name/`
   - Update the README.md with this URL

#### Troubleshooting
- If routes don't work, ensure the base path in `vite.config.js` matches your repo name
- Clear browser cache if you see old content
- Wait a few minutes for GitHub Pages to update

### Option 2: Netlify

#### Method 1: Drag and Drop

1. **Build the project:**
```bash
npm run build
```

2. **Deploy:**
   - Go to [Netlify](https://app.netlify.com/drop)
   - Drag and drop the `dist` folder
   - Your site is live!

#### Method 2: Netlify CLI

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Login:**
```bash
netlify login
```

3. **Deploy:**
```bash
netlify deploy --prod --dir=dist
```

#### Method 3: GitHub Integration

1. **Connect repository:**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" > "Import an existing project"
   - Connect your GitHub repository

2. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy site"

### Option 3: Vercel

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
vercel --prod
```

3. **Follow the prompts:**
   - Link to existing project or create new
   - Configure settings
   - Deploy

### Option 4: Google Cloud Platform

If deploying to Google Cloud (for later stages):

1. **Build the project:**
```bash
npm run build
```

2. **Upload dist folder to your VM:**
```bash
scp -r dist/* user@your-vm-ip:/var/www/html/
```

3. **Configure Nginx or Apache** to serve the static files

## Pre-Deployment Checklist

- [ ] Test the build locally: `npm run build && npm run preview`
- [ ] Verify all routes work correctly
- [ ] Check that environment variables are set (if using real APIs)
- [ ] Ensure `USE_MOCK_DATA = true` for Stage 1 submission
- [ ] Update README.md with deployment URL
- [ ] Test on mobile devices
- [ ] Verify all features work in production build

## Post-Deployment

1. **Update README.md:**
   - Add the live deployment URL
   - Update any environment-specific instructions

2. **Test the deployed site:**
   - Test all routes
   - Verify authentication works
   - Check stock search functionality
   - Test watchlist features

3. **Monitor:**
   - Check browser console for errors
   - Verify API calls (if using real APIs)
   - Test on different browsers

## Environment Variables

If using real APIs in production, set environment variables in your deployment platform:

- **Netlify**: Site settings > Environment variables
- **Vercel**: Project settings > Environment variables
- **GitHub Pages**: Not supported (use build-time variables)

## Common Issues

### Routes not working (404 errors)
- **Solution**: Ensure base path is set correctly in `vite.config.js`
- For GitHub Pages, base path should be `/repo-name/`

### Assets not loading
- **Solution**: Check that base path matches deployment URL structure
- Verify all assets are in the `dist` folder

### API calls failing
- **Solution**: Check CORS settings if using third-party APIs
- Verify environment variables are set correctly

## Support

For deployment issues, refer to:
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Netlify Docs](https://docs.netlify.com/)
- [Vercel Docs](https://vercel.com/docs)

