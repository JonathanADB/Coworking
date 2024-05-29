import { useState, useContext } from "react";
import { Input } from "@/components/UI/Input";
import { AuthContext } from "../auth/auth-context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/UI/button";
import { Label } from "@/components/UI/label";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginForm() {
  const [inputType, setInputType] = useState('password');
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_HOST}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.error) {
        toast.error(data.error.message);
        return;
      } else {
        login(data.token, data.user);
      }

      navigate("/");
      toast.success("Inicio de sesión exitoso");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      toast.error(`Error al iniciar sesión: ${error}`);
    }
  };

  return (
    <div className="flex flex-col w-full p-4">
      <h1 className="mb-4 text-center">Iniciar sesión</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="username" className="flex justify-left">
            Usuario o correo electrónico
          </Label>
          <Input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Ingrese su usuario o email"
          />
        </div>
        <div>
          <Label htmlFor="password" className="flex justify-left">
            Contraseña
          </Label>
          <div className="relative flex items-center">
            <Input
              type={inputType}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Ingrese su contraseña"
            />
            <button className="absolute right-3"
               onClick={(event) => {
                event.preventDefault();
                setInputType(inputType === 'password' ? 'text' : 'password');
              }}
            >
             {inputType === 'password' ? <FaEye /> : <FaEyeSlash />}
              </button> 
         </div>

          {/* Este mensaje quizás solo se debería mostrar al fallar la contraseña una vez */}
          {/* <p className="text-xs mt-[2px]">
            Debe contener una letra mayúscula y un símbolo: (?=.*)
          </p> */}
        </div>
        <div className="flex flex-col">
          <Button className="flex w-full mx-auto mb-1" type="submit">
            Iniciar sesión
          </Button>

          <Button asChild variant="link" className="justify-center">
            <Link to="/register">Crear cuenta</Link>
          </Button>

          <Button asChild variant="link" className="justify-center">
            <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
          </Button>

        </div>
      </form>
    </div>
  );
}

export default LoginForm;