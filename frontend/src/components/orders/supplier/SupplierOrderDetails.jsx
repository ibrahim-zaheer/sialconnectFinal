import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SupplierOrderDetails = () => {
  const { orderId } = useParams(); // get orderId from URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/order/orders/supplier/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrder(response.data.order);
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) return <p className="text-center mt-8">Loading order details...</p>;
  if (message) return <p className="text-center text-red-500 mt-8">{message}</p>;
  if (!order) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      {order.auctionId && (
  <p><strong>Auction:</strong> {order.auctionId.title}</p>
)}

{order.productId && (
  <p><strong>Product:</strong> {order.productId.name}</p>
)}

      <p><strong>Exporter:</strong> {order.exporterId?.name}</p>
      <p><strong>Email:</strong> {order.exporterId?.email}</p>
      <p><strong>Quantity:</strong> {order.quantity}</p>
      <p><strong>Price:</strong> Rs {order.price}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Sample Status:</strong> {order.sampleStatus}</p>
      <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
      <p className="text-sm text-gray-500 mt-2">Ordered On: {new Date(order.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default SupplierOrderDetails;
