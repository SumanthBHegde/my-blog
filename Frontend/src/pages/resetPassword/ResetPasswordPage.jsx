import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import MainLayout from "../../components/MainLayout";
import { resetPassword } from "../../services/index/users";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = location.state?.email || "";

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, resetCode, newPassword }) => {
      return resetPassword({ email, resetCode, newPassword });
    },
    onSuccess: (data) => {
      toast.success(data.message || "Password reset successful!");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      email: emailFromState,
      resetCode: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const newPassword = watch("newPassword");

  const submitHandler = (data) => {
    mutate({
      email: data.email,
      resetCode: data.resetCode,
      newPassword: data.newPassword,
    });
  };

  return (
    <MainLayout>
      <section className="min-h-screen py-6 sm:py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-forest-50/20 via-white to-forest-50/10">
        <div className="container mx-auto max-w-md">
          <div className="bg-white rounded-lg sm:rounded-xl p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow">
            {/* Form Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-forest-100 to-earth-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-hard mb-2">
                Reset Password
              </h1>
              <p className="text-sm sm:text-base text-dark-light">
                Enter the reset code sent to your email and create a new
                password.
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
                  Email Address
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
                  placeholder="Enter your email"
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

              {/* Reset Code field */}
              <div className="flex flex-col">
                <label
                  htmlFor="resetCode"
                  className="text-sm sm:text-base font-semibold text-dark-hard mb-2"
                >
                  Reset Code
                </label>
                <input
                  type="text"
                  id="resetCode"
                  {...register("resetCode", {
                    required: {
                      value: true,
                      message: "Reset code is required",
                    },
                    pattern: {
                      value: /^\d{6}$/,
                      message: "Reset code must be 6 digits",
                    },
                  })}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  className={`placeholder:text-gray-400 text-dark-hard text-sm sm:text-base rounded-lg px-4 py-2.5 sm:py-3 font-medium outline-none border transition-colors ${
                    errors.resetCode
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  }`}
                />
                {errors.resetCode?.message && (
                  <p className="mt-1.5 text-xs sm:text-sm text-red-500">
                    {errors.resetCode?.message}
                  </p>
                )}
              </div>

              {/* New Password field */}
              <div className="flex flex-col">
                <label
                  htmlFor="newPassword"
                  className="text-sm sm:text-base font-semibold text-dark-hard mb-2"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  {...register("newPassword", {
                    required: {
                      value: true,
                      message: "New password is required",
                    },
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  placeholder="Enter new password"
                  className={`placeholder:text-gray-400 text-dark-hard text-sm sm:text-base rounded-lg px-4 py-2.5 sm:py-3 font-medium outline-none border transition-colors ${
                    errors.newPassword
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  }`}
                />
                {errors.newPassword?.message && (
                  <p className="mt-1.5 text-xs sm:text-sm text-red-500">
                    {errors.newPassword?.message}
                  </p>
                )}
              </div>

              {/* Confirm Password field */}
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
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "Please confirm your password",
                    },
                    validate: (value) => {
                      if (value !== newPassword) {
                        return "Passwords do not match";
                      }
                    },
                  })}
                  placeholder="Confirm new password"
                  className={`placeholder:text-gray-400 text-dark-hard text-sm sm:text-base rounded-lg px-4 py-2.5 sm:py-3 font-medium outline-none border transition-colors ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  }`}
                />
                {errors.confirmPassword?.message && (
                  <p className="mt-1.5 text-xs sm:text-sm text-red-500">
                    {errors.confirmPassword?.message}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={!isValid || isLoading}
                className="w-full px-6 py-3 sm:py-3.5 text-sm sm:text-base lg:text-lg font-semibold text-white rounded-lg bg-primary hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>

              {/* Back to login link */}
              <div className="text-center pt-2">
                <Link
                  to="/login"
                  className="text-xs sm:text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back to Login
                </Link>
              </div>
            </form>
          </div>

          {/* Additional Help */}
          <div className="mt-6 text-center">
            <p className="text-xs sm:text-sm text-dark-light mb-2">
              Didn't receive the code?
            </p>
            <Link
              to="/forget-password"
              className="text-xs sm:text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Request New Code
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ResetPasswordPage;
