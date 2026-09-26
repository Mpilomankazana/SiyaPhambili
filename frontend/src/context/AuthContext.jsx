/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';
import apiClient from '../api/client';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if a user is already logged in when the app loads
  // Check if a user is already logged in when the app loads
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        // Future MVP Step: const response = await apiClient.get('/auth/me');
        // For now, we decode the basic user info from storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    // We will map this to the FastAPI OAuth2/login endpoint
    const formData = new FormData();
    formData.append('username', email); // FastAPI OAuth2 uses 'username' for the email field
    formData.append('password', password);

    const response = await apiClient.post('/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    
    localStorage.setItem('token', response.data.access_token);
    // Temporarily storing user info until we wire up the /me endpoint
    const userData = { email, role: 'innovator' }; 
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const register = async (userData) => {
    await apiClient.post('/auth/register', userData);
    // Automatically log them in after successful registration
    await login(userData.email, userData.password);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}