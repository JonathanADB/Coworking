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
} from "@/components/UI/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/UI/select.jsx";
import { SelectValue } from "@radix-ui/react-select";
import { Pagination } from "@/components/Pagination.jsx";
import { FaPlus } from "react-icons/fa";

const AdminIncidentList = () => {
  const { authState } = useContext(AuthContext);
  const host = import.meta.env.VITE_APP_HOST;
  const [incidentsList, setIncidentsList] = useState([]);
  const [incidentsTotal, setIncidentsTotal]= useState([]);
  const [incidentsQueries, setIncidentsQueries] = useState({
      search: "",
    offset: 0,
    limit: 10,
    direction: "ASC",
  });

 const { search, offset, limit, direction } = incidentsQueries;


  useEffect(() => {
    fetch(`${host}/incidents`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        setIncidentsList(body.message);
      })
      .catch((error) =>
        console.error("Error al obtener los datos de las incidencias:", error)
      );
  }, []);


useEffect(() => {
    fetch(
    `${host}/incidents/searchlist?search=${search}&offset=${offset}&limit=${limit}&direction=${direction}`,
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
                setIncidentsList(body.data);
                setIncidentsTotal(body.totalResults);
            })
            .catch((error) =>
                console.error("Error al obtener los datos de las incidencias:", error)
            );
    }, [incidentsQueries]);
            

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncidentsQueries({
      ...incidentsQueries,
      [name]: value,
    });
  };


  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between px-4 md:px-0">
        <h2>Incidencias</h2>
        <Button variant="outline" size="icon">
          <Link to="/reservation/0/create-incident">
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

                <Label className="w-[150px]">Incidencias por página</Label>
                <Select
                        onValueChange={(value) => {
                        console.log({ value });
                        setIncidentsQueries((prevState) => ({
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
                            setIncidentsQueries(prevState => ({
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
             
              <TableHead>Descripción</TableHead>
              <TableHead className="w-[100px] hidden md:table-cell text-center">
                Estado
              </TableHead>
              <TableHead className="hidden md:table-cell w-[175px]">
                Espacio
              </TableHead>
              <TableHead className="hidden md:table-cell w-[100px]">
                Equipo
              </TableHead>
              {/* <TableHead>Acciones</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {incidentsList && incidentsList.length > 0? (
              incidentsList.map((incidents)=> (
              <TableRow key={incidents.id}>
                <TableCell>
                <Button variant="link" className="text-text" asChild>

                  <Link to={`/incident/${incidents.incidentId}`}>
                  {incidents.description}
                  </Link>
                  </Button>
                  </TableCell>
                <TableCell className="hidden text-center md:table-cell">
                  {incidents.status === 'pending' ? <Badge variant="secondary">Pendiente</Badge> : <Badge>Resuelta</Badge>}
                </TableCell>{" "}
                <TableCell className="hidden md:table-cell">
                  <Button variant="link" className="text-text" asChild>
                    <Link to={`/admin/room/${incidents.roomId}`}> 
                  {incidents.roomName}
                  </Link>
                  </Button>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                <Button variant="link" className="text-text" asChild>
                    <Link to={`/admin/equipment/${incidents.equipmentId}`}> 
                  {incidents.equipmentName}
                  </Link>
                  </Button>
                
                </TableCell>
                {/* Enlace al equipo */}
                {/* <TableCell>acciones</TableCell> */}
              </TableRow>
            ))
            ) : (
              <TableRow>
               <TableCell>No hay Incidencias</TableCell>
              </TableRow>
          )}

          </TableBody>
        </Table>
        <Pagination
                        totalRecords={incidentsTotal}
                        limit={limit}
                        offset={offset}
                        onPageChange={(pageNumber) => {
                            const newOffset = (pageNumber - 1) * limit;
                            setIncidentsQueries(prevState => ({
                              ...prevState,
                                offset: newOffset,
                            }));
                        }}
                    />
    </div>
  );
};

export default AdminIncidentList;
