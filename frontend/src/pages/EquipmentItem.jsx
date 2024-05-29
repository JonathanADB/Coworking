import { Dialog } from "@/components/Dialog.jsx";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/button.jsx";
import { Label } from "@/components/UI/label.jsx";
import { Textarea } from "@/components/UI/textarea.jsx";
import { useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../auth/auth-context";

export function EquipmentItem() {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const [equipmentData, setEquipmentData] = useState({
    id: "",
    name: "",
    description: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
  });
  const [editing, setEditing] = useState(false);
  const { id } = useParams();
  const host = import.meta.env.VITE_APP_HOST;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEquipmentData({
      ...equipmentData,
      [name]: value,
    });
  };

  useEffect(() => {
    fetch(`${host}/admin/equipment/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        setEquipmentData(body.data);
      })
      .catch((error) => toast.error("No se ha podido cargar el equipo", error));
  }, []);
  console.log({ equipmentData });
  async function handleSaveChanges(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${host}/equipment/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authState.token,
        },
        body: JSON.stringify({
          name: equipmentData.name,
          description: equipmentData.description,
        }),
      });
      if (!response.ok) {
        toast.error("Error al actualizar el artículo");
      } else {
        console.log(response);
        toast.success("Artículo modificado correctamente");
        setEditing(false);
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  }

  const handleEquipmentDeletion = () => {
    fetch(`${host}/admin/equipment/delete/${id}`, {
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
          navigate("/admin/equipment");
          toast.success("Artículo eliminado correctamente");
        }
      })
      .catch((error) =>
        console.error("Error al eliminar la incidencia:", error)
      );
  };

  const returnUrl = localStorage.getItem("returnPage");
  console.log({ returnUrl });

  return (
    <div className="w-full">
      {equipmentData && (
        <div className="flex flex-col w-full p-4 ">
          <div className="flex justify-between px-4 md:px-0">
            <h2>{equipmentData.name}</h2>
            {authState.user.role === "admin" && (
              <div className="flex items-center gap-x-2">
                {/* <Button asChild>
                  <Link to="/admin/equipment">Volver</Link>
                </Button> */}
                <Dialog
                  buttonContent={<FaTrash />}
                  title="¿Deseas eliminar el artículo?"
                  description="Esta acción será permanente"
                  handleButtonAction={handleEquipmentDeletion}
                  sureText="Sí, lo estoy"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col w-full mt-8 gap-y-4">
            <div className="flex flex-row items-center">
              <Label className="w-1/3">Nombre del artículo</Label>
              <Input
                name="username"
                placeholder="Nombre del artículo"
                className="w-2/3"
                value={equipmentData.name}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>
            <div className="flex flex-row items-center">
              <Label className="w-1/3">Descripción</Label>
              <Textarea
                type="text"
                name="description"
                placeholder="Descripción del artículo"
                className="w-2/3"
                value={equipmentData.description}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>
            <div className="flex flex-row items-center">
              <Label className="w-1/3">Fecha de creación</Label>
              <Input
                name="firstName"
                placeholder="Fecha de creación"
                className="w-2/3"
                value={new Date(equipmentData.createdAt).toLocaleDateString(
                  "es-ES",
                  { day: "numeric", month: "numeric", year: "numeric" }
                )}
                disabled
              />
            </div>
            {equipmentData.updatedAt ? (
              <div className="flex flex-row items-center">
                <Label className="w-1/3">Fecha de modificación</Label>
                <Input
                  name="lastName"
                  placeholder="Fecha de modificación"
                  className="w-2/3"
                  value={new Date(equipmentData.updatedAt).toLocaleDateString(
                    "es-ES",
                    { day: "numeric", month: "numeric", year: "numeric" }
                  )}
                  disabled
                />
              </div>
            ) : null}
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
                  Editar artículo
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
