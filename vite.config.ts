
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  // Base path for GitHub Pages - change this to your repository name
  // Example: if your repo is username.github.io/my-repo, use '/my-repo/'
  // If you're using a custom domain or a user/organization site, use '/'
  base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
