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
    

    const response = await apiClient.post('/auth/login', {
      email, password,
    });

    const token = response.data.access_token;
    localStorage.setItem('token', token);

    try{
      const profileResponse = await apiClient.get('/auth/me');
      const userData = profileResponse.data;
    
    
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return userData;
    } catch (error){
      localStorage.removeItem('token');
      localStorage.removeItem('user')
    }
  };

  const register =async ({email, password, name, consent_accepted}) => {
    await apiClient.post('/auth/register', {email, password, name, consent_accepted});
    return login(email, password);
  }
  

  
}  
await register({name, email, password, consent_accepted:true});
navigate('/dashboard');