import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "@/auth/auth-context";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/table";
import { toast } from "react-toastify";
import { Input } from "@/components/UI/Input.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/UI/select.jsx";
import { SelectValue } from "@radix-ui/react-select";
import { Label } from "@/components/UI/label.jsx";
import { Button } from "@/components/UI/button.jsx";
import { Pagination } from "@/components/Pagination.jsx";
import { Badge } from "@/components/UI/badge";
import { formatDate } from "@/utils/formatDate";

export function UsersListAdmin() {
  const { authState } = useContext(AuthContext);
  const host = import.meta.env.VITE_APP_HOST;
  const [usersList, setUsersList] = useState([]);
  const [usersTotal, setUsersTotal] = useState();
  const [usersQueries, setUsersQueries] = useState({
    search: "",
    offset: 0,
    limit: 10,
    direction: "ASC",
  });
  const { search, offset, limit, direction } = usersQueries;

  useEffect(() => {
    fetch(
      `${host}/admin/users?search=${search}&offset=${offset}&limit=${limit}&direction=${direction}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authState.token,
        },
      }
    )
      .then((res) => res.json())
      .then((body) => {
        setUsersList(body.data);
        setUsersTotal(body.totalResults);
      })
      .catch((error) =>
        toast.error("Error al obtener los datos del equipamiento:", error)
      );
  }, [usersQueries]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsersQueries({
      ...usersQueries,
      [name]: value,
    });
  };
  return (
    <div className="flex flex-col w-full px-4 md:px-0">
      <div className="flex justify-between mb-4 ">
        <h2>Usuarios</h2>
      </div>

      <div className="flex px-4 flex-col md:flex-row md:px-0 gap-1.5 items-center w-full justify-between mb-4">
        <Input
          className="md:w-[400px]"
          type="search"
          name="search"
          placeholder="Busca un usuario"
          onChange={handleChange}
        />

        <div className="flex flex-row items-center">
          <Label className="w-[150px]">Usuarios por página</Label>
          <Select
            onValueChange={(value) =>
              setUsersQueries((prevState) => ({
                ...prevState,
                limit: value,
              }))
            }
          >
            <SelectTrigger className="w-[75px]">
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
              setUsersQueries((prevState) => ({
                ...prevState,
                direction: value,
              }))
            }
          >
            <SelectTrigger className="w-[130px]">
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
            <TableHead className="w-[200px]">Nombre de usuario</TableHead>
            <TableHead className="hidden md:table-cell">Nombre</TableHead>
            <TableHead className="min-w-[200px] hidden md:table-cell">
              Correo electrónico
            </TableHead>
            <TableHead className="w-[50px] hidden md:table-cell">
              Verificado
            </TableHead>
            <TableHead className="w-[50px] md:text-center">Rol</TableHead>
            <TableHead className="w-[200px] hidden md:table-cell">
              Creado
            </TableHead>
            <TableHead className="w-[200px] hidden md:table-cell">
              Última modificación
            </TableHead>
            {/* <TableHead></TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersList && usersList.length > 0 ? (
            usersList.map((user) => (
              <TableRow key={user.id}>
                <Link to={`/admin/users/${user.id}`}>
                  <TableCell className="font-bold">{user.username}</TableCell>
                </Link>
                <TableCell className="hidden md:table-cell">
                  {user.firstName ? user.firstName : "---"}{" "}
                  {user.lastName ? user.lastName : "---"}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {user.email}
                </TableCell>
                <TableCell className="hidden text-center md:table-cell">
                  {user.verified ? "Sí" : "No"}
                </TableCell>

                <TableCell>
                  {user?.role === "admin" ? (
                    <Badge>Admin</Badge>
                  ) : (
                    <Badge variant="secondary">Cliente</Badge>
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatDate(user.createdAt)}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatDate(user.updatedAt)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>No hay usuarios</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        totalRecords={usersTotal}
        limit={limit}
        offset={offset}
        onPageChange={(pageNumber) => {
          const newOffset = (pageNumber - 1) * limit;

          setEquipmentQueries((prevState) => ({
            ...prevState,
            offset: newOffset,
          }));
        }}
      />
    </div>
  );
}
