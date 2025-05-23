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

import { useState } from 'react';
import { useOTPVerification } from './useOTPVerification';

const ResetPasswordForm = ({ email }) => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { loading, status, verifyAndReset } = useOTPVerification();

  const handleReset = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    
    setError('');
    verifyAndReset({ email, otp, newPassword });
  };

  return (
    <form onSubmit={handleReset}>
      <h3>Reset Password</h3>
      <input
        type="text"
        value={otp}
        placeholder="Enter OTP"
        onChange={(e) => setOtp(e.target.value)}
        required
      />
      <input
        type="password"
        value={newPassword}
        placeholder="New Password"
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <input
        type="password"
        value={confirmPassword}
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Resetting..." : "Reset Password"}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {status && <p>{status}</p>}
    </form>
  );
};

export default ResetPasswordForm;
