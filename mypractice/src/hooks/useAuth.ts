import { useState, useCallback } from 'react';
import { LoginState, MessageType } from 'types/user.types';
import { UserModel, User } from '@models/userModel';

const userModel = new UserModel();

export const useAuth = () => {
  const [state, setState] = useState<LoginState>({
    isLoading: false,
    message: '',
    messageType: 'error',
    user: null
  });

  const showMessage = useCallback((msg: string, type: MessageType = 'error') => {
    setState(prev => ({
      ...prev,
      message: msg,
      messageType: type
    }));
  }, []);

  const clearMessage = useCallback(() => {
    setState(prev => ({
      ...prev,
      message: '',
      messageType: 'error'
    }));
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    setState(prev => ({
      ...prev,
      isLoading
    }));
  }, []);

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    if (!username || !password) {
      showMessage('Please fill in all fields');
      return false;
    }

    setLoading(true);
    clearMessage();

    try {
      const user = await userModel.login(username, password);

      if (user) {
        userModel.saveUser(user);
        setState(prev => ({
          ...prev,
          user: { id: user.id, username: user.username },
          isLoading: false
        }));
        showMessage('Login successful!', 'success');
        return true;
      } else {
        showMessage('Invalid username or password');
        return false;
      }
    } catch (error) {
      showMessage('Login failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  }, [showMessage, clearMessage, setLoading]);

  const getCurrentUser = useCallback((): User | null => {
    return userModel.getCurrentUser();
  }, []);

  return {
    ...state,
    login,
    getCurrentUser,
    showMessage,
    clearMessage,
    setLoading
  };
};
