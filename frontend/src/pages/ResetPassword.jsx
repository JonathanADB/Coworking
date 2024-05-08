import React, { useState } from "react";
import Logo from "../assets/images/Logo.png";
import Fondo from "../assets/images/Fondo.png";

function CreateResetPasswordForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    verification_code: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
      const response = await fetch("http://localhost:3000/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Contraseña modificada correctamente");
        setErrorMessage("");
      } else {
        setErrorMessage(data.error.message);
        setSuccessMessage("");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error al modificar la contraseña");
      setSuccessMessage("");
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
            name="verification_code"
            value={formData.verification_code}
            onChange={handleChange}
            required
            className="mt-1 focus:ring-black focus:border-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-black">
          Nueva contraseña
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 focus:ring-black focus:border-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-black">
          Confirmar nueva contraseña
          <input
            type="text"
            name="confirmPassword"
            value={formData.confirmPassword}
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
      {errorMessage && (
        <div className="mt-4 text-red-500 text-center">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="mt-4 text-green-500 text-center">{successMessage}</div>
      )}
    </form>
  );
}

export function ResetPassword() {
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
        <CreateResetPasswordForm />
      </div>
    </div>
  );
}

export default ResetPassword;
