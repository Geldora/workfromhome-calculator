
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializeGoogleAnalytics } from './utils/analytics';

// Initialize Google Analytics
// Replace 'G-XXXXXXXXXX' with your actual Google Analytics measurement ID
initializeGoogleAnalytics('G-XXXXXXXXXX');

createRoot(document.getElementById("root")!).render(<App />);
