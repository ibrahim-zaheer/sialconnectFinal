import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const BidForm = ({ auctionId, refreshAuction }) => {
    const user = useSelector((state) => state.user); 
  const [bidAmount, setBidAmount] = useState(""); // State for bid input
  const [bidError, setBidError] = useState(""); // Error messages
  const [successMessage, setSuccessMessage] = useState(""); // Success messages

  const handleBidSubmit = async (e) => {
    e.preventDefault();

    // Reset messages
    setBidError("");
    setSuccessMessage("");

    if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
      setBidError("Please enter a valid bid amount.");
      return;
    }

    try {
      const response = await axios.post(
        `/bidding/place/${auctionId}`,
        { auctionId, amount: parseFloat(bidAmount) },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setSuccessMessage(response.data.message);
      setBidAmount(""); // Clear input field after successful bid

      // Refresh auction details to reflect the new bid
      const updatedAuctionResponse = await axios.get(`/bidding/${auctionId}`);
      refreshAuction(updatedAuctionResponse.data);
    } catch (error) {
      setBidError(error.response?.data?.message || "Failed to place bid.");
    }
  };

  if (user?.role === "exporter") {
    return null; // Hide the form for exporters
  }
  return (
    <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
      <h4>Place a Bid:</h4>
      <form onSubmit={handleBidSubmit}>
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          placeholder="Enter your bid"
          style={{ padding: "5px", marginRight: "10px" }}
        />
        <button
          type="submit"
          style={{
            padding: "6px 12px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit Bid
        </button>
      </form>

      {bidError && <p style={{ color: "red", marginTop: "10px" }}>{bidError}</p>}
      {successMessage && <p style={{ color: "green", marginTop: "10px" }}>{successMessage}</p>}
    </div>
  );
};

export default BidForm;
