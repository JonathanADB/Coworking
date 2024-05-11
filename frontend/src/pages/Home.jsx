import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <section className="flex flex-col items-center justify-center mt-8 gap-y-4">
        <Link to="/register">
          <button>Registro</button>
        </Link>
        <Link to="/validate">
          <button>Validar usuario</button>
        </Link>
        <Link to="/login">
          <button>Iniciar sesión</button>
        </Link>
        <Link to="/change-password">
          <button>Cambiar contraseña</button>
        </Link>
        <Link to="/forgot-password">
          <button>Olvidé mi contraseña</button>
        </Link>
        <Link to="/reset-password">
          <button>Restablecer contraseña</button>
        </Link>

        <Link to="/profile">
          <button>Perfil</button>
        </Link>

        <Link to="/add-avatar">
          <button>Agregar avatar</button>
        </Link>

        <Link to="/create-room">
          <button>Crear habitación</button>
        </Link>
        <Link to="/room-list">
          <button>Lista de habitaciones</button>
        </Link>
      </section>
    </div>
  );
}

export default Home;