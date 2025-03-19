import React, { useState } from "react";
import { useSelector } from "react-redux"; // Import Redux hook
import { selectUser } from "../../redux/reducers/userSlice"; // Import the Redux selector
import axios from "axios"; // Import Axios

export default function CounterOffer() {
  // Get user info from Redux state
  const user = useSelector(selectUser);
  const token = user?.id ? localStorage.getItem("token") : null; // Get token from localStorage if user is logged in

  // Counteroffer state
  const [offerId, setOfferId] = useState("");
  const [counterData, setCounterData] = useState({
    price: "",
    quantity: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  // Function to send a counteroffer using Axios
  const counterOffer = async (offerId, newOfferData, token) => {
    try {
      const response = await axios.put(
        `/api/offers/counter/${offerId}`,
        newOfferData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error sending counteroffer:", error);
      return { message: "Failed to send counteroffer. Try again." };
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setCounterData({ ...counterData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setResponseMessage("User not authenticated. Please log in.");
      return;
    }

    try {
      const response = await counterOffer(offerId, counterData, token);
      if (response.message) {
        setResponseMessage(response.message);
      } else {
        setResponseMessage("Counteroffer sent successfully!");
      }
    } catch (error) {
      setResponseMessage("Failed to send counteroffer. Try again.");
    }
  };

  return (
    <div className="container">
      <h2>Send a Counteroffer</h2>
      <form onSubmit={handleSubmit}>
        <label>Offer ID:</label>
        <input
          type="text"
          name="offerId"
          value={offerId}
          onChange={(e) => setOfferId(e.target.value)}
          required
        />

        <label>New Price:</label>
        <input
          type="number"
          name="price"
          value={counterData.price}
          onChange={handleChange}
          required
        />

        <label>New Quantity:</label>
        <input
          type="number"
          name="quantity"
          value={counterData.quantity}
          onChange={handleChange}
          required
        />

        <button type="submit">Send Counteroffer</button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}
