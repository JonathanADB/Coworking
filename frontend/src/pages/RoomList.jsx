import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/auth-context";

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
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {rooms && rooms.length > 0 ? (
          rooms.map((room) => (
            <li key={room.id} className="border p-4 rounded-md flex flex-col">
              <p className="text-xl font-semibold mb-2">{room.name}</p>
              <div className="flex flex-row justify-center gap-4">
                <Link to={`/view-room/${room.id}`}>
                  <button>Mostrar espacio</button>
                </Link>
                <Link to={`/edit-room/${room.id}`}>
                  <button>Editar espacio</button>
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
