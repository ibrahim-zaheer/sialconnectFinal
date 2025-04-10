import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

export default function TokenPaymentForm({ orderId, tokenAmount, onPaymentSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Call backend to create PaymentIntent
      const { data } = await axios.post(
        "/api/order/orders/initiate-token-payment",
        { orderId, tokenAmount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const clientSecret = data.clientSecret;

      // Step 2: Confirm payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      
      if (result.error) {
        setMessage(result.error.message);
      } else if (result.paymentIntent.status === "requires_capture") {
        setMessage("Token payment secured!");
        onPaymentSuccess?.(); // Notify parent to refresh list
        setTimeout(() => {
          setMessage("");
        }, 3000); // Optional: clear message after 3s
      }
      
    } catch (err) {
      setMessage("Payment failed: " + err.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button disabled={!stripe || loading} type="submit" style={{ marginTop: "10px" }}>
        {loading ? "Processing..." : "Pay Token Money"}
      </button>
      <p>{message}</p>
    </form>
  );
}
