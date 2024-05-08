import { useState } from "react";
import { toast } from "react-toastify";
import { handleChange } from "../components/handleChange.js";
import { RoomForm } from "./roomForm.jsx";

export function CreateRoomForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    capacity: "",
    typeOf: "",
  });

  formData.capacity = Number(formData.capacity);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.capacity ||
      !formData.typeOf
    ) {
      toast.error("Todos los cambos son obligatorios");
      return;
    }
    // Llama a la función de envío desde el componente padre
    onSubmit(formData);
  };
  return (
    <RoomForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formData={formData}
    />
  );
}
