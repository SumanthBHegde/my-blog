import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../../components/MainLayout";
import { login } from "../../services/index/users";
import { userActions } from "../../store/reducers/userReducers";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [currentEmail, setCurrentEmail] = useState("");

  // Mutation hook for handling login request
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => {
      return login({ email, password });
    },
    onSuccess: (data) => {
      if (data.verified === false) {
        // User not verified, redirect to verification page
        localStorage.setItem("verificationEmail", data.email || currentEmail);
        toast.error("Please verify your email before logging in");
        navigate("/verify-email", {
          state: { email: data.email || currentEmail },
        });
        return;
      }
      // Dispatch action to store user info and save to local storage
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
    },
    onError: (error) => {
      // Display error toast message
      toast.error(error.message);
    },
  });

  // Redirect user if already logged in
  useEffect(() => {
    if (userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  // Form control hook
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  // Form submit handler
  const submitHandler = (data) => {
    const { email, password } = data;
    setCurrentEmail(email);
    mutate({ email, password });
  };

  return (
    <MainLayout>
      {/* Main layout component */}
      <section className="min-h-screen py-6 sm:py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-forest-50/20 via-white to-forest-50/10">
        {/* Login form container */}
        <div className="container mx-auto max-w-md">
          <div className="bg-white rounded-lg sm:rounded-xl p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow">
            {/* Form Header */}
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-hard mb-2">
                Welcome Back
              </h1>
              <p className="text-sm sm:text-base text-dark-light">
                Sign in to your account to continue
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="space-y-4 sm:space-y-5"
            >
              {/* Email field */}
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
                  // Register email field with validation rules
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
                  // Apply conditional border color based on validation status
                  className={`placeholder:text-gray-400 text-dark-hard text-sm sm:text-base rounded-lg px-4 py-2.5 sm:py-3 font-medium outline-none border transition-colors ${
                    errors.email
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  }`}
                />
                {/* Display error message if validation fails */}
                {errors.email?.message && (
                  <p className="mt-1.5 text-xs sm:text-sm text-red-500">
                    {errors.email?.message}
                  </p>
                )}
              </div>
              {/* End of email field */}

              {/* Password field */}
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-sm sm:text-base font-semibold text-dark-hard mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  // Register password field with validation rules
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    minLength: {
                      value: 6,
                      message: "Password length must be at least 6 characters",
                    },
                  })}
                  placeholder="Enter password"
                  // Apply conditional border color based on validation status
                  className={`placeholder:text-gray-400 text-dark-hard text-sm sm:text-base rounded-lg px-4 py-2.5 sm:py-3 font-medium outline-none border transition-colors ${
                    errors.password
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  }`}
                />
                {/* Display error message if validation fails */}
                {errors.password?.message && (
                  <p className="mt-1.5 text-xs sm:text-sm text-red-500">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              {/* End of password field */}

              {/* Link to forgot password page */}
              <div className="text-right">
                <Link
                  to="/forget-password"
                  className="text-xs sm:text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={!isValid || isLoading}
                className="w-full px-6 py-3 sm:py-3.5 text-sm sm:text-base lg:text-lg font-semibold text-white rounded-lg bg-primary hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>

              {/* Link to registration page */}
              <p className="text-center text-xs sm:text-sm font-medium text-dark-light pt-2">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary font-semibold hover:text-primary/80 transition-colors"
                >
                  Register now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default LoginPage;
