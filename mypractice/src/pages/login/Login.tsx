import React, { useState } from 'react';
import { useAuth } from '@hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { LoginFormData } from 'types/user.types';
import '@assets/styles/main.css';
import Heading from 'Share_bk/Components_bk/Heading_bk';
import TextInput from 'Share_bk/Components_bk/Textfield_bk';
import FormMessage from '@components/Message_bk';
import Button from 'Share_bk/Components_bk/Button_bk';
import * as yup from 'yup';

const emailSchema = yup.string().email("Invalid email format").required("Email is required");

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({ username: '', password: '' });
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const { isLoading, message, messageType, login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "username") {
      try {
        await emailSchema.validate(value);
        setErrors(prev => ({ ...prev, username: undefined }));
      } catch (err: any) {
        setErrors(prev => ({ ...prev, username: err.message }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await login(formData.username.trim(), formData.password);
    if (success) {
      navigate("/home");
    }
  };

  return (
    <section className="login-wrap">
      <div className="login-container">
        <Heading as="h2" size="md" className="login-title" value="Login" />

        <form id="login-form" onSubmit={handleSubmit}>
          <TextInput id="username" value={formData.username} onChange={handleInputChange} onBlur={handleBlur} placeholder="Email" />
          <FormMessage message={errors.username || ''} type="error" />
          <TextInput id="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="Password" />

          <FormMessage message={message} type={messageType} />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Login;
