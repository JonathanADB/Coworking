import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/auth-context';

const Profile = () => {
    const [user, setUser] = useState({});
    const { authState } = useContext(AuthContext);
    
    useEffect(() => {
        const fetchUser = async () => {
        const user = authState.user;
        setUser(user);
        };
        fetchUser();
    }, [authState]);
    
    return (
        <div>
        <h1>Perfil</h1>
        <img src={user.avatar} alt={user.username} />

        <div>
            <p>ID: {user.id}</p>
            <p>Nombre de usuario: {user.username}</p>
            <p>URL del avatar: {user.avatar}</p>
            <p>Email: {user.email}</p>
            <p>Rol: {user.role}</p>
            <Link to="/change-password">
                <button>Cambiar contraseña</button>
                </Link>
            </div>
        </div>
    );


   
}

export default Profile;