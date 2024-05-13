import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Input } from "@/components/UI/Input";
import { Label } from '@/components/UI/label';
import { Button } from '@/components/UI/button';
import { AuthContext } from '../auth/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/avatar"
import { FaUserCircle, FaCogs, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";


const Profile = () => {
    const [user, setUser] = useState(null);
    const { authState, updateUser, logout } = useContext(AuthContext);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (authState && authState.user) {
            setUser(authState.user);
        }
    }, [authState]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSaveChanges = async () => {
        try {

            console.log(authState.token)
            console.log(user)

            const response = await fetch('http://localhost:3000/user/update/profile/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authState.token, 
                },
                body: JSON.stringify(user),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update profile');
            } else {
                updateUser(user);
                setEditing(false); 
            }
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };
    
    return (
        <div className='flex flex-col bg-secondary/75'>
            <section className='m-4'>
                <h3 className='text-xl font-bold '>Perfil</h3>
                <h2 className='text-2xl font-bold'>Hola {authState?.user?.firstName}</h2>
            </section>
            <section className='flex flex-col p-4 rounded-t-lg h-max gap-y-4 bg-background'>
                <Link to="/edit-profile">
                    <Button variant="ghost" className="justify-start w-full text-md gap-x-4">
                        <FaUserCircle className='text-2xl' /> Datos personales
                    </Button>
                </Link>
                <Link to="/user-settings">
                <Button variant="ghost" className="justify-start w-full text-md gap-x-4">
                    <FaCogs className='text-2xl' /> Ajustes
                </Button>
                </Link>
                <Link to="/help">
                    <Button variant="ghost" className="justify-start w-full text-md gap-x-4">
                        <FaQuestionCircle className='text-2xl' /> Ayuda
                    </Button>
                </Link>
                <Button variant="ghost" className="justify-start w-full text-md gap-x-4" onClick={logout}>
                    <FaSignOutAlt className='text-2xl' /> Cerrar sesión
                </Button>
            </section>
          
        </div>
    );
}

export default Profile;