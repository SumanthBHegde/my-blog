import React, { useState } from 'react';
import {images} from "../constants";
import { IoMdMenu,IoMdClose,IoMdArrowDown } from "react-icons/io";

const navItemsInfo = [
    {name: "Home",type: "link" },
    {name: "Article",type: "link"},
    {name: "Pages",type: "dropdown", items: ["About Us", "Contact Us"]},
    {name: "Faq",type: "link"},
    {name: "Pricing",type: "link"},
];

const NavItem = ({ item }) => {
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdownHandler = () => {
    setDropdown((prevState) => !prevState);
  };

  return (
    <li className="relative group">
      {item.type === "link" ? (
        <>
          <a href="/" className="px-4 py-2">
            {item.name}
          </a>
          <span className="cursor-pointer text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100">
            |
          </span>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <button
            className="px-4 py-2 flex gap-x-1 items-center"
            onClick={toggleDropdownHandler}
          >
            <span>{item.name}</span>
            <IoMdArrowDown />
          </button>
          <div
            className={`${
              dropdown ? "block" : "hidden"
            } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
          >
            <ul className="bg-dark-soft lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
              {item.items.map((page, index) => ( 
                  <a
                    href="/"
                    key={index}
                    className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-hard"
                  >
                    {page}
                  </a>
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
};


const Header = () => {
  const [navIsVisible, setNavIsVisible] =  useState(false);

  const navVisibilityHandler = () => {
    setNavIsVisible((curState) => {
      return !curState;
    });
  };

  return (
    <section className="sticky top-0 left-0 right-0 z-50">
      <header className="container mx-auto px-5 flex justify-between py-4 items-center bg-gradient-to-r from-stone-100 to-lime-100">
        <div className="relative overflow-hidden">
            <img className="object-cover rounded-2xl backdrop-blur-sm" src={images.logo} alt="logo"/>
        </div>
        <div className="lg:hidden z-50">
          {navIsVisible ? <IoMdClose className="w-6 h-6" onClick={navVisibilityHandler}/> : <IoMdMenu className="w-6 h-6" onClick={navVisibilityHandler}/>}
        </div>
        <div className={`${navIsVisible ? "right-0" : "-right-full"} bg-dark-hard lg:bg-transparent transition-all duration-300 mt-[56px] lg:mt-0 z-49 flex flex-col w-full lg:w-auto justify-center lg:justify-end  lg:flex-row fixed top-0 bottom-0 lg:static gap-x-9 items-center`}>
            <ul className="items-center gap-y-5 text-white lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
                {navItemsInfo.map((item)=> (
                    <NavItem key={item.name} item={item}/>
                ))}
            </ul>
            <button className="mt-5 lg:mt-0 border-2 border-blue-600 px-6 py-2 rounded-full text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300">Sign In</button>
        </div>
      </header>
    </section>
  )
}

export default Header;