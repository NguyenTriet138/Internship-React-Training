import React, { useState } from 'react';
import { useAuth } from '../hooks/userAuth';
import { LoginFormData } from '../types/user.types';
// import './Login.css';

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: ''
  });

  const { isLoading, message, messageType, login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await login(formData.username.trim(), formData.password);

    if (success) {
      // Redirect to home page
      window.location.href = '/home';
    }
  };

  return (
    <section className="login-wrap">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form id="login-form" onSubmit={handleSubmit}>
          <div className="form-group-login">
            <input type="text" id="username" value={formData.username} onChange={handleInputChange} required placeholder="Email"/>
          </div>
          <div className="form-group-login">
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Password"
            />
          </div>
          <div
            className={`form-message ${messageType}`}
            style={{ display: message ? 'block' : 'none' }}
          >
            {message}
          </div>
          <button
            className="button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
