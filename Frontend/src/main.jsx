import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#171B24',
            color: '#FAF9F6',
            border: '1px solid #1E2230',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#171B24',
            },
          },
          error: {
            iconTheme: {
              primary: '#F43F5E',
              secondary: '#171B24',
            },
          },
        }}
      />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
