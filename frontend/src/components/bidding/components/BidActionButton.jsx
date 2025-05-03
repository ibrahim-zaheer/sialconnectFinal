import React, { useState, useEffect } from "react";
import axios from "axios";

const BidActionButton = ({ auctionId, bidId, acceptedBidId, onBidAccepted }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isAccepted = acceptedBidId === bidId;
  const isRejected = acceptedBidId && acceptedBidId !== bidId;

  const handleAcceptBid = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/bidding/accept",
        { auctionId, bidId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Bid accepted and order created!");
      onBidAccepted(bidId);  // Callback to update the parent component

    } catch (err) {
      console.error("Error accepting bid:", err);
      setError("Failed to accept bid.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {isAccepted ? (
            <button
              disabled
              className="ml-4 inline-block bg-green-500 text-white py-1.5 px-3 rounded-lg opacity-70 cursor-not-allowed"
            >
              Accepted
            </button>
          ) : isRejected ? (
            <button
              disabled
              className="ml-4 inline-block bg-red-500 text-white py-1.5 px-3 rounded-lg opacity-70 cursor-not-allowed"
            >
              Rejected
            </button>
          ) : (
            <button
              onClick={handleAcceptBid}
              className="ml-4 inline-block bg-green-600 text-white py-1.5 px-3 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Accept Bid
            </button>
          )}
        </>
      )}

      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default BidActionButton;
