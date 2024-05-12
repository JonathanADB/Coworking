import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({
  currentUser: null,
  login: (token) => {},
  logout: () => {},
  updateAvatar: (avatarUrl) => {},
  isUserLoggedIn: false,
});

export function AuthProvider({ children }) {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token'),
    user: user,
  });

  const login = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setAuthState({ token, user });
  };

  const logout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    setCurrentUser(null);
    setIsUserLoggedIn(false);
  };

  const updateAvatar = (avatarUrl) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      avatar: avatarUrl,
    }));
    localStorage.setItem(
      "AUTH_TOKEN",
      jwtEncode({ ...currentUser, avatar: avatarUrl })
    );
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        updateAvatar,
        isUserLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
