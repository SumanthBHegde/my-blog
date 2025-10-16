import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FiPlus,
  FiEdit,
  FiUsers,
  FiMessageSquare,
  FiFileText,
  FiTrendingUp,
} from "react-icons/fi";

import { getAllPosts, createPost } from "../../../services/index/posts";
import { getAllComments } from "../../../services/index/comments";
import { getAllUsers } from "../../../services/index/users";

const Admin = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();

  // Mutation for creating a new post
  const { mutate: mutateCreatePost, isLoading: isLoadingCreatePost } =
    useMutation({
      mutationFn: ({ token }) => {
        return createPost({ token });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["posts"]);
        toast.success("Post created! Edit it now.");
        navigate(`/admin/posts/manage/edit/${data.slug}`);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  // Fetch posts data for statistics
  const { data: postsData, isLoading: postsLoading } = useQuery({
    queryFn: () => getAllPosts("", 1, 1), // Get just one post to access headers
    queryKey: ["admin-posts-stats"],
  });

  // Fetch comments data for statistics
  const { data: commentsData, isLoading: commentsLoading } = useQuery({
    queryFn: () => getAllComments(userState.userInfo.token, "", 1, 1), // Get just one comment
    queryKey: ["admin-comments-stats"],
  });

  // Fetch users data for statistics
  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryFn: () => getAllUsers(userState.userInfo.token, "", 1, 1), // Get just one user
    queryKey: ["admin-users-stats"],
  });

  // Extract statistics from response headers
  const totalPosts = postsData?.headers?.["x-totalcount"] || "0";
  const totalComments = commentsData?.headers?.["x-totalcount"] || "0";
  const totalUsers = usersData?.headers?.["x-totalcount"] || "0";

  const stats = [
    {
      title: "Total Posts",
      value: totalPosts,
      icon: FiFileText,
      color: "from-forest-500 to-forest-600",
      bgColor: "bg-gradient-to-r from-forest-50 to-forest-100",
      link: "/admin/posts/manage",
    },
    {
      title: "Total Comments",
      value: totalComments,
      icon: FiMessageSquare,
      color: "from-earth-500 to-earth-600",
      bgColor: "bg-gradient-to-r from-earth-50 to-earth-100",
      link: "/admin/comments",
    },
    {
      title: "Total Users",
      value: totalUsers,
      icon: FiUsers,
      color: "from-forest-600 to-forest-700",
      bgColor: "bg-gradient-to-r from-forest-100 to-forest-200",
      link: "/admin/users/manage",
    },
    {
      title: "Categories",
      value: "8",
      icon: FiTrendingUp,
      color: "from-earth-600 to-earth-700",
      bgColor: "bg-gradient-to-r from-earth-100 to-earth-200",
      link: "/admin/categories/manage",
    },
  ];

  const quickActions = [
    {
      title: "Create New Post",
      description: "Write and publish a new Bhāga post",
      icon: FiPlus,
      color: "bg-gradient-to-r from-forest-600 to-forest-700",
      hoverColor: "hover:from-forest-700 hover:to-forest-800",
      action: () => mutateCreatePost({ token: userState.userInfo.token }),
      loading: isLoadingCreatePost,
    },
    {
      title: "Manage Posts",
      description: "Edit, delete, or update existing posts",
      icon: FiEdit,
      color: "bg-gradient-to-r from-earth-600 to-earth-700",
      hoverColor: "hover:from-earth-700 hover:to-earth-800",
      action: () => navigate("/admin/posts/manage"),
    },
    {
      title: "Moderate Comments",
      description: "Approve or reject user comments",
      icon: FiMessageSquare,
      color: "bg-gradient-to-r from-forest-700 to-forest-800",
      hoverColor: "hover:from-forest-800 hover:to-forest-900",
      action: () => navigate("/admin/comments"),
    },
    {
      title: "Manage Users",
      description: "View and manage user accounts",
      icon: FiUsers,
      color: "bg-gradient-to-r from-earth-700 to-earth-800",
      hoverColor: "hover:from-earth-800 hover:to-earth-900",
      action: () => navigate("/admin/users/manage"),
    },
  ];

  if (postsLoading || commentsLoading || usersLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-forest-50 rounded-2xl">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-b-2 rounded-full animate-spin border-forest-600"></div>
          <p className="font-medium text-forest-800">
            Loading dashboard data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="p-8 border bg-gradient-to-r from-forest-50 via-earth-50 to-forest-100 rounded-2xl border-forest-200/50">
        <h1 className="mb-2 text-3xl font-bold text-forest-800">
          Welcome back, {userState.userInfo?.name}!
        </h1>
        <p className="text-lg text-forest-600">
          Here's what's happening with Bhāga today.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className={`${stat.bgColor} rounded-xl p-6 border border-forest-200/50 hover:shadow-lg transition-all duration-300 hover:scale-105 group`}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-lg bg-gradient-to-r ${stat.color} text-white group-hover:scale-110 transition-transform duration-300`}
              >
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-forest-800">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-forest-600">
                  {stat.title}
                </p>
              </div>
            </div>
            <div className="w-full h-2 rounded-full bg-forest-200">
              <div
                className={`bg-gradient-to-r ${stat.color} h-2 rounded-full transition-all duration-500`}
                style={{ width: "75%" }}
              ></div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="p-8 bg-white border shadow-sm rounded-2xl border-forest-200/50">
        <h2 className="mb-6 text-2xl font-bold text-forest-800">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              disabled={action.loading}
              className={`${action.color} ${action.hoverColor} text-white rounded-xl p-6 text-left transition-all duration-300 hover:scale-105 hover:shadow-lg group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 transition-transform duration-300 rounded-lg bg-white/20 group-hover:scale-110">
                  {action.loading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <action.icon className="w-6 h-6" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-semibold">
                    {action.loading ? "Creating..." : action.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/80">
                    {action.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="p-8 border bg-gradient-to-r from-earth-50 to-forest-50 rounded-2xl border-earth-200/50">
        <h2 className="mb-6 text-2xl font-bold text-earth-800">
          Recent Activity
        </h2>
        <div className="space-y-4">
          <div className="flex items-center p-4 space-x-4 bg-white border rounded-lg border-earth-200/50">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-forest-500 to-forest-600">
              <FiFileText className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-earth-800">New post published</p>
              <p className="text-sm text-earth-600">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center p-4 space-x-4 bg-white border rounded-lg border-earth-200/50">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-earth-500 to-earth-600">
              <FiMessageSquare className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-earth-800">
                5 new comments awaiting approval
              </p>
              <p className="text-sm text-earth-600">4 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
