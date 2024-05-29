import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Input } from "@/components/UI/Input";
import { Label } from '@/components/UI/label';
import { Button } from '@/components/UI/button';
import { AuthContext } from '../auth/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/avatar"
import { FaUserCircle, FaCogs, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";


const Profile = () => {
    const { authState, logout } = useContext(AuthContext);

    return (
        <div className='flex flex-col w-full '>
            <section className='m-4 '>
                <h3 className='text-xl font-bold '>Perfil</h3>
                <h2 className='text-2xl font-bold'>Hola {authState?.user?.firstName}</h2>
            </section>
            <section className='flex flex-col h-full p-4 rounded-t-lg gap-y-4 '>
                <Link to="/edit-profile">
                    <Button variant="ghost" className="justify-start w-full text-md gap-x-4">
                        <FaUserCircle className='text-2xl' /> Datos personales
                    </Button>
                </Link>
                <Link to="/change-password">
                <Button variant="ghost" className="justify-start w-full text-md gap-x-4">
                    <FaCogs className='text-2xl' /> Cambiar contraseña
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