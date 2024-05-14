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

const AdminIncidentList = () => {
    const { authState } = useContext(AuthContext);
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/incidents", {
            headers: {
                "Content-Type": "application/json",
                Authorization: authState.token,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setIncidents(data);
            })
            .catch((error) =>
                console.error("Error al obtener los datos de las incidencias:", error)
            );
    }, []);

    return (
      <div className="flex flex-col">

        <Table>
          <TableCaption>Lita de incidencias recientes</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] hidden md:block">ID</TableHead>
              <TableHead className="w-[150px] hidden md:block">Estado</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="hidden md:block">Habitación</TableHead>
              <TableHead className="hidden md:block">Equipo</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

          {incidents.map((incident) => (
                <TableRow key={incident.id}>
                    <TableCell className="hidden md:block">{incident.incidentId}</TableCell>
                    <TableCell className="hidden md:block">{incident.incidentStatus ? <Badge>Completada</Badge> : <Badge>Sin completar</Badge>}</TableCell>
                    <TableCell>{incident.description}</TableCell>
                    <TableCell className="hidden md:block">{incident.roomName}</TableCell>
                    <TableCell className="hidden md:block">{incident.equipmentName}</TableCell>
                    <TableCell>acciones</TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </div>
    );
}

export default AdminIncidentList;