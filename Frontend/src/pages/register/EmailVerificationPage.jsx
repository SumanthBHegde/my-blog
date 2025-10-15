import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import MainLayout from "../../components/MainLayout";
import {
  verifyEmail,
  resendVerificationCode,
} from "../../services/index/users";
import { userActions } from "../../store/reducers/userReducers";

const EmailVerificationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [email, setEmail] = useState("");

  // Get email from location state or localStorage
  useEffect(() => {
    const userEmail =
      location.state?.email || localStorage.getItem("verificationEmail");
    if (userEmail) {
      setEmail(userEmail);
    } else {
      // If no email, redirect to register
      navigate("/register");
    }
  }, [location.state, navigate]);

  // Mutation hook for handling verification request
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, verificationCode }) => {
      return verifyEmail({ email, verificationCode });
    },
    onSuccess: (data) => {
      // Dispatch action to store user info and save to local storage
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      localStorage.removeItem("verificationEmail"); // Clean up
      toast.success("Email verified successfully!");
      navigate("/");
    },
    onError: (error) => {
      // Display error toast message
      toast.error(error.message);
    },
  });

  // Mutation hook for resending verification code
  const { mutate: resendMutate, isLoading: resendLoading } = useMutation({
    mutationFn: ({ email }) => {
      return resendVerificationCode({ email });
    },
    onSuccess: () => {
      toast.success("Verification code sent successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Form control hook
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      verificationCode: "",
    },
    mode: "onChange",
  });

  // Form submit handler
  const submitHandler = (data) => {
    const { verificationCode } = data;
    mutate({ email, verificationCode });
  };

  return (
    <MainLayout>
      <section className="container px-5 py-10 mx-auto">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="mb-8 text-2xl font-bold text-center font-roboto text-dark-hard">
            Verify Your Email
          </h1>
          <p className="mb-6 text-center text-[#5a7184]">
            We've sent a verification code to <strong>{email}</strong>
          </p>

          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col w-full mb-6">
              <label
                htmlFor="verificationCode"
                className="text-[#5a7184] font-semibold block"
              >
                Verification Code
              </label>
              <input
                type="text"
                id="verificationCode"
                {...register("verificationCode", {
                  required: {
                    value: true,
                    message: "Verification code is required",
                  },
                  pattern: {
                    value: /^\d{6}$/,
                    message: "Please enter a valid 6-digit code",
                  },
                })}
                placeholder="Enter 6-digit code"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.verificationCode
                    ? "border-red-500"
                    : "border-[#c3cad9]"
                }`}
              />
              {errors.verificationCode?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.verificationCode?.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="w-full px-8 py-4 my-6 text-lg font-bold text-white rounded-lg bg-primary disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </button>

            <p className="text-sm text-center text-[#5a7184]">
              Didn't receive the code?{" "}
              <button
                type="button"
                className="text-primary font-semibold"
                onClick={() => resendMutate({ email })}
                disabled={resendLoading}
              >
                {resendLoading ? "Sending..." : "Resend Code"}
              </button>
            </p>

            <p className="mt-4 text-sm text-center text-[#5a7184]">
              <Link to="/register" className="text-primary">
                Back to Register
              </Link>
            </p>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default EmailVerificationPage;
