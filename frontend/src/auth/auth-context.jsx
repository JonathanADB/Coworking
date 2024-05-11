import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user')),
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

  return (
<AuthContext.Provider value={{ authState, login, logout, updateAvatar }}>
      {children}
    </AuthContext.Provider>
  );
}