import { AuthContext } from "@/auth/auth-context";
import { Pagination } from "@/components/Pagination.jsx";
import { Input } from "@/components/UI/Input.jsx";
import { Button } from "@/components/UI/button.jsx";
import { Label } from "@/components/UI/label.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/UI/select.jsx";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/table";
import { SelectValue } from "@radix-ui/react-select";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";

export const EquipmentList = () => {
  const { authState } = useContext(AuthContext);
  const host = import.meta.env.VITE_APP_HOST;
  const [equipmentList, setEquipmentList] = useState([]);
  const [equipmentTotal, setEquipmentTotal] = useState();
  const [equipmentQueries, setEquipmentQueries] = useState({
    search: "",
    offset: 0,
    limit: 10,
    direction: "ASC",
  });
  const { search, offset, limit, direction } = equipmentQueries;
  useEffect(() => {
    fetch(
      `${host}/equipment/searchlist?search=${search}&offset=${offset}&limit=${limit}&direction=${direction}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: authState.token,
        },
      }
    )
      .then((res) => res.json())
      .then((body) => {
        setEquipmentList(body.data);
        setEquipmentTotal(body.totalResults);
      })
      .catch((error) =>
        toast.error("Error al obtener los datos del equipamiento:", error)
      );
  }, [equipmentQueries]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEquipmentQueries({
      ...equipmentQueries,
      [name]: value,
    });
  };

  const location = useLocation();
  console.log(location.pathname);

  const [newUrl, setNewUrl] = useState();

  useEffect(() => {
    localStorage.setItem("returnPage", newUrl);
  }, [newUrl]);
  console.log({ newUrl });

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between px-4 mb-4 md:px-0">
        <h2>Equipo</h2>
        <Button variant="outline" size="icon">
          <Link to="/admin/equipment/add">
            <FaPlus />
          </Link>
        </Button>
      </div>
      <div className="flex items-center justify-between gap-1.5 w-full mb-4">
        <Input
          type="search"
          name="search"
          className="w-1/3"
          placeholder="Busca un equipo"
          onChange={handleChange}
        />
                <div className="flex flex-row items-center gap-x-4">

        <Label>Artículos por página</Label>
        <Select
          onValueChange={(value) => {
            console.log({ value });
            setEquipmentQueries((prevState) => ({
              ...prevState,
              limit: value,
            }));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
        </div>
        <div className="flex flex-row items-center gap-x-4">

        <Label>Orden</Label>
        <Select
          onValueChange={(value) =>
            setEquipmentQueries((prevState) => ({
              ...prevState,
              direction: value,
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Ascendente" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ASC">Ascendente</SelectItem>
            <SelectItem value="DESC">Descendente</SelectItem>
          </SelectContent>
        </Select>
        </div>
        
        {/* <Button asChild>
          <Link to="/admin/equipment/add">Añadir</Link>
        </Button> */}
      </div>

      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Nombre</TableHead>
            <TableHead className="w-full">Descripción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipmentList && equipmentList.length > 0 ? (
            equipmentList.map((equipment) => (
              <TableRow key={equipment.id}>
                <TableCell>
                  <Button variant="link" className="text-text" asChild>
                    <Link to={`/admin/equipment/${equipment.id}`}>
                      {equipment.name}
                    </Link>
                  </Button>
                </TableCell>
                <TableCell>{equipment.description}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>No hay artículos</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        totalRecords={equipmentTotal}
        limit={limit}
        offset={offset}
        onPageChange={(pageNumber) => {
          const newOffset = (pageNumber - 1) * limit;

          setEquipmentQueries((prevState) => ({
            ...prevState,
            offset: newOffset,
          }));
        }}
      />
    </div>
  );
};
