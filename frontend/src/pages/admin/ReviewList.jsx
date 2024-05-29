import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
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
} from "@/components/UI/table";
import { FaPlus } from "react-icons/fa";

const AdminReviewList = () => {
  const { authState } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const host = import.meta.env.VITE_APP_HOST;

  useEffect(() => {
    fetch(`${host}/reviews`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        setReviews(body.data);
      })
      .catch((error) =>
        console.error("Error al obtener los datos de las reseñas:", error)
      );
  }, []);

  console.log(reviews)

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between px-4 md:px-0">
        <h2>Reseñas</h2>
      </div>
      <section className="flex flex-col w-full mx-auto mt-8">
        <Table className="w-full">
          <TableHeader>
            <TableRow> 
              <TableHead>Descripción</TableHead>
              <TableHead className="w-[100px] hidden md:table-cell text-center">
                Puntuación
              </TableHead>
              <TableHead className="hidden md:table-cell w-[175px]">
                Reserva
              </TableHead>
              <TableHead className="hidden md:table-cell w-[200px]">
                Usuario
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>
                  {review.description}
                </TableCell>
                <TableCell className="hidden text-center md:table-cell">
                    {review.rate}
                </TableCell>{" "}
                <TableCell className="hidden md:table-cell">
                  <Button variant="link" className="text-text" asChild>
                    <Link to={`/reservation/${review.reservationId}`}>
                        Ver reserva
                    </Link>
                    </Button>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                <Button variant="link" className="text-text" asChild>
                <Link to={`/admin/users/${review.userId}`}>
                {review.firstName} {review.lastName} 
                </Link>
                </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default AdminReviewList;
