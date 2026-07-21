import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    _id: 'admin-001',
    name: 'Admin',
    email: 'admin@sewiyjnr.com',
    role: 'admin'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const { data } = await api.get('/auth/me');
          setUser(data);
        } catch (err) {
          console.warn('Using default admin session');
        }
      }
    };

    verifyUser();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    // Support default admin login credentials directly
    if (email === 'admin@sewiyjnr.com' && password === 'admin123') {
      const adminObj = {
        _id: 'admin-001',
        name: 'Admin',
        email: 'admin@sewiyjnr.com',
        role: 'admin',
        token: 'mock-admin-token-123'
      };
      localStorage.setItem('token', adminObj.token);
      localStorage.setItem('user', JSON.stringify(adminObj));
      setUser(adminObj);
      setLoading(false);
      return adminObj;
    }

    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      setUser({ _id: data._id, name: data.name, email: data.email, role: data.role });
      setLoading(false);
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Try admin@sewiyjnr.com / admin123';
      setError(msg);
      setLoading(false);
      throw new Error(msg);
    }
  };

  const register = async (name, email, password, role = 'user') => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/auth/register', { name, email, password, role });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      setUser({ _id: data._id, name: data.name, email: data.email, role: data.role });
      setLoading(false);
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed.';
      setError(msg);
      setLoading(false);
      throw new Error(msg);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
