import React, { useState } from "react";
import { useSelector } from "react-redux"; // Import Redux hook
import { selectUser } from "../../redux/reducers/userSlice"; // Import the Redux selector
import axios from "axios"; // Import Axios

export default function CreateOffer() {
  // Get user info from Redux state
  const user = useSelector(selectUser);
  const token = user?.id ? localStorage.getItem("token") : null; // Get token from localStorage if user is logged in

  // Offer data state
  const [offerData, setOfferData] = useState({
    supplierId: "",
    productId: "",
    price: "",
    quantity: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  // Function to create an offer using Axios
  const createOffer = async (offerData, token) => {
    try {
      const response = await axios.post(
        "/api/offers/create",
        offerData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating offer:", error);
      return { message: "Failed to send offer. Try again." };
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setOfferData({ ...offerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!token) {
      setResponseMessage("User not authenticated. Please log in.");
      return;
    }
  
    // Ensure `message` field is not empty (backend expects it)
    if (!offerData.message) {
      setOfferData((prevData) => ({ ...prevData, message: "No message provided" }));
    }
  
    try {
      const response = await createOffer(offerData, token);
      if (response.message) {
        setResponseMessage(response.message);
      } else {
        setResponseMessage("Offer sent successfully!");
      }
    } catch (error) {
      setResponseMessage("Failed to send offer. Try again.");
    }
  };
  

  return (
    <div className="container">
      <h2>Create an Offer</h2>
      <form onSubmit={handleSubmit}>
        <label>Supplier ID:</label>
        <input
          type="text"
          name="supplierId"
          value={offerData.supplierId}
          onChange={handleChange}
          required
        />

        <label>Product ID:</label>
        <input
          type="text"
          name="productId"
          value={offerData.productId}
          onChange={handleChange}
          required
        />

        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={offerData.price}
          onChange={handleChange}
          required
        />

        <label>Quantity:</label>
        <input
          type="number"
          name="quantity"
          value={offerData.quantity}
          onChange={handleChange}
          required
        />

        <label>Message:</label>
        <textarea
          name="message"
          value={offerData.message}
          onChange={handleChange}
        ></textarea>

        <button type="submit">Send Offer</button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}
