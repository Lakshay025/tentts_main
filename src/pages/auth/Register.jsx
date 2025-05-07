import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assets/images/image.png";
import { registerUser } from "../../../services/authService";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await registerUser(formData);
      console.log("Registered:", res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden relative"> {/* Added relative here */}
      {/* Back to Home Link - Added this section */}
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
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6"
        >
          <h2 className="text-white text-3xl mb-9 font-semibold">Create an account</h2>

          <div className="relative">
            <label className="absolute left-3 top-1 text-sm text-gray-400">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full pt-6 pb-2 px-3 rounded-md bg-[#2a2a2a] text-white placeholder-gray-400 outline-none"
              required
            />
          </div>

          <div className="relative">
            <label className="absolute left-3 top-1 text-sm text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email Address"
              className="w-full pt-6 pb-2 px-3 rounded-md bg-[#2a2a2a] text-white placeholder-gray-400 outline-none"
              required
            />
          </div>

          <div className="relative">
            <label className="absolute left-3 top-1 text-sm text-gray-400">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your Password"
              className="w-full pt-6 pb-2 px-3 rounded-md bg-[#2a2a2a] text-white placeholder-gray-400 outline-none"
              required
            />
          </div>

          <div className="relative">
            <label className="absolute left-3 top-1 text-sm text-gray-400">Phone Number</label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="w-full pt-6 pb-2 px-3 rounded-md bg-[#2a2a2a] text-white placeholder-gray-400 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-3xl font-semibold shadow-md transition-all"
          >
            {loading ? "Creating..." : "Create an account"}
          </button>

          {error && (
            <p className="text-red-400 text-center text-sm">{error}</p>
          )}

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-600" />
            <span className="text-gray-400 mx-2">Continue with</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          <p className="text-sm text-gray-400 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
              Sign In
            </Link>
          </p>
        </form>
      </div>

      {/* Right Image Section */}
      <div className="hidden md:flex md:w-1/2 h-full items-center justify-center bg-[#1B1A1D]">
        <img
          src={image}
          alt="Register Visual"
          className="rounded-3xl max-w-[90%] max-h-[90%] object-contain -translate-x-20"
        />
      </div>
    </div>
  );
};

export default Register;