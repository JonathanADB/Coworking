import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "@/auth/auth-context";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/table";
import { toast } from "react-toastify";
import { Button } from "@/components/UI/button.jsx";
import { Switch } from "@/components/UI/switch.jsx";
import { FaTrash } from "react-icons/fa";
import { Dialog } from "@/components/Dialog.jsx";
import { formatDateTime } from "@/utils/formatDate";

export function UserAdmin() {
  const [userDetail, setUserDetail] = useState([]);
  const [editing, setEditing] = useState(false);
  const { authState } = useContext(AuthContext);
  const { id } = useParams();
  const host = import.meta.env.VITE_APP_HOST;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${host}/admin/users/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        setUserDetail(body.data);
      })
      .catch(() => toast.error("Error al obtener los datos del usuario"));
  }, []);

  const onChangeCheck = () => {
    setUserDetail(prevDetail => ({
      ...prevDetail,
      role: prevDetail.role === "admin" ? "normal" : "admin",
    }));
  };
  

  async function handleSaveChanges(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${host}/admin/users/role/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authState.token,
        },
        body: JSON.stringify({
          role: userDetail.role,
        }),
      });
      console.log({ response });
      if (!response.ok) {
        toast.error("Error al actualizar el rol de usuario");
      } else {
        toast.success(`Rol de usuario cambiado a ${userDetail.role}`);
        setEditing(false);
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  }

  const handleUserDeletion = () => {
    fetch(`${host}/admin/users/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          return toast.error(data.error.message);
        } else {
          navigate("/admin/users");
          toast.success("Usuario eliminado correctamente");
        }
      })
      .catch((error) => console.error("Error al eliminar el usuario:", error));
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between px-4 md:px-0">
        <h2>{userDetail.username}</h2>
        {authState.user.role === "admin" && (
          <div className="flex items-center gap-x-2">
            {/* <Button asChild>
              <Link to="/admin/users">Volver</Link>
            </Button> */}
            <Dialog
              buttonContent={<FaTrash />}
              title="¿Deseas eliminar el usuario?"
              description="Esta acción será permanente"
              handleButtonAction={handleUserDeletion}
              sureText="Sí, lo estoy"
            />
          </div>
        )}
      </div>
      <Table className="w-fit">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Nombre</TableHead>
            <TableHead className="w-[200px]">Apellidos</TableHead>
            <TableHead className="w-[200px]">email</TableHead>
            <TableHead className="w-[50px]">Verificado</TableHead>
            <TableHead className="w-[50px]">Admin</TableHead>
            <TableHead className="w-[200px]">Creado</TableHead>
            <TableHead className="w-[200px]">Última modificación</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userDetail ? (
            <TableRow>
              <TableCell>
                {userDetail.firstName ? userDetail.firstName : "---"}
              </TableCell>
              <TableCell>
                {userDetail.lastName ? userDetail.lastName : "---"}
              </TableCell>
              <TableCell>{userDetail.email}</TableCell>
              <TableCell>{userDetail.verified ? "Sí" : "No"}</TableCell>
              <TableCell>
              <Switch
                  checked={userDetail.role === "admin"}
                  onCheckedChange={onChangeCheck}
                  disabled={!editing}
                />
              </TableCell>
              <TableCell>
                {formatDateTime(userDetail.createdAt)}
              </TableCell>
              <TableCell>
              {formatDateTime(userDetail.updatedAt)} 
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell>No hay usuarios</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {editing ? (
        <div className="flex flex-row gap-x-2">
          <Button
            variant="secondary"
            onClick={() => {
              setEditing(false);
            }}
            className="flex justify-center w-1/2 mx-auto mt-4 text-center"
          >
            Cancelar
          </Button>{" "}
          <Button
            onClick={handleSaveChanges}
            className="flex justify-center w-1/2 mx-auto mt-4 text-center"
          >
            Guardar cambios
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-4 gap-y-2 ">
          <Button onClick={() => setEditing(true)} className="w-full ">
            Editar usuario
          </Button>
        </div>
      )}
    </div>
  );
}
