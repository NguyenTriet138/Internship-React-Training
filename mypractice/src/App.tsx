import React from 'react';
import Login from '@pages/login/Login';
import Home from '@pages/home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import ProductDetail from '@pages/productDetail/ProductDetail';
import ProtectedRoute from '@components/protectedRoute/index';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/productdetail/:id" element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
