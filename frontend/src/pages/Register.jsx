import React, { useState } from "react";
import Input from "../components/UI/Input.jsx";

function RegisterUserForm ({ onSubmit }) {
    const [formData, setFormData] = useState({
        firstName: " ",
        lastName: " ",
        username: "",
        email: "",
        password:""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (!formData.firstName || 
            !formData.lastName ||
            !formData.username || 
            !formData.email ||
            !formData.password
        ){
            message = "Todos los cambos son obligatorios"
            return;
        }
       
        try {
            const response =  fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Error en los datos de solicitud: ');
            }

            const data = response.json();

            onSubmit(data);
            
        } catch (error) {
            alert('Usuario registrado exitosamente');
        }
    };
    return (
        <div className="flex flex-col justify-center w-full ">
        <form className="flex flex-col px-1 my-4 gap-y-4" onSubmit={handleSubmit}>


                <label className="flex items-center justify-between w-full ">
                    Nombre:
                    <Input 
                        type="text" 
                        name="firstName"
                        className="w-2/3"
                        value={formData.firstName} 
                        onChange={handleChange}
                        required 
                     />

                </label>

                <label className="flex items-center justify-between w-full ">
                    Apellidos:
                    <Input 
                        type="text" 
                        name="lastName"
                        className="w-2/3"
                        value={formData.lastName} 
                        onChange={handleChange}
                        required 
                     />
                </label>

                <label className="flex items-center justify-between w-full ">
                    Username:
                    <Input 
                        type="text" 
                        name="username"
                        className="w-2/3"
                        value={formData.username} 
                        onChange={handleChange}
                        min="1"
                        max="256"
                        required 
                     />
                </label>

                <label className="flex items-center justify-between w-full ">
                    email:
                    <Input 
                        type="text"
                        name="email"
                        className="flex w-2/3 h-10 px-1 bg-transparent border border-gray-400 rounded-md outline-none outline-offset-0"
                        value={formData.email} 
                        onChange={handleChange}
                        required 
                   />
                </label>
                <label className="flex items-center justify-between w-full ">
                    password:
                    <Input 
                        type="password"
                        name="password"
                        className="flex w-2/3 h-10 px-1 bg-transparent border border-gray-400 rounded-md outline-none outline-offset-0"
                        value={formData.password} 
                        onChange={handleChange}
                        required 
                   />
                </label>
      
            <button className="mx-auto w-fit" type="submit">Registrarse</button>
        </form>
        </div>
    );
}
export default RegisterUserForm;

