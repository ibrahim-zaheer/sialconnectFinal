import React, { useEffect, useState } from "react";
import axios from "axios";

const ExporterOrdersList = ({ exporterId, apiEndpoint, title = "Exporter Orders" }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!exporterId || !apiEndpoint) return;

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${apiEndpoint}/${exporterId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data.orders);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch orders");
      }
    };

    fetchOrders();
  }, [exporterId, apiEndpoint]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {error && <p className="text-red-600">{error}</p>}

      {orders.length === 0 && !error ? (
        <p>No orders found for this exporter.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-xl">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-4 text-left">Product</th>
                <th className="py-2 px-4 text-left">Supplier</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Quantity</th>
                <th className="py-2 px-4 text-left">Message</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="py-2 px-4">{order.productId?.name || "N/A"}</td>
                  <td className="py-2 px-4">
                    {order.supplierId?.name}<br />
                    <span className="text-sm text-gray-500">{order.supplierId?.email}</span>
                  </td>
                  <td className="py-2 px-4">Rs {order.price}</td>
                  <td className="py-2 px-4">{order.quantity}</td>
                  <td className="py-2 px-4">{order.message || "—"}</td>
                  <td className="py-2 px-4 capitalize">{order.status}</td>
                  <td className="py-2 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExporterOrdersList;
