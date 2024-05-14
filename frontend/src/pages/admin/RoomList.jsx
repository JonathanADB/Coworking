import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/label";
import { Button } from "@/components/UI/button";
import { Badge } from "@/components/UI/badge";
import { AuthContext } from "@/auth/auth-context";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/UI/table"

const AdminRoomList = () => {
    const { authState } = useContext(AuthContext);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/rooms", {
            headers: {
                "Content-Type": "application/json",
                Authorization: authState.token,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setRooms(data.message);
            })
            .catch((error) =>
                console.error("Error al obtener los datos de las incidencias:", error)
            );
    }, []);

    console.log(rooms)

    return (
      <div className="flex flex-col">

        <Table className="w-fit">
          <TableCaption>Lita de incidencias recientes</TableCaption>
          <TableHeader>
            <TableRow>
              {/* <TableHead className="w-[350px]">ID</TableHead> */}
              <TableHead className="w-[200px]">Nombre</TableHead>
              <TableHead className="w-[450px]">Descripción</TableHead>
              <TableHead className="w-[100px]">Capacidad</TableHead>
              <TableHead className="w-[100px] text-center">Tipo</TableHead>
              {/* <TableHead>Acciones</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>

          {rooms.map((room) => (
                <TableRow key={room.id}>
                    {/* <TableCell className="hidden md:table-cell">{room.id}</TableCell> */}
                    <TableCell className="font-bold">
                      <Link to={`/admin/room/${room.id}`}>
                      {room.name}
                      </Link>
                      </TableCell>
                    <TableCell>{room.description}</TableCell>
                    <TableCell className="text-center">{room.capacity}</TableCell>
                    <TableCell><Badge variant="outline" className="text-center bg-secondary">{room.typeOf}</Badge></TableCell>
                    {/* <TableCell>acciones</TableCell> */}
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </div>
    );
}

export default AdminRoomList;