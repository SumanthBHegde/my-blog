import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import MainLayout from "../../components/MainLayout";

const RegisterPage = () => {
  // useForm hook for managing form state and validation
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
    console.log(data);
  };

  // Watch password field for changes
  const password = watch("password");

  return (
    <MainLayout>
      {/* Main layout component */}
      <section className="container px-5 py-10 mx-auto">
        {/* Registration form container */}
        <div className="w-full max-w-sm mx-auto">
          {/* Form */}
          <h1 className="mb-8 text-2xl font-bold text-center font-roboto text-dark-hard">
            Sign Up
          </h1>
          {/* Heading */}
          <form onSubmit={handleSubmit(submitHandler)}>
            {/* Form element with submit handler */}

            {/* Name field */}
            <div className="flex flex-col w-full mb-6">
              <label
                htmlFor="name"
                className="text-[#5a7184] font-semibold block"
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
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.name ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {/* Display error message if validation fails */}
              {errors.name?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name?.message}
                </p>
              )}
            </div>
            {/* End of name field */}

            {/* Email field */}
            <div className="flex flex-col w-full mb-6">
              <label
                htmlFor="email"
                className="text-[#5a7184] font-semibold block"
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
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.email ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {/* Display error message if validation fails */}
              {errors.email?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email?.message}
                </p>
              )}
            </div>
            {/* End of email field */}

            {/* Password field */}
            <div className="flex flex-col w-full mb-6">
              <label
                htmlFor="password"
                className="text-[#5a7184] font-semibold block"
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
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.password ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {/* Display error message if validation fails */}
              {errors.password?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password?.message}
                </p>
              )}
            </div>
            {/* End of password field */}

            {/* Confirm password field */}
            <div className="flex flex-col w-full mb-6">
              <label
                htmlFor="confirmPassword"
                className="text-[#5a7184] font-semibold block"
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
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.confirmPassword ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {/* Display error message if validation fails */}
              {errors.confirmPassword?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
            {/* End of confirm password field */}

            {/* Link to forgot password page */}
            <Link
              to="/forget-password"
              className="text-sm font-semibold text-primary"
            >
              Forgot password?
            </Link>

            {/* Submit button */}
            <button
              type="submit"
              disabled={!isValid}
              className="w-full px-8 py-4 my-6 text-lg font-bold text-white rounded-lg bg-primary disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Register
            </button>

            {/* Link to login page */}
            <p className="text-sm font-semibold text-[#5a7184]">
              You have an account?{" "}
              <Link to="/login" className="text-primary">
                Login now
              </Link>
            </p>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default RegisterPage;
