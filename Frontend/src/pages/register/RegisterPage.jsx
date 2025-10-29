import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import MainLayout from "../../components/MainLayout";
import { signup } from "../../services/index/users";

const RegisterPage = () => {
  // useForm hook for managing form state and validation
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return signup({ name, email, password });
    },
    onSuccess: (data) => {
      // Store email for verification
      localStorage.setItem("verificationEmail", data.email);
      toast.success(
        "Registration successful! Please check your email for verification code."
      );
      navigate("/verify-email", { state: { email: data.email } });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  // Submit handler function
  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };

  // Watch password field for changes
  const password = watch("password");

  return (
    <MainLayout>
      {/* Main layout component */}
      <section className="min-h-screen py-6 sm:py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-forest-50/20 via-white to-forest-50/10">
        {/* Registration form container */}
        <div className="container mx-auto max-w-md">
          <div className="bg-white rounded-lg sm:rounded-xl p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow">
            {/* Form Header */}
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-hard mb-2">
                Create Account
              </h1>
              <p className="text-sm sm:text-base text-dark-light">
                Join us to start your journey
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="space-y-4 sm:space-y-5"
            >
              {/* Name field */}
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
                  // Register name field with validation rules
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
                  // Apply conditional border color based on validation status
                  className={`placeholder:text-gray-400 text-dark-hard text-sm sm:text-base rounded-lg px-4 py-2.5 sm:py-3 font-medium outline-none border transition-colors ${
                    errors.name
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  }`}
                />
                {/* Display error message if validation fails */}
                {errors.name?.message && (
                  <p className="mt-1.5 text-xs sm:text-sm text-red-500">
                    {errors.name?.message}
                  </p>
                )}
              </div>
              {/* End of name field */}

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

              {/* Confirm password field */}
              <div className="flex flex-col">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm sm:text-base font-semibold text-dark-hard mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  // Register confirm password field with validation rules
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "Confirm password is required",
                    },
                    validate: (value) => {
                      if (value !== password) {
                        return "Passwords do not match";
                      }
                    },
                  })}
                  placeholder="Enter confirm password"
                  // Apply conditional border color based on validation status
                  className={`placeholder:text-gray-400 text-dark-hard text-sm sm:text-base rounded-lg px-4 py-2.5 sm:py-3 font-medium outline-none border transition-colors ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  }`}
                />
                {/* Display error message if validation fails */}
                {errors.confirmPassword?.message && (
                  <p className="mt-1.5 text-xs sm:text-sm text-red-500">
                    {errors.confirmPassword?.message}
                  </p>
                )}
              </div>
              {/* End of confirm password field */}

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
                {isLoading ? "Creating account..." : "Create Account"}
              </button>

              {/* Link to login page */}
              <p className="text-center text-xs sm:text-sm font-medium text-dark-light pt-2">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary font-semibold hover:text-primary/80 transition-colors"
                >
                  Login now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default RegisterPage;
