import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/reducers/userSlice";

const HighestOrderValue = () => {
  const user = useSelector(selectUser);
  const token = user?.id ? localStorage.getItem("token") : null;

  const [highestOrder, setHighestOrder] = useState(null);
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

        const orders = response.data.orders;

        if (orders && orders.length > 0) {
          const highest = orders.reduce((max, order) => {
            const currentValue = order.price * order.quantity;
            const maxValue = max.price * max.quantity;
            return currentValue > maxValue ? order : max;
          }, orders[0]);

          setHighestOrder(highest);
        }
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
    <div className="mt-6 bg-white shadow-md rounded-lg p-5">
      <h3 className="text-xl font-semibold text-center mb-4">
        Highest Valued Order
      </h3>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : !highestOrder ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="text-center">
          <p>
            <span className="font-medium">Product:</span>{" "}
            {highestOrder.productId?.name || "Unknown"}
          </p>
          <p>
            <span className="font-medium">Exporter:</span>{" "}
            {highestOrder.exporterId?.name || "Unknown"}
          </p>
          <p>
            <span className="font-medium">Price:</span> {highestOrder.price} Rs
          </p>
          <p>
            <span className="font-medium">Quantity:</span> {highestOrder.quantity}
          </p>
          <p>
            <span className="font-medium">Total Value:</span>{" "}
            <span className="text-green-600 font-semibold">
              {highestOrder.price * highestOrder.quantity} Rs
            </span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Created on: {formatDate(highestOrder.createdAt)}
          </p>
        </div>
      )}
    </div>
  );
};

export default HighestOrderValue;
