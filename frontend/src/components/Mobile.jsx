import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaEye, FaBookmark, FaUserCircle } from "react-icons/fa";
import Logo from '../assets/images/Logo.png';
import coworqueen from '../assets/images/coworqueen.svg';
import { AuthContext } from '../auth/auth-context';
import background from '../assets/images/background.webp';

const Mobile = ({children}) => {
    const location = useLocation();
    const { authState } = useContext(AuthContext);


    return (
<div className='relative w-full h-dvh'>
    <div className='absolute inset-0' style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', opacity: 0.35 }} />
    <div className='relative'>
        <Link to='/'>
          <img src={Logo} className="flex items-center mx-auto mt-0 scale-75" alt="Coworqueen logo" />
        </Link>
            {children}
            <div className='fixed bottom-0 flex items-center justify-around w-full h-12 text-2xl bg-[#171717] text-[#e4e4e4]'>
                <Link to='/'>
                    {/* <FaHome className={location.pathname === '/' ? 'text-[#B39700]' : ''} /> */}
                    <img src={coworqueen} height={24} width={24} alt="Coworqueen" />

                </Link>
                <FaEye />
                <FaBookmark />
                <Link to='/profile'>
                {authState.user.avatar ? (
                    <img src={authState.user.avatar} width={24} height={24} className='rounded-full aspect-square' alt="Avatar del usuario" />
                ) : (
                    <FaUserCircle className={location.pathname === '/register' || location.pathname === '/validate' || location.pathname === '/register' || location.pathname === '/forgot-password' || location.pathname === '/reset-password' || location.pathname === '/change-password' ? 'text-[#B39700]' : ''} />
                )}
                </Link>
                </div>
                </div>
        </div>
    )
}

export default Mobile;