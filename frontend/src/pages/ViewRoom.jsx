import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "@/auth/auth-context";
import { Button } from "@/components/UI/button";
import { Badge } from "@/components/UI/badge";
import { useNavigate } from "react-router-dom";
import { formatAverageRate } from "@/utils/formatRating";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/UI/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/UI/card";

function ViewRoom() {
  const { authState } = useContext(AuthContext);
  const token = authState.token;
  const [roomData, setRoomData] = useState({});
  const { id } = useParams();
  const roomId = id;
  const host = import.meta.env.VITE_APP_HOST;
  const navigate = useNavigate();

console.log(roomData);

  useEffect(() => {
    fetch(`${host}/room/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        setRoomData(body.message);
      })
      .catch((error) =>
        console.error("Error al obtener los datos de la habitación:", error)
      );
  }, [roomId]);

  const cover = roomData?.image
    ? host + "/uploads/rooms/" + roomId + "/" + roomData?.image
    : "";

  console.log(roomData);

  return (
    <div className="relative flex flex-col justify-center w-full lg:justify-normal">
      {roomData && (
        <div className="relative flex flex-col justify-center w-full px-4 md:px-0">
          <section className="flex flex-row items-center justify-between mb-4">
            <h2 className="">{roomData?.name}</h2>
            <p className="text-right">
              {formatAverageRate(roomData?.averageRate)}
            </p>
          </section>

          <Carousel
            className="mx-auto mb-4"
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
          >
            <CarouselContent className="-ml-2 w-full h-full aspect-video md:w-[450px] md:h-[300px] md:min-w-[450px] md:min-h-[300px] md:max-w-[450px] md:max-h-[300px]">
              {roomData?.images?.map((image, index) => (
                <CarouselItem key={index}>
                  <Card className="w-full h-full overflow-hidden">
                    <CardContent className="w-full h-full p-0">
                      <img
                        src={host + "/uploads/rooms/" + roomId + "/" + image}
                        alt="room"
                        className="object-cover w-full h-full"
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:block" />
            <CarouselNext className="hidden md:block" />
          </Carousel>

          <p className="text-left text-balance">{roomData?.description}</p>

          <section className="flex flex-row justify-between my-2">
            <div className="text-left">
              <span className="font-bold">Capacidad:</span> {roomData?.capacity}
            </div>
            <div className="flex items-center text-right gap-x-4">
              <span className="font-bold">Tipo:</span>{" "}
              {roomData?.typeOf === "Pública" ? (
                <Badge>Pública</Badge>
              ) : (
                <Badge>Privada</Badge>
              )}
            </div>
          </section>

          <section>
            <h3 className="font-bold">Equipo disponible:</h3>
            <p>
              {roomData?.equipment?.map((equipment, index, arr) => (
                <span key={index}>
                  {equipment?.name}
                  {index < arr.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          </section>
        </div>
      )}

      <Button
        className="sticky mx-auto bottom-4 w-fit"
        onClick={() => navigate(`/room/${id}/reserve`)}
      >
        Reservar
      </Button>
    </div>
  );
}

export default ViewRoom;
