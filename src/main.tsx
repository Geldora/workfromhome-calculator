
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Make sure we have a root element
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element not found");
} else {
  // Render the app
  createRoot(rootElement).render(<App />);
  
  // Initialize analytics in a non-blocking way
  window.addEventListener('load', () => {
    // Load analytics after the app is fully loaded
    import('./utils/analytics').then(({ initializeGoogleAnalytics }) => {
      initializeGoogleAnalytics('G-L2XR7H3WMY'); // Updated with a real GA4 ID format
    }).catch(err => {
      console.error('Failed to load analytics:', err);
    });
  });
}
