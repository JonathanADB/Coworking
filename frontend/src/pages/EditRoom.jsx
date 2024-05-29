import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../auth/auth-context";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/button";
import { Badge } from "@/components/UI/badge";
import { Label } from "@/components/UI/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import { toast } from "react-toastify";
import { Textarea } from "@/components/UI/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/tabs";
import { FaPlus } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import useMediaQuery from "@/utils/mediaquery";
import ImageUpload from "@/components/ImageUpload";

function EditRoom() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { authState } = useContext(AuthContext);
  const host = import.meta.env.VITE_APP_HOST;
  const { id } = useParams();

  const [roomData, setRoomData] = useState({
    roomId: id,
    name: "",
    description: "",
    capacity: 1,
    typeOf: "",
  });

  const [equipment, setEquipment] = useState(null);
  const [roomEquipment, setRoomEquipment] = useState({ equipmentIds: [] });
  const [cover, setCover] = useState(null); 
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`${host}/room/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
    })
      .then((res) => res.json())
      .then((roomData) => {
        console.log(roomData)
        setRoomData(roomData.message);
      })
      .catch((error) =>
        console.error("Error al obtener los datos de la habitación:", error)
      );
  }, [id]);

  console.log('roodData',roomData)
  console.log(roomEquipment)
  console.log(cover)
  console.log(images)

  useEffect(() => {
    fetch(`${host}/rooms/${id}/equipment`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        setRoomEquipment({
          equipmentIds: body.equipment.map((equip) => equip.id),
        });
      })
      .catch((error) =>
        console.error("Error al obtener los datos del equipo de la habitación:", error)
      );
  }, [id]);

  useEffect(() => {
    fetch(`${host}/equipment`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        setEquipment(body.data);
      })
      .catch((error) =>
        console.error("Error al obtener los datos del equipo:", error)
      );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData({
      ...roomData,
      [name]: value,
    });
  };

  const handleUpdateRoom = (e) => {
    e.preventDefault();
    fetch(`${host}/room/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
      body: JSON.stringify(roomData),
    })
      .then((response) => {
        if (!response.ok) {
          toast.error("Error al actualizar los datos de la habitación.");
        } else {
          toast.success("Datos de la habitación actualizados correctamente");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    fetch(`${host}/rooms/${id}/equipment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
      body: JSON.stringify(roomEquipment),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Error al actualizar el equipo de la habitación.");
        } else {
          toast.success("Equipo de la habitación actualizado correctamente");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    if (cover) {
      const formData = new FormData();
      formData.append("file", cover);

      fetch(`${host}/room/${id}/cover`, {
        method: "POST",
        headers: {
          Authorization: authState.token,
        },
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            console.error("Error al actualizar la portada del espacio.");
          } else {
            toast.success("Portada de la habitación actualizada correctamente");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

if (images.length > 0) {
      const formData = new FormData();
      images.forEach((image, index) => {
        formData.append(`file${index}`, image);
      });

      fetch(`${host}/room/${id}/images`, {
        method: "POST",
        headers: {
          Authorization: authState.token,
        },
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            console.error("Error al actualizar las imágenes del espacio.");
          } else {
            toast.success("Imágenes de la habitación actualizadas correctamente");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleRemoveEquipment = (idToRemove) => {
    setRoomEquipment((prevState) => ({
      equipmentIds: prevState.equipmentIds.filter((id) => id !== idToRemove),
    }));
  };

  const handleCoverChange = (newFiles) => {
    if (newFiles.length > 0) {
      setCover(newFiles[0]); 
    }
  };

  const handleImagesChange = (newFiles) => {
    setImages(newFiles);
  };

  return (
    <div className={`relative flex flex-col w-full ${isDesktop ? 'h-full' : 'min-h-[95dvh]'}`}>
      <h2>Editar espacio </h2>
      <Tabs defaultValue="info" className="flex flex-col w-full">
        <TabsList className="mx-auto w-fit">
          <TabsTrigger value="info">Información</TabsTrigger>
          <TabsTrigger value="equipment">Equipo</TabsTrigger>
          <TabsTrigger value="images">Imágenes</TabsTrigger>
        </TabsList>
        <TabsContent
          value="info"
          className="flex flex-col w-full px-4 mx-auto rounded-md"
        >
          <form onSubmit={handleUpdateRoom} className="flex flex-col gap-y-4">
            <div>
              <Label>Portada</Label>
              <ImageUpload onFilesChange={handleCoverChange} maxFiles={1} type="cover" existing={roomData?.image} id={roomData?.id} />
            </div>
            <div>
              <Label>Nombre</Label>
              <Input
                type="text"
                name="name"
                placeholder="Nombre del espacio"
                value={roomData?.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Descripción</Label>
              <Textarea
                type="text"
                name="description"
                placeholder="Descripción del espacio"
                value={roomData?.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Capacidad</Label>
              <Input
                type="number"
                name="capacity"
                value={roomData?.capacity}
                onChange={handleChange}
                min="1"
                max="256"
              />
            </div>
            <div>
              <Label>Tipo</Label>
              <Select
                value={roomData?.typeOf}
                onValueChange={(value) =>
                  setRoomData((prevState) => ({ ...prevState, typeOf: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un tipo de habitación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pública">Pública</SelectItem>
                  <SelectItem value="Privada">Privada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </TabsContent>
        <TabsContent value="equipment">
          <section className="flex flex-row flex-wrap justify-center w-full gap-4 px-2 mb-4 min-h-6">
            {roomEquipment?.equipmentIds.map((id) => {
              const equip = equipment?.find((equip) => equip.id === id);
              return (
                <figure
                  className="relative flex bg-vanilla/25 border border-ring rounded-lg w-[150px] h-[75px]"
                  key={id}
                >
                  <span className="justify-center m-auto text-sm font-bold">
                    {equip?.name}
                  </span>
                  <button
                    className="absolute top-0 right-0 m-1 rounded-tr-sm hover:ring-[1px] ring-ring hover:bg-vanilla h-fit w-fit transition-all ease-in-out duration-300 "
                    onClick={() => handleRemoveEquipment(id)}
                  >
                    <FaX className="text-sm p-0.5 text-primary" />
                  </button>
                </figure>
              );
            })}

            <Dialog>
              <DialogTrigger asChild>
                <button className="flex bg-vanilla/25 border border-ring rounded-lg w-[150px] h-[75px] hover:bg-vanilla/5 hover:text-black hover:border-ring/75 transition-all ease-in-out">
                  <div className="flex flex-col justify-center m-auto mt-4 ">
                    <FaPlus className="justify-center mx-auto text-2xl text-primary" />
                    <span className="text-xs">Añade un equipo</span>
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Selecciona el equipo</DialogTitle>
                  <DialogDescription>
                    Elige el equipo disponible en el espacio:{" "}
                    <span className="font-bold text-black">
                      {roomData?.name}
                    </span>
                    .
                  </DialogDescription>
                </DialogHeader>
                <Select
                  value={roomEquipment?.equipmentIds[0]}
                  multiple={true}
                  onValueChange={(value) =>
                    setRoomEquipment((prevState) => {
                      if (value && !prevState.equipmentIds.includes(value)) {
                        return {
                          equipmentIds: [...prevState.equipmentIds, value],
                        };
                      } else {
                        return prevState;
                      }
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue>
                      {roomEquipment?.equipmentIds.length > 0 ? (
                        roomEquipment?.equipmentIds
                          .map((id) => {
                            const equip = equipment?.find(
                              (equip) => equip.id === id
                            );
                            return equip ? equip?.name : id;
                          })
                          .join(", ")
                      ) : (
                        <span>Selecciona el equipo</span>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {equipment?.filter(
                      (equip) => !roomEquipment?.equipmentIds.includes(equip.id)
                    ).length > 0 ? (
                      equipment
                        ?.filter(
                          (equip) =>
                            !roomEquipment?.equipmentIds.includes(equip.id)
                        )
                        .map((equip) => (
                          <SelectItem key={equip.id} value={equip.id}>
                            {equip.name}
                          </SelectItem>
                        ))
                    ) : (
                      <p className="mx-auto text-sm w-fit">
                        No hay más equipos disponibles
                      </p>
                    )}
                  </SelectContent>
                </Select>
              </DialogContent>
            </Dialog>
          </section>
        </TabsContent>
        <TabsContent value="images">
          <ImageUpload onFilesChange={handleImagesChange} />
        </TabsContent>
      </Tabs>
      <Button
        onClick={handleUpdateRoom}
        className={`${isDesktop ? 'absolute transform -translate-x-1/2 left-1/2 bottom-4' : 'mx-auto my-4'} w-fit`}
      >
        Guardar cambios
      </Button>
    </div>
  );
}

export default EditRoom;