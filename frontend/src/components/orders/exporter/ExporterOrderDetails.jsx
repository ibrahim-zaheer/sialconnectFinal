// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import PaymentPage from "../../../pages/payments/PaymentPage";

// export default function ExporterOrderDetails() {
//   const { orderId } = useParams(); // get orderId from URL
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const [activePaymentOrder, setActivePaymentOrder] = useState(null);

//   const fetchOrderDetails = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(`/api/order/orders/exporter/${orderId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setOrder(response.data.order);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to load order details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrderDetails();
//   }, [orderId]);

//   if (loading) return <p className="text-center mt-8">Loading order details...</p>;
//   if (message) return <p className="text-center text-red-500 mt-8">{message}</p>;
//   if (!order) return null;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
//       <h2 className="text-2xl font-bold mb-4">Order Details</h2>
//       {order.auctionId && (
//         <p><strong>Auction:</strong> {order.auctionId.title}</p>
//       )}
//       {order.productId && (
//         <p><strong>Product:</strong> {order.productId.name}</p>
//       )}
//       <p><strong>Exporter:</strong> {order.supplierId?.name}</p>
//       <p><strong>Email:</strong> {order.supplierId?.email}</p>
//       <p><strong>Quantity:</strong> {order.quantity}</p>
//       <p><strong>Price:</strong> Rs {order.price}</p>
//       <p><strong>Status:</strong> {order.status}</p>
//       <p><strong>Sample Status:</strong> {order.sampleStatus}</p>
//       <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
//       <p className="text-sm text-gray-500 mt-2">Ordered On: {new Date(order.createdAt).toLocaleString()}</p>

//       {/* Display Token Payment Paid message when payment is done */}
//       {order.sampleStatus === "waiting_for_sample" && (
//         <div className="mt-4 text-green-500 font-semibold">
//           Token Payment Paid
//         </div>
//       )}

// {order.sampleProof && (
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold mb-2">Sample Proof</h3>
//           <img
//             src={order.sampleProof}
//             alt="Sample proof"
//             className="max-w-full h-auto rounded border"
//           />
//           {order.sampleDescription && (
//             <p className="mt-2"><strong>Description:</strong> {order.sampleDescription}</p>
//           )}
//         </div>
//       )}

//       {/* Payment Button Display */}
//       {order.sampleStatus === "waiting_for_payment" && (
//         <>
//           <button
//             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             onClick={() => setActivePaymentOrder(order._id)}
//           >
//             Send Token Payment
//           </button>

//           {/* Render Payment Page when user clicks the button */}
//           {activePaymentOrder === order._id && (
//             <div className="mt-4">
//               <PaymentPage
//                 orderId={order._id}
//                 tokenAmount={order.price}
//                 onPaymentSuccess={() => {
//                   setActivePaymentOrder(null); // Hide the payment form after success
//                   fetchOrderDetails(); // Re-fetch order details after payment success
//                 }}
//               />
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PaymentPage from "../../../pages/payments/PaymentPage";

export default function ExporterOrderDetails() {
  const { orderId } = useParams(); // get orderId from URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [activePaymentOrder, setActivePaymentOrder] = useState(null);

  const fetchOrderDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `/api/order/orders/exporter/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrder(response.data.order);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to load order details."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  if (loading)
    return <p className="text-center mt-8">Loading order details...</p>;
  if (message)
    return <p className="text-center text-red-500 mt-8">{message}</p>;
  if (!order) return null;

  return (
    <div className="container mx-auto p-8 space-y-6 bg-gradient-to-r from-blue-100 to-blue-300 shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Order Details
      </h2>

      {/* Order Information Card */}
      <div className="card bg-white p-6 rounded-lg shadow-xl">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Order Overview
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="font-semibold text-gray-600">
            <strong>Auction:</strong> {order.auctionId?.title}
          </div>
          <div className="font-semibold text-gray-600">
            <strong>Product:</strong> {order.productId?.name}
          </div>
          <div className="font-semibold text-gray-600">
            <strong>Exporter:</strong> {order.supplierId?.name}
          </div>
          <div className="font-semibold text-gray-600">
            <strong>Email:</strong> {order.supplierId?.email}
          </div>
          <div className="font-semibold text-gray-600">
            <strong>Quantity:</strong> {order.quantity}
          </div>
          <div className="font-semibold text-gray-600">
            <strong>Price:</strong> Rs {order.price}
          </div>
          <div className="font-semibold text-gray-600">
            <strong>Status:</strong> {order.status}
          </div>
          <div className="font-semibold text-gray-600">
            <strong>Sample Status:</strong> {order.sampleStatus}
          </div>
          <div className="font-semibold text-gray-600">
            <strong>Payment Status:</strong> {order.paymentStatus}
          </div>
          <div className="font-semibold text-gray-600">
            <strong>Ordered On:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Display Token Payment Paid message when payment is done */}
      {order.sampleStatus === "waiting_for_sample" && (
        <div className="alert alert-success mt-4">
          <span>Token Payment Paid</span>
        </div>
      )}
       {order.sampleStatus !== "waiting_for_payment" && (
        <div className="card bg-white p-6 rounded-lg shadow-md mt-6">
          Token Payment Sent
        </div>
      )}

      {/* Sample Proof */}
      {order.sampleProof && (
        <div className="card bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            Sample Proof
          </h3>
          <img
            src={order.sampleProof}
            alt="Sample proof"
            className="max-w-full h-auto rounded-xl shadow-md"
          />
          {order.sampleDescription && (
            <p className="mt-2 text-gray-600">
              <strong>Description:</strong> {order.sampleDescription}
            </p>
          )}
        </div>
      )}
      

      {/* Payment Button Display */}
      {order.sampleStatus === "waiting_for_payment" && (
        <div className="card bg-white p-6 rounded-lg shadow-md mt-6">
          <button
            className="btn btn-primary w-full mt-4"
            onClick={() => setActivePaymentOrder(order._id)}
          >
            Send Token Payment
          </button>

          {/* Render Payment Page when user clicks the button */}
          {activePaymentOrder === order._id && (
            <div className="mt-4">
              <PaymentPage
                orderId={order._id}
                tokenAmount={order.price}
                onPaymentSuccess={() => {
                  setActivePaymentOrder(null); // Hide the payment form after success
                  fetchOrderDetails(); // Re-fetch order details after payment success
                }}
              />
            </div>
          )}
        </div>
      )}

     
    </div>
  );
}
