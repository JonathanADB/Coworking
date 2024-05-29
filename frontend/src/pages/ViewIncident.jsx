import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/label";
import { Button } from "@/components/UI/button";
import { Badge } from "@/components/UI/badge";
import { AuthContext } from "../auth/auth-context";
import { toast } from "react-toastify";
import { FaPlus, FaTrash } from "react-icons/fa";
import { formatDateTime } from "@/utils/formatDate";

const ViewIncident = () => {
  const { authState } = useContext(AuthContext);
  const token = authState.token;
  const [incidentData, setIncidentData] = useState({});
  const { id } = useParams();
  const host = import.meta.env.VITE_APP_HOST;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${host}/incidents/${id}`, {
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
  }, [id]);

  const handleIncidentResolve = () => {
    fetch(`${host}/incidents/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ status: "resolved" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          return toast.error(data.error.message);
        } else {
          toast.success("Incidencia resuelta correctamente");
          setIncidentData({
            ...incidentData,
            status: "resolved",
            updatedAt: data.updatedAt,
          });
        }
      })
      .catch((error) =>
        console.error("Error al resolver la incidencia:", error)
      );
  };

  const handleIncidentDeletion = () => {
    fetch(`${host}/incidents/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          return toast.error(data.error.message);
        } else {
          navigate("/admin/incidents");
          toast.success("Incidencia eliminada correctamente");
        }
      })
      .catch((error) =>
        console.error("Error al eliminar la incidencia:", error)
      );
  };

  console.log(incidentData);

  if (!incidentData || incidentData.error) {
    return null;
  }

  return (
    <div className="flex flex-col w-full">
      {incidentData && incidentData && (
        <div>
          <div className="flex justify-between px-4 md:px-0">
            <h2>Incidencia</h2>
            {authState.user.role === "admin" && (
              <div className="flex items-center gap-x-2">
                <Button onClick={handleIncidentResolve}>
                  Marcar incidencia como resuelta
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={handleIncidentDeletion}
                >
                  <FaTrash />
                </Button>
              </div>
            )}
          </div>
          <ul className="flex flex-col gap-y-4">
            <li>
              <span className="font-bold">Descripción:</span>{" "}
              {incidentData.description}
            </li>
            <li>
              <span className="font-bold">Estado:</span>{" "}
              {incidentData.status === "pending" ? (
                <Badge variant="secondary">Pendiente</Badge>
              ) : (
                <Badge>Resuelta</Badge>
              )}
            </li>
            <li>
              <span className="font-bold">Fecha de creación:</span>{" "}
              {formatDateTime(incidentData.createdAt)}
            </li>
            <li>
              <span className="font-bold">Fecha de resolución:</span>{" "}
              {formatDateTime(incidentData.updatedAt)}
            </li>
            <li>
              <span className="font-bold">Sala:</span>{" "}
              <Link to={`/rooms/${incidentData.roomId}`}>
                {incidentData.roomName}
              </Link>
            </li>
            <li>
              <span className="font-bold">Equipo:</span>{" "}
              <Link to={`/equipment/${incidentData.equipmentId}`}>
                {incidentData.equipmentName}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewIncident;
