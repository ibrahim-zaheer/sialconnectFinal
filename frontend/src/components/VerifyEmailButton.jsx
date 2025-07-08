import React from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmailButton = () => {
  const navigate = useNavigate();
  const handleEmail = () => {
    navigate("/VerifyEmail");
  };

  return (
    <div className="flex justify-center items-center">
      <button
        className="border-1 px-5 py-2 text-[1rem] rounded-lg bg-green-600 hover:bg-green-700 hover:to-emerald-700 text-white"
        onClick={handleEmail}
      >
        Verify Email
      </button>
    </div>
  );
};

export default VerifyEmailButton;
