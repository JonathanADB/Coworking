import { useContext, useState } from "react";
import { AuthContext } from "../auth/auth-context";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/button.jsx";
import { Textarea } from "@/components/UI/textarea.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export function AddEquipment() {
  const { authState } = useContext(AuthContext);
  const token = authState.token;

  const [equipmentData, setEquipmentData] = useState({
    name: "",
    description: "",
    inventory: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEquipmentData({
      ...equipmentData,
      [name]: value,
    });
  };

  async function onSubmit(e) {
    e.preventDefault();

    const response = await fetch(`http://localhost:3000/equipment/add`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        name: equipmentData.name,
        description: equipmentData.description,
        inventory: equipmentData.inventory,
      }),
    });
    const { ok, error } = response;

    if (!ok) {
      toast.error("No se ha podido añadir el artículo");
    } else {
      toast.success("Artículo añadido correctamente");
    }
  }
  return (
    <div className="flex flex-col w-full ">
 <form
      onSubmit={onSubmit}
      className="flex flex-col w-full p-4 mx-auto mt-4 rounded-md gap-y-4"
    >
      {/* <Button asChild>
        <Link to="/admin/equipment">Volver</Link>
      </Button> */}
      <div>
        <Label>Nombre del artículo</Label>
        <Input
          type="text"
          name="name"
          placeholder='Ej: "Destornillador"'
          value={equipmentData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Descripción del artículo</Label>
        <Textarea
          type="text"
          name="description"
          placeholder='Descripción del artículo"'
          value={equipmentData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Cantidad</Label>
        <Input
          type="number"
          name="inventory"
          placeholder='Cantidad'
          value={equipmentData.inventory}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Añadir artículo
      </Button>
    </form>
    </div>
   
  );
}
