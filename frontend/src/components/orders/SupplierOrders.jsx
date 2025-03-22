import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducers/userSlice";

const SupplierOrders = () => {
    const user = useSelector(selectUser);
    const token = user?.id ? localStorage.getItem("token") : null;
  
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
  
    useEffect(() => {
      const fetchOrders = async () => {
        if (!token) {
          setError("User not authenticated.");
          setLoading(false);
          return;
        }
  
        try {
          const response = await axios.get("/api/order/orders/supplier", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setOrders(response.data.orders);
        } catch (err) {
          setError("Failed to fetch orders.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchOrders();
    }, [token]);
  
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };
  
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-center mb-6">My Orders</h2>
  
        {loading ? (
          <p className="text-center text-gray-500">Loading orders...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white p-4 shadow rounded-lg">
                <h3 className="text-lg font-semibold mb-2">
                  Product: {order.productId?.name || "Unknown"}
                </h3>
                <p>Exporter: {order.exporterId?.name || "Unknown"}</p>
                <p>Price: {order.price} Rs</p>
                <p>Quantity: {order.quantity}</p>
                <p>Message: {order.message || "No message"}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Created on: {formatDate(order.createdAt)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default SupplierOrders;
  
