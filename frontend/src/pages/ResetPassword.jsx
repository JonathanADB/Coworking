import React, { useState } from "react";
import Logo from "../assets/images/Logo.png";
import Fondo from "../assets/images/Fondo.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Input from "../components/UI/Input";

function CreateResetPasswordForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    verification_code: "",
    password: "",
    confirmPassword: "",
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
      const response = await fetch("http://localhost:3000/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Contraseña modificada correctamente");
        // Redirigir a la página de login
        await new Promise((resolve) => setTimeout(resolve, 5000));
        navigate("/login");
      } else {
        toast.error(data.error.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al modificar la contraseña");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-4 mx-auto mt-4 rounded-md gap-y-4"
    >
      <div>
          <label>Código de verificación</label>
          <Input
            type="text"
            name="verification_code"
            value={formData.verification_code}
            onChange={handleChange}
            required
          />
      </div>
      <div>
          <label>Nueva contraseña</label>
          <Input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className=""
          />
      </div>
      <div>
          <label>Confirmar nueva contraseña</label>
          <Input
            type="text"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className=""
          />

      </div>
      <button
        type="submit"
        className="w-full"
      >
        Restablecer contraseña
      </button>
      {/* {errorMessage && (
        <div className="mt-4 text-center text-red-500">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="mt-4 text-center text-green-500">{successMessage}</div>
      )} */}
    </form>
  );
}

export function ResetPassword() {
  return (
    <>

      <h2 className="mt-2 text-2xl text-center ">
Recuperación de contraseña      </h2>
      <div>
        <CreateResetPasswordForm />
      </div>
    </>
  );
}

export default ResetPassword;