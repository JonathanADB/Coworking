import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token'),
    user: localStorage.getItem('user'),
  });

  const login = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
    setAuthState({ token, user });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({ token: null, user: null });
  };

  console.log(authState);

  console.log(authState.token)

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}