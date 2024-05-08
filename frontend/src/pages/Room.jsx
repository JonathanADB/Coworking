import React from "react";
import { toast } from "react-toastify";
import { CreateRoomForm } from "./CreateRoomForm.jsx";

export function CreateRoom() {
  const handleCreateRoom = async (roomData) => {
    console.log(roomData);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1NGNmZWUyLWNlM2QtNDA2MC04MTdjLTYxZDhlNTBkMTA1OCIsInVzZXJuYW1lIjoiQWRtaW4iLCJlbWFpbCI6ImFkbWluQGNvd29ya2luZy5jb20iLCJpYXQiOjE3MTUxMTMyMzQsImV4cCI6MTcxNTM3MjQzNH0.kBDi6vYMBjWsmGk8pURUlBOBOL8ezj3zRDWgzcZpayM";
    localStorage.setItem("AUTH_TOKEN", token);
    try {
      const response = await fetch("http://localhost:3000/create-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("AUTH_TOKEN"),
        },
        body: JSON.stringify(roomData),
      });

      if (!response.ok) {
        console.error("Error en la solicitud:");
        return;
      }

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();

        // Maneja la respuesta del servidor
        //console.log(data);

        if (data.success) {
          toast.success("Sala creada correctamente.");
        } else {
          console.error("Error del servidor:");
        }
      } else {
        console.error("La respuesta no es JSON válida.");
      }
    } catch (error) {
      // Maneja errores en la solicitud
      console.error("Error al crear habitación:", error);
    }
  };

  return (
    <div>
      <h2>Crear nueva habitación</h2>
      <CreateRoomForm onSubmit={handleCreateRoom} />
    </div>
  );
}

export default CreateRoom;
