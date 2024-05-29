import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/button";
import { Label } from "@/components/UI/label";

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
      const response = await fetch(`${import.meta.env.VITE_APP_HOST}/forgot-password`, {
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
    <form onSubmit={handleSubmit} className="p-4 mx-auto mt-4 rounded-md ">
      <div className="mb-4">
        <Label>Correo electrónico</Label>
        <Input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Restablecer contraseña
      </Button>
    </form>
  );
}

export function ForgotPassword() {
  return (
    <div>
      <h2 className="mb-4 font-bold text-center">Olvidé mi contraseña </h2>
      <div>
        <CreateForgotPasswordForm />
      </div>
    </div>
  );
}

export default ForgotPassword;