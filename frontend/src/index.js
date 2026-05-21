import React from 'react';

import ReactDOM from 'react-dom/client';

import './index.css';

import App from './App';

import reportWebVitals from './reportWebVitals';

import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(

  <React.StrictMode>

    {/* TOAST */}
    <Toaster
      position="top-right"
      toastOptions={{

        style: {
          background: "#064e3b",
          color: "#fff",
          borderRadius: "16px",
          padding: "14px 18px",
          fontWeight: "600"
        },

        success: {
          iconTheme: {
            primary: "#22c55e",
            secondary: "#ffffff"
          }
        },

        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#ffffff"
          }
        }

      }}
    />

    <App />

  </React.StrictMode>
);

reportWebVitals();