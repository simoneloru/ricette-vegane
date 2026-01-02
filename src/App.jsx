import React from 'react';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import RecipePage from './pages/RecipePage';

// Use HashRouter for GitHub Pages simplicity to avoid 404s on refresh
// This is the most robust solution for static hosting without server config

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="recipe/:slug" element={<RecipePage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
