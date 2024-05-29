import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/button";
import { Label } from "@/components/UI/label";

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
      const response = await fetch(`${import.meta.env.VITE_APP_HOST}/reset-password`, {
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
        <Label>Código de verificación</Label>
        <Input
          type="text"
          name="verification_code"
          value={formData.verification_code}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Nueva contraseña</Label>
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
        <Label>Confirmar nueva contraseña</Label>
        <Input
          type="text"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className=""
        />
      </div>
      <Button type="submit" className="w-full">
        Restablecer contraseña
      </Button>

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
        Recuperación de contraseña{" "}
      </h2>
      <div>
        <CreateResetPasswordForm />
      </div>
    </>
  );
}

export default ResetPassword;