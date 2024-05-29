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
import { Textarea } from "@/components/UI/textarea";

function CreateRoomForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    capacity: 1,
    typeOf: "",
  });

  const { authState } = useContext(AuthContext);

  formData.capacity = Number(formData.capacity);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.capacity || !formData.typeOf) {
      toast.error("Todos los cambos son obligatorios");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_HOST}/create-room`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authState.token,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('No se ha podido crear la sala');
      }

      toast.success("Sala creada correctamente");

    } catch (error) {
      console.error("Error al crear la sala:", error);
      toast.error("Error al crear la sala");
    }
      
  };

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
          <Textarea
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
          <Select
            onValueChange={(value) =>
              setFormData((prevState) => ({ ...prevState, typeOf: value }))
            }
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
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_HOST}/create-room`, {
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

        if (response.ok) {
        } else {
          console.error("Error del servidor:");
          toast.error("Error del servidor");
        }
      } else {
        console.error("La respuesta no es JSON válida.");
        toast.error("La respuesta no es JSON válida.");
      }
    } catch (error) {
      console.error("Error al crear habitación:", error);
      toast.error(`Error al crear habitación: ${error}`);
    }
  };

  return (
    <div className="flex flex-col w-full px-4 md:px-0">
      <h2>Crear nuevo espacio</h2>
      <CreateRoomForm onSubmit={handleCreateRoom} />
    </div>
  );
}

export default CreateRoom;
