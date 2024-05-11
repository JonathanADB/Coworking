import React, { useState } from "react";
import { Input } from "@/components/UI/input";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { Button } from "@/components/UI/button.jsx";

function RegisterUserForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Revisa los campos obligatorios");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        toast.error("Error en los datos de solicitud");
      } else {
        toast.success("Usuario registrado exitosamente");
              // Redirigir a la página de validate
        await new Promise((resolve) => setTimeout(resolve, 5000));
        navigate("/validate");
      }

      const data = response.json();

      onSubmit(data);

    } catch (error) {
      console.error("El usuario no se pudo registrar");
    }
  };
  return (
    <div className="flex flex-col justify-center p-4 ">
        <h1 className='text-center'>Registro</h1>
            <form className="flex flex-col px-1 my-4 gap-y-4" onSubmit={handleSubmit}>
              <div>
                <label>Nombre</label>
                <Input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName} 
                    onChange={handleChange}
                    required 
                 />
            </div>

            <div>
                <label>Apellido</label>
                <Input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName} 
                    onChange={handleChange}
                    required 
                 />
            </div>

<div>
                <label>Nombre de usuario</label>
                <Input 
                    type="text" 
                    name="username"
                    value={formData.username} 
                    onChange={handleChange}
                    required 
                 />
            </div>

<div>
                <label>Correo electrónico</label>
                <Input 
                    type="text"
                    name="email"
                    value={formData.email} 
                    onChange={handleChange}
                    required 
               />
            </div>

            <div>
                <label>Contraseña</label>
            
                <Input 
                    type="password"
                    name="password"
                    value={formData.password} 
                    onChange={handleChange}
                    required 
               />
                               <p className='text-xs mt-[2px]'>Debe contener una letra mayúscula y un símbolo: (?=.*)</p>

            </div>
  
        <Button type="submit" className="w-full ">
          Registrarse
        </Button>
        {/* <button className="mx-auto w-fit" type="submit">Registrarse</button> */}
    </form>
    </div>
);
}
export default RegisterUserForm;
