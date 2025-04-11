// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useState } from "react";
// import axios from "axios";

// export default function TokenPaymentForm({ orderId, tokenAmount, onPaymentSuccess }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const token = localStorage.getItem("token");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Step 1: Call backend to create PaymentIntent
//       const { data } = await axios.post(
//         "/api/order/orders/initiate-token-payment",
//         { orderId, tokenAmount },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const clientSecret = data.clientSecret;

//       // Step 2: Confirm payment with Stripe
//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });
      
//       if (result.error) {
//         setMessage(result.error.message);
//       } else if (result.paymentIntent.status === "requires_capture") {
//         setMessage("Token payment secured!");
//         onPaymentSuccess?.(); // Notify parent to refresh list
//         setTimeout(() => {
//           setMessage("");
//         }, 3000); // Optional: clear message after 3s
//       }
      
//     } catch (err) {
//       setMessage("Payment failed: " + err.message);
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button disabled={!stripe || loading} type="submit" style={{ marginTop: "10px" }}>
//         {loading ? "Processing..." : "Pay Token Money"}
//       </button>
//       <p>{message}</p>
//     </form>
//   );
// }


// import { useState } from "react";
// import axios from "axios";
// import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";

// export default function TokenPaymentForm({ orderId, tokenAmount, onPaymentSuccess }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [editedTokenAmount, setEditedTokenAmount] = useState(tokenAmount); // Store edited token amount
//   const token = localStorage.getItem("token");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Step 1: Call backend to create PaymentIntent with the edited token amount
//       const { data } = await axios.post(
//         "/api/order/orders/initiate-token-payment",
//         { orderId, tokenAmount: editedTokenAmount },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const clientSecret = data.clientSecret;

//       // Step 2: Confirm payment with Stripe
//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       if (result.error) {
//         setMessage(result.error.message);
//       } else if (result.paymentIntent.status === "requires_capture") {
//         setMessage("Token payment secured!");
//         onPaymentSuccess?.(); // Notify parent to refresh list
//         setTimeout(() => {
//           setMessage("");
//         }, 3000); // Optional: clear message after 3s
//       }
//     } catch (err) {
//       setMessage("Payment failed: " + err.message);
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
//       <h2 className="text-2xl font-semibold mb-4 text-center">Pay Token Money</h2>
      
//       {/* Editable Token Amount */}
//       <div className="mb-4">
//         <label htmlFor="token-amount" className="block text-lg font-medium mb-2">Token Amount (Rs)</label>
//         <input
//           id="token-amount"
//           type="number"
//           value={editedTokenAmount}
//           onChange={(e) => setEditedTokenAmount(e.target.value)} // Update token amount
//           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
//           placeholder="Enter token amount"
//         />
//       </div>

//       <div className="mb-4">
//         <label htmlFor="card-number" className="block text-lg font-medium mb-2">Card number</label>
//         <input
//           id="card-number"
//           type="text"
//           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
//           placeholder="XXXX XXXX XXXX XXXX"
//         />
//       </div>
      
//       <div className="flex mb-4">
//         <div className="w-1/2 pr-2">
//           <label htmlFor="expiry-date" className="block text-lg font-medium mb-2">Expiry date</label>
//           <input
//             id="expiry-date"
//             type="text"
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
//             placeholder="MM/YY"
//           />
//         </div>
//         <div className="w-1/2 pl-2">
//           <label htmlFor="card-cvc" className="block text-lg font-medium mb-2">CVC</label>
//           <input
//             id="card-cvc"
//             type="text"
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
//             placeholder="XXX"
//           />
//         </div>
//       </div>

//       <div className="mb-4">
//         <label htmlFor="card-name" className="block text-lg font-medium mb-2">Name on card</label>
//         <input
//           id="card-name"
//           type="text"
//           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
//           placeholder="John Doe"
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className={`w-full py-3 text-white font-bold rounded-lg transition-colors duration-300 ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
//       >
//         {loading ? "Processing..." : "Pay Token Money"}
//       </button>

//       {message && (
//         <p
//           className={`mt-4 text-center font-medium ${
//             message.includes("secured") ? "text-green-500" : "text-red-500"
//           }`}
//         >
//           {message}
//         </p>
//       )}
//     </form>
//   );
// }

import { useState } from "react";
import axios from "axios";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";

export default function TokenPaymentForm({ orderId, tokenAmount, onPaymentSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editedTokenAmount, setEditedTokenAmount] = useState(tokenAmount); // Store edited token amount
  const [paymentSuccessful, setPaymentSuccessful] = useState(false); // Track if payment was successful
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Call backend to create PaymentIntent with the edited token amount
      const { data } = await axios.post(
        "/api/order/orders/initiate-token-payment",
        { orderId, tokenAmount: editedTokenAmount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const clientSecret = data.clientSecret;

      // Step 2: Confirm payment with Stripe
      const cardElement = elements.getElement(CardElement); // Get CardElement instance

      if (!cardElement) {
        setMessage("Card information not valid");
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement, // Pass the actual CardElement to confirmCardPayment
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else if (result.paymentIntent.status === "waiting_for_sample") {
        setMessage("Token payment secured!");
        setPaymentSuccessful(true); // Update payment status
        onPaymentSuccess?.(); // Notify parent to refresh list and get the latest data
        setTimeout(() => {
          setMessage(""); // Clear message after 3s
        }, 3000);
      }
    } catch (err) {
      setMessage("Payment failed: " + err.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Pay Token Money</h2>
      
      {/* Editable Token Amount */}
      <div className="mb-4">
        <label htmlFor="token-amount" className="block text-lg font-medium mb-2">Token Amount (Rs)</label>
        <input
          id="token-amount"
          type="number"
          value={editedTokenAmount}
          onChange={(e) => setEditedTokenAmount(e.target.value)} // Update token amount
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Enter token amount"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="card-number" className="block text-lg font-medium mb-2">Card number</label>
        <CardElement
          id="card-number"
          options={{
            style: {
              base: {
                color: "#32325d",
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                  color: "#a0aec0",
                },
              },
              invalid: {
                color: "#e53e3e",
              },
            },
          }}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="card-name" className="block text-lg font-medium mb-2">Name on card</label>
        <input
          id="card-name"
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="John Doe"
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || loading || paymentSuccessful} // Disable button if payment is successful
        className={`w-full py-3 text-white font-bold rounded-lg transition-colors duration-300 ${loading ? "bg-gray-400" : paymentSuccessful ? "bg-green-500" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {loading ? "Processing..." : paymentSuccessful ? "Token Money Paid" : "Pay Token Money"}
      </button>

      {message && (
        <p
          className={`mt-4 text-center font-medium ${
            message.includes("secured") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
