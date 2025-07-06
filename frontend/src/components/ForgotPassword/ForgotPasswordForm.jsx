// import { useState } from 'react';
// import { useForgotPassword } from './useForgotPassword';

// const ForgotPasswordForm = ({ onOTPSent }) => {
//   const [email, setEmail] = useState('');
//   const { loading, message, sendOTP } = useForgotPassword();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     sendOTP(email).then(() => onOTPSent(email));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h3>Forgot Password</h3>
//       <input
//         type="email"
//         value={email}
//         placeholder="Enter your email"
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <button type="submit" disabled={loading}>
//         {loading ? "Sending OTP..." : "Send OTP"}
//       </button>
//       {message && <p>{message}</p>}
//     </form>
//   );
// };

// export default ForgotPasswordForm;

import { useState } from "react";
import { useForgotPassword } from "./useForgotPassword";

const ForgotPasswordForm = ({ onOTPSent }) => {
  const [email, setEmail] = useState("");
  const { loading, message, error, sendOTP } = useForgotPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success } = await sendOTP(email);
    if (success) {
      onOTPSent(email);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Forgot Password
      </h3>

      <input
        type="email"
        value={email}
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          loading
            ? "bg-blue-600 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors`}
      >
        {loading ? "Sending OTP..." : "Send OTP"}
      </button>

      {message && <p className="text-green-600 text-sm mt-2">{message}</p>}

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </form>
  );
};

export default ForgotPasswordForm;
