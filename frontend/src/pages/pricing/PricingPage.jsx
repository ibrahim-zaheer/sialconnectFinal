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
    if (!stripe || !elements) return;
    setLoading(true);

    try {
      const { clientSecret, paymentIntentId } = await axios
        .post(
          "/api/exporter/create-payment-intent",
          { plan: "pro" },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => res.data);

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
    <form onSubmit={handleUpgradeClick} className="mt-4 space-y-4">
      <div className="mb-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#1F2937",
                "::placeholder": {
                  color: "#9CA3AF",
                },
              },
              invalid: {
                color: "#EF4444",
              },
            },
          }}
          className="p-2 border-gray-300 rounded-md"
        />
      </div>

      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full py-3 rounded-md text-white font-semibold transition-colors ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
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
    <div className="max-w-[900px] mx-auto mt-10 p-5 font-sans">
      <h1 className="text-4xl font-bold text-center mb-16">Choose Your Plan</h1>
      <div className="flex flex-col md:flex-row justify-around gap-6">
        {Object.values(plans).map((plan) => {
          const isCurrent = plan.name.toLowerCase() === currentPlan;

          return (
            <div
              key={plan.name}
              className={`flex flex-col justify-between border-2 rounded-xl p-6 w-full max-w-sm shadow-md transition-all duration-300 ${
                isCurrent
                  ? "border-blue-500 bg-blue-50 shadow-blue-200"
                  : plan.isPro
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}
            >
              <div>
                <h2
                  className={`text-center text-2xl font-semibold ${
                    plan.isPro ? "text-blue-600" : "text-gray-800"
                  }`}
                >
                  {plan.name}
                </h2>
                <p className="text-center text-3xl font-bold my-4">
                  {plan.price}
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="list-disc list-inside">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                {isCurrent ? (
                  <button
                    disabled
                    className="w-full py-3 bg-gray-400 text-white rounded-md font-semibold cursor-not-allowed"
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
                    className="w-full py-3 bg-gray-300 text-gray-600 rounded-md font-semibold cursor-not-allowed"
                  >
                    Free
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
