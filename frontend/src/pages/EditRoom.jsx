import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../auth/auth-context";
import Input from "../components/UI/Input";

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

  // Obtiene el parámetro roomId de la URL
  const { roomId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/room/${roomId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((roomData) => {
        setRoomData(roomData);
        console.log(roomData);
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
        if (response.ok) {
          console.log(roomData);
        } else {
          throw new Error("Error al actualizar los datos de la habitación.");
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
        <label>Id</label>
        <Input
          type="text"
          name="id"
          placeholder="Id del espacio"
          value={roomData.id}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Nombre</label>
        <Input
          type="text"
          name="name"
          placeholder="Nombre del espacio"
          value={roomData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Descripción</label>
        <Input
          type="text"
          name="description"
          placeholder="Descripción del espacio"
          value={roomData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Capacidad</label>
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
        <label>Tipo</label>
        <select
          name="typeOf"
          className="flex w-full h-10 px-1 bg-transparent border border-gray-400 rounded-md outline-none outline-offset-0"
          value={roomData.typeOf}
          onChange={handleChange}
        >
          <option value="">Selecciona una opción</option>
          <option value="Pública">Pública</option>
          <option value="Privada">Privada</option>
        </select>
      </div>
      <button type="submit" className="w-full">
        Guardar cambios
      </button>
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
