import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: string;
  department: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('pragati_token');
    const userData = localStorage.getItem('pragati_user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('pragati_token');
        localStorage.removeItem('pragati_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo credentials
      if (email === 'demo@pragati.com' && password === 'demo123') {
        const mockUser = {
          id: '1',
          email,
          name: 'Alex Johnson',
          role: 'Senior Developer',
          department: 'Engineering',
          avatar: 'AJ'
        };
        
        localStorage.setItem('pragati_token', 'mock-jwt-token');
        localStorage.setItem('pragati_user', JSON.stringify(mockUser));
        setUser(mockUser);
        setIsAuthenticated(true);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw new Error('Login failed. Use demo@pragati.com / demo123');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('pragati_token');
    localStorage.removeItem('pragati_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};