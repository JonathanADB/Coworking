import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [authState, setAuthState] = useState({
        token: null,
        user: null
    });

    const login = (token, user) => {
        setAuthState({ token, user });
    };

    const logout = () => {
        setAuthState({ token: null, user: null });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
