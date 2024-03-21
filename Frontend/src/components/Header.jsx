import React, { useState } from "react";
import { IoMdMenu, IoMdClose, IoMdArrowDown } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

//reducer actions
import { logout } from "../store/actions/userActions";

import { images } from "../constants";

const navItemsInfo = [
  { name: "Home", type: "link", href: "/" },
  { name: "Article", type: "link", href: "/articles" },
  {
    name: "Pages",
    type: "dropdown",
    items: [
      { title: "About Us", href: "/about" },
      { title: "Contact Us", href: "contact" },
    ],
  },
  { name: "Faq", type: "link", href: "/faq" },
  { name: "Pricing", type: "link", href: "/pricing" },
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
          <Link to={item.href} className="px-4 py-2">
            {item.name}
          </Link>
          <span className="cursor-pointer text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100">
            |
          </span>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <button
            className="flex items-center px-4 py-2 gap-x-1"
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
            <ul className="flex flex-col overflow-hidden text-center rounded-lg shadow-lg bg-dark-soft lg:bg-white">
              {item.items.map((page, index) => (
                <Link
                  to={page.href}
                  key={index}
                  className="px-4 py-2 text-white hover:bg-dark-hard hover:text-white lg:text-dark-hard"
                >
                  {page.title}
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [navIsVisible, setNavIsVisible] = useState(false);
  const userState = useSelector((state) => state.user);
  const [profileDrowpdown, setProfileDrowpdown] = useState(false);

  const navVisibilityHandler = () => {
    setNavIsVisible((curState) => {
      return !curState;
    });
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <section className="sticky top-0 left-0 right-0 z-50">
      <header className="container flex items-center justify-between px-5 py-4 mx-auto bg-gradient-to-r from-stone-100 to-lime-100">
        <Link to="/" className="relative overflow-hidden">
          <img
            className="object-cover rounded-2xl backdrop-blur-sm"
            src={images.logo}
            alt="logo"
          />
        </Link>
        <div className="z-50 lg:hidden">
          {navIsVisible ? (
            <IoMdClose className="w-6 h-6" onClick={navVisibilityHandler} />
          ) : (
            <IoMdMenu className="w-6 h-6" onClick={navVisibilityHandler} />
          )}
        </div>
        <div
          className={`${
            navIsVisible ? "right-0" : "-right-full"
          } bg-dark-hard lg:bg-transparent transition-all duration-300 mt-[56px] lg:mt-0 z-49 flex flex-col w-full lg:w-auto justify-center lg:justify-end  lg:flex-row fixed top-0 bottom-0 lg:static gap-x-9 items-center`}
        >
          <ul className="flex flex-col items-center font-semibold text-white gap-y-5 lg:text-dark-soft lg:flex-row gap-x-2">
            {navItemsInfo.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </ul>
          {userState.userInfo ? (
            <div className="flex flex-col items-center font-semibold text-white gap-y-5 lg:text-dark-soft lg:flex-row gap-x-2">
              <div className="relative group">
                <div className="flex flex-col items-center">
                  <button
                    className="flex items-center px-6 py-2 mt-5 font-semibold text-blue-500 transition-all duration-300 border-2 border-blue-500 rounded-full gap-x-1 lg:mt-0 hover:bg-blue-500 hover:text-white"
                    onClick={() => setProfileDrowpdown(!profileDrowpdown)}
                  >
                    <span>Account</span>
                    <IoMdArrowDown />
                  </button>
                  <div
                    className={`${
                      profileDrowpdown ? "block" : "hidden"
                    } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
                  >
                    <ul className="flex flex-col overflow-hidden text-center rounded-lg shadow-lg bg-dark-soft lg:bg-transparent">
                      <button
                        onClick={() => navigate("/profile")}
                        type="button"
                        className="px-4 py-2 text-white hover:bg-dark-hard hover:text-white lg:text-dark-soft"
                      >
                        Profile
                      </button>
                      <button
                        onClick={logoutHandler}
                        type="button"
                        className="px-4 py-2 text-white hover:bg-dark-hard hover:text-white lg:text-dark-soft"
                      >
                        Logout
                      </button>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 mt-5 font-semibold text-blue-500 transition-all duration-300 border-2 border-blue-500 rounded-full lg:mt-0 hover:bg-blue-500 hover:text-white"
            >
              Sign in
            </button>
          )}
        </div>
      </header>
    </section>
  );
};

export default Header;
