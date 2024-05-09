import React, { useState } from "react";
import Logo from "../assets/images/Logo.png";
import Fondo from "../assets/images/Fondo.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreateValidateUserForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    code: "",
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
      const response = await fetch("http://localhost:3000/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Usuario validado correctamente");
        // Redirigir a la página de login
        await new Promise((resolve) => setTimeout(resolve, 5000));
        navigate("/login");
      } else {
        toast.error(data.error.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al validar el usuario");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md"
    >
      <div className="mb-4">
        <label className="block text-black">
          Código de verificación
          <input
            type="text"
            name="code"
            value={formData.code}
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
        Validar usuario
      </button>
      {/* {errorMessage && (
        <div className="mt-4 text-red-500 text-center">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="mt-4 text-green-500 text-center">{successMessage}</div>
      )} */}
    </form>
  );
}

export function ValidateUser() {
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
        FORMULARIO DE VALIDACIÓN DE USUARIO
      </h2>
      <div>
        <CreateValidateUserForm />
      </div>
    </div>
  );
}

export default ValidateUser;
