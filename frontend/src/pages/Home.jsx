import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/auth/auth-context";
import { DataContext } from "@/components/DataContext";
import { Badge } from "@/components/UI/badge";
import { Link } from "react-router-dom";
import { formatAverageRate } from "@/utils/formatRating";

const HomePage = () => {
  const { authState } = useContext(AuthContext);
  const host = import.meta.env.VITE_APP_HOST;
  const { rooms, updateRooms } = useContext(DataContext);

  const fetchRoomsIfNeeded = async (host, authState, rooms, updateRooms) => {
    const updateInterval = 1; // arreglarlo después: 1 hora
    const now = new Date();
  
    if (rooms.data.length > 0) {
      const lastUpdated = new Date(rooms?.lastUpdated);
      if ((now - lastUpdated) < updateInterval) {
        console.log('No se necesita actualización, las habitaciones ya están actualizadas.');
        return;
      }
    }
  
    try {
      const response = await fetch(`${host}/rooms`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authState.token,
        },
      });
  
      if (!response.ok) {
        console.error("Error al obtener las habitaciones");
        return;
      }
  
      const data = await response.json();
      updateRooms(data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchRoomsIfNeeded(host, authState, rooms, updateRooms);
  }, [authState, rooms, updateRooms, host]);

  console.log(rooms)

  return (
    <div className="w-full ">
      {/* <section>filtros</section> */}
      <section className="w-full ">
        <section className="flex flex-wrap justify-center gap-4 my-4">
          {rooms?.data?.length > 0 &&
            rooms?.data?.map((room) => (
              <figure
                key={room.id}
                className="relative w-[180px] max-w-[180px] aspect-[3-2] max-h-[120px] lg:w-[300px] lg:max-w-[300px] lg:h-[200px] lg:max-h-[200px] overflow-hidden rounded-lg hover:opacity-80"
              >
                <Link to={`/room/${room.id}`}>
                  <img
                    src={host + "/uploads/rooms/" + room?.id + "/" + room?.image}
                    alt={room.name}
                    className="w-full rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src='/defaultSpace.jpg'
                    }}
                  />
                  <div className="absolute bg-opacity-50 bg-secondary w-fit" />
                  <div className="absolute bottom-0 flex items-center justify-between w-full ">
                    <h3 className="px-2 py-0.5 overflow-hidden text-sm font-bold text-center md:text-2xl bg-secondary rounded-tr-lg min-w-11 max-h-10">{room.name}</h3>
                    <Badge className="mr-[1px] md:mr-0 md:mx-2 rounded-lg">
                      {room.typeOf}
                    </Badge>
                  </div>
                  <div className="absolute top-0 right-0 overflow-hidden text-center rounded-bl-lg bg-secondary min-w-11 max-h-6">
                    <p className="">{room.capacity}</p>
                  </div>
                  <div className="absolute top-0 left-0 items-center overflow-hidden font-bold text-center min-w-11 max-h-6">
                  {formatAverageRate(room.averageRate)}
                                    </div>
                </Link>
              </figure>
              // <p className="hidden">{room.description}</p>
              // </div>
            ))}
        </section>
      </section>

    </div>
  );
};

export default HomePage;
