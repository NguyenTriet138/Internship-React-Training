import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { LoginFormData } from '../types/user.types';
import '../assets/styles/main.css';

import Heading from '../components/Heading';
import TextInput from '../components/TextInput';
import FormMessage from '../components/FormMessage';
import PrimaryButton from '../components/Button';

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({ username: '', password: '' });

  const { isLoading, message, messageType, login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await login(formData.username.trim(), formData.password);
    if (success) {
      window.location.href = '/home';
    }
  };

  return (
    <section className="login-wrap">
      <div className="login-container">
        <Heading as="h2" size="md" className="login-title" value="Login" />

        <form id="login-form" onSubmit={handleSubmit}>
          <TextInput id="username" value={formData.username} onChange={handleInputChange} placeholder="Email" />
          <TextInput id="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="Password" />

          <FormMessage message={message} type={messageType} />

          <PrimaryButton type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </PrimaryButton>
        </form>
      </div>
    </section>
  );
};

export default Login;
