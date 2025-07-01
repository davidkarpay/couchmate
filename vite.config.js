import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'your-username' and 'your-repo-name' with your GitHub details
export default defineConfig({
  plugins: [react()],
  base: '/couchmate/'
})
