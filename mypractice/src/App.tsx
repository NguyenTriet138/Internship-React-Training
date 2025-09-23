import React from 'react';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import ProductDetail from './pages/productDetail/ProductDetail';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/productdetail/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
