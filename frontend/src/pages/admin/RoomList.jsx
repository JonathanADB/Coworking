import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/UI/select.jsx";
import { SelectValue } from "@radix-ui/react-select";
import { FaPlus } from "react-icons/fa";
import { Pagination } from "@/components/Pagination.jsx";


 const AdminRoomList = () => {
    const { authState } = useContext(AuthContext);
    const host = import.meta.env.VITE_APP_HOST;
    const [roomsList, setRoomsList] = useState([]);
    const [roomsTotal, setRoomsTotal]= useState([]);
    const [roomsQueries, setRoomsQueries] = useState({
    search: "",
    offset: 0,
    limit: 10,
    direction: "ASC",
  });   

 const { search, offset, limit, direction } = roomsQueries;

  useEffect(() => {
    fetch(`${host}/rooms`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: authState.token,
            },
        })
            .then((res) => res.json())
            .then((body) => {
                setRoomsList(body.message);
            })
            .catch((error) =>
                console.error("Error al obtener los datos de las incidencias:", error)
            );
    }, []);


useEffect(() => {
    fetch(
    `${host}/rooms/searchlist?search=${search}&offset=${offset}&limit=${limit}&direction=${direction}`,
        {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: authState.token,
            },
        }
    )
            .then((res) => res.json())
            .then((body) => { 
                setRoomsList(body.data);
                setRoomsTotal(body.totalResults);
            })
            .catch((error) =>
                console.error("Error al obtener los datos de las incidencias:", error)
            );
    }, [roomsQueries]);
            

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomsQueries({
      ...roomsQueries,
      [name]: value,
    });
  };


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

            <div className="flex px-4 flex-col md:flex-row md:px-0 gap-1.5 items-center w-full justify-between mb-4">
                <Input
                    type="search"
                    name="search"
                    className="w-1/3"
                    placeholder="Busca un espacio"
                    onChange={handleChange}
                />

                <div className="flex flex-row items-center">

                <Label className="w-[150px]">Espacios por página</Label>
                <Select
                        onValueChange={(value) => {
                        console.log({ value });
                        setRoomsQueries((prevState) => ({
                        ...prevState,
                        limit: value,
                        }));
                    }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="10" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-row items-center gap-x-4">
                    <Label>Orden</Label>
                    <Select
                        onValueChange={(value) =>
                            setRoomsQueries(prevState => ({
                               ...prevState,
                                direction: value,
                            }))
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Ascendente" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ASC">Ascendente</SelectItem>
                            <SelectItem value="DESC">Descendente</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[175px]">Nombre</TableHead>
                        <TableHead className="hidden md:table-cell">
                            Descripción
                        </TableHead>
                        <TableHead className="w-[100px] hidden md:table-cell">
                            Capacidad
                        </TableHead>
                        <TableHead className="w-[100px] text-center ">Tipo</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {roomsList && roomsList.length > 0? (
                        roomsList.map((rooms) => (
                            <TableRow key={rooms.id}>
                                <TableCell className="font-bold">
                                    <Link to={`/admin/room/${rooms?.id}/edit`}>{rooms?.name}</Link>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {rooms?.description}
                                </TableCell>
                                <TableCell className="hidden text-center md:table-cell">
                                    {rooms?.capacity}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge
                                        variant="secondary"
                                        className="text-center"
                                    >
                                        {rooms?.typeOf}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell>No hay espacios</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <Pagination
                totalRecords={roomsTotal}
                limit={limit}
                offset={offset}
                onPageChange={(pageNumber) => {
                    const newOffset = (pageNumber - 1) * limit;
                    setRoomsQueries(prevState => ({
                       ...prevState,
                        offset: newOffset,
                    }));
                }}
            />
        </div>
    );
};

export default AdminRoomList;