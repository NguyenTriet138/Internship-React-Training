import React from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  // TODO: Add routing logic here
  // For now, showing Home page for demonstration
  const showHomePage = true; // Change this to control which page to show

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
