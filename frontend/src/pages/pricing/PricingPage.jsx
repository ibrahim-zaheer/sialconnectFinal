import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { selectUser, updateSubscription } from "../../redux/reducers/userSlice";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);


function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleUpgradeClick = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!stripe || !elements) {
      return; // Stripe.js not loaded yet
    }
    setLoading(true);

    try {
      // 1. Create PaymentIntent on backend
      const { clientSecret, paymentIntentId } = await axios
        .post(
          "/api/exporter/create-payment-intent",
          { plan: "pro" },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => res.data);

      // 2. Confirm card payment with Stripe Elements
      const cardElement = elements.getElement(CardElement);

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: user.email,
            name: user.name,
          },
        },
      });

      if (paymentResult.error) {
        setErrorMsg(paymentResult.error.message || "Payment failed");
        setLoading(false);
        return;
      }

      if (paymentResult.paymentIntent.status !== "succeeded") {
        setErrorMsg("Payment not successful yet.");
        setLoading(false);
        return;
      }

      // 3. Call backend API to upgrade subscription after payment success
      await axios.post(
        "/api/exporter/pricing",
        { paymentIntentId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // 4. Update Redux store subscription state
      const expiryDate = new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ).toISOString();

      dispatch(
        updateSubscription({
          plan: "pro",
          expiryDate,
          paymentProviderId: paymentIntentId,
        })
      );

      alert("Successfully upgraded to Pro!");
      setLoading(false);
    } catch (error) {
      console.error("Upgrade error:", error);
      setErrorMsg(
        error.response?.data?.message || error.message || "Upgrade failed"
      );
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpgradeClick}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {errorMsg && (
        <div style={{ color: "red", marginTop: 8, marginBottom: 8 }}>
          {errorMsg}
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || loading}
        style={{
          marginTop: 20,
          padding: "12px 24px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: 4,
          fontWeight: "bold",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Processing..." : "Upgrade to Pro"}
      </button>
    </form>
  );
}

export default function PricingPage() {
  const user = useSelector(selectUser);
  const currentPlan = user.subscription?.plan || "free";

  const plans = {
    free: {
      name: "Free",
      price: "$0",
      features: [
        "1000 API calls/month",
        "Basic reports",
        "1 User seat",
        "Community support",
      ],
      isPro: false,
    },
    pro: {
      name: "Pro",
      price: "$29/month",
      features: [
        "Unlimited API calls",
        "Advanced reports + export",
        "Up to 5 user seats",
        "Priority support",
      ],
      isPro: true,
    },
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "auto",
        padding: 20,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Choose Your Plan</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: 20,
          marginTop: 30,
        }}
      >
        {Object.values(plans).map((plan) => {
          const isCurrent = plan.name.toLowerCase() === currentPlan;

          return (
            <div
              key={plan.name}
              style={{
                border: `2px solid ${plan.isPro ? "#0070f3" : "#ccc"}`,
                borderRadius: 8,
                width: 300,
                padding: 20,
                boxShadow: isCurrent
                  ? "0 0 15px rgba(0,112,243,0.4)"
                  : "none",
                backgroundColor: isCurrent ? "#e6f0ff" : "white",
              }}
            >
              <h2
                style={{
                  textAlign: "center",
                  color: plan.isPro ? "#0070f3" : "#333",
                }}
              >
                {plan.name}
              </h2>
              <p
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  textAlign: "center",
                  margin: "10px 0",
                }}
              >
                {plan.price}
              </p>
              <ul>
                {plan.features.map((feature, i) => (
                  <li key={i} style={{ marginBottom: 8 }}>
                    {feature}
                  </li>
                ))}
              </ul>
              {isCurrent ? (
                <button
                  disabled
                  style={{
                    width: "100%",
                    padding: 12,
                    backgroundColor: "#999",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    cursor: "not-allowed",
                    marginTop: 20,
                    fontWeight: "bold",
                  }}
                >
                  Current Plan
                </button>
              ) : plan.isPro ? (
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              ) : (
                <button
                  disabled
                  style={{
                    width: "100%",
                    padding: 12,
                    backgroundColor: "#ccc",
                    color: "#666",
                    border: "none",
                    borderRadius: 4,
                    marginTop: 20,
                    fontWeight: "bold",
                  }}
                >
                  Free
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
