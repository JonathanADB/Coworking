import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/auth-context";
import { Button } from "@/components/UI/button";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const { authState } = useContext(AuthContext);
  const token = authState.token;

  useEffect(() => {
    fetch("http://localhost:3000/rooms", {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setRooms(data.message));
  }, []);

  return (
    <div>
      <h2 className="text-center">Lista de espacios</h2>
      <ul className="p-4 mt-8 space-y-4">
        {rooms && rooms.length > 0 ? (
          rooms.map((room) => (
            <li key={room.id} className="flex flex-col p-4 border rounded-md border-primary">
              <p className="mb-2 text-xl font-semibold">{room.name}</p>
              <div className="flex flex-row justify-center gap-4">
                <Link to={`/room/${room.id}`}>
                  <Button>Mostrar espacio</Button>
                </Link>
                <Link to={`/edit-room/${room.id}`}>
                  <Button variant="secondary">Editar espacio</Button>
                </Link>
              </div>
            </li>
          ))
        ) : (
          <p>No existen espacios</p>
        )}
      </ul>
    </div>
  );
};

export default RoomList;