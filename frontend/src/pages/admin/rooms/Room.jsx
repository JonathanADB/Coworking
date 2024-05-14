import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/label";
import { Button } from "@/components/UI/button";
import { Badge } from "@/components/UI/badge";
import { AuthContext } from "@/auth/auth-context";

const Room = () => {
    const { authState } = useContext(AuthContext);
    const [room, setRoom] = useState([]);
    const { id } = useParams();
    const roomId = id;

    useEffect(() => {
        fetch(`http://localhost:3000/room/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: authState.token,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setRoom(data.message);
            })
            .catch((error) =>
                console.error("Error al obtener los datos de la sala:", error)
            );
    }, [roomId]);

    console.log(room)

    return (
        <div className="flex flex-col justify-center w-full p-4">
            {room && room && (
                <div>
                    <h2 className="mb-8 text-xl font-bold">
                        Sala {room.name}
                    </h2>
                    <ul className="flex flex-col gap-y-4">
                        <li>
                            <span className="font-bold">ID:</span> {room.id}
                        </li>
                        <li>
                            <span className="font-bold">Nombre:</span> {room.name}
                        </li>
                        <li>
                            <span className="font-bold">Descripción:</span> {room.description}
                        </li>
                        <li>
                            <span className="font-bold">Capacidad:</span> {room.capacity}
                        </li>
                        <li>
                            <span className="font-bold">Tipo:</span> {room.typeOf}
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )

};

export default Room;