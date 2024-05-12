import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../auth/auth-context";

function ViewRoom() {
  const { authState } = useContext(AuthContext);
  const token = authState.token;
  const [roomData, setRoomData] = useState({});
  const { roomId } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3000/room/${roomId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRoomData(data);
      })
      .catch((error) =>
        console.error("Error al obtener los datos de la habitación:", error)
      );
  }, [roomId]);
  return (
    <div className="text-center">
      {roomData && roomData.message && (
        <div>
          <h2 className="text-xl font-bold mb-8">
            Espacio {roomData.message.name}
          </h2>
          <ul className="grid grid-cols-1 gap-4 list-none">
            <li
              style={{ borderBottom: "1px solid #ccc", paddingBottom: "8px" }}
            >
              <span className="font-bold">ID:</span> {roomData.message.id}
            </li>
            <li
              style={{ borderBottom: "1px solid #ccc", paddingBottom: "8px" }}
            >
              <span className="font-bold">Descripción:</span>{" "}
              {roomData.message.description}
            </li>
            <li
              style={{ borderBottom: "1px solid #ccc", paddingBottom: "8px" }}
            >
              <span className="font-bold">Capacidad:</span>{" "}
              {roomData.message.capacity}
            </li>
            <li
              style={{ borderBottom: "1px solid #ccc", paddingBottom: "8px" }}
            >
              <span className="font-bold">Tipo:</span> {roomData.message.typeOf}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ViewRoom;
