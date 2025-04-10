// ✅ PaymentPage.jsx
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../components/payments/stripePromise";
import TokenPaymentForm from "../../components/payments/TokenPaymentForm";

export default function PaymentPage({ orderId, tokenAmount, onPaymentSuccess }) {
  return (
    <Elements stripe={stripePromise}>
      <h3 className="font-semibold mb-2">Pay Token Money</h3>
      <TokenPaymentForm
        orderId={orderId}
        tokenAmount={tokenAmount}
        onPaymentSuccess={onPaymentSuccess} // ✅ pass the prop correctly
      />
    </Elements>
  );
}
