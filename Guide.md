# CouchMate™ - GitHub Pages Deployment Guide

## Project Structure

Create the following files in your project directory:

```
couchmate/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    └── index.css
```

## Step-by-Step Setup

### 1. Create `package.json`
```json
{
  "name": "couchmate",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "vite build && gh-pages -d dist"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "gh-pages": "^6.0.0",
    "vite": "^4.4.5"
  }
}
```

### 2. Create `vite.config.js`
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'your-username' and 'your-repo-name' with your GitHub details
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/'
})
```

### 3. Create `index.html`
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/couch.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="CouchMate™ - Where VPs find their perfect seat. The exclusive dating app for executives seeking meaningful connections with luxury furniture." />
    <title>CouchMate™ - VP Dating App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### 4. Create `src/main.jsx`
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### 5. Create `src/App.jsx`
Copy the entire React component code from the artifact above into this file.

### 6. Create `src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom animations */
@keyframes swipeLeft {
  to { transform: translateX(-150%) rotate(-20deg); opacity: 0; }
}
@keyframes swipeRight {
  to { transform: translateX(150%) rotate(20deg); opacity: 0; }
}
@keyframes swipeUp {
  to { transform: translateY(-150%) scale(0.8); opacity: 0; }
}

.animate-swipe-left { animation: swipeLeft 0.3s ease-out forwards; }
.animate-swipe-right { animation: swipeRight 0.3s ease-out forwards; }
.animate-swipe-up { animation: swipeUp 0.3s ease-out forwards; }
```

### 7. Create `.gitignore`
```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

### 8. Create `README.md`
```markdown
# CouchMate™ 🛋️

> Where VPs find their perfect seat

A satirical dating app for executives seeking meaningful connections with luxury furniture. Because sometimes, your office couch understands you better than anyone else.

## Features

- 💼 VP-verified furniture profiles
- ❤️ Swipe right to match with executive seating
- ⭐ Super-like that special Chesterfield
- 💬 View your furniture matches
- 🎨 Premium leather-inspired UI

## Demo

[Live Demo](https://your-username.github.io/your-repo-name/)

## Local Development

```bash
npm install
npm run dev
```

## Deployment

```bash
npm run deploy
```

## Technologies

- React 18
- Vite
- Tailwind CSS
- Lucide Icons

---

*This is a parody project and not affiliated with any actual dating applications or furniture retailers.*
```

### 9. Create a Tailwind Config (optional but recommended)
Create `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Update `package.json` to include Tailwind:
```json
"devDependencies": {
  // ... existing deps
  "autoprefixer": "^10.4.14",
  "postcss": "^8.4.24",
  "tailwindcss": "^3.3.0"
}
```

## Deployment Instructions

1. **Initialize Git repository:**
```bash
cd couchmate
git init
git add .
git commit -m "Initial commit"
```

2. **Create GitHub repository:**
   - Go to GitHub and create a new repository
   - Don't initialize with README (you already have one)

3. **Connect and push:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

4. **Update vite.config.js:**
   - Replace `your-repo-name` with your actual repository name

5. **Install dependencies and deploy:**
```bash
npm install
npm run deploy
```

6. **Enable GitHub Pages:**
   - Go to Settings → Pages in your GitHub repo
   - Set source to "Deploy from a branch"
   - Select `gh-pages` branch
   - Save

Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Quick One-Command Setup

After creating all files, run:
```bash
npm install && git init && git add . && git commit -m "Initial commit"
```

Then follow steps 2-6 above for GitHub deployment.