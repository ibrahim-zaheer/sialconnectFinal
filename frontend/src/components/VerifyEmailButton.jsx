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
        className="mt-2 border-1 px-5 py-2 text-[1rem] rounded-lg bg-[#1b263b] text-white hover:bg-[#415a77] transition-all duration-300"
        onClick={handleEmail}
      >
        Verify Email
      </button>
    </div>
  );
};

export default VerifyEmailButton;
