import React, { useState } from "react";
import { useSelector } from "react-redux"; // Import Redux hook
import { selectUser } from "../../redux/reducers/userSlice";  // Import the Redux selector

export default function RejectOffer() {
  // Get user info from Redux state
  const user = useSelector(selectUser);
  const token = user?.id ? localStorage.getItem("token") : null; // Get token from localStorage if user is logged in

  // Offer ID state
  const [offerId, setOfferId] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  // Function to reject an offer
  const rejectOffer = async (offerId, token) => {
    try {
      const response = await fetch(`/api/offers/reject/${offerId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.json();
    } catch (error) {
      console.error("Error rejecting offer:", error);
      return { message: "Failed to reject offer. Try again." };
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setResponseMessage("User not authenticated. Please log in.");
      return;
    }

    try {
      const response = await rejectOffer(offerId, token);
      if (response.message) {
        setResponseMessage(response.message);
      } else {
        setResponseMessage("Offer rejected successfully!");
      }
    } catch (error) {
      setResponseMessage("Failed to reject offer. Try again.");
    }
  };

  return (
    <div className="container">
      <h2>Reject an Offer</h2>
      <form onSubmit={handleSubmit}>
        <label>Offer ID:</label>
        <input
          type="text"
          name="offerId"
          value={offerId}
          onChange={(e) => setOfferId(e.target.value)}
          required
        />

        <button type="submit">Reject Offer</button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}
