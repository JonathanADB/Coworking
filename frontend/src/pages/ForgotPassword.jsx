import React, { useState } from "react";
import Logo from "../assets/images/Logo.png";
import Fondo from "../assets/images/Fondo.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreateForgotPasswordForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(
          "Se ha enviado un correo electrónico con un código de verificación"
        );
        // Redirigir a la página de reset-password
        await new Promise((resolve) => setTimeout(resolve, 5000));
        navigate("/reset-password");
      } else {
        toast.error(data.error.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Introduce un email válido");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md"
    >
      <div className="mb-4">
        <label className="block text-black">
          email
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 focus:ring-black focus:border-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </label>
      </div>
      <button
        type="submit"
        className="w-full bg-black text-white font-bold py-2 px-4 rounded"
      >
        Restablecer contraseña
      </button>
    </form>
  );
}

export function ForgotPassword() {
  return (
    <div
      style={{
        backgroundImage: `url(${Fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "1rem",
      }}
      className="text-black"
    >
      <img
        src={Logo}
        className="h-16 mt-8 mb-4 mx-auto"
        alt="Logo COWorQUEEN"
      />
      <h2 className="text-2xl font-bold mb-4 text-center">
        FORMULARIO DE RECUPERACIÓN DE CUENTA
      </h2>
      <div>
        <CreateForgotPasswordForm />
      </div>
    </div>
  );
}

export default ForgotPassword;
