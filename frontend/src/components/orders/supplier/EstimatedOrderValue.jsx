// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { selectUser } from "../../../redux/reducers/userSlice";

// const EstimatedOrderValue = () => {
//   const user = useSelector(selectUser);
//   const token = user?.id ? localStorage.getItem("token") : null;

//   const [totalValue, setTotalValue] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!token) {
//         setError("User not authenticated.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get("/api/order/orders/supplier", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const orders = response.data.orders || [];

//         const total = orders.reduce((sum, order) => {
//           const price = order.price || 0;
//           const quantity = order.quantity || 0;
//           return sum + price * quantity;
//         }, 0);

//         setTotalValue(total);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch orders.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [token]);

//   return (
//     <div className="mt-6 bg-white shadow-md rounded-lg p-5">
//       <h3 className="text-xl font-semibold text-center mb-3">
//         Estimated Total Order Value
//       </h3>

//       {loading ? (
//         <p className="text-center text-gray-500">Calculating...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : (
//         <p className="text-center text-2xl font-bold text-green-600">
//           {totalValue.toLocaleString()} Rs
//         </p>
//       )}
//     </div>
//   );
// };

// export default EstimatedOrderValue;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/reducers/userSlice";
import { useTranslation } from "react-i18next";

const EstimatedOrderValue = () => {
  const user = useSelector(selectUser);
  const token = user?.id ? localStorage.getItem("token") : null;

  const [totalValue, setTotalValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
    const { t } = useTranslation();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setError("User not authenticated.");
        setLoading(false);
        return;
      }

      try {
        // Conditionally change the URL based on user's role
        const apiUrl =
          user?.role === "exporter"
            ? "/api/order/orders/exporter"  // If role is exporter, use this URL
            : "/api/order/orders/supplier"; // Default to supplier

        const response = await axios.get(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const orders = response.data.orders || [];

        const total = orders.reduce((sum, order) => {
          const price = order.price || 0;
          const quantity = order.quantity || 0;
          return sum + price * quantity;
        }, 0);

        setTotalValue(total);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, user?.role]); // Added user.role to the dependency array to trigger re-fetch if role changes

  return (
    <div className="mt-6 bg-white shadow-md rounded-lg p-5">
      <h3 className="text-xl font-semibold text-center mb-3">
        {t('order:EstimatedOrder')}
      </h3>

      {loading ? (
        <p className="text-center text-gray-500">Calculating...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <p className="text-center text-2xl font-bold text-green-600">
          {totalValue.toLocaleString()} Rs
        </p>
      )}
    </div>
  );
};

export default EstimatedOrderValue;
