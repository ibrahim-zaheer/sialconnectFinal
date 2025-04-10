import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/reducers/userSlice";
import useOrders from "../hook/useOrders";


const HighestOrderValue = () => {
  const user = useSelector(selectUser);
  const token = user?.id ? localStorage.getItem("token") : null;
  const { orders, loading, error } = useOrders();

  // const [highestOrder, setHighestOrder] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");
  const highestOrder =
  orders.length > 0
    ? orders.reduce((max, order) =>
        order.price * order.quantity > max.price * max.quantity ? order : max
      , orders[0])
    : null;
    const formatDate = (dateString) =>
      new Date(dateString).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });


  return (
    <div className="mt-6 bg-white shadow-md rounded-lg p-5">
      <h3 className="text-xl font-semibold text-center mb-4">
        Highest Valued Orders
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
