import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/auth-context";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/button";
import { Label } from "@/components/UI/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/avatar"


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

  console.log(authState.user)

  return (
    <div>
      <div className="flex flex-row w-full p-4 ">
        <div className="flex flex-col px-2 w-fit ">

        <Avatar className="w-[96px] h-[96px] aspect-square">
              <AvatarImage src={authState?.user?.avatar}  />
              <AvatarFallback className="text-4xl">{authState?.user?.firstName?.split('')[0]}</AvatarFallback> 
          </Avatar>

        </div>
        {/* <div className='flex flex-col w-full'>
                <h3 className='text-2xl font-bold text-left'>{user.firstName} {user.lastName}</h3>
                <div className='flex flex-row items-center justify-start text-sm gap-x-1'>
                    <p>{user.username}</p>
                    ·
                    <p>{user.email}</p>
                </div>

            </div> */}

        <div className="flex flex-col w-full">
          <div>
            <Label>Nombre de usuario</Label>
            <Input
              label="Nombre"
              placeholder={user.username}
              value={user.username}
              disabled={true}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              label="Email"
              placeholder={user.email}
              value={user.email}
              disabled={true}
            />
          </div>
          <div>
            <Label>Nombre</Label>
            <Input
              label="Nombre"
              placeholder={user.firstName}
              value={user.firstName}
              disabled={true}
            />
          </div>
          <div>
            <Label>Apellido</Label>
            <Input
              label="Apellido"
              placeholder={user.lastName}
              value={user.lastName}
              disabled={true}
            />
          </div>

          <Button asChild className="my-2">
            <Link to="/change-password">Cambiar contraseña</Link>
          </Button>
        </div>
      </div>

      <div className="relative flex items-center justify-left">
        <p className="absolute z-10 ml-4 bg-[#FDFCFC] px-2">
          Coworking visitados
        </p>
        <div className="absolute inset-0 border-b border-primary" />
      </div>

      <div className="my-8" />

      <div className="relative flex items-center justify-left">
        <p className="absolute z-10 ml-4 bg-[#FDFCFC] px-2">Reseñas</p>
        <div className="absolute inset-0 border-b border-primary" />
      </div>
    </div>
  );
};

export default Profile;