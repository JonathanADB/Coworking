import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/auth-context';
import { FaPencilAlt } from "react-icons/fa";
import { Input } from "@/components/UI/input";
import { Button } from '@/components/UI/button';


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

        <div className='flex flex-row w-full p-4 '>
            <div className='flex flex-col px-2 w-fit '>
            <img src={user.avatar} alt={user.username} className='rounded-full aspect-square' width={96} height={96} />
            </div>
            {/* <div className='flex flex-col w-full'>
                <h3 className='text-2xl font-bold text-left'>{user.firstName} {user.lastName}</h3>
                <div className='flex flex-row items-center justify-start text-sm gap-x-1'>
                    <p>{user.username}</p>
                    ·
                    <p>{user.email}</p>
                </div>

            </div> */}

            <div className='flex flex-col w-full'>
                <div>
                    <label>Nombre de usuario</label>
                    <Input
                        label='Nombre'
                        placeholder={user.username}
                        value={user.username}
                        disabled={true}
                    />
                 </div>
                 <div>
                    <label>Email</label>
                    <Input
                        label='Email'
                        placeholder={user.email}
                        value={user.email}
                        disabled={true}
                    />
                 </div>
                <div>
                    <label>Nombre</label>
                    <Input
                        label='Nombre'
                        placeholder={user.firstName}
                        value={user.firstName}
                        disabled={true}
                    />
                    </div>
                <div>
                    <label>Apellido</label>
                    <Input
                        label='Apellido'
                        placeholder={user.lastName}
                        value={user.lastName}
                        disabled={true}
                    />
                    </div>

                <Button asChild className="my-2">
                    <Link to="/change-password">
                        Cambiar contraseña
                    </Link>
                </Button>
                    {/* <Link to="/change-password">
                <button className='flex justify-center w-full mx-auto mt-4 text-center'>Cambiar contraseña</button>
            </Link> */}

                </div>
        </div>

        <div className='relative flex items-center justify-left'>
            <p className='absolute z-10 ml-4 bg-[#FDFCFC] px-2'>Coworking visitados</p>
            <div className='absolute inset-0 border-b border-primary' />
        </div>

        <div className='my-8'/>

        <div className='relative flex items-center justify-left'>
            <p className='absolute z-10 ml-4 bg-[#FDFCFC] px-2'>Reseñas</p>
            <div className='absolute inset-0 border-b border-primary' />
        </div>

        {/* <div>
            <Link to="/change-password">
                <button className='flex mx-auto mt-4'>Cambiar contraseña</button>
            </Link>
            </div> */}
        </div>
    );


   
}

export default Profile;