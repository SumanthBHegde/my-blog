import React from "react";

const NavItemCollapse = ({
  title,
  children,
  icon,
  name,
  activeNavName,
  setActiveNavName,
}) => {
  const isActive = name === activeNavName;

  return (
    <div className="min-h-0 rounded-xl overflow-hidden">
      <div
        className={`flex items-center gap-x-3 py-3 px-4 text-base font-semibold cursor-pointer transition-all duration-300 rounded-xl ${
          isActive
            ? "bg-gradient-to-r from-forest-600 to-forest-700 text-white shadow-lg shadow-forest-600/30"
            : "text-forest-700 hover:bg-forest-50"
        }`}
        onClick={() => setActiveNavName(name)}
      >
        <span className={isActive ? "text-white" : "text-forest-600"}>
          {icon}
        </span>
        {title}
        <span
          className={`ml-auto transition-transform duration-300 ${
            isActive ? "rotate-180" : ""
          }`}
        >
          {isActive ? "▲" : "▼"}
        </span>
      </div>
      {isActive && (
        <div className="flex flex-col mt-2 gap-y-1 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
};

export default NavItemCollapse;
