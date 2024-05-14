import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/label";
import { Button } from "@/components/UI/button";
import { AuthContext } from "../auth/auth-context";

const UserSettings = () => {
    const { authState } = useContext(AuthContext);

    return (
        <div className="flex flex-col">
        <section className="m-4">
            
            modo oscuro

            idioma

            <Button asChild className="w-full">
                <Link to="/change-password">Cambiar contraseña</Link>
            </Button>
        </section>
        </div>
    );
    }

export default UserSettings;