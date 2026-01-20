# Quick Deployment Guide

## 🚀 Ready to Deploy!

Your project is built and ready for deployment. Choose one of the following options:

## Option 1: GitHub Pages (Recommended for Stage 1)

### Quick Steps:

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update `vite.config.js`:**
   - Uncomment line 13: `base: '/Final-Project/',`
   - Replace `Final-Project` with your actual repository name if different

3. **Deploy:**
   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages:**
   - Go to: https://github.com/hadz44/Final-Project/settings/pages
   - Under "Source", select "gh-pages" branch
   - Click "Save"

5. **Your site will be live at:**
   ```
   https://hadz44.github.io/Final-Project/
   ```
   (Replace with your username and repo name)

6. **Update README.md:**
   - Replace the placeholder URL in README.md with your actual deployment URL

## Option 2: Netlify (Easiest)

### Method 1: Drag & Drop
1. Run: `npm run build`
2. Go to: https://app.netlify.com/drop
3. Drag the `dist` folder onto the page
4. Done! Your site is live

### Method 2: GitHub Integration
1. Go to: https://app.netlify.com
2. Click "Add new site" > "Import an existing project"
3. Connect your GitHub repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"

## Option 3: Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

3. Follow the prompts to complete deployment

## ✅ Pre-Deployment Checklist

- [x] Build works successfully (`npm run build`)
- [x] All features tested locally
- [x] Mock data works without API keys
- [x] Responsive design verified
- [x] All routes work correctly
- [ ] Deployment URL added to README.md (after deployment)

## 📝 After Deployment

1. Test your deployed site:
   - [ ] Home page loads
   - [ ] Search functionality works
   - [ ] Authentication works
   - [ ] Save articles works
   - [ ] Watchlist page works
   - [ ] Mobile responsive

2. Update README.md with your deployment URL

3. Share the link with your instructor!

## 🐛 Troubleshooting

### GitHub Pages: Routes not working
- Make sure `base` path in `vite.config.js` matches your repo name
- Clear browser cache
- Wait a few minutes for GitHub Pages to update

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Check that Node.js version is 16 or higher

### API not working
- For News API: Free tier only works on localhost
- In production, the app automatically uses the proxy URL
- Mock data works without API keys

## 📚 More Information

See `DEPLOYMENT.md` for detailed instructions and troubleshooting.

