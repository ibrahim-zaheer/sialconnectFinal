import React, { useState } from "react";
import axios from "axios";

const VerifyOTP = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleVerifyOTP = async () => {
    console.log("Email:", email, "OTP:", otp); // Debugging
    if (!email || !otp) {
      setMessage("Email and OTP are required!");
      return;
    }

    try {
      const res = await axios.post("/api/auth/verify-otp", { email, otp });
      setMessage(res.data.message);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage(error.response?.data?.message || "Failed to verify OTP");
    }
  };

  return (
    <>
      <div className="w-full h-screen overflow-hidden flex justify-center items-center bg-[#1b263b]">
        <div className="w-1/3 bg-[#e0e1dd] rounded-2xl flex flex-col justify-center items-center py-8 gap-4">
          <h2 className="font-sans text-4xl text-[#1b263b] font-semibold">
            Verify OTP
          </h2>

          <div className="flex flex-col w-1/2 justify-center items-start gap-1">
            <label className="text-[#1b263b]">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              placeholder="Enter email"
              className="w-full placeholder-gray-300 p-2 rounded-lg border-1"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col w-1/2 justify-center items-start gap-1">
            <label className="text-[#1b263b]">
              OTP <span className="text-red-600">*</span>
            </label>
            <input
              placeholder="Enter OTP"
              className="w-full placeholder-gray-300 p-2 rounded-lg border-1"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <button
            className="border-1 w-[50%] bg-[#1b263b] rounded-lg my-3 py-2 text-[#e0e1dd] hover:bg-[#415a77] hover:text-white transition-all duration-300"
            onClick={handleVerifyOTP}
          >
            Verify OTP
          </button>
          {message && <p>{message}</p>}
        </div>
      </div>
    </>
  );
};

export default VerifyOTP;
