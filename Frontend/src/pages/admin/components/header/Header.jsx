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
        console.log(error);
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
    <header className="flex h-fit w-full items-center justify-between p-4 bg-gradient-to-r from-stone-100 to-lime-100 lg:h-full lg:max-w-[300px] lg:flex-col lg:items-start lg:justify-start lg:p-0 ">
      {/* Logo */}
      <Link to="/">
        <img src={images.logo} alt="logo" className="w-32 lg:hidden" />
      </Link>
      {/* Menu burger icon */}
      <div className="cursor-pointer lg:hidden">
        {isMenuActive ? (
          <AiOutlineClose className="w-6 h-6" onClick={toggleMenuHandler} />
        ) : (
          <AiOutlineMenu className="w-6 h-6" onClick={toggleMenuHandler} />
        )}
      </div>
      {/* Sidebar container */}
      {isMenuActive && (
        <div className="fixed inset-0 lg:static lg:h-full lg:w-full">
          {/* Underlay */}
          <div
            className="fixed inset-0 bg-black opacity-50 lg:hidden"
            onClick={toggleMenuHandler}
          />
          {/* Sidebar */}
          <div className="fixed top-0 bottom-0 left-0 z-50 w-3/4 p-4 overflow-y-auto bg-white lg:static lg:h-full lg:w-full lg:p-6 lg:bg-gradient-to-b from-stone-100 to-lime-100">
            <Link to="/">
              <img src={images.logo} alt="logo" className="w-32" />
            </Link>
            <h4 className="mt-10 font-bold text-[#C7C7C7]">MAIN MENU</h4>
            {/* Menu items */}
            <div className="mt-6 flex flex-col gap-y-[0.563rem]">
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
                <Link to="/admin/posts/manage">Manage all posts</Link>
                {/* Button to add a new post */}
                <button
                  disabled={isLoadingCreatePost}
                  className="text-start disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={() =>
                    handleCreateNewPost({ token: userState.userInfo.token })
                  }
                >
                  Add New Post
                </button>
                <Link to="/admin/categories/manage">Categories</Link>
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
