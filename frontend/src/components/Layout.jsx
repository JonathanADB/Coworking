import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaEye, FaBookmark, FaUserCircle } from "react-icons/fa";
import Logo from "../assets/images/Logo.png";
import coworqueen from "../assets/images/coworqueen.svg";
import { AuthContext } from "../auth/auth-context";
import { ScrollArea } from "./UI/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/avatar";
import Mobile from "@/components/Mobile";
import useMediaQuery from "@/utils/mediaquery";

const Layout = ({ children }) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const location = useLocation();
  const { authState } = useContext(AuthContext);

  if (isDesktop) {
    return (
      <div className="relative w-full bg-transparent h-dvh">{children}</div>
    );
  } else {
    return <Mobile>{children}</Mobile>;
  }
};

export default Layout;
