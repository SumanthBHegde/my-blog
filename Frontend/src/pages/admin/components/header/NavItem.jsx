import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({
  link,
  title,
  icon,
  name,
  activeNavName,
  setActiveNavName,
}) => {
  return (
    <NavLink
      to={link}
      className={`${
        name === activeNavName
          ? "bg-gradient-to-r from-forest-600 to-forest-700 text-white shadow-lg shadow-forest-600/30"
          : "text-forest-700 hover:bg-forest-50"
      } flex items-center gap-x-3 py-3 px-4 text-base font-semibold rounded-xl transition-all duration-300 transform hover:translate-x-1`}
      onClick={() => setActiveNavName(name)}
    >
      <span
        className={name === activeNavName ? "text-white" : "text-forest-600"}
      >
        {icon}
      </span>
      {title}
    </NavLink>
  );
};

export default NavItem;
