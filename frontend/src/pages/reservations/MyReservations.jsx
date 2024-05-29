import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/auth/auth-context';
import { DataContext } from '@/components/DataContext';
import { Badge } from '@/components/UI/badge';
import { Link } from 'react-router-dom';
import { formatDate, formatDateTime, formatTime, formatReservation, formatSmallDate } from '@/utils/formatDate';

const MyReservations = () => {
    const { authState } = useContext(AuthContext);
    const host = import.meta.env.VITE_APP_HOST;
    const [reservations, setReservations] = useState([])
    const [pastReservations, setPastReservations] = useState([])
    const [nextReservations, setNextReservations] = useState([])

    useEffect(() => {
        fetch(`${host}/reservations/${authState.user.id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: authState.token,
            },
        })
            .then((res) => res.json())
            .then((body) => {
                const nextReservations = body.reservations.filter(reservation => reservation.reservationCheckin === 0);
                const pastReservations = body.reservations.filter(reservation => reservation.reservationCheckin === 1);
                setNextReservations(nextReservations);
                setPastReservations(pastReservations);
            })
    }, []);
        
        //console.log(reservations)
        console.log(pastReservations)
        console.log(nextReservations)

    return (
      <div className="p-4">
        <h2>Próximas reservas</h2>
        <ul className="flex flex-col justify-start gap-2 md:flex-row md:flex-wrap">
          {nextReservations.map((reservation) => (
            <figure
              key={reservation.id}
              className="relative px-1 overflow-hidden border rounded-lg md:min-w-[275px] md:max-w-[275px] md:py-1 h-1/2 border-ring bg-vanilla/35 hover:bg-opacity-5"
            >
              <Link
                to={`/reservation/${reservation.id}`}
                className="flex flex-row items-center h-full gap-x-2"
              >
                <img
                  src={
                    host +
                    "/uploads/rooms/" +
                    reservation?.roomId +
                    "/" +
                    reservation?.roomCover
                  }
                  alt={reservation.roomName}
                  className="w-1/3 md:max-h-[80px] rounded-md md:w-auto aspect-video"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/defaultSpace.jpg";
                  }}
                />
                <div className="h-full">
                  <h3 className="text-xl font-bold">{reservation?.roomName}</h3>
                  <p>{formatSmallDate(reservation?.reservationDateBeg)}</p>
                  <p className="text-sm">
                    {formatTime(reservation?.reservationDateBeg)} -{" "}
                    {formatTime(reservation?.reservationDateEnd)}
                  </p>
                </div>
              </Link>
            </figure>
          ))}
        </ul>
        <h2 className="my-1">Reservas anteriores</h2>
        <ul className="flex flex-col justify-start gap-2 md:flex-row md:flex-wrap">
          {pastReservations.map((reservation) => (
            <figure
              key={reservation.id}
              className="relative px-1 overflow-hidden border rounded-lg md:min-w-[275px] md:max-w-[275px] md:py-1 h-1/2 border-ring bg-vanilla/35 hover:bg-opacity-5"
            >
              <Link
                to={`/reservation/${reservation.id}/review`}
                className="flex flex-row items-center h-full gap-x-2"
              >
                <img
                  src={
                    host +
                    "/uploads/rooms/" +
                    reservation?.roomId +
                    "/" +
                    reservation?.roomCover
                  }
                  alt={reservation.roomName}
                  className="w-1/3 md:max-h-[80px] rounded-md md:w-auto aspect-video"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/defaultSpace.jpg";
                  }}
                />
                <div className="h-full ">
                  <h3 className="text-xl font-bold">{reservation?.roomName}</h3>
                  <p>{formatSmallDate(reservation?.reservationDateBeg)}</p>
                  <p className="text-sm">
                    {formatTime(reservation?.reservationDateBeg)} -{" "}
                    {formatTime(reservation?.reservationDateEnd)}
                  </p>
                </div>
              </Link>
            </figure>
          ))}
        </ul>
      </div>
    );

}


export default MyReservations;