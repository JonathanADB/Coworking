import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/label";
import { Button } from "@/components/UI/button";
import { AuthContext } from "../auth/auth-context";

const AdminPanel = () => {
    const { authState } = useContext(AuthContext);

    return (
        <div className="flex flex-col">
            <section className="m-4">
                <h3 className="text-xl font-bold">Panel de administración</h3>
                <p className="mb-4">Bienvenido a la sección de administración</p>

                <section className="flex flex-col gap-y-4">
                <Button asChild className="w-full">
                    <Link to="/admin/users">Gestionar usuarios</Link>
                </Button>

                <Button asChild className="w-full">
                    <Link to="/admin/incidents">Gestionar incidencias</Link>
                </Button>

                <Button asChild className="w-full">
                    <Link to="/admin/rooms">Gestionar salas</Link>
                </Button>
                </section>


            </section>
        </div>
    );
}

export default AdminPanel;