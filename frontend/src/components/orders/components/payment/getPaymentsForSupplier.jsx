// src/services/PaymentService.js

import axios from 'axios';

export const getPaymentsForSupplier = async (supplierId) => {
  try {
    const response = await axios.get("/api/order/orders/payments", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming JWT token is stored in localStorage
      }
    });
    return response.data.orders; // Return only the necessary data
  } catch (error) {
    throw new Error("Error fetching payment details: " + error.message);
  }
};
