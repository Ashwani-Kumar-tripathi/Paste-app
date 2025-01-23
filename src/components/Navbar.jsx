import React from 'react'
import { NavLink } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className='flex align-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500k text-white space-x-20' > 
      <NavLink className="hover:text-yellow-400" to="/">
        Home
      </NavLink>

      <NavLink className='hover:text-yellow-400' to="/paste">
        Paste
      </NavLink>

      <NavLink className='hover:text-yellow-400' to="/Contact">
        Contact me
      </NavLink>
    </div>
  )
}

export default Navbar
