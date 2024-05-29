import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "@/auth/auth-context";
import { Calendar } from "@/components/UI/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import { es } from "date-fns/locale";
import { toast } from "react-toastify";
import { Button } from "@/components/UI/button";
import { formatReservation } from "@/utils/formatDate";

const CreateReservation = () => {
  const { authState } = useContext(AuthContext);
  const host = import.meta.env.VITE_APP_HOST;
  const navigate = useNavigate();
  const { id } = useParams();

  const currentDate = new Date();
  const [room, setRoom] = useState(null);
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    fetch(`${host}/room/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRoom(data.message);
      })
      .catch((error) =>
        console.error("Error al obtener los datos del espacio:", error)
      );
  }, [id]);

  const handleDateSelect = (selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      setStartTime(null);
      setEndTime(null);
    }
  };

  const handleStartTimeSelect = (selectedTime) => {
    setStartTime(selectedTime);
    if (!endTime || endTime <= selectedTime) {
      setEndTime(selectedTime + 1);
    }
  };

  const handleEndTimeSelect = (selectedTime) => {
    setEndTime(selectedTime);
  };

  let hours = Array.from({ length: 15 }, (_, i) => i + 8);

  if (currentDate.getDate() === date?.getDate()) {
    hours = hours.filter((hour) => hour > currentDate.getHours());
  }

  //revisar despues de las 22h no muestra selects

  // Efecto para cargar las franjas horarias disponibles de un roomId en una reserva, en caso de estar lleno, deshabilitar el día/hora del calendario y darle las demás opciones al usuario

  //cancelar segun el tipo de sala

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedReservationData = {
      roomId: id,
      reservationDateBeg: formatReservation(date, startTime),
      reservationDateEnd: formatReservation(date, endTime),
    };

    try {
      const response = await fetch(`${host}/reservation/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authState.token,
        },
        body: JSON.stringify(formattedReservationData),
      });

      if (response.ok) {
        toast.success("Reserva creada con éxito");
        navigate("/reservations");
      } 
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="relative flex flex-col justify-center p-4 lg:justify-normal">

      <h2>{room?.name}</h2>
      <Calendar
        mode="single"
        locale={es}
        selected={date}
        fromDate={new Date()}
        toMonth={
          new Date(currentDate.getFullYear(), currentDate.getMonth() + 3)
        }
        onSelect={handleDateSelect}
        className="mx-auto my-4 border rounded-md h-fit w-fit"
      />

      <section className="flex flex-row justify-between my-4 lg:flex-col">

        <Select onValueChange={handleStartTimeSelect} disabled={date === null}>
          <SelectTrigger className="w-[175px]">
            <SelectValue
              placeholder={
                startTime !== null
                  ? `${startTime?.toString().padStart(2, "0")}:00`
                  : "Hora de entrada"
              }
            >
              {startTime !== null
                ? `${startTime?.toString().padStart(2, "0")}:00`
                : "Hora de entrada"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {hours.slice(0, -1).map((hour) => {
              const hourString = hour.toString().padStart(2, "0");
              return (
                <SelectItem key={hour} value={hour}>
                  {hourString}:00
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <Select
          onValueChange={handleEndTimeSelect}
          disabled={startTime === null}
        >
          <SelectTrigger className="w-[175px]">
            <SelectValue
              placeholder={
                endTime !== null
                  ? `${endTime?.toString().padStart(2, "0")}:00`
                  : "Hora de salida"
              }
            >
              {endTime !== null
                ? `${endTime?.toString().padStart(2, "0")}:00`
                : null}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {hours
              .slice(1)
              .filter((hour) => hour > startTime)
              .map((hour) => {
                const hourString = hour.toString().padStart(2, "0");
                return (
                  <SelectItem key={hour} value={hour}>
                    {hourString}:00
                  </SelectItem>
                );
              })}
          </SelectContent>
        </Select>

      </section>

      <Button onClick={handleSubmit} className="sticky mx-auto bottom-4 w-fit">
        Confirmar
      </Button>

    </div>
  );
};

export default CreateReservation;
