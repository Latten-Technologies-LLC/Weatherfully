import React from 'react';

// Styles
import './assets/scss/styles.scss';

// React router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
