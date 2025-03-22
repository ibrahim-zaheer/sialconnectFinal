import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/reducers/userSlice";

const SupplierOrderCount = () => {
  const user = useSelector(selectUser);
  const token = user?.id ? localStorage.getItem("token") : null;

  const [orderCount, setOrderCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderCount = async () => {
      if (!token) return;

      try {
        const response = await axios.get("/api/order/orders/supplier", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrderCount(response.data.orders?.length || 0);
      } catch (error) {
        console.error("Failed to fetch orders", error);
        setOrderCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderCount();
  }, [token]);

  return (
    <div className="text-center mt-6">
      {loading ? (
        <p className="text-gray-500">Loading order count...</p>
      ) : (
        <p className="text-lg font-semibold">
          Total Orders: <span className="text-blue-600">{orderCount}</span>
        </p>
      )}
    </div>
  );
};

export default SupplierOrderCount;
