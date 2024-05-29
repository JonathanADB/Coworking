import React, { useState } from "react";
import { Input } from "@/components/UI/Input";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/UI/button.jsx";
import { Label } from "@/components/UI/label";

function RegisterUserForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const removeSpaces = () => {
    const newData = {};
    for (const key in formData) {
      newData[key] = formData[key].trim();
    }
    setFormData(newData);
  };

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
      removeSpaces();
      const response = await fetch(`${import.meta.env.VITE_APP_HOST}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        toast.error("Error en los datos de solicitud");
      } else {
        // Redirigir a la página de validate
        await new Promise((resolve) => setTimeout(resolve, 250));
        navigate("/validate");
        toast.success("Usuario registrado exitosamente");
      }
    } catch (error) {
      console.error("El usuario no se pudo registrar");
    }
  };
  return (
    <div className="flex flex-col w-full p-4">
      <h1 className="text-center">Registro</h1>
      <form className="flex flex-col px-1 my-4 gap-y-4" onSubmit={handleSubmit}>
        <div>
          <Label>Nombre</Label>
          <Input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Apellido</Label>
          <Input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Nombre de usuario</Label>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Correo electrónico</Label>
          <Input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Contraseña</Label>

          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <p className="text-xs mt-[2px]">
            Debe contener una letra mayúscula y un símbolo: (?=.*)
          </p>
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
