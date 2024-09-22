import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Connect to the Socket.IO server

// Make the socket instance available throughout your app

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
