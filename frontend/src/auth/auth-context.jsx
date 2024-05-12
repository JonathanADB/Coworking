import { createContext, useState } from "react";

export const AuthContext = createContext();

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
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({ token: null, user: null });
  };

  const updateAvatar = (avatarUrl) => {
    const updatedUser = { ...authState.user, avatar: avatarUrl };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setAuthState(prevState => ({ ...prevState, user: updatedUser }));
}

  const updateUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setAuthState(prevState => ({ ...prevState, user }));
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, updateUser, updateAvatar }}>
      {children}
    </AuthContext.Provider>
  );
}