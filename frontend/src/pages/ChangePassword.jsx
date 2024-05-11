import React, { useState } from "react";
import Input from "../components/UI/Input";

function CreateChangePasswordForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
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
      const response = await fetch("http://localhost:3000/change-password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("AUTH_TOKEN"),
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
          <label>Correo electrónico</label>
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
          <label>Contraseña anterior</label>
          <Input
            type="text"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            required
            className="w-full"
          />

      </div>
      <div>

          <label>Nueva contraseña</label>
          <Input
            type="text"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            className="w-full"
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
            className="w-full"
          />

   
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 font-bold text-white bg-black rounded"
      >
        Restablecer contraseña
      </button>
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
    <div
    >

      <h2 className="mb-4 text-2xl font-bold text-center">
Cambiar contraseña      </h2>
      <div>
        <CreateChangePasswordForm />
      </div>
    </div>
  );
}

export default ChangePassword;