import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaEye, FaBookmark, FaUserCircle } from "react-icons/fa";


const Mobile = ({children}) => {
    return (
        <div className='w-full h-dvh'>
            {children}
            <div className='fixed bottom-0 flex items-center justify-around w-full h-12 text-2xl bg-[#171717] text-[#e4e4e4]'>
                <Link to='/'>
                    <FaHome />
                </Link>
                <FaEye />
                <FaBookmark />
                <FaUserCircle />    
            </div>
        </div>
    )
}

export default Mobile;