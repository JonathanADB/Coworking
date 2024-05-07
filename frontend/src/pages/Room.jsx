import React, { useState } from "react";

function CreateRoomForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        name: " ",
        description: " ",
        capacity: "",
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
        <form onSubmit={handleSubmit}>
            <div className="">
                <label>
                    Nombre:
                    <input type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange}
                    required />
                </label>
            </div>
            <div>
                <label>
                    Descripción:
                    <input type="text" 
                    name="description" 
                    value={formData.description}
                    onChange={handleChange}
                    required />
                </label>
            </div>
            <div>
                <label>
                    Capacidad:
                    <input type="number" 
                    name="capacity" 
                    value={formData.capacity} 
                    onChange={handleChange} 
                    required/>
                </label>
            </div>
            <div>
                <label>
                    Tipo:
                    <input type="text" 
                    name="typeOf" 
                    value={formData.typeOf}
                    onChange={handleChange}
                    required />
                </label>
            </div>
            <button type="submit">Crear habitación</button>
        </form>
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

        // Maneja la respuesta del servidor
        //console.log(data);

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
<div>
    <h2>Crear nueva habitación</h2>
    <CreateRoomForm onSubmit={handleCreateRoom} />
</div>
);
}

export default CreateRoom;