import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/label";
import { Button } from "@/components/UI/button";
import { Textarea } from "@/components/UI/textarea";
import { AuthContext } from "@/auth/auth-context";
import { DataContext } from "@/components/DataContext";
import { toast } from "react-toastify";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/UI/select";

const CreateIncident = () => {
  const { authState } = useContext(AuthContext);
  const { rooms } = useContext(DataContext);
  const { id } = useParams();
  const host = import.meta.env.VITE_APP_HOST;
  const [reservation, setReservation] = useState(null);
  const [equipment, setEquipment] = useState([]);
  const [incident, setIncident] = useState({
    roomId: "",
    userId: authState.user.id,
    equipmentId: "",
    description: "",
  });

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await fetch(
          `${host}/reservations/by-reservationId/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authState.token,
            },
          }
        );

        if (!response.ok) {
          throw new Error("No se ha podido cargar la reserva");
        }

        const data = await response.json();
        console.log(data);
        setReservation(data.reservation);

        setIncident((prevIncident) => ({
          ...prevIncident,
          roomId: reservation?.roomId,
        }));
      } catch (error) {
        console.error("Error al cargar la reserva:", error);
      }
    };
    fetchReservation();
  }, [id, authState.token]);

  useEffect(() => {
    fetch(`${host}/rooms/${incident?.roomId}/equipment`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        setEquipment(body.equipment);
      })
      .catch((error) =>
        console.error("Error al obtener los datos de las reseñas:", error)
      );
  }, [incident.roomId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncident({
      ...incident,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !incident.roomId ||
      !incident.userId ||
      !incident.equipmentId ||
      !incident.description
    ) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await fetch(`${host}/incidents/${id}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authState.token,
        },
        body: JSON.stringify(incident),
      });

            if (!response.ok) {
                toast.Error('No se ha podido crear la incidencia');
            }

      toast.success("Incidencia creada correctamente");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <h2>Crear incidencia</h2>
        <form>
          <div>
            <Label>Descripción</Label>
            <Textarea
              name="description"
              value={incident?.description}
              onChange={handleChange}
              placeholder={
                authState.user.role === "admin"
                  ? "Describe la incidencia con el equipo"
                  : "Describe el problema durante tu reserva"
              }
              required
            />
          </div>
          {console.log(incident)}
          {authState.user.role === "admin" && (
            <div>
              <Label>Espacio</Label>
              <Select
                onValueChange={(value) =>
                  setIncident((prevIncident) => ({
                    ...prevIncident,
                    roomId: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el espacio" />
                </SelectTrigger>
                <SelectContent>
                  {rooms?.map((room) => (
                    <SelectItem key={room.id} value={room.id}>
                      {room.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label>Equipo</Label>
            <Select
              disabled={
                authState.user.role === "admin" && !incident.roomId
                  ? true
                  : false
              }
              onValueChange={(value) =>
                setIncident((prevIncident) => ({
                  ...prevIncident,
                  equipmentId: value,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el equipo" />
              </SelectTrigger>
              <SelectContent>
                {equipment?.map((equip) => (
                  <SelectItem key={equip.id} value={equip.id}>
                    {equip.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Foto</Label>
            <Input type="file" name="image" onChange={handleChange} disabled />
          </div>
          {/* Añadir input para imagen */}
          <Button type="submit" onClick={handleSubmit} className="w-full my-4">
            Crear incidencia
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateIncident;
