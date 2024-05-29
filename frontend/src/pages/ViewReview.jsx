import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/auth-context.jsx";
import { Link } from "react-router-dom";
import Rating from "react-rating";
import { Button } from "@/components/UI/button.jsx";
import { toast } from "react-toastify";



function ViewReview({reviewId}) {
  const { authState } = useContext(AuthContext);
  const [review, setReview] = useState({});


  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_HOST}/review/${reviewId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: authState.token,
        },
    })
        .then((res) => res.json())
        .then((data) => {
            setReview(data.data);
        })
        .catch((error) =>
            toast.error("Error al obtener los datos de la reserva:", error)
        );
}, [reviewId]);


console.log(review);
  
  return (
    <div className="flex flex-col w-full px-4 md:px-0">
      <h2> Review </h2>
      <div className="flex flex-col w-full gap-y-4">
        <form>
          <div className="flex flex-col w-full my-4 justify-normal gap-x-4">

            <p>Description: {review.description || "No hay descripcion disponible"}</p>
          </div>
  
          <div className="flex items-center my-4 gap-x-4">
            <Rating
              initialRating={review.rate || 0} 
              max={5}
              readonly={true}
            />
            {review.rate && <span>{review.rate.toFixed(1)}</span>}
          </div>
          <Button> <Link to={`/review/edit/${reviewId}`}>Editar</Link></Button>
        </form>
      </div>
    </div>
  );
  } 
  
export default ViewReview;