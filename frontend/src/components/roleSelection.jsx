// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { setUser } from "../redux/reducers/userSlice";

// const RoleSelection = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const email = location.state?.email; // Get email passed via navigate
//   const [role, setRole] = useState("");
//   const dispatch = useDispatch();

//   const handleSubmit = async () => {
//     if (!role) {
//       alert("Please select a role!");
//       return;
//     }

//     try {
//       // Send role selection to the backend
//       const res = await axios.post("/api/auth/select-role", {
//         email, // Email from state passed via navigation
//         role,
//       });

//       if (res.status === 200) {
//         const { id, token, name, email, role, profilePicture } = res.data;

//         const updatedUser = { id, name, email, role, profilePicture }; // Include `id`
  
//         dispatch(setUser(updatedUser));

//         // Update localStorage with the new token and user data
//         localStorage.setItem("user", JSON.stringify(updatedUser));
//         localStorage.setItem("token", token);

//         alert("Role selected successfully!");
//         navigate("/home"); // Redirect to the dashboard/home page
//       }
//     } catch (error) {
//       console.error("Error selecting role:", error);
//     }
//   };

//   return (
//     <>
//       <div className="w-full h-screen overflow-hidden flex justify-center items-center bg-[#1b263b]">
//         <div className="w-1/3 bg-[#e0e1dd] rounded-2xl flex flex-col justify-center items-center py-8 gap-6">
//           <h2 className="font-sans text-3xl font-semibold mb-2">
//             Select Your Role
//           </h2>

//           <select
//             className="w-[50%] border-1 p-1 text-gray-500 hover:cursor-pointer rounded-lg hover:bg-blue-50 transition-all duration-300"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             required
//           >
//             <option value="" className="" disabled>
//               Select Role
//             </option>
//             <option value="exporter">Exporter</option>
//             <option value="supplier">Supplier</option>
//           </select>
//           <button
//             className="border-1 w-[50%] rounded-lg py-2 bg-[#1b263b] text-[#e0e1dd] hover:bg-[#415a77]  transition-all duration-300"
//             onClick={handleSubmit}
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default RoleSelection;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/userSlice";

const RoleSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!role) {
      setMessage("Please select a role");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const res = await axios.post("/api/auth/select-role", {
        email,
        role,
      });

      if (res.status === 200) {
        const { id, token, name, email, role, profilePicture } = res.data;
        const updatedUser = { id, name, email, role, profilePicture };
        
        dispatch(setUser(updatedUser));
        localStorage.setItem("user", JSON.stringify(updatedUser));
        localStorage.setItem("token", token);
        
        setMessage("Role selected successfully!");
        navigate("/home");
      }
    } catch (error) {
      console.error("Error selecting role:", error);
      setMessage(error.response?.data?.message || "Failed to select role");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 p-4">
      <div className="w-full max-w-md bg-surface rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary-800">Select Your Role</h2>
          <p className="text-neutral-600 mt-2">
            Choose how you'd like to use our platform
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-neutral-700">
              Role <span className="text-error">*</span>
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-neutral-700"
              disabled={isLoading}
            >
              <option value="" disabled>Select your role</option>
              <option value="exporter" className="text-neutral-700">Exporter</option>
              <option value="supplier" className="text-neutral-700">Supplier</option>
            </select>
          </div>

          {message && (
            <div className={`p-3 rounded-lg text-sm ${
              message.includes("Failed") || message.includes("Please") 
                ? "bg-error/10 text-error" 
                : "bg-success/10 text-success"
            }`}>
              {message}
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || !role}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
              isLoading || !role
                ? "bg-primary-400 cursor-not-allowed" 
                : "bg-primary-600 hover:bg-primary-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;