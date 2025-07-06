// import { useState } from 'react';
// import { useOTPVerification } from './useOTPVerification';

// const ResetPasswordForm = ({ email }) => {
//   const [otp, setOtp] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const { loading, status, verifyAndReset } = useOTPVerification();

//   const handleReset = (e) => {
//     e.preventDefault();
//     verifyAndReset({ email, otp, newPassword });
//   };

//   return (
//     <form onSubmit={handleReset}>
//       <h3>Reset Password</h3>
//       <input
//         type="text"
//         value={otp}
//         placeholder="Enter OTP"
//         onChange={(e) => setOtp(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         value={newPassword}
//         placeholder="New Password"
//         onChange={(e) => setNewPassword(e.target.value)}
//         required
//       />
//       <button type="submit" disabled={loading}>
//         {loading ? "Resetting..." : "Reset Password"}
//       </button>
//       {status && <p>{status}</p>}
//     </form>
//   );
// };

// export default ResetPasswordForm;

import { useState } from "react";
import { useOTPVerification } from "./useOTPVerification";

const ResetPasswordForm = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { loading, status, verifyAndReset } = useOTPVerification();

  const handleReset = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    verifyAndReset({ email, otp, newPassword });
  };

  return (
    <form
      onSubmit={handleReset}
      className="space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-100"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Reset Password
      </h3>

      <div className="space-y-3">
        <input
          type="text"
          value={otp}
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <input
          type="password"
          value={newPassword}
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <input
          type="password"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors`}
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

      {status && <p className="text-green-600 text-sm mt-2">{status}</p>}
    </form>
  );
};

export default ResetPasswordForm;
