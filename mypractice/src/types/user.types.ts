export interface AuthUser {
  id: number;
  username: string;
}

export type MessageType = 'error' | 'success';

export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginState {
  isLoading: boolean;
  message: string;
  messageType: MessageType;
  user: AuthUser | null;
}
