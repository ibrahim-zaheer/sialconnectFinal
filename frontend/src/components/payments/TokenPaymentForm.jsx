

// import { useState,useEffect } from "react";
// import axios from "axios";
// import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
// import { useNavigate } from "react-router-dom";

// export default function TokenPaymentForm({ orderId, tokenAmount, onPaymentSuccess }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [editedTokenAmount, setEditedTokenAmount] = useState(tokenAmount); // Store edited token amount
//   const [paymentSuccessful, setPaymentSuccessful] = useState(false); // Track if payment was successful
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
//       const cardElement = elements.getElement(CardElement); // Get CardElement instance

//       if (!cardElement) {
//         setMessage("Card information not valid");
//         return;
//       }

//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: cardElement, // Pass the actual CardElement to confirmCardPayment
//         },
//       });

//       if (result.error) {
//         setMessage(result.error.message);
//       } else if (result.paymentIntent.status === "succeeded") {
//         setMessage("Token payment secured!");
//         setPaymentSuccessful(true); // Update payment status
//         onPaymentSuccess?.(); // Notify parent to refresh list and get the latest data
//         navigate('/products');
//         setTimeout(() => {
//           setMessage(""); // Clear message after 3s
//         }, 3000);
//       }
//     } catch (err) {
//       setMessage("Payment failed: " + err.message);
//     }

//     setLoading(false);
//   };

//   // Inside TokenPaymentForm component
// useEffect(() => {
//   setEditedTokenAmount(tokenAmount);
// }, [tokenAmount]); // Sync when tokenAmount prop changes
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
//         <CardElement
//           id="card-number"
//           options={{
//             style: {
//               base: {
//                 color: "#32325d",
//                 fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//                 fontSmoothing: "antialiased",
//                 fontSize: "16px",
//                 "::placeholder": {
//                   color: "#a0aec0",
//                 },
//               },
//               invalid: {
//                 color: "#e53e3e",
//               },
//             },
//           }}
//         />
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
//         disabled={!stripe || loading || paymentSuccessful} // Disable button if payment is successful
//         className={`w-full py-3 text-white font-bold rounded-lg transition-colors duration-300 ${loading ? "bg-gray-400" : paymentSuccessful ? "bg-green-500" : "bg-blue-600 hover:bg-blue-700"}`}
//       >
//         {loading ? "Processing..." : paymentSuccessful ? "Token Money Paid" : "Pay Token Money"}
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


// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
//  import { useState } from "react";
//  import axios from "axios";
 
//  export default function TokenPaymentForm({ orderId, tokenAmount, onPaymentSuccess }) {
//    const stripe = useStripe();
//    const elements = useElements();
//    const [loading, setLoading] = useState(false);
//    const [message, setMessage] = useState("");
//    const token = localStorage.getItem("token");


 
 
//    const handleSubmit = async (e) => {
//      e.preventDefault();
//      setLoading(true);
 
//      try {
//        // Step 1: Call backend to create PaymentIntent
//        const { data } = await axios.post(
//          "/api/order/orders/initiate-token-payment",
//          { orderId, tokenAmount },
//          {
//            headers: {
//              Authorization: `Bearer ${token}`,
//            },
//          }
//        );
//        const clientSecret = data.clientSecret;
 
//        // Step 2: Confirm payment with Stripe
//        const result = await stripe.confirmCardPayment(clientSecret, {
//          payment_method: {
//            card: elements.getElement(CardElement),
//          },
//        });
       
//        if (result.error) {
//          setMessage(result.error.message);
//        } else if (result.paymentIntent.status === "requires_capture") {
//          setMessage("Token payment secured!");
//          onPaymentSuccess?.(); // Notify parent to refresh list
//          setTimeout(() => {
//            setMessage("");
//          }, 3000); // Optional: clear message after 3s
//        }
       
//      } catch (err) {
//        setMessage("Payment failed: " + err.message);
//      }
 
//      setLoading(false);
//    };
 
//    return (
//      <form onSubmit={handleSubmit}>
//        <CardElement />
//        <button disabled={!stripe || loading} type="submit" style={{ marginTop: "10px" }}>
//          {loading ? "Processing..." : "Pay Token Money"}
//        </button>
//        <p>{message}</p>
//      </form>
//    );
//  }


import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

export default function TokenPaymentForm({ orderId, tokenAmount, onPaymentSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' }); // type: 'error' | 'success'
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      setMessage({ text: "Stripe hasn't loaded yet.", type: 'error' });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      // Step 1: Create PaymentIntent
      const { data } = await axios.post(
        "/api/order/orders/initiate-token-payment",
        { orderId, tokenAmount },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Step 2: Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              // You might want to collect these details from the user
              name: "Customer Name", // Replace with actual data
            },
          },
        }
      );

      if (error) {
        throw error;
      }

      if (paymentIntent.status === "requires_capture") {
        setMessage({ 
          text: "Token payment secured!",
          type: 'success'
        });
        onPaymentSuccess?.();
      } else {
        setMessage({
          text: "Payment processing...",
          type: 'success'
        });
      }
    } catch (err) {
      console.error("Payment error:", err);
      setMessage({
        text: err.message || "Payment failed. Please try again.",
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-form-container">
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-row">
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
        
        <button
          type="submit"
          disabled={!stripe || loading}
          className={`payment-button ${loading ? 'loading' : ''}`}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Processing...
            </>
          ) : (
            `Pay ${tokenAmount} Token Money`
          )}
        </button>
        
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}
      </form>

      <style jsx>{`
        .payment-form-container {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #eee;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        
        .form-row {
          margin-bottom: 20px;
          padding: 10px;
          background: #f9f9f9;
          border-radius: 4px;
        }
        
        .payment-button {
          width: 100%;
          padding: 12px;
          background: #6772e5;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        .payment-button:hover:not(:disabled) {
          background: #5469d4;
        }
        
        .payment-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .payment-button.loading {
          position: relative;
        }
        
        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
          margin-right: 8px;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .message {
          margin-top: 20px;
          padding: 12px;
          border-radius: 4px;
        }
        
        .message.error {
          background: #ffebee;
          color: #c62828;
        }
        
        .message.success {
          background: #e8f5e9;
          color: #2e7d32;
        }
      `}</style>
    </div>
  );
}

TokenPaymentForm.propTypes = {
  orderId: PropTypes.string.isRequired,
  tokenAmount: PropTypes.number.isRequired,
  onPaymentSuccess: PropTypes.func,
};