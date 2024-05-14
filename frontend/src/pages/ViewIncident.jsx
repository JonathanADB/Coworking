import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/label";
import { Button } from "@/components/UI/button";
import { AuthContext } from "../auth/auth-context";
import { toast } from "react-toastify";

const ViewIncident = () => {
    const { authState } = useContext(AuthContext);
    const token = authState.token;
    const [incidentData, setIncidentData] = useState({});
    const { id } = useParams();
    const incidentId = id;

    useEffect(() => {
        fetch(`http://localhost:3000/incidents/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setIncidentData(data);
          })
          .catch((error) =>
            console.error("Error al obtener los datos de la incidencia:", error)
          );
      }, [incidentId]);

      console.log(incidentData)

    return (
        <div className="flex flex-col justify-center w-full p-4">
            {incidentData && incidentData && (
                <div>
                    <h2 className="mb-8 text-xl font-bold">
                        Incidencia {incidentData.id}
                    </h2>
                    <ul className="flex flex-col gap-y-4">
                        <li>
                            <span className="font-bold">ID:</span> {incidentData.id}
                        </li>
                        <li>
                            <span className="font-bold">Descripción:</span> {incidentData.description}
                        </li>
                        <li>
                            <span className="font-bold">Estado:</span> {incidentData.status}
                        </li>
                        <li>
                            <span className="font-bold">Fecha de creación:</span> {incidentData.createdAt}
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default ViewIncident;