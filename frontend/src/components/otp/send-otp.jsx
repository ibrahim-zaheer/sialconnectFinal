// import React, { useState } from "react";
// import axios from "axios";


// import { useNavigate } from "react-router-dom";

// const SendOTP = () => {

// const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSendOTP = async () => {
//     try {
//       const res = await axios.post("/api/auth/send-otp", { email });
//       setMessage(res.data.message);
//       navigate("/VerifyOTP");
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to send OTP");
//     }
//   };

//   return (
//     <>
//       <div className="w-full h-screen overflow-hidden flex justify-center items-center bg-[#1b263b]">
//         <div className="w-1/3 bg-[#e0e1dd] rounded-2xl flex flex-col justify-center items-center py-8 gap-4">
//           <h2 className="font-sans font-semibold text-4xl text-[#1b263b]">
//             Send OTP
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

//           <button
//             className="border-1 w-[50%] bg-[#1b263b] rounded-lg my-3 py-2 text-[#e0e1dd] hover:bg-[#415a77] hover:text-white transition-all duration-300"
//             onClick={handleSendOTP}
//            >
//             Send OTP
//           </button>
//           {message && <p>{message}</p>}
//         </div>
//       </div>
//     </>
//   );
// };

// export default SendOTP;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SendOTP = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!email) {
      setMessage("Please enter your email");
      return;
    }
    
    setIsLoading(true);
    setMessage("");
    
    try {
      const res = await axios.post("/api/auth/send-otp", { email });
      setMessage(res.data.message);
      navigate("/VerifyOTP");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 p-4">
      <div className="w-full max-w-md bg-surface rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary-800">Verify Your Email</h2>
          <p className="text-neutral-600 mt-2">
            We'll send a verification code to your email
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
              Email address <span className="text-error">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {message && (
            <div className={`p-3 rounded-lg text-sm ${
              message.includes("Failed") || message.includes("Please enter") 
                ? "bg-error/10 text-error" 
                : "bg-success/10 text-success"
            }`}>
              {message}
            </div>
          )}

          <button
            type="button"
            onClick={handleSendOTP}
            disabled={isLoading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
              isLoading 
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
                Sending...
              </>
            ) : "Send Verification Code"}
          </button>
        </div>

        <div className="text-center text-sm text-neutral-500">
          <p>Didn't receive a code? <button 
            onClick={handleSendOTP} 
            className="font-medium text-primary-600 hover:text-primary-500"
            disabled={isLoading}
          >
            Resend
          </button></p>
        </div>
      </div>
    </div>
  );
};

export default SendOTP;