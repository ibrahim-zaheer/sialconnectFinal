// import React, { useState } from "react";
// import axios from "axios";

// import { useDispatch } from 'react-redux';
// import { verifyEmail } from "../../redux/reducers/userSlice";

// import { useNavigate } from "react-router-dom";

// const VerifyOTP = () => {

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [message, setMessage] = useState("");

//   const handleVerifyOTP = async () => {
//     console.log("Email:", email, "OTP:", otp); // Debugging
//     if (!email || !otp) {
//       setMessage("Email and OTP are required!");
//       return;
//     }

//     try {
//       const res = await axios.post("/api/auth/verify-otp", { email, otp });
//       setMessage(res.data.message);
//       dispatch(verifyEmail());
//       navigate("/profile")
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//       setMessage(error.response?.data?.message || "Failed to verify OTP");
//     }
//   };

//   return (
//     <>
//       <div className="w-full h-screen overflow-hidden flex justify-center items-center bg-[#1b263b]">
//         <div className="w-1/3 bg-[#e0e1dd] rounded-2xl flex flex-col justify-center items-center py-8 gap-4">
//           <h2 className="font-sans text-4xl text-[#1b263b] font-semibold">
//             Verify OTP
//           </h2>

//           <div className="flex flex-col w-1/2 justify-center items-start gap-1">
//             <label className="text-[#1b263b]">
//               Email <span className="text-red-600">*</span>
//             </label>
//             <input
//               placeholder="Enter email"
//               className="w-full placeholder-gray-300 p-2 rounded-lg border-1"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="flex flex-col w-1/2 justify-center items-start gap-1">
//             <label className="text-[#1b263b]">
//               OTP <span className="text-red-600">*</span>
//             </label>
//             <input
//               placeholder="Enter OTP"
//               className="w-full placeholder-gray-300 p-2 rounded-lg border-1"
//               type="text"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             className="border-1 w-[50%] bg-[#1b263b] rounded-lg my-3 py-2 text-[#e0e1dd] hover:bg-[#415a77] hover:text-white transition-all duration-300"
//             onClick={handleVerifyOTP}
//           >
//             Verify OTP
//           </button>
//           {message && <p>{message}</p>}
//         </div>
//       </div>
//     </>
//   );
// };

// export default VerifyOTP;

import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { verifyEmail } from "../../redux/reducers/userSlice";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyOTP = async () => {
    if (!email || !otp) {
      setMessage("Email and OTP are required!");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const res = await axios.post("/api/auth/verify-otp", { email, otp });
      setMessage(res.data.message);
      dispatch(verifyEmail());
      navigate("/profile");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage(error.response?.data?.message || "Failed to verify OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 p-4">
      <div className="w-full max-w-md bg-surface rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary-800">Verify Your Account</h2>
          <p className="text-neutral-600 mt-2">
            Enter the OTP sent to your email address
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
              Email <span className="text-error">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-neutral-700">
              Verification Code <span className="text-error">*</span>
            </label>
            <input
              id="otp"
              type="text"
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              disabled={isLoading}
            />
          </div>

          {message && (
            <div className={`p-3 rounded-lg text-sm ${
              message.includes("Failed") || message.includes("required") 
                ? "bg-error/10 text-error" 
                : "bg-success/10 text-success"
            }`}>
              {message}
            </div>
          )}

          <button
            type="button"
            onClick={handleVerifyOTP}
            disabled={isLoading || !email || !otp}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
              isLoading || !email || !otp
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
                Verifying...
              </>
            ) : "Verify Account"}
          </button>
        </div>

        <div className="text-center text-sm text-neutral-500">
          <p>Didn't receive a code? <button 
            onClick={() => navigate("/send-otp")} 
            className="font-medium text-primary-600 hover:text-primary-500"
            disabled={isLoading}
          >
            Resend code
          </button></p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;