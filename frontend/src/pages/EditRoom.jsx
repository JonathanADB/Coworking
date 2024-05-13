import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../auth/auth-context";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/button";
import { Label } from "@/components/UI/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/UI/select";
import { toast } from "react-toastify";
import { Textarea } from "@/components/UI/textarea"

function CreateEditRoomForm() {
  const { authState } = useContext(AuthContext);
  const token = authState.token;

  const [roomData, setRoomData] = useState({
    roomId: "",
    name: "",
    description: "",
    capacity: 1,
    typeOf: "",
  });

  const { id } = useParams();
  const roomId = id;

  useEffect(() => {
    fetch(`http://localhost:3000/room/${roomId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((roomData) => {
        setRoomData(roomData.message);
      })
      .catch((error) =>
        console.error("Error al obtener los datos de la habitación:", error)
      );
  }, [roomId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData({
      ...roomData,
      [name]: value,
    });
  };

  const handleUpdateRoom = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/room/${roomId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(roomData),
    })
      .then((response) => {

        if (!response.ok) {
          toast.error("Error al actualizar los datos de la habitación.");
        } else {
         
          toast.success("Datos de la habitación actualizados correctamente");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form
      onSubmit={handleUpdateRoom}
      className="flex flex-col p-4 mx-auto mt-4 rounded-md gap-y-4"
    >
      <div>
        <Label>Id</Label>
        <Input
          type="text"
          name="id"
          placeholder={roomData.id}
          value={roomData.id}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label>Nombre</Label>
        <Input
          type="text"
          name="name"
          placeholder="Nombre del espacio"
          value={roomData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label>Descripción</Label>
        <Textarea
          type="text"
          name="description"
          placeholder="Descripción del espacio"
          value={roomData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label>Capacidad</Label>
        <Input
          type="number"
          name="capacity"
          value={roomData.capacity}
          onChange={handleChange}
          min="1"
          max="256"
        />
      </div>
      <div>
        <Label>Tipo</Label>
        <Select 
        value={roomData.typeOf} 
        onValueChange={(value) => setRoomData(prevState => ({ ...prevState, typeOf: value }))}
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
      <Button type="submit" className="w-full">
        Guardar cambios
      </Button>
    </form>
  );
}

export function EditRoom() {
  return (
    <>
      <h2 className="mt-2 text-2xl text-center ">Editar espacio </h2>
      <div>
        <CreateEditRoomForm />
      </div>
    </>
  );
}

export default EditRoom;