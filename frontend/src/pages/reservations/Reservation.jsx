import { AuthContext } from "@/auth/auth-context";
import { Dialog } from "@/components/Dialog.jsx";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { formatDateTime, formatTime } from "@/utils/formatDate";

const ViewReservation = () => {
  const { authState } = useContext(AuthContext);
  const [reservationData, setReservationData] = useState({});
  const { id } = useParams();
  const host = import.meta.env.VITE_APP_HOST;
  
  console.log('ID de la reserva:',id)
  
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${host}/reservations/by-reservationId/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setReservationData(data.reservation);
      })
      .catch((error) =>
        console.error("Error al obtener los datos de la reserva:", error)
      );
  }, [id]);

  const handleReservationCancel = () => {
    fetch(`${host}/reservation/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          return toast.error(data.error.message);
        } else {
          //navigate("/);
          toast.success("Reserva cancelada correctamente");
        }
      })
      .catch((error) => console.error("Error al cancelar la reserva:", error));
  };

  const currentDate = new Date();

  console.log(reservationData)

  return (
    <div className="flex flex-col w-full">
      {reservationData && (
        <div>
          <div className="flex justify-between px-4 md:px-0">
            <h2>Reserva</h2>
            {new Date(reservationData.reservationDateBeg) < currentDate && (
                          <Dialog
                          buttonVariant="outline"
                          buttonContent="Cancelar reserva"
                          title="¿Estás seguro?"
                          description="Esta acción no se puede deshacer. Esto cancelará permanentemente tu reserva y deberás crear una nueva."
                          handleButtonAction={handleReservationCancel}
                          sureText="Sí, estoy seguro"
                        />)
              }

          </div>
          <ul className="flex flex-col gap-y-4">
            <li>
              <span className="font-bold">Espacio:</span>{" "}
              {reservationData.roomName}
            </li>
            <li>
              <span className="font-bold">Fecha:</span>{" "}
              {formatDateTime(reservationData.reservationDateBeg)} -{" "}
              {formatTime(reservationData.reservationDateEnd)}
            </li>
            <li>
              <span className="font-bold">Fecha de creación:</span>{" "}
              {formatDateTime(reservationData.createdAt)}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewReservation;