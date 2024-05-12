import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({
  currentUser: null,
  login: (token) => {},
  logout: () => {},
  updateAvatar: (avatarUrl) => {},
  isUserLoggedIn: false,
});

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    !!localStorage.getItem("AUTH_TOKEN")
  );

  useEffect(() => {
    const token = localStorage.getItem("AUTH_TOKEN");
    if (token) {
      const user = jwtDecode(token);
      if (user.exp * 1000 >= Date.now()) {
        setCurrentUser(user);
        setIsUserLoggedIn(true);
      } else {
        localStorage.removeItem("AUTH_TOKEN");
        setIsUserLoggedIn(false);
      }
    }
  }, []);

  useEffect(() => {
    const handler = (event) => {
      if (event.key === "AUTH_TOKEN") {
        if (event.newValue) {
          const user = jwtDecode(event.newValue);
          setCurrentUser(user);
          setIsUserLoggedIn(true);
        } else {
          setCurrentUser(null);
          setIsUserLoggedIn(false);
        }
      }
    };
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("storage", handler);
    };
  }, []);

  const login = (token) => {
    localStorage.setItem("AUTH_TOKEN", token);
    const user = jwtDecode(token);
    setCurrentUser(user);
    setIsUserLoggedIn(true);
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
