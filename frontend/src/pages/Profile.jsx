import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/auth-context';
import { FaPencilAlt } from "react-icons/fa";
import Input from '../components/UI/Input';
import UpdateProfile from './UpdateProfile.jsx';


const Profile = () => {
    const [editing, setEditing] = useState(false);
    const [user, setUser] = useState({});
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        setUser(currentUser);
    }, [currentUser]);

    const handleEditClick = () => {
        setEditing(true);
    };
    const handleSaveChanges = () => {
        console.log("Guardando cambios en el perfil...");
    };

    const handleUpdateProfile = () => {
        handleSaveChanges(); ;
    };

    return (
        <div>
        <div className='flex flex-row w-full p-4 '>
            <div className='flex flex-col px-2 w-fit '>
                <img src={user.avatar} alt={user.username} className='rounded-full aspect-square' width={96} height={96} />
            </div>
            <div className='flex flex-col w-full'>
                <div>
                    <label>Nombre de usuario</label>
                    <Input
                        label='Nombre'
                        placeholder={user.username}
                        value={user.username}
                        disabled={!editing}
                    />
                    <button onClick={handleEditClick}>Editar</button>
                </div>
                <div>
                    <label>Email</label>
                    <Input
                        label='Email'
                        placeholder={user.email}
                        value={user.email}
                        disabled={!editing}
                    />
                    <button onClick={handleEditClick}>Editar</button>
                </div>
                <div>
                    <label>Nombre</label>
                    <Input
                        label='Nombre'
                        placeholder={user.firstName}
                        value={user.firstName}
                        disabled={!editing}
                    />
                    <button onClick={handleEditClick}>Editar</button>
                </div>
                <div>
                    <label>Apellido</label>
                    <Input
                        label='Apellido'
                        placeholder={user.lastName}
                        value={user.lastName}
                        disabled={!editing}
                    />
                    <button onClick={handleEditClick}>Editar</button>
                </div>
              
                {(
                    <Link to="/change-password">
                        <button className=''>Cambiar contraseña</button>
                    </Link>
                )}
                { (
                        <button onClick={handleUpdateProfile} className=''>Actualizar perfil</button>
                )}
            </div>
        </div>
    
        <div className='relative flex items-center justify-left'>
            <p className='absolute z-10 ml-4 bg-[#ECEBEB] px-2'>Coworking visitados</p>
            <div className='absolute inset-0 border-b border-[#B29700]' />
        </div>
    
        <div className='my-8'/>
    
        <div className='relative flex items-center justify-left'>
            <p className='absolute z-10 ml-4 bg-[#ECEBEB] px-2'>Reseñas</p>
            <div className='absolute inset-0 border-b border-[#B29700]' />
        </div>
    </div>
    
    );
}

export default Profile;