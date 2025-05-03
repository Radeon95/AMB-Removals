// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./index.css"; // Create or adapt from your Vue styles

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Preload the actual font you use */}
    <link
      rel="preload"
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap"
      as="style"
      onLoad={(e) => {
        (e.target as HTMLLinkElement).rel = "stylesheet";
      }}
    />
    <noscript>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap"
      />
    </noscript>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
