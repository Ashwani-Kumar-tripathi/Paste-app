import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex flex-wrap items-center justify-center p-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white gap-6 sm:flex-row sm:gap-10">
      <NavLink className="hover:text-yellow-400 text-lg sm:text-xl" to="/">
        Home
      </NavLink>

      <NavLink className="hover:text-yellow-400 text-lg sm:text-xl" to="/paste">
        Paste
      </NavLink>

      <NavLink className="hover:text-yellow-400 text-lg sm:text-xl" to="/contact">
        Contact Me
      </NavLink>
    </div>
  );
};

export default Navbar;

