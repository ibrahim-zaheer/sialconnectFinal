import React, { useState } from "react";
import { useSelector } from "react-redux"; // Import Redux hook
import { selectUser } from "../../redux/reducers/userSlice"; // Import the Redux selector
import axios from "axios"; // Import Axios

export default function AcceptOffer() {
  // Get user info from Redux state
  const user = useSelector(selectUser);
  const token = user?.id ? localStorage.getItem("token") : null; // Get token from localStorage if user is logged in

  // Offer ID state
  const [offerId, setOfferId] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  // Function to accept an offer using Axios
  const acceptOffer = async (offerId, token) => {
    try {
      const response = await axios.put(
        `/api/offers/accept/${offerId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error accepting offer:", error);
      return { message: "Failed to accept offer. Try again." };
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
      const response = await acceptOffer(offerId, token);
      if (response.message) {
        setResponseMessage(response.message);
      } else {
        setResponseMessage("Offer accepted successfully!");
      }
    } catch (error) {
      setResponseMessage("Failed to accept offer. Try again.");
    }
  };

  return (
    <div className="container">
      <h2>Accept an Offer</h2>
      <form onSubmit={handleSubmit}>
        <label>Offer ID:</label>
        <input
          type="text"
          name="offerId"
          value={offerId}
          onChange={(e) => setOfferId(e.target.value)}
          required
        />

        <button type="submit">Accept Offer</button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}
