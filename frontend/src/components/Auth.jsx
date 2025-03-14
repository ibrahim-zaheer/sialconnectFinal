import React, { useState } from "react";
import axios from "axios";
import OAuth from "./OAuth";

import {
  useNavigate,
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/userSlice";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log("Before Update:", formData); // Debugging the state before update
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("After Update:", formData); // Debugging the state after update
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const url = isRegister ? "/api/auth/register" : "/api/auth/login";
  //     const { data } = await axios.post(url, formData);

  //     console.log("Server Response:", data); // Check if data has name and email

  //     setMessage(data.message || "Login successful!");

  //     if (!isRegister) {
  //       const userData = {
  //         name: data.name,
  //         email: data.email,
  //         role: data.role,
  //         profilePicture: data.profilePicture,
  //       };
  //       dispatch(setUser(userData));
  //       localStorage.setItem("user", JSON.stringify(userData));
  //       localStorage.setItem("token", data.token);
  //       navigate("/profile");

        
  //     }
  //   } catch (error) {
  //     setMessage(error.response?.data?.message || "An error occurred");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isRegister ? "/api/auth/register" : "/api/auth/login";
      const { data } = await axios.post(url, formData);
  
      console.log("Server Response:", data); // Check if data has name and email
  
      setMessage(data.message || (isRegister ? "Registration successful!" : "Login successful!"));
  
      if (isRegister) {
        // Automatically switch to login after successful registration
        setIsRegister(false);
        setMessage("Registration successful! Please login.");
      } else {
        // Handle login
        // const userData = {
        //   id:data.id,
        //   name: data.name,
        //   email: data.email,
        //   role: data.role,
        //   profilePicture: data.profilePicture,
        // };
        const userData = {
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
          profilePicture: data.profilePicture,
          // Add these critical fields
          dateOfBirth: data.dateOfBirth,
          phoneNumber: data.phoneNumber,
          businessName: data.businessName,
          businessAddress: data.businessAddress,
          city: data.city,
          cnic: data.cnic,
          postalCode: data.postalCode,
          bio: data.bio
        };
        dispatch(setUser(userData));
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", data.token);
        navigate("/profile");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };
  

  return (
    <>
      <div className="signUpParent w-full h-screen bg-[#1b263b] overflow-hidden flex justify-center items-center">
        <div className="w-1/3 bg-[#e0e1dd] rounded-2xl flex flex-col justify-center items-center py-8 gap-4">
          <h2 className="font-sans font-semibold text-4xl">
            {isRegister ? "Register Now" : "Login Here"}
          </h2>
          <form className="w-[60%]" onSubmit={handleSubmit}>
            {isRegister && (
              <>
                <div className="flex flex-col w-full justify-center items-start gap-1">
                  <label className="text-[#1b263b]">
                    Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    placeholder="Enter name"
                    className="placeholder-gray-300 w-full p-2 rounded-lg border-1"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex justify-between items-center my-3">
                  <label>
                    Select Role <span className="text-red-600">*</span>
                  </label>
                  <select
                    className="border-1 p-1 text-gray-500 hover:cursor-pointer rounded-lg hover:bg-blue-50 transition-all duration-300"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="" className="text-[#1b263b]" disabled>
                      Select Here
                    </option>
                    <option value="exporter">Exporter</option>
                    <option value="supplier">Supplier</option>
                  </select>
                </div>
              </>
            )}
            <div className="flex flex-col w-full justify-center items-start gap-1">
              <label className="text-[#1b263b]">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                placeholder="Enter email"
                className="placeholder-gray-300 w-full p-2 rounded-lg border-1"
                type="email"
                name="email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col w-full justify-center items-start gap-1 mt-2">
              <label className="text-[#1b263b]">
                Password <span className="text-red-600">*</span>
              </label>
              <input
                placeholder="***********"
                className="placeholder-gray-300 w-full rounded-lg border-1 p-2"
                type="password"
                name="password"
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="border-1 w-full bg-[#1b263b] rounded-lg mb-3 mt-8 py-2 text-[#e0e1dd] hover:bg-[#415a77] hover:text-white transition-all duration-300"
            >
              {isRegister ? "Register" : "Login"}
            </button>
          </form>
          <button
            className="border-1 w-[60%] rounded-lg py-2 bg-[#415a77] text-[#e0e1dd] hover:bg-[#1b263b]  transition-all duration-300"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Switch to Login" : "Switch to Register"}
          </button>

          {/* <button className="border-1 w-[60%] rounded-lg py-2 bg-[#415a77] text-[#e0e1dd] hover:bg-[#1b263b]  transition-all duration-300"z>
            <i
              className="ri-google-fill text-2xl bg-clip-text text-transparent bg-google-gradient"
            ></i>
            <span className="text-gray-800 font-medium text-sm">Sign in with Google</span>
          </button> */}

          <OAuth />

          {message && <p>{message}</p>}
        </div>
      </div>
    </>
  );
};

export default Auth;
