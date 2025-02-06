// src/index.js

import React from "react";
import ReactDOM from "react-dom/client";  // Use `react-dom/client` for React 18+
import './index.css';
import App from './App';  // Import the default App component
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />  {/* Render the App component */}
  </React.StrictMode>
);

reportWebVitals();  // If you want to measure performance
