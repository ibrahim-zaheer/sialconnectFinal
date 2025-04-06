import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/reducers/userSlice";
import axios from "axios";

const useOrders = () => {
  const user = useSelector(selectUser);
  const token = user?.id ? localStorage.getItem("token") : null;
  const role = user?.role;

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

      const endpoint =
        role === "exporter"
          ? "/api/order/orders/exporter"
          : "/api/order/orders/supplier";

      try {
        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(response.data.orders || []);
      } catch (err) {
        setError("Failed to fetch orders.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, role]);

  return { orders, loading, error };
};

export default useOrders;
