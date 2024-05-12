import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Input } from "@/components/UI/Input";
import { AuthContext } from '../auth/auth-context';

const UpdateProfile = () => {
    const [user, setUser] = useState(null);
    const { authState } = useContext(AuthContext);
    
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
            const response = await fetch('/user/update/profile/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authState.token}`, 
                },
                body: JSON.stringify(user),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
    
            setEditing(false); 
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };
    
    return (
        <div>
            {user && (
                <div className='flex flex-row w-full p-4 '>
                    <div className='flex flex-col px-2 w-fit '>
                        <img src={user.avatar} alt={user.username} className='rounded-full aspect-square' width={96} height={96} />
                    </div>
                    <div className='flex flex-col w-full'>
                        <div>
                            <label>Nombre de usuario</label>
                            <Input
                                name="username"
                                placeholder="Nombre de usuario"
                                value={user.username}
                                onChange={handleInputChange}
                                disabled={!editing} // Si no estamos editando, deshabilitamos el input
                            />
                        </div>
                        <div>
                            <label>Email</label>
                            <Input
                                name="email"
                                placeholder="Email"
                                value={user.email}
                                onChange={handleInputChange}
                                disabled={!editing} 
                            />
                        </div>
                        <div>
                            <label>Nombre</label>
                            <Input
                                name="firstName"
                                placeholder="Nombre"
                                value={user.firstName}
                                onChange={handleInputChange}
                                disabled={!editing} 
                            />
                        </div>
                        <div>
                            <label>Apellido</label>
                            <Input
                                name="lastName"
                                placeholder="Apellido"
                                value={user.lastName}
                                onChange={handleInputChange}
                                disabled={!editing}
                            />
                        </div>
                        {editing ? (
                            <button onClick={handleSaveChanges} className='flex justify-center w-full mx-auto mt-4 text-center'>Guardar cambios</button>
                        ) : (
                            <button onClick={() => setEditing(true)} className='flex justify-center w-full mx-auto mt-4 text-center'>Editar perfil</button>
                        )}
                    </div>
                </div>
            )}
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

export default UpdateProfile;