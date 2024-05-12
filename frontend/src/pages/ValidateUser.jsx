import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/UI/button";
import { Label } from "@/components/UI/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/UI/input-otp";

function CreateValidateUserForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    code: "",
  });

  const navigate = useNavigate();

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
      className="max-w-md p-4 mx-auto mt-4 rounded-md"
    >
      <div className="mb-0">
        <Label>Código de verificación</Label>

        <div className="mx-auto w-fit">
          <InputOTP
            maxLength={6}
            value={formData.code}
            onChange={(value) =>
              setFormData((prevState) => ({ ...prevState, code: value }))
            }
            required
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

      </div>

      <Button type="submit" className="w-full my-8 mt-2">
        Validar usuario
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

export function ValidateUser() {
  return (
    <>
      <h2 className="mt-2 text-center">Validación de usuario</h2>
      <CreateValidateUserForm />
    </>
  );
}

export default ValidateUser;