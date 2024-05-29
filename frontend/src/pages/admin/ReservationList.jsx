import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
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
} from "@/components/UI/table";
import { formatDateTime, formatTime } from "@/utils/formatDate";

const AdminReservationList = () => {
  const { authState } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const host = import.meta.env.VITE_APP_HOST;

  useEffect(() => {
    fetch(`${host}/reservations`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        setReservations(body.reservations);
      })
      .catch((error) =>
        console.error("Error al obtener los datos de las reservas:", error)
      );
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between px-4 md:px-0">
        <h2>Reservas</h2>
      </div>
      <section className="flex flex-col w-full mx-auto mt-8">
        <Table className="w-full">
          {/* <TableCaption>Lita de incidencias recientes</TableCaption> */}
          <TableHeader>
            <TableRow> 
              <TableHead className="w-[200px]">Fecha</TableHead>
              <TableHead className="w-[100px] hidden md:table-cell text-center">
                Espacio
              </TableHead>
              <TableHead className="hidden md:table-cell w-[175px]">
                Usuario
              </TableHead>
              <TableHead className="hidden md:table-cell w-[150px]">
                Check in
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>
                <Button variant="link" className="text-text" asChild >
                  <Link to={`/reservation/${reservation.id}`}>
                  {formatDateTime(reservation.reservationDateBeg)} - {formatTime(reservation.reservationDateEnd)}
                  </Link>
                  </Button>
                </TableCell>
                <TableCell className="hidden text-center md:table-cell">
                    <Button variant="link" className="text-text" asChild >
                    <Link to={`/admin/room/${reservation.roomId}`}>{reservation?.roomName}</Link>
                  </Button>
                </TableCell>{" "}
                <TableCell className="hidden md:table-cell">
                  <Button variant="link" className="text-text" asChild >
                    <Link to={`/admin/users/${reservation.userId}`}> {reservation?.userFirstName} {reservation?.userLastName}</Link>
                  </Button>
                </TableCell>
                {console.log(reservation)}
                <TableCell className="hidden md:table-cell">
                {reservation.reservationCheckin === 0 ? (<Badge variant="secondary">No realizado</Badge>) : (<Badge >Realizado</Badge>)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default AdminReservationList;