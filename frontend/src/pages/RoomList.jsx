import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:3001/rooms')
        .then((res) => res.json())
        .then((data) => setRooms(data));
    }, []);
    
    return (
        <div>
        <ul>
            {rooms.map((room) => (
            <li key={room.id}>
                <Link to={`/room/${room.id}`}>{room.name}</Link>
            </li>
            ))}
        </ul>
        </div>
    );
    }

export default RoomList;