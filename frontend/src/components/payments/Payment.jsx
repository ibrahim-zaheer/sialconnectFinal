// src/components/Payment.js
import React, { useState } from "react";
import axios from "axios";
import { useStripe } from "../../contexts/StripeContext";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = ({ orderId }) => {
  const { setClientSecret } = useStripe();
  const [tokenAmount, setTokenAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handlePaymentInitiation = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post("/api/order/orders/initiate-token-payment", {
        orderId,
        tokenAmount: tokenAmount * 100, // Convert to cents
      });

      const { clientSecret } = response.data;

      // Save the client secret in context
      setClientSecret(clientSecret);

      // Redirect to Stripe's payment interface
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        clientSecret,
      });

      if (error) {
        console.log("Stripe Checkout error:", error);
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Initiate Payment</h2>
      <div>
        <label>Token Amount (USD): </label>
        <input
          type="number"
          value={tokenAmount}
          onChange={(e) => setTokenAmount(e.target.value)}
        />
      </div>
      <button onClick={handlePaymentInitiation} disabled={isLoading}>
        {isLoading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default Payment;
