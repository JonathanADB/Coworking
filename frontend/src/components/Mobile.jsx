import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaEye, FaBookmark, FaUserCircle } from "react-icons/fa";
import Logo from "../assets/images/Logo.png";
import coworqueen from "../assets/images/coworqueen.svg";
import { AuthContext } from "../auth/auth-context";
import { ScrollArea } from "./UI/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/avatar"

const Mobile = ({ children }) => {
  const location = useLocation();
  const { authState } = useContext(AuthContext);
  const host = import.meta.env.VITE_APP_HOST;
  const avatar = authState?.user?.avatar ? host + "/uploads/avatar/" +  "/" + authState.user.avatar : null;

  return (
    <div className="relative w-full bg-transparent h-dvh">
      <div className="relative w-full h-dvh">
        {/* <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            opacity: 0.35,
          }}
        /> */}
        <ScrollArea className="relative pb-12 ">
          <Link to="/">
            <img
              src={Logo}
              className="flex items-center mx-auto scale-75"
              alt="Coworqueen logo"
            />
          </Link>
          <div className="mb-4">{children}</div>
        </ScrollArea>
        <div className="fixed bottom-[-1px] flex items-center justify-around w-full h-12 text-2xl bg-[#171717] text-[#e4e4e4]">
          <Link to="/">
            <img src={coworqueen} height={24} width={24} alt="Coworqueen" className="h-6 aspect-auto" />
          </Link>
          <FaEye />
          <Link to="/reservations">
          <FaBookmark />
          </Link>
          {authState?.token ? 
          <Link to="/profile">
          <Avatar>
              <AvatarImage src={avatar}  />
              <AvatarFallback>
                {authState?.user?.firstName?.split('')[0]}
                </AvatarFallback> 
          </Avatar>
        </Link>
          : 
          <Link to="/login"><FaUserCircle /></Link>
          }
        </div>
      </div>
    </div>
  );
};

export default Mobile;
