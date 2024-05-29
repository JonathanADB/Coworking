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
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/UI/table"
  import { FaPlus } from "react-icons/fa";

const AdminRoomList = () => {
    const { authState } = useContext(AuthContext);
    const [rooms, setRooms] = useState([]);
    const host = import.meta.env.VITE_APP_HOST;

    useEffect(() => {
      fetch(`${host}/rooms`, {
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

  console.log(rooms);


    return (
      <div className="flex flex-col w-full">
        <div className="flex justify-between px-4 md:px-0 ">
          <h2>Espacios</h2>
          <Button variant="outline" size="icon">
            <Link to="/create-room">
              <FaPlus />
            </Link>
          </Button>
        </div>
        <section className="flex flex-col w-full mx-auto mt-8">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                {/* <TableHead className="w-[350px]">ID</TableHead> */}
                <TableHead className="w-[175px]">Nombre</TableHead>
                <TableHead className="hidden md:table-cell">
                  Descripción
                </TableHead>
                <TableHead className="w-[100px] hidden md:table-cell">
                  Capacidad
                </TableHead>
                <TableHead className="w-[100px] text-center ">Tipo</TableHead>
                {/* <TableHead>Acciones</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rooms?.map((room) => (
                <TableRow key={room?.id}>
                  {/* <TableCell className="hidden md:table-cell">{room.id}</TableCell> */}
                  <TableCell className="font-bold">
                    <Link to={`/admin/room/${room?.id}/edit`}>{room?.name}</Link>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {room?.description}
                  </TableCell>
                  <TableCell className="hidden text-center md:table-cell">
                    {room?.capacity}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="secondary"
                      className="text-center"
                    >
                      {room?.typeOf}
                    </Badge>
                  </TableCell>
                  {/* <TableCell>acciones</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>


      </div>
    );
}

export default AdminRoomList;