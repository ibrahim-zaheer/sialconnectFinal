import { useState } from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';

const ForgotPasswordFlow = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <div>
      {!emailSent
        ? <ForgotPasswordForm onOTPSent={(email) => { setEmail(email); setEmailSent(true); }} />
        : <ResetPasswordForm email={email} />
      }
    </div>
  );
};

export default ForgotPasswordFlow;
