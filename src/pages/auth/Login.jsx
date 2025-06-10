import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthImage from "../../assets/images/authimage.png";
import { loginUser } from "../../../services/authService";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await loginUser(formData);
      console.log("✅ Login successful:", response);
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify({
        username: formData.username,
        token: response.token 
      }));
      
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-[#1B1A1D] p-6">
        {/* Back to Home Link - Added this section */}
        <div className="w-full max-w-md mb-4">
          
      {/* Back to Home Link - Now positioned absolutely */}
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
        </div>
        
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <h2 className="text-white text-3xl mb-9 font-semibold">Sign In!</h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-md">
              Unable to login, Please try again later!
            </div>
          )}

          <div className="relative">
            <label className="absolute left-3 top-1 text-sm text-gray-400">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Your Username"
              className="w-full pt-6 pb-2 px-3 rounded-md bg-[#2a2a2a] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
              required
              autoComplete="username"
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
              className="w-full pt-6 pb-2 px-3 rounded-md bg-[#2a2a2a] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
              required
              autoComplete="current-password"
            />
          </div>

          <div className="flex justify-between items-center text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="remember" 
                className="rounded bg-[#2a2a2a] border-gray-600 focus:ring-blue-500"
              />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <Link to="/forget-password" className="text-blue-400 hover:text-blue-300 transition-colors">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-3xl font-semibold shadow-md transition-all flex justify-center items-center ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-600" />
            <span className="text-gray-400 mx-2">or</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          <p className="text-sm text-gray-400 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 transition-colors">
              Register
            </Link>
          </p>
        </form>
      </div>

      {/* Right Image Section */}
      <div className="hidden md:flex md:w-1/2 h-full items-center justify-center bg-[#1B1A1D]">
        <img
          src={AuthImage}
          alt="Login Visual"
          className="rounded-3xl max-w-[90%] max-h-[90%] object-contain -translate-x-20"
        />
      </div>
    </div>
  );
};

export default Login;