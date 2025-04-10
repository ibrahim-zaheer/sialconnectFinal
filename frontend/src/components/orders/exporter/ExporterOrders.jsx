import React, { useEffect, useState } from "react";
import axios from "axios"; // Adjust path if needed
import TokenPaymentForm from "../../payments/TokenPaymentForm";
import PaymentPage from "../../../pages/payments/PaymentPage";
import { Link } from "react-router-dom";

const ExporterOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [activePaymentOrder, setActivePaymentOrder] = useState(null);


  // useEffect(() => {
  //   const fetchExporterOrders = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await axios.get("/api/order/orders/exporter", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       setOrders(response.data.orders);
  //       setLoading(false);
  //     } catch (error) {
  //       setMessage(error.response?.data?.message || "Failed to fetch orders");
  //       setLoading(false);
  //     }
  //   };

  //   fetchExporterOrders();
  // }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  
  // ✅ Move it outside useEffect so it can be passed to children
  const fetchExporterOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/order/orders/exporter", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(response.data.orders);
      setLoading(false);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to fetch orders");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExporterOrders(); // ✅ now works fine here too
  }, []);

  if (loading) return <p className="text-center mt-5">Loading orders...</p>;
  if (message) return <p className="text-center text-red-500 mt-5">{message}</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded shadow bg-white">
              <h3 className="font-semibold text-lg">{order.auctionId?.title || "Auction"}</h3>
              <p>Product: {order.productId?.name}</p>
              <p>Supplier: {order.supplierId?.name}</p>
              <p>Email: {order.supplierId?.email}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Total Price: Rs {order.totalPrice}</p>
              <p className="text-sm text-gray-500">Ordered On: {new Date(order.createdAt).toLocaleString()}</p>

                <Link
                to={`/exporter/order/${order._id}`}
                key={order._id}
                className="block bg-white p-4 shadow rounded-lg hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {order.productId
                    ? `Product: ${order.productId.name}`
                    : order.auctionId
                    ? `Auction: ${order.auctionId.title || "Untitled Auction"}`
                    : "Unknown Product/Auction"}
                </h3>
              
                <p>Exporter: {order.exporterId?.name || "Unknown"}</p>
                <p>Price: {order.price} Rs</p>
                <p>Quantity: {order.quantity}</p>
                <p>Total Value: {order.price * order.quantity}</p>
                <p>Message: {order.message || "No message"}</p>
              
                <p className="text-sm text-gray-600 mt-2">
                  Created on: {formatDate(order.createdAt)}
                </p>
              </Link>
              
              {order.sampleStatus === "waiting_for_payment" && (
      <>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setActivePaymentOrder(order._id)}
        >
          Send Token Payment
        </button>
        {activePaymentOrder === order._id && (
          <div className="mt-4">
          
            <PaymentPage orderId={order._id} tokenAmount={order.price * 100} onPaymentSuccess={() => {
  fetchExporterOrders();
  setActivePaymentOrder(null); // ✅ hide form again
}}/>
          </div>
        )}
      </>
    )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExporterOrders;
