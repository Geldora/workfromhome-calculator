
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Make sure we have a root element
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element not found");
} else {
  // First render the app
  createRoot(rootElement).render(<App />);
  
  // Then initialize analytics after the app has rendered
  import('./utils/analytics').then(({ initializeGoogleAnalytics }) => {
    // Replace 'G-XXXXXXXXXX' with your actual Google Analytics measurement ID
    setTimeout(() => {
      initializeGoogleAnalytics('G-XXXXXXXXXX');
    }, 2000); // Delay analytics initialization by 2 seconds
  });
}
