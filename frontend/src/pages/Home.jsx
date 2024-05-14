import { Button } from "@/components/UI/button";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <section className="flex flex-col items-center justify-center mt-8 gap-y-4">
        {/* <Button asChild>
          <Link to="/register">Registro</Link>
        </Button> */}

        {/* <Button asChild>
          <Link to="/validate">Validar usuario</Link>
        </Button> */}

        {/* <Button asChild>
          <Link to="/reset-password">Restablecer contraseña</Link>
        </Button> */}

        <Button asChild>
          <Link to="/create-room">Crear habitación</Link>
        </Button>

        <Button asChild>
          <Link to="/room-list">Lista de habitaciones</Link>
        </Button>

        <Button asChild>
          <Link to="/admin">Panel de administración</Link>
        </Button>
        
      </section>
    </div>
  );
}

export default Home;