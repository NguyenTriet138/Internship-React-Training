import { API_CONFIG } from '../config/env';

export class User {
  id: string; 
  username: string;
  password: string;
  role: string;

  constructor(data: { id: string; username: string; password: string; role: string }) {
    this.id = data.id;
    this.username = data.username;
    this.password = data.password;
    this.role = data.role;
  }

  toJSON(): string {
    return JSON.stringify({
      id: this.id,
      username: this.username,
      password: this.password,
      role: this.role,
    });
  }

  static fromJSON(json: string): User {
    const data = JSON.parse(json);
    return new User(data);
  }
}

export class UserModel {
  async login(username: string, password: string): Promise<User | null> {
    try {
      const res = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.users}`);
      const users = await res.json();

      const foundUser = users.find(
        (u: any) => u.username === username && u.password === password
      );

      if (foundUser) {
        return new User(foundUser);
      }

      return null;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem('currentUser');
      return userStr ? User.fromJSON(userStr) : null;
    } catch {
      return null;
    }
  }

  saveUser(user: User): void {
    localStorage.setItem('currentUser', user.toJSON());
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }
}
