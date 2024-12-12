// Import necessary libraries
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css';
import Studyplan from './screens/studyplan/Studyplan'
import Home from './screens/home/home'

const Navbar = () => (
  <nav className="navbar">
    <div className="logo">
      <img 
        src="/logo.png" 
        alt="EduVate Logo" 
        className="logo-image"
      />
      EduVate
    </div>
    <div className="links">
      <Link to="/">Home</Link>
      <Link to="/study-plan">Study Plan</Link>
      <Link to="/progress">Progress</Link>
      <Link to="/quests">Quests</Link>
    </div>
  </nav>
);


const App = () => (
  <Router>
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/study-plan" element={<Studyplan />} />
        {/* <Route path="/progress" element={<Progress />} />
        <Route path="/quests" element={<Quests />} /> */}
      </Routes>
    </div>
  </Router>
);

export default App;