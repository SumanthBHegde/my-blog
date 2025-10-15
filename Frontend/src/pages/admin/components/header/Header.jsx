import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import { AiFillDashboard, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaComments, FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

import NavItem from "./NavItem";
import NavItemCollapse from "./NavItemCollapse";
import { images } from "../../../../constants";
import { createPost } from "../../../../services/index/posts";

const Header = () => {
  // Hook for navigation
  const navigate = useNavigate();

  // Redux state for user information
  const userState = useSelector((state) => state.user);

  // Query client for managing queries
  const queryClient = useQueryClient();

  // State variables for menu and active navigation item
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeNavName, setActiveNavName] = useState("dashboard");

  // Hook for getting window size
  const windowSize = useWindowSize();

  // Mutation for creating a new post
  const { mutate: mutateCreatePost, isLoading: isLoadingCreatePost } =
    useMutation({
      mutationFn: ({ token }) => {
        return createPost({
          token,
        });
      },
      onSuccess: (data) => {
        // Invalidate the posts query and navigate to the newly created post
        queryClient.invalidateQueries(["posts"]);
        toast.success("Post is created, edit that now!");
        navigate(`/admin/posts/manage/edit/${data.slug}`);
      },
      onError: (error) => {
        // Show an error toast if the mutation fails
        toast.error(error.message);
      },
    });

  // Toggle menu handler
  const toggleMenuHandler = () => {
    setIsMenuActive((prevState) => !prevState);
  };

  // useEffect to handle menu visibility based on window size
  useEffect(() => {
    if (windowSize.width < 1024) {
      setIsMenuActive(false);
    } else {
      setIsMenuActive(true);
    }
  }, [windowSize.width]);

  // Function to handle the creation of a new post
  const handleCreateNewPost = ({ token }) => {
    mutateCreatePost({ token });
  };

  return (
    <header className="flex h-fit w-full items-center justify-between p-4 bg-white border-b-2 border-forest-200 shadow-sm lg:min-h-screen lg:max-w-[300px] lg:flex-col lg:items-start lg:justify-start lg:p-0 lg:border-r-2 lg:border-b-0 lg:shadow-xl">
      {/* Logo */}
      <Link to="/">
        <img src={images.logo} alt="logo" className="w-32 lg:hidden" />
      </Link>
      {/* Menu burger icon */}
      <div className="cursor-pointer lg:hidden">
        {isMenuActive ? (
          <AiOutlineClose
            className="w-6 h-6 transition-colors text-forest-700 hover:text-forest-900"
            onClick={toggleMenuHandler}
          />
        ) : (
          <AiOutlineMenu
            className="w-6 h-6 transition-colors text-forest-700 hover:text-forest-900"
            onClick={toggleMenuHandler}
          />
        )}
      </div>
      {/* Sidebar container */}
      {isMenuActive && (
        <div className="fixed inset-0 lg:static lg:min-h-screen lg:w-full">
          {/* Underlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={toggleMenuHandler}
          />
          {/* Sidebar */}
          <div className="fixed top-0 bottom-0 left-0 z-50 w-3/4 p-6 overflow-y-auto bg-gradient-to-b from-white via-forest-50/30 to-forest-50 shadow-2xl lg:static lg:min-h-screen lg:w-full lg:p-6">
            <Link to="/" className="block mb-8">
              <img
                src={images.logo}
                alt="logo"
                className="w-32 transition-transform hover:scale-105"
              />
            </Link>
            <h4 className="mt-10 mb-2 text-xs font-bold tracking-wider uppercase text-forest-600">
              Main Menu
            </h4>
            <div className="w-12 h-1 mb-6 rounded-full bg-gradient-to-r from-forest-600 to-forest-400"></div>
            {/* Menu items */}
            <div className="mt-6 flex flex-col gap-y-1">
              {/* Dashboard item */}
              <NavItem
                title="Dashboard"
                link="/admin"
                icon={<AiFillDashboard className="text-xl" />}
                name="dashboard"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />
              {/* Comments item */}
              <NavItem
                title="Comments"
                link="/admin/comments"
                icon={<FaComments className="text-xl" />}
                name="comments"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />
              {/* Posts item with collapse functionality */}
              <NavItemCollapse
                title="Posts"
                icon={<MdDashboard className="text-xl" />}
                name="posts"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              >
                {/* Link to manage all posts */}
                <Link
                  to="/admin/posts/manage"
                  className="pl-8 py-2 text-sm transition-all duration-200 text-forest-700 hover:text-forest-900 hover:bg-forest-50 rounded-lg flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-forest-400"></span>
                  Manage all posts
                </Link>
                {/* Button to add a new post */}
                <button
                  disabled={isLoadingCreatePost}
                  className="pl-8 py-2 text-sm text-start transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-forest-700 hover:text-forest-900 hover:bg-forest-50 rounded-lg flex items-center gap-2"
                  onClick={() =>
                    handleCreateNewPost({ token: userState.userInfo.token })
                  }
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-forest-400"></span>
                  Add New Post
                </button>
                <Link
                  to="/admin/categories/manage"
                  className="pl-8 py-2 text-sm transition-all duration-200 text-forest-700 hover:text-forest-900 hover:bg-forest-50 rounded-lg flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-forest-400"></span>
                  Categories
                </Link>
              </NavItemCollapse>
              <NavItem
                title="Users"
                link="/admin/users/manage"
                icon={<FaUser className="text-xl" />}
                name="users"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
