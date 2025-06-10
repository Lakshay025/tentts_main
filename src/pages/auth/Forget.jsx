import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthImage from "../../assets/images/authimage.png";
import { sendForgotPasswordEmail, resetPassword } from "../../../services/authService";

const Forget = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // 1 = send OTP, 2 = reset password

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (step === 1) {
        await sendForgotPasswordEmail(formData.email);
        setStep(2); 
      } else if (step === 2) {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }

        await resetPassword({
          email: formData.email,
          otp: formData.otp,
          newPassword: formData.password,
        });

        // Optionally redirect to login
        navigate("/login");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden relative">
      {/* Back to Home Link */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center text-gray-400 hover:text-white transition-colors z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Home
      </Link>

      {/* Left Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-[#1B1A1D] p-6">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <h2 className="text-white text-3xl mb-9 font-semibold">Forget Password</h2>

          {/* Email field - always show */}
          <div className="relative">
            <label className="absolute left-3 top-1 text-sm text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full pt-6 pb-2 px-3 rounded-md bg-[#2a2a2a] text-white placeholder-gray-400 outline-none"
              required
              disabled={step === 2} // lock email after step 1
            />
          </div>

          {step === 2 && (
            <>
              {/* OTP field */}
              <div className="relative">
                <label className="absolute left-3 top-1 text-sm text-gray-400">OTP</label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="Enter OTP"
                  className="w-full pt-6 pb-2 px-3 rounded-md bg-[#2a2a2a] text-white placeholder-gray-400 outline-none"
                  required
                />
              </div>

              {/* New Password */}
              <div className="relative">
                <label className="absolute left-3 top-1 text-sm text-gray-400">New Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="New Password"
                  className="w-full pt-6 pb-2 px-3 rounded-md bg-[#2a2a2a] text-white placeholder-gray-400 outline-none"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label className="absolute left-3 top-1 text-sm text-gray-400">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full pt-6 pb-2 px-3 rounded-md bg-[#2a2a2a] text-white placeholder-gray-400 outline-none"
                  required
                />
              </div>
            </>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-3xl font-semibold shadow-md transition-all"
          >
            {loading
              ? step === 1
                ? "Sending OTP..."
                : "Changing Password..."
              : step === 1
              ? "Send OTP"
              : "Change Password"}
          </button>

          {/* Error message */}
          {error && (
            <p className="text-red-400 text-center text-sm">{error}</p>
          )}

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-600" />
            <span className="text-gray-400 mx-2">Continue with</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          <p className="text-sm text-gray-400 text-center">
            Back to{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>

      {/* Right Image Section */}
      <div className="hidden md:flex md:w-1/2 h-full items-center justify-center bg-[#1B1A1D]">
        <img
          src={AuthImage}
          alt="Register Visual"
          className="rounded-3xl max-w-[90%] max-h-[90%] object-contain -translate-x-20"
        />
      </div>
    </div>
  );
};

export default Forget;
