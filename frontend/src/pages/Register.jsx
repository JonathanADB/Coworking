import React, { useState } from "react";
import Input from "../components/UI/Input.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function RegisterUserForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    firstName: " ",
    lastName: " ",
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
      }

      const data = response.json();

      onSubmit(data);
      // Redirigir a la página de validate
      await new Promise((resolve) => setTimeout(resolve, 5000));
      navigate("/validate");
    } catch (error) {
      toast.error("El usuario no se pudo registrar");
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

        <button className="mx-auto w-fit" type="submit">
          Registrarse
        </button>
      </form>
    </div>
  );
}
export default RegisterUserForm;
