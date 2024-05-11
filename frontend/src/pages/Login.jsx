import { useState, useContext } from "react";
import Input from "../components/UI/Input";
import { AuthContext } from "../auth/auth-context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LoginForm() {
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
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        toast.error("Error en la solicitud");
      }
      const data = await response.json();

      login(data.token, data.user);

      toast.success("Inicio de sesión exitoso");
      // Redirigir a la página de home
      await new Promise((resolve) => setTimeout(resolve, 5000));
      navigate("/");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      toast.error(`Error al iniciar sesión: ${error}`);
    }
  };

  return (
    <div className='flex flex-col justify-center p-4'>
            <h1 className='mb-4 text-center'>Iniciar sesión</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="username" className="flex justify-left">Usuario o correo electrónico</label>
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
                <label htmlFor="password" className="flex justify-left">Contraseña</label>
                <Input 
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password} 
                    onChange={handleChange}
                    required
                    placeholder="Ingrese su contraseña"
                />
                {/* Este mensaje quizás solo se debería mostrar al fallar la contraseña una vez */}
                <p className='text-xs mt-[2px]'>Debe contener una letra mayúscula y un símbolo: (?=.*)</p>
            </div>
            <div className="flex flex-col gap-y-4">

            <button className='flex mx-auto w-fit' type="submit">Iniciar sesión</button>
            <Link to='/forgot-password'>
              <button className='flex mx-auto w-fit' type="button">¿Olvidaste tu contraseña?</button>
              </Link>
              </div>

        </form>
        </div>
  );
}

export default LoginForm;
