import React, { useState } from "react";
import axios from "axios";
import OAuth from "./OAuth";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/userSlice";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false); // Toggle between register and login forms
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState(""); // Success or error message
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    console.log("Before Update:", formData); // Debugging the state before update
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("After Update:", formData); // Debugging the state after update
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isRegister ? "/api/auth/register" : "/api/auth/login";
      const { data } = await axios.post(url, formData);

      console.log("Server Response:", data); // Check if data has name and email

      setMessage(
        data.message ||
          (isRegister ? "Registration successful!" : "Login successful!")
      );

      if (isRegister) {
        // After successful registration, switch to login view
        setIsRegister(false);
        setMessage("Registration successful! Please login.");
      } else {
        // After login, store user and token data
        const userData = {
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
          profilePicture: data.profilePicture,
          // Additional fields fetched on login
          dateOfBirth: data.dateOfBirth,
          phoneNumber: data.phoneNumber,
          businessName: data.businessName,
          businessAddress: data.businessAddress,
          city: data.city,
          cnic: data.cnic,
          postalCode: data.postalCode,
          bio: data.bio,
        };
        dispatch(setUser(userData));
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", data.token);
        // navigate("/profile");
            // ✅ Redirect based on role
      if (data.role === "admin") {
        navigate("/admin");
      } else if (data.role === "supplier") {
        navigate("/profile");
      }
      else{
        navigate("/home");
      }
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-neutral-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-neutral-200">
          <div className="text-center mb-8">
            <h1 className="text-primary-700 font-bold text-3xl mb-2">
              SialConnect
            </h1>
            <p className="text-neutral-500 text-sm mb-4">
              Your Export Journey Starts Here
            </p>
            <h2 className="text-xl font-semibold text-neutral-800 mt-4 mb-0">
              {isRegister ? "Create Your Account" : "Welcome Back"}
            </h2>
          </div>

          {/* Auth Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {isRegister && (
              <>
                {/* Name Input (only for Register) */}
                <div className="space-y-2">
                  <label className="block text-neutral-700 text-sm font-medium">
                    Full Name <span className="text-error">*</span>
                  </label>
                  <input
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-neutral-50"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Role Select (only for Register) */}
                <div className="space-y-2">
                  <label className="block text-neutral-700 text-sm font-medium">
                    Account Type <span className="text-error">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-neutral-50 text-neutral-800"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="" className="text-neutral-400" disabled>
                      Select your account type
                    </option>
                    <option value="exporter">
                      Exporter (Looking for Suppliers)
                    </option>
                    <option value="supplier">
                      Supplier (Offering Products)
                    </option>
                  </select>
                </div>
              </>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-neutral-700 text-sm font-medium">
                Email Address <span className="text-error">*</span>
              </label>
              <input
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-neutral-50"
                type="email"
                name="email"
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-neutral-700 text-sm font-medium">
                Password <span className="text-error">*</span>
              </label>
              <div className="relative">
                <input
                  placeholder="Min. 8 characters"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-neutral-50"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-neutral-600 hover:text-primary-700"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary-700 hover:bg-primary-800 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-300 mt-6 font-medium shadow-md"
            >
              {isRegister ? "Create Account" : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center my-6">
            <div className="flex-grow border-t border-neutral-300"></div>
            <span className="flex-shrink mx-4 text-neutral-500 text-sm">
              or
            </span>
            <div className="flex-grow border-t border-neutral-300"></div>
          </div>

          {/* Switch Auth Mode */}
          <button
            className="w-full py-3 px-4 border border-primary-600 text-primary-700 hover:text-primary-800 hover:bg-primary-50 font-medium rounded-lg transition-colors duration-300 mb-4"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister
              ? "Already have an account? Sign In"
              : "Need an account? Register"}
          </button>

          {/* OAuth Login (only for Login view) */}
          {!isRegister && <OAuth />}

          {/* Status Message */}
          {message && (
            <div
              className={`mt-6 p-4 rounded-lg text-center text-sm font-medium ${
                message.toLowerCase().includes("success")
                  ? "bg-secondary-100 text-secondary-800 border border-secondary-300"
                  : "bg-error/10 text-error border border-error/20"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Auth;
