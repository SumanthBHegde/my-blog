import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import MainLayout from "../../components/MainLayout";
import { forgotPassword } from "../../services/index/users";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [submittedEmail, setSubmittedEmail] = useState("");

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email }) => {
      return forgotPassword({ email });
    },
    onSuccess: (data) => {
      toast.success(data.message || "Password reset code sent to your email!");
      // Navigate to reset password page with email
      navigate("/reset-password", { state: { email: submittedEmail } });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    setSubmittedEmail(data.email);
    mutate({ email: data.email });
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
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-hard mb-2">
                Forgot Password?
              </h1>
              <p className="text-sm sm:text-base text-dark-light">
                No worries! Enter your email and we'll send you a reset code.
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

              {/* Submit button */}
              <button
                type="submit"
                disabled={!isValid || isLoading}
                className="w-full px-6 py-3 sm:py-3.5 text-sm sm:text-base lg:text-lg font-semibold text-white rounded-lg bg-primary hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
              >
                {isLoading ? "Sending..." : "Send Reset Code"}
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
              Need more help?
            </p>
            <Link
              to="/contact"
              className="text-xs sm:text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ForgotPasswordPage;
