// src/contexts/StripeContext.js
import React, { createContext, useState, useContext } from "react";

const StripeContext = createContext();

export const useStripe = () => useContext(StripeContext);

export const StripeProvider = ({ children }) => {
  const [paymentIntentClientSecret, setPaymentIntentClientSecret] = useState(null);

  const setClientSecret = (clientSecret) => {
    setPaymentIntentClientSecret(clientSecret);
  };

  return (
    <StripeContext.Provider value={{ paymentIntentClientSecret, setClientSecret }}>
      {children}
    </StripeContext.Provider>
  );
};
