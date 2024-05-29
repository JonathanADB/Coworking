import { Label } from '@/components/UI/label.jsx';
import React, { useState } from 'react';
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/Input";
import { useNavigate } from "react-router-dom";

function ReviewUseForm() {
  const [formData, setFormData] = useState({
    description: "",
    rate: "",
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description || !formData.rate) {
      toast.error("Revisa los campos obligatorios");
      return;
    }
    try {
      // Realizar consulta para obtener reservationId asociado al userId
      const reservationResponse = await fetch(`http://localhost:3000/reservations${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!reservationResponse.ok) {
        toast.error("Error al obtener la información de la reserva");
        return;
      }

      const reservationData = await reservationResponse.json();
      if (!reservationData || !reservationData.length) {
        toast.error("No se encontraron reservas asociadas a este usuario");
        return;
      }

      const reservationId = reservationData[0].id; // Suponiendo que solo hay una reserva por usuario

      const reviewFormData = {
        ...formData,
        reservationId: reservationId,
      };

      const response = await fetch("http://localhost:3000/review-add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewFormData),
      });

      if (!response.ok) {
        toast.error("Error en los datos introducidos");
      } else {
        toast.success("Review hecha exitosamente");
        // Redirigir a la página de validate
        await new Promise((resolve) => setTimeout(resolve, 5000));
        navigate("/rooms");
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Hubo un error al enviar la solicitud.');
    }
  };

  return (
    <div>
      <h1>Agregar una revisión</h1>
      <form onSubmit={handleSubmit}>
        <Label>
          Descripción:
          <Input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Label>
        <br />
        <Label>
          Rate:
          <Input
            type="number"
            name="rate"
            value={formData.rate}
            onChange={handleChange}
          />
        </Label>
        <br />
        <Button type="submit">Enviar revisión</Button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ReviewUseForm;
