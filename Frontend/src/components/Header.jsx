import React, { useState } from "react";
import { IoMdMenu, IoMdClose, IoMdArrowDown } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// Redux actions for user authentication
import { logout } from "../store/actions/userActions";

import { images } from "../constants";

// Navigation items configuration for the header menu
// Each item can be a link or a dropdown with sub-items
const navItemsInfo = [
  { name: "Bhāga", type: "link", href: "/blog" },
  { name: "About Us", type: "link", href: "/about" },
  { name: "Contact Us", type: "link", href: "/contact" },
];

// Component for individual navigation items (link or dropdown)
const NavItem = ({ item }) => {
  const [dropdown, setDropdown] = useState(false);

  // Handler to toggle dropdown visibility
  const toggleDropdownHandler = () => {
    setDropdown((prevState) => !prevState);
  };

  return (
    <li className="relative group">
      {item.type === "link" ? (
        <>
          <Link
            to={item.href}
            className="relative px-4 py-2 font-medium transition-all duration-300 text-forest-700 hover:text-forest-600 hover:scale-105"
          >
            {item.name}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-forest-600 to-forest-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </>
      ) : (
        <div className="relative">
          <button
            className="flex items-center px-4 py-2 font-medium transition-all duration-300 text-forest-700 hover:text-forest-600 gap-x-1"
            onClick={toggleDropdownHandler}
          >
            <span>{item.name}</span>
            <IoMdArrowDown
              className={`transition-transform duration-300 ${
                dropdown ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`${
              dropdown
                ? "opacity-100 visible translate-y-0"
                : "opacity-0 invisible -translate-y-2"
            } absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-lg rounded-xl shadow-xl border border-slate-200/50 transition-all duration-300 z-50`}
          >
            <ul className="py-2">
              {item.items.map((page, index) => (
                <Link
                  to={page.href}
                  key={index}
                  className="block px-4 py-3 transition-all duration-200 text-forest-700 hover:bg-gradient-to-r hover:from-forest-50 hover:to-forest-100 hover:text-forest-600"
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
      <header className="border-b shadow-sm bg-white/80 backdrop-blur-lg border-slate-200/50">
        <div className="container flex items-center justify-between px-5 py-4 mx-auto">
          <Link to="/" className="relative overflow-hidden group">
            <img
              className="object-cover transition-transform duration-300 shadow-lg rounded-xl group-hover:scale-105"
              src={images.logo}
              alt="logo"
            />
          </Link>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={navVisibilityHandler}
              className="p-2 transition-all duration-200 transform rounded-lg bg-slate-100 hover:bg-forest-100 hover:shadow-md hover:scale-105"
            >
              {navIsVisible ? (
                <IoMdClose className="w-6 h-6 transition-colors duration-200 text-slate-700 hover:text-forest-700" />
              ) : (
                <IoMdMenu className="w-6 h-6 transition-colors duration-200 text-slate-700 hover:text-forest-700" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-8 lg:flex">
            <ul className="flex items-center space-x-6">
              {navItemsInfo.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </ul>

            {userState.userInfo ? (
              <div className="relative group">
                <button
                  className="flex items-center px-6 py-2.5 bg-gradient-to-r from-forest-600 to-forest-700 text-white font-semibold rounded-full hover:from-forest-700 hover:to-forest-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 gap-x-2"
                  onClick={() => setProfileDrowpdown(!profileDrowpdown)}
                >
                  <span>Account</span>
                  <IoMdArrowDown
                    className={`transition-transform duration-300 ${
                      profileDrowpdown ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`${
                    profileDrowpdown
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                  } absolute top-full right-0 mt-3 w-56 bg-white/95 backdrop-blur-lg rounded-xl shadow-xl border border-slate-200/50 transition-all duration-300 z-50`}
                >
                  <ul className="py-2">
                    {userState?.userInfo?.admin && (
                      <button
                        onClick={() => navigate("/admin")}
                        type="button"
                        className="w-full px-4 py-3 text-left transition-all duration-200 text-slate-700 hover:bg-gradient-to-r hover:from-forest-50 hover:to-forest-100 hover:text-forest-600"
                      >
                        Admin Dashboard
                      </button>
                    )}
                    <button
                      onClick={() => navigate("/profile")}
                      type="button"
                      className="w-full px-4 py-3 text-left transition-all duration-200 text-slate-700 hover:bg-gradient-to-r hover:from-forest-50 hover:to-forest-100 hover:text-forest-600"
                    >
                      Profile
                    </button>
                    <button
                      onClick={logoutHandler}
                      type="button"
                      className="w-full px-4 py-3 text-left transition-all duration-200 text-slate-700 hover:bg-red-50 hover:text-red-600"
                    >
                      Logout
                    </button>
                  </ul>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2.5 bg-gradient-to-r from-forest-600 to-forest-700 text-white font-semibold rounded-full hover:from-forest-700 hover:to-forest-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Sign in
              </button>
            )}
          </div>

          {/* Mobile Navigation */}
          <div
            className={`${
              navIsVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            } fixed inset-0 z-[9999] lg:hidden transition-all duration-300`}
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={navVisibilityHandler}
            ></div>
            <div className="absolute top-0 right-0 h-full overflow-y-auto bg-white shadow-2xl w-80">
              <div className="p-6">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-forest-100">
                  <h2 className="text-2xl font-bold text-forest-800">Menu</h2>
                  <button
                    onClick={navVisibilityHandler}
                    className="p-2 transition-all duration-200 transform rounded-lg hover:bg-forest-50 hover:shadow-md hover:scale-105"
                  >
                    <IoMdClose className="w-6 h-6 transition-colors duration-200 text-slate-700 hover:text-forest-700" />
                  </button>
                </div>

                <ul className="mb-8 space-y-2">
                  {navItemsInfo.map((item) => (
                    <li key={item.name} className="w-full">
                      <Link
                        to={item.href}
                        onClick={navVisibilityHandler}
                        className="block w-full px-4 py-3 text-base font-medium transition-all duration-200 transform rounded-lg text-forest-700 hover:bg-forest-50 hover:text-forest-600 hover:translate-x-1"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                {userState.userInfo ? (
                  <div className="pt-4 space-y-2 border-t border-forest-100">
                    <div className="px-4 py-2 mb-3">
                      <p className="text-xs font-semibold text-forest-500 uppercase tracking-wide">
                        Welcome to Bhāga
                      </p>
                      <p className="text-sm font-medium text-forest-800 mt-1">
                        {userState.userInfo.name}
                      </p>
                    </div>
                    {userState?.userInfo?.admin && (
                      <button
                        onClick={() => {
                          navigate("/admin");
                          navVisibilityHandler();
                        }}
                        type="button"
                        className="w-full px-4 py-3 text-base font-medium text-left transition-all duration-200 transform rounded-lg text-forest-700 hover:bg-forest-50 hover:text-forest-700 hover:translate-x-1"
                      >
                        Admin Dashboard
                      </button>
                    )}
                    <button
                      onClick={() => {
                        navigate("/profile");
                        navVisibilityHandler();
                      }}
                      type="button"
                      className="w-full px-4 py-3 text-base font-medium text-left transition-all duration-200 transform rounded-lg text-forest-700 hover:bg-forest-50 hover:text-forest-700 hover:translate-x-1"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        logoutHandler();
                        navVisibilityHandler();
                      }}
                      type="button"
                      className="w-full px-4 py-3 text-base font-medium text-left text-red-600 transition-all duration-200 transform rounded-lg hover:bg-red-50 hover:text-red-700 hover:translate-x-1"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-forest-100">
                    <button
                      onClick={() => {
                        navigate("/login");
                        navVisibilityHandler();
                      }}
                      className="w-full px-6 py-3 text-base font-semibold text-white transition-all duration-300 rounded-lg shadow-lg bg-gradient-to-r from-forest-600 to-forest-700 hover:from-forest-700 hover:to-forest-800"
                    >
                      Sign in
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </section>
  );
};

NavItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["link", "dropdown"]).isRequired,
    href: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

export default Header;
