// frontend/src/App.js
import React from 'react';

import Auth from '../components/Auth';
import OAuth from '../components/OAuth';
import SendOTP from '../components/otp/send-otp';
import VerifyOTP from '../components/otp/verify-otp';
function UserAuth() {
  return (
    <>
    <Auth/>
    <OAuth/>
    <SendOTP/>
    <VerifyOTP/>
    </>
  );
}

export default UserAuth;
