import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Character } from '../types/Character';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  characters: Character[];
  setCharacters: (characters: Character[]) => void;

}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [characters, setCharacters] = useState<Character[]>([]);

  const login = () => {
    setIsAuthenticated(true);
  }
  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, characters, setCharacters }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
