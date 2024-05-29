import React, { useState, useContext } from "react";
import { AuthContext } from "../auth/auth-context.jsx";
import { toast } from "react-toastify";
import { Button } from "@/components/UI/button.jsx";
import { useParams } from "react-router-dom";
import { Label } from "@/components/UI/label.jsx";
import { Textarea } from "@/components/UI/textarea.jsx";
import Rating from "react-rating";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@/components/Dialog.jsx";

function EditReview({}) {
  const { authState } = useContext(AuthContext);
  const [review, setReview] = useState({});
  const { reviewId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    reviewId: reviewId,
    description: review.description,
    rate: review.rate,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRateChange = (rating) => {
    setFormData({
      ...formData,
      rate: Number(rating),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description || !formData.rate) {
      toast.error("Revisa los campos obligatorios");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_HOST}/review/edit/${reviewId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authState.token,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        toast.error("Error al actualizar la reseña");
      } else {
        toast.success("Reseña actualizada exitosamente");
      }
      navigate(`/reviews/`);
    } catch (error) {
      toast.error("Ocurrió un error, intenta de nuevo.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_HOST}/review/delete/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: authState.token,
          },
        }
      );
      if (!response.ok) {
        toast.error("Error al eliminar la reseña");
      } else {
        toast.success("Reseña eliminada exitosamente");
      }
    } catch (error) {
      toast.error("Ocurrió un error, intenta de nuevo.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col my-4 w-fulljustify-normal gap-x-4">
        <Label>Descripción:</Label>
        <Textarea
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center my-4 gap-x-4">
        <Label>Calificación:</Label>
        <Rating
          initialRating={formData.rate}
          onChange={handleRateChange}
          max={5}
        />
      </div>
      <Button type="submit">Actualizar Reseña</Button>
      <Dialog
        buttonContent={<FaTrash />}
        title="¿Deseas eliminar esta reseña?"
        description="Esta acción será permanente"
        handleButtonAction={handleDelete}
        sureText="Sí, lo estoy"
      />
    </form>
  );
}

export default EditReview;
