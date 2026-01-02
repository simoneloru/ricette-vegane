import React from 'react';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import RecipePage from './pages/RecipePage';

// Use HashRouter for GitHub Pages simplicity or BrowserRouter with basename
// Using HashRouter is often safer for GH pages to avoid 404s on refresh without full server config
// But plan said Configure vite.config.js for base path so we can use BrowserRouter with basename
const basename = import.meta.env.BASE_URL;

function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="recipe/:slug" element={<RecipePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
