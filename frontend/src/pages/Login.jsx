import { useState, useContext } from "react";
import Input from "../components/UI/Input";
import { AuthContext } from "../auth/auth-context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
        console.log(formData);
        toast.error("Error en la solicitud");
      }
      const data = await response.json();

      login(data.token, data.user);

      console.log("Inicio de sesión exitoso:", data);
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
    <form onSubmit={handleSubmit} className="login-form">
      <div className="input-group">
        <label htmlFor="username">Usuario o Email</label>
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
      <div className="input-group">
        <label htmlFor="password">Contraseña</label>
        <Input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Ingrese su contraseña"
        />
        <small>Debe contener una letra mayúscula y un símbolo: (?=.*)</small>
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}

export default LoginForm;
