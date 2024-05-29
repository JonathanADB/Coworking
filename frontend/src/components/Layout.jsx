import Mobile from "@/components/Mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/avatar";
import { Button } from "@/components/UI/button";
import useMediaQuery from "@/utils/mediaquery";
import { useContext, useEffect } from "react";
import { FaArrowRight, FaHome, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import LogoNegro from "../assets/images/LogoNegro.png";
import { AuthContext } from "../auth/auth-context";
import {
  FaUsers,
  FaBorderAll,
  FaBox,
  FaTriangleExclamation,
  FaTicket,
  FaStarHalfStroke,
  FaCalendarCheck,
} from "react-icons/fa6";
import { BsPersonWorkspace } from "react-icons/bs";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/UI/navigation-menu"


import { DataContext } from "@/components/DataContext";

const Layout = ({ children }) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { authState } = useContext(AuthContext);
  const host = import.meta.env.VITE_APP_HOST;
  const avatar = authState?.user?.avatar
    ? host + "/uploads/avatar/" + "/" + authState?.user?.avatar
    : null;



  if (isDesktop) {
    return (
      <div className="relative flex flex-col w-full bg-transparent h-dvh ">
        <nav className="flex items-center justify-between w-full h-14 bg-primary-foreground">
          <section className="flex items-center w-1/5 h-full px-4 ">
            <Link to="/">
              <img
                src={LogoNegro}
                alt="Logo"
                className="h-10 min-h-10 min-w-[220px]"
              />
            </Link>
          </section>
          <section className="flex items-center px-7 gap-x-4">

          {authState?.user?.role === 'normal' && (
            <Button variant="link" className="text-[#e4e4e4] hover:text-white" asChild>
              <Link to="/reservations">Mis reservas</Link>
            </Button>
          )}
        
            {authState?.token ? (
              <Link to="/profile">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={avatar} alt="Avatar" />
                  <AvatarFallback>
                    <FaUserCircle />
                  </AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Link to="/login">
                <FaUserCircle className="text-3xl" />
              </Link>
            )}
          </section>
        </nav>

        <div className="flex flex-row w-full h-full py-4">
          {authState?.user?.role === "admin" && (
            <div className="flex flex-col min-w-[200px] h-full px-4  bg-secondary rounded-r-lg gap-y-4 py-4">
             
              <Button variant="link" className="w-full text-lg text-primary-foreground" asChild>
                <Link to="/admin/users">
                  <FaUsers />
                  Usuarios
                </Link>
              </Button>
              <Button
                variant="link"
                className="w-full text-lg text-primary-foreground"
                asChild
              >
                <Link to="/admin/rooms">
                  <BsPersonWorkspace />
                  Espacios
                </Link>
              </Button>
              <Button
                variant="link"
                className="w-full text-lg text-primary-foreground"
                asChild
              >
                <Link to="/admin/equipment">
                  <FaBox />
                  Equipo
                </Link>
              </Button>
              <Button
                variant="link"
                className="w-full text-lg text-primary-foreground"
                asChild
              >
                <Link to="/admin/incidents">
                  <FaTriangleExclamation />
                  Incidencias
                </Link>
              </Button>
              <Button
                variant="link"
                className="w-full text-lg text-primary-foreground"
                asChild
              >
                <Link to="/admin/reservations">
                  <FaCalendarCheck />
                  Reservas
                </Link>
              </Button>
              <Button
                variant="link"
                className="w-full text-lg text-primary-foreground"
                asChild
              >
                <Link to="/admin/reviews">
                  <FaStarHalfStroke />
                  Reseñas
                </Link>
              </Button>
            </div>
          )}

          <div className="flex flex-row w-full h-full p-4 mx-4 rounded-lg bg-secondary/25">
            {children}
          </div>
        </div>
      </div>
    );
  } else {
    return <Mobile>{children}</Mobile>;
  }
};

export default Layout;
