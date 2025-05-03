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


import { useState } from 'react';
import { useForgotPassword } from './useForgotPassword';

const ForgotPasswordForm = ({ onOTPSent }) => {
  const [email, setEmail] = useState('');
  const { loading, message, error, sendOTP } = useForgotPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success } = await sendOTP(email);
    if (success) {
      onOTPSent(email);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Forgot Password</h3>
      <input
        type="email"
        value={email}
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Sending OTP..." : "Send OTP"}
      </button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default ForgotPasswordForm;