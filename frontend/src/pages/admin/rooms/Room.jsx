import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/label";
import { Button } from "@/components/UI/button";
import { Badge } from "@/components/UI/badge";
import { AuthContext } from "@/auth/auth-context";

const Room = () => {
    const { authState } = useContext(AuthContext);
    const [room, setRoom] = useState([]);
    const { id } = useParams();
    const roomId = id;

    useEffect(() => {
        fetch(`http://localhost:3000/room/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: authState.token,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setRoom(data.message);
            })
            .catch((error) =>
                console.error("Error al obtener los datos de la sala:", error)
            );
    }, [roomId]);

    console.log(room)

};

export default Room;