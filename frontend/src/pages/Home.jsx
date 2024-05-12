import { Button } from "@/components/UI/button";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <section className="flex flex-col items-center justify-center mt-8 gap-y-4">
        <Button asChild>
          <Link to="/register">Registro</Link>
        </Button>

        <Button asChild>
          <Link to="/validate">Validar usuario</Link>
        </Button>

        <Button asChild>
          <Link to="/login">Iniciar sesión</Link>
        </Button>

        <Button asChild>
          <Link to="/change-password">Cambiar contraseña</Link>
        </Button>

        <Button asChild>
          <Link to="/forgot-password">Olvidé mi contraseña</Link>
        </Button>

        <Button asChild>
          <Link to="/reset-password">Restablecer contraseña</Link>
        </Button>

        <Button asChild>
          <Link to="/profile">Perfil</Link>
        </Button>

        <Button asChild>
          <Link to="/add-avatar">Agregar avatar</Link>
        </Button>

        <Button asChild>
          <Link to="/create-room">Crear habitación</Link>
        </Button>

        <Button asChild>
          <Link to="/room-list">Lista de habitaciones</Link>
        </Button>
      </section>
    </div>
  );
}

export default Home;