import React from 'react';
import Home from './pages/Home';
import Stats from './pages/Stats';
import Header from './components/Header/Header';
import AboutUs from './pages/AboutUs';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';

const App = () => {

  return (
    <div>
      <Router>
        <div style={{ marginBottom: '100px' }}>
          <Header />
        </div>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/stats" exact element={<Stats />} />
          <Route path="/aboutus" exact element={<AboutUs />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
