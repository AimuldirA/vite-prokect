import './index.css'
import React from "react";
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ProjectDetail from './ProjectDetail';

 function App() {
   return(
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </Router>
   )
  
}

export default App
