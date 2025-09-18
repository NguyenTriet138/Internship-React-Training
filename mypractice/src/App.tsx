import React from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
// import './App.css';

function App() {
  // TODO: Add routing logic here
  // For now, showing Home page for demonstration
  const showHomePage = true; // Change this to control which page to show

  return (
    <div className="App">
        {showHomePage ? <Home /> : <Login />}
    </div>
  );
}

export default App;
