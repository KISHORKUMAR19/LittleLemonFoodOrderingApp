import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { isLoggedIn, logoutUser as authLogoutUser, hasCompletedOnboarding } from '../utils/auth'; 

// Define the AuthContext
interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: () => void;
  logout: () => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to check auth status
  const checkAuthStatus = async () => {
    try {
      const [onboarded, loggedIn] = await Promise.all([
        hasCompletedOnboarding(),
        isLoggedIn()
      ]);
      setIsAuthenticated(loggedIn || onboarded );
      setLoading(false);
    } catch (error) {
      console.error('Auth status check error:', error);
      setLoading(false);
    }
  };
// Check auth status
  useEffect(() => {
    // Initial check
    checkAuthStatus();
    
    // Set up polling for auth status changes
    const intervalId = setInterval(checkAuthStatus, 3000);
    
    return () => clearInterval(intervalId);
  }, []);

    // Login function
    const login = () => {
      setIsAuthenticated(true);
    };
    
  // Logout function
  const logout = async () => {
    await authLogoutUser();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
