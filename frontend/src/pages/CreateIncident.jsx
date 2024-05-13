import React, { useState, useContext } from 'react';
import { Input } from "@/components/UI/Input";
import { Label } from '@/components/UI/label';
import { Button } from '@/components/UI/button';
import { Textarea } from '@/components/UI/textarea';
import { AuthContext } from '../auth/auth-context';

const CreateIncident = () => {
    const { authState } = useContext(AuthContext);
    
    const [incident, setIncident] = useState({
        roomId: '',
        userId: authState.user.id,
        equipmentId: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIncident({
            ...incident,
            [name]: value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!incident.roomId || !incident.userId || !incident.equipmentId || !incident.description) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        try {
            const response = await fetch(`/${authState.user.id}/:roomId/incidents/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authState.token,
                },
                body: JSON.stringify(incident),
            });

            if (!response.ok) {
                throw new Error('No se ha podido crear la incidencia');
            }

            toast.success("Incidencia creada correctamente");

        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <>
        <div className='flex flex-col justify-center p-4'>
            {/* <h2 className='text-center'>Crear incidencia</h2> */}
            <form action="">
                <div>
                    <Label>Descripción</Label>
                    <Textarea
                        name="description"
                        value={incident.description}
                        onChange={handleChange}
                        placeholder="Descripción de la incidencia"
                        required
                    />
                </div>
                <div>
                    <Label>Foto</Label>
                    <Input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        disabled
                    />
                </div>
                {/* Añadir input para imagen */}
                <Button type="submit" onClick={handleSubmit} className="w-full my-4">Crear incidencia</Button>

            </form>

        </div>
        </>
    );

}

export default CreateIncident;