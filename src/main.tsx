
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializeGoogleAnalytics } from './utils/analytics';

// Initialize Google Analytics
// Replace 'G-XXXXXXXXXX' with your actual Google Analytics measurement ID
initializeGoogleAnalytics('G-XXXXXXXXXX');

// Make sure we have a root element
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element not found");
} else {
  createRoot(rootElement).render(<App />);
}
