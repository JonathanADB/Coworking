import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaEye, FaBookmark, FaUserCircle } from "react-icons/fa";
import Logo from '../assets/images/Logo.png';
import coworqueen from '../assets/images/coworqueen.svg';

const Mobile = ({children}) => {
    const location = useLocation();

    return (
        <div className='w-full h-dvh'>
               <Link to='/'>
          <img src={Logo} className="flex items-center mx-auto mt-4 scale-75" alt="Coworqueen logo" />
        </Link>
            {children}
            <div className='fixed bottom-0 flex items-center justify-around w-full h-12 text-2xl bg-[#171717] text-[#e4e4e4]'>
                <Link to='/'>
                    {/* <FaHome className={location.pathname === '/' ? 'text-[#B39700]' : ''} /> */}
                    <img src={coworqueen} height={24} width={24} alt="Coworqueen" />

                </Link>
                <FaEye />
                <FaBookmark />
                <FaUserCircle className={location.pathname === '/register' || location.pathname === '/validate' || location.pathname === '/register' || location.pathname === '/forgot-password' || location.pathname === '/reset-password' || location.pathname === '/change-password' ? 'text-[#B39700]' : ''} />            </div>
        </div>
    )
}

export default Mobile;


