import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { getCurrentUser, setCurrentUser, clearCurrentUser } from '../utils/localStorage';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
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

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  const login = (newUser: User) => {
    setUser(newUser);
    setCurrentUser(newUser);
  };

  const logout = () => {
    setUser(null);
    clearCurrentUser();
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      setCurrentUser(updatedUser);
    }
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};