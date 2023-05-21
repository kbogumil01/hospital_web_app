import React from 'react'
import { useNavigate } from 'react-router';

const Navbar = () => {
  const navigate=useNavigate();
  return (
    <div className="bg-blue-950">
        <div className='h-16 px-8 flex items-center'>
            <p onClick={()=>navigate("/")} 
            className='text-white font-bold hover:text-yellow-300 cursor-pointer'>Medical Information System</p>
        </div>
    </div>
  );
}

export default Navbar