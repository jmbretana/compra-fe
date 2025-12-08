// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "@interfaces";

interface AuthContextType {
  login: (user: User) => void;
  logout: () => void;
  //
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("authToken") ? true : false;
  });

  const login = (user: User) => {
    localStorage.setItem("authToken", user.username); // Store the token
    localStorage.setItem("user", user.username); // Store the token
    localStorage.setItem("role", user.role); // Store the token
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken"); // Remove the token
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
