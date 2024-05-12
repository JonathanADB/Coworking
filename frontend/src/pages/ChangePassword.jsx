import React, { useState, useContext } from "react";
import { AuthContext } from "@/auth/auth-context";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/button";
import { Label } from "@/components/UI/label";

function CreateChangePasswordForm() {
  const [formData, setFormData] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { authState } = useContext(AuthContext);

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
      const response = await fetch("http://localhost:3000/change-password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authState.token,
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
      className="flex flex-col p-4 mx-auto mt-4 rounded-md gap-y-4"
    >
      <div>
        <Label>Correo electrónico</Label>
        <Input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full"
        />
      </div>
      <div>
        <Label>Contraseña anterior</Label>
        <Input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          required
          className="w-full"
        />
      </div>
      <div>
        <Label>Nueva contraseña</Label>
        <Input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          required
          className="w-full"
        />
      </div>
      <div>
        <Label>Confirmar nueva contraseña</Label>
        <Input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full"
        />
      </div>
      <Button type="submit" className="w-full">
        Restablecer contraseña
      </Button>

      {errorMessage && (
        <div className="mt-4 text-center text-red-500">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="mt-4 text-center text-green-500">{successMessage}</div>
      )}
    </form>
  );
}

export function ChangePassword() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-center">
        Cambiar contraseña
      </h2>
      <div>
        <CreateChangePasswordForm />
      </div>
    </div>
  );
}

export default ChangePassword;