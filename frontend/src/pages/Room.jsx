import React, { useState, useContext } from "react";
import { Input } from "@/components/UI/Input";
import { AuthContext } from "../auth/auth-context";
import { toast } from "react-toastify";
import { Button } from "@/components/UI/button";
import { Label } from "@/components/UI/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";

function CreateRoomForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    capacity: 1,
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
    toast.success("Sala creada correctamente");
  };

  console.log("Form data:", formData);

  return (
    <div className="flex flex-col justify-center w-full ">
      <form className="flex flex-col px-1 my-4 gap-y-4" onSubmit={handleSubmit}>
        <div>
          <Label>Nombre</Label>
          <Input
            type="text"
            name="name"
            placeholder="Nombre de la habitación"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Descripción</Label>
          <Input
            type="text"
            name="description"
            placeholder="Descripción de la habitación"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Capacidad</Label>
          <Input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            min="1"
            max="256"
            required
          />
        </div>

        <div>
          <Label>Tipo</Label>
          <Select         onValueChange={(value) => setFormData(prevState => ({ ...prevState, typeOf: value }))}
>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un tipo de habitación" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pública">Pública</SelectItem>
              <SelectItem value="Privada">Privada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </form>
      <Button onClick={handleSubmit} className="w-full" type="submit">
        Crear habitación
      </Button>
    </div>
  );
}

function CreateRoom() {
  const handleCreateRoom = async (roomData) => {
    const { authState } = useContext(AuthContext);
    const token = authState.token;
    console.log("Token:", token);
    try {
      const response = await fetch("http://localhost:3000/create-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(roomData),
      });

      if (!response.ok) {
        console.error("Error en la solicitud:", error);
        toast.error("Error en la solicitud");
        return;
      }

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();

        if (data.success) {
        } else {
          console.error("Error del servidor:");
          toast.error("Error del servidor");
        }
      } else {
        console.error("La respuesta no es JSON válida.");
        toast.error("La respuesta no es JSON válida.");
      }
    } catch (error) {
      // Maneja errores en la solicitud
      console.error("Error al crear habitación:", error);
      toast.error(`Error al crear habitación: ${error}`);
    }
  };

  return (
    <div className="flex flex-col justify-center p-4 ">
      <h2 className="text-center">Crear nueva habitación</h2>
      <CreateRoomForm onSubmit={handleCreateRoom} />
    </div>
  );
}

export default CreateRoom;