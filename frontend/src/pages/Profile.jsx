import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Input } from "@/components/UI/Input";
import { Label } from '@/components/UI/label';
import { Button } from '@/components/UI/button';
import { AuthContext } from '../auth/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/avatar"
import { FaPencilAlt, FaEdit } from 'react-icons/fa';

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

            console.log('response:', response);
    
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
        <div>
            {user && (
                <div className='flex flex-row w-full p-4 '>
                    <div className='flex flex-col px-2 w-fit '>
                        <div className='relative'>
                    <Avatar className="w-[96px] h-[96px] aspect-square">
                        <AvatarImage src={authState?.user?.avatar}  />
                        <AvatarFallback className="text-4xl">{authState?.user?.firstName?.split('')[0]}</AvatarFallback> 
                    </Avatar>
                    <Link to="/add-avatar">
                        <button className='absolute top-1 right-1'>
                            <FaPencilAlt />
                        </button>
                    </Link>
                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <div>
                            <Label>Nombre de usuario</Label>
                            <Input
                                name="username"
                                placeholder="Nombre de usuario"
                                value={user.username}
                                onChange={handleInputChange}
                                disabled={!editing} // Si no estamos editando, deshabilitamos el input
                            />
                        </div>
                        <div>
                            <Label>Email</Label>
                            <Input
                                name="email"
                                placeholder="Email"
                                value={user.email}
                                onChange={handleInputChange}
                                disabled={!editing} 
                            />
                        </div>
                        <div>
                            <Label>Nombre</Label>
                            <Input
                                name="firstName"
                                placeholder="Nombre"
                                value={user.firstName}
                                onChange={handleInputChange}
                                disabled={!editing} 
                            />
                        </div>
                        <div>
                            <Label>Apellido</Label>
                            <Input
                                name="lastName"
                                placeholder="Apellido"
                                value={user.lastName}
                                onChange={handleInputChange}
                                disabled={!editing}
                            />
                        </div>
                        {editing ? (
                            <div className='flex flex-row gap-x-2'>
                                <Button variant="secondary" onClick={() => setEditing(false)} className='flex justify-center w-1/2 mx-auto mt-4 text-center'>Cancelar</Button>                            <Button onClick={handleSaveChanges} className='flex justify-center w-1/2 mx-auto mt-4 text-center'>Guardar cambios</Button>
                            </div>
                        ) : (
                            <div className='flex flex-col items-center mt-4 gap-y-2 '>
                                <Button onClick={() => setEditing(true)} className='w-full '>Editar perfil</Button>
                                <Button asChild className="w-full">
                                    <Link to="/change-password">
                                        Cambiar contraseña
                                        </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {!editing && (
              <>
            {/* <div className='relative flex items-center justify-left'>
                <p className='absolute z-10 px-2 ml-4 bg-background'>Coworking visitados</p>
                <div className='absolute inset-0 border-b border-[#B29700]' />
            </div> */}
            <div className='relative flex items-center justify-left'>
                <p className='absolute z-10 px-2 ml-4 bg-background'>Reseñas</p>
                <div className='absolute inset-0 border-b border-[#B29700]' />
            </div>
            <Button variant="destructive" onClick={logout} className='w-full my-4 '>Cerrar sesión</Button>
            </>
           )}
        </div>
    );
}

export default Profile;