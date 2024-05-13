import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Input } from "@/components/UI/Input";
import { Label } from '@/components/UI/label';
import { Button } from '@/components/UI/button';
import { AuthContext } from '../auth/auth-context';

const Help = () => {
    const { authState } = useContext(AuthContext);
    const [reservations, setReservations] = useState([]);
    const [previousIncidents, setPreviousIncidents] = useState([])

    useEffect (() => {
        // fetch reservations
    } ,[])

    useEffect (() => {

        const fetchUserIncidents = async () => {
            try {
                const response = await fetch(`http://localhost:3000/incidents/by-userid/${authState.user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authState.token
                }
            })

            if (!response.ok) {
                throw new Error('No se han podido cargar las incidencias');
            }

            const data = await response.json();
            setPreviousIncidents(data);

            }
            catch (error) {
                console.error('Error loading incidents:', error);
            }}

        fetchUserIncidents();

    }, [authState])

    console.log(previousIncidents)


    return (
        <div className='flex flex-col'>
            <section className='flex flex-col m-4'>
                <h3 className='text-xl font-bold'>Ayuda</h3>
                <p className='mb-4'>¿Tuviste algún problema durante tu reserva?</p>

                <Label>Últimas reservas</Label>

                {reservations.length === 0 && (
                    <>
                        No existen reservas recientes
                    </>
                )}

                <Label>Incidencias previas</Label>

                {previousIncidents.length === 0 && (
                    <>
                        No existen incidencias previas
                    </>
                )}

                {previousIncidents.length > 0 && (
                    <>
                        {previousIncidents.map((incident) => (
                            <Link key={incident.id} className='flex flex-row justify-between' to={`/incident/${incident.id}`}>
                                <p>{incident.description}</p>
                                <p> {new Date(incident.createdAt).toLocaleString('es-ES', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}</p>
                            </Link>
                        ))}
                    </>
                )}

            </section>
        </div>
    )
}

export default Help;