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
              <TableHead className="w-[100px] hidden md:table-cell">ID</TableHead>
              <TableHead className="w-[150px] hidden md:table-cell">Estado</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="hidden md:table-cell">Habitación</TableHead>
              <TableHead className="hidden md:table-cell">Equipo</TableHead>
              {/* <TableHead>Acciones</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>

          {incidents.map((incident) => (
                <TableRow key={incident.incidentId}>
                    <TableCell className="hidden md:table-cell">{incident.incidentId}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge>{incident.status === 'pending' ? 'Pendiente' : 'Resuelta'}</Badge>
                    </TableCell>                    <TableCell>{incident.description}</TableCell>
                    <TableCell className="hidden md:table-cell">{incident.roomName}</TableCell>
                    <TableCell className="hidden md:table-cell">{incident.equipmentName}</TableCell>
                    {/* <TableCell>acciones</TableCell> */}
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </div>
    );
}

export default AdminIncidentList;