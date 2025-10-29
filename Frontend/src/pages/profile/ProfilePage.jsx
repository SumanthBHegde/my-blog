import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useMemo } from "react";

import MainLayout from "../../components/MainLayout";
import ProfilePicture from "../../components/ProfilePicture";
import BreadCrumbs from "../../components/BreadCrumbs";

import { userActions } from "../../store/reducers/userReducers";
import { getUserProfile, updateProfile } from "../../services/index/users";

const ProfilePage = () => {
  const navigate = useNavigate(); // Navigation hook from React Router
  const dispatch = useDispatch(); // Redux dispatch function
  const queryClient = useQueryClient(); // Query client for React Query
  const userState = useSelector((state) => state.user); // Select user state from Redux store

  const breadCrumbsData = [
    { name: "Home", link: "/" },
    { name: "Profile", link: "/profile" },
  ];

  // Fetching user profile data using React Query
  const { data: profileData, isLoading: profileIsLoading } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
  });

  // Mutation for updating user profile using React Query
  const { mutate, isLoading: updateProfileIsLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return updateProfile({
        token: userState.userInfo.token,
        userData: { name, email, password },
        userId: userState.userInfo._id,
      });
    },
    onSuccess: (data) => {
      // Dispatch action to update user info in Redux store
      dispatch(userActions.setUserInfo(data));
      // Store updated user info in local storage
      localStorage.setItem("account", JSON.stringify(data));
      // Invalidate profile query to force refetch
      queryClient.invalidateQueries(["profile"]);
      // Show success toast notification
      toast.success("Profile is updated");
    },
    onError: (error) => {
      // Show error toast notification
      toast.error(error.message);
    },
  });

  // Redirect to home page if user is not logged in
  useEffect(() => {
    if (!userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  // Form control with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    values: useMemo(() => {
      return {
        name: profileIsLoading ? "" : profileData.name,
        email: profileIsLoading ? "" : profileData.email,
      };
    }, [profileData?.email, profileData?.name, profileIsLoading]),
    mode: "onChange",
  });

  // Form submission handler
  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };

  return (
    <MainLayout>
      <section className="min-h-screen py-6 sm:py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-forest-50/20 via-white to-forest-50/10">
        <div className="container mx-auto max-w-2xl">
          <BreadCrumbs data={breadCrumbsData} />

          {/* Page Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-hard mb-2">
              Profile Settings
            </h1>
            <p className="text-sm sm:text-base text-dark-light">
              Manage your account information and preferences
            </p>
          </div>

          {/* Profile Picture Card */}
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-dark-hard mb-4">
              Profile Picture
            </h2>
            <ProfilePicture avatar={profileData?.avatar} />
          </div>

          {/* Profile Form Card */}
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow">
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="space-y-4 sm:space-y-5"
            >
              {/* Name Field */}
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="text-sm sm:text-base font-semibold text-dark-hard mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    minLength: {
                      value: 1,
                      message: "Name length must be at least 1 character",
                    },
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  })}
                  placeholder="Enter name"
                  className={`placeholder:text-gray-400 text-dark-hard text-sm sm:text-base rounded-lg px-4 py-2.5 sm:py-3 font-medium outline-none border transition-colors ${
                    errors.name
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  }`}
                />
                {errors.name?.message && (
                  <p className="mt-1.5 text-xs sm:text-sm text-red-500">
                    {errors.name?.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-sm sm:text-base font-semibold text-dark-hard mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Enter a valid email",
                    },
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                  })}
                  placeholder="Enter email"
                  className={`placeholder:text-gray-400 text-dark-hard text-sm sm:text-base rounded-lg px-4 py-2.5 sm:py-3 font-medium outline-none border transition-colors ${
                    errors.email
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  }`}
                />
                {errors.email?.message && (
                  <p className="mt-1.5 text-xs sm:text-sm text-red-500">
                    {errors.email?.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-sm sm:text-base font-semibold text-dark-hard mb-2"
                >
                  New Password{" "}
                  <span className="text-gray-500 font-normal">(optional)</span>
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  placeholder="Enter new password"
                  className={`placeholder:text-gray-400 text-dark-hard text-sm sm:text-base rounded-lg px-4 py-2.5 sm:py-3 font-medium outline-none border transition-colors ${
                    errors.password
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  }`}
                />
                {errors.password?.message && (
                  <p className="mt-1.5 text-xs sm:text-sm text-red-500">
                    {errors.password?.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={
                  !isValid || profileIsLoading || updateProfileIsLoading
                }
                className="w-full px-6 py-3 sm:py-3.5 text-sm sm:text-base lg:text-lg font-semibold text-white rounded-lg bg-primary hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
              >
                {updateProfileIsLoading ? "Updating..." : "Update Profile"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProfilePage;
