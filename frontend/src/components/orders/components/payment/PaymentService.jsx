// /services/PaymentService.js
import axios from "axios";

class PaymentService {
  // Method to post payment details for a supplier
  async postPaymentDetails(orderId, paymentDetails) {
    const token = localStorage.getItem("token"); // Fetch the token from localStorage
    const response = await axios.post(
      "/api/order/orders/payment-details", // Replace with actual API endpoint
      { orderId, ...paymentDetails },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token for authentication
        },
      }
    );
    return response.data;
  }
}

export default new PaymentService();
