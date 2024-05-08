import React, { useState } from "react";
import Input from "../components/UI/Input";

function CreateRoomForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        name: " ",
        description: " ",
        capacity: 1,
        typeOf: " "
    });

      formData.capacity = Number(formData.capacity);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value 
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.description || !formData.capacity || !formData.typeOf){
            message = "Todos los cambos son obligatorios"
            return;
        }
        // Llama a la función de envío desde el componente padre
        onSubmit(formData);
    };
    return (
        <div className="flex flex-col justify-center w-full ">
        <form className="flex flex-col px-1 my-4 gap-y-4" onSubmit={handleSubmit}>


                <label className="flex items-center justify-between w-full ">
                    Nombre:
                    <Input 
                        type="text" 
                        name="name"
                        className="w-2/3"
                        value={formData.name} 
                        onChange={handleChange}
                        required 
                     />

                </label>

                <label className="flex items-center justify-between w-full ">
                    Descripción:
                    <Input 
                        type="text" 
                        name="description"
                        className="w-2/3"
                        value={formData.description} 
                        onChange={handleChange}
                        required 
                     />
                </label>

                <label className="flex items-center justify-between w-full ">
                    Capacidad:
                    <Input 
                        type="number" 
                        name="capacity"
                        className="w-2/3"
                        value={formData.capacity} 
                        onChange={handleChange}
                        min="1"
                        max="256"
                        required 
                     />
                </label>

                <label className="flex items-center justify-between w-full ">
                    Tipo:
                    <Input 
                        type="text" 
                        name="typeOf"
                        className="w-2/3"
                        value={formData.typeOf} 
                        onChange={handleChange}
                        required 
                     />
                </label>
      
        </form>
            <button className="mx-auto w-fit" type="submit">Crear habitación</button>
        </div>
    );
}


export function CreateRoom() {
    const handleCreateRoom = async (roomData) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjllNDkxZjI3LTVlZDAtNGJkOC04NjUwLTY2YWM4OTFkYmY1MyIsInVzZXJuYW1lIjoiZGNhYzMwMTIiLCJlbWFpbCI6ImRhbmllbGFhbDMwMTJAZ21haWwuY29tIiwiaWF0IjoxNzE1MTAzODY5LCJleHAiOjE3MTc2OTU4Njl9.XmbsvqQKyQyRAi2gfHk6XEl_6dyyuGs7lj1YMO5q3qc"
        localStorage.setItem("AUTH_TOKEN", token)
        console.log(roomData);
        try {
            const response = await fetch('http://localhost:3000/create-room', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("AUTH_TOKEN"),
                },
                body: JSON.stringify(roomData),
            });

       if (!response.ok) {
        console.error('Error en la solicitud:');
        return;
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
        const data = await response.json();

        if (data.success) {
        } else {
            console.error('Error del servidor:');
        }
    } else {
        console.error('La respuesta no es JSON válida.');
    }
} catch (error) {
    // Maneja errores en la solicitud
    console.error('Error al crear habitación:', error);
}
};

return (
<div className="flex flex-col justify-center p-4 ">
    <h2 className="text-xl text-center">Crear nueva habitación</h2>
    <CreateRoomForm onSubmit={handleCreateRoom} />
</div>
);
}

export default CreateRoom;