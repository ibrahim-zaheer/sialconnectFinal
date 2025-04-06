import React, { useEffect, useState } from "react";
import axios from "axios"; // Adjust path if needed

const ExporterOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
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

    fetchExporterOrders();
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExporterOrders;
