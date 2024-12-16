import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/userSlice";

const RoleSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Get email passed via navigate
  const [role, setRole] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!role) {
      alert("Please select a role!");
      return;
    }

    try {
      // Send role selection to the backend
      const res = await axios.post("/api/auth/select-role", {
        email, // Email from state passed via navigation
        role,
      });

      if (res.status === 200) {
        const { token, ...updatedUser } = res.data;

        // Update Redux store
        dispatch(setUser(updatedUser));

        // Update localStorage with the new token and user data
        localStorage.setItem("user", JSON.stringify(updatedUser));
        localStorage.setItem("token", token);

        alert("Role selected successfully!");
        navigate("/home"); // Redirect to the dashboard/home page
      }
    } catch (error) {
      console.error("Error selecting role:", error);
    }
  };

  return (
    <>
      <div className="w-full h-screen overflow-hidden flex justify-center items-center bg-[#1b263b]">
        <div className="w-1/3 bg-[#e0e1dd] rounded-2xl flex flex-col justify-center items-center py-8 gap-6">
          <h2 className="font-sans text-3xl font-semibold mb-2">
            Select Your Role
          </h2>

          <select
            className="w-[50%] border-1 p-1 text-gray-500 hover:cursor-pointer rounded-lg hover:bg-blue-50 transition-all duration-300"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" className="" disabled>
              Select Role
            </option>
            <option value="exporter">Exporter</option>
            <option value="supplier">Supplier</option>
          </select>
          <button
            className="border-1 w-[50%] rounded-lg py-2 bg-[#1b263b] text-[#e0e1dd] hover:bg-[#415a77]  transition-all duration-300"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default RoleSelection;
