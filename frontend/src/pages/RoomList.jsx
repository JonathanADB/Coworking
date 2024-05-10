import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../auth/auth-context";

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const { authState } = useContext(AuthContext);
    const token = authState.token;
    
    useEffect(() => {
        fetch('http://localhost:3000/rooms', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
        })
        .then((res) => res.json())
        .then((data) => setRooms(data.message));
    }, []);
    
    return (
        <div>
        <ul>
            {rooms && rooms.length > 0 ? (
            rooms.map((room) => (
                <li key={room.id}>
                <Link to={`/room/${room.id}`}>{room.name}</Link>
                </li>
            ))
            ) : (
            <p>No existen espacios</p>
            )}
        </ul>
        </div>
    );
    }

export default RoomList;