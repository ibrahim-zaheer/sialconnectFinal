import React, { useEffect, useState } from "react";
import axios from "axios";

const AuctionDetail = ({ auctionId }) => {
  const [auctionDetails, setAuctionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch auction details when auctionId changes
  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        const response = await axios.get(`/bidding/${auctionId}`); // API to get auction details by ID
        setAuctionDetails(response.data); // Store auction details
        setLoading(false);
      } catch (error) {
        setError("Failed to load auction details.");
        setLoading(false);
      }
    };

    if (auctionId) {
      fetchAuctionDetails(); // Fetch details when auctionId is available
    }
  }, [auctionId]); // Runs every time auctionId changes

  if (loading) {
    return <div>Loading details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!auctionDetails) {
    return <div>No details found.</div>;
  }

  return (
    <div className="auction-detail">
      <h3>{auctionDetails.title}</h3>
      <p>{auctionDetails.description}</p>
      <p>Starting Bid: ${auctionDetails.startingBid}</p>
      <p>Current Bid: ${auctionDetails.currentBid}</p>
      <p>Category: {auctionDetails.category}</p>
      <p>Start Time: {new Date(auctionDetails.startTime).toLocaleString()}</p>
      <p>End Time: {new Date(auctionDetails.endTime).toLocaleString()}</p>
      {auctionDetails.image && (
        <img
          src={auctionDetails.image.url}
          alt={auctionDetails.title}
          style={{ width: "200px", height: "auto" }}
        />
      )}

      {/* Display Bids */}
      <h4>Bids:</h4>
      <ul>
        {auctionDetails.bids.map((bid) => (
          <li key={bid.userId}>
            <p>{bid.userName} - ${bid.amount}</p>
            <img
              src={bid.profileImage}
              alt={bid.userName}
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          </li>
        ))}
      </ul>

      {/* Highest Bidder */}
      {auctionDetails.highestBidder && (
        <p>
          <strong>Highest Bidder:</strong> {auctionDetails.highestBidder.name}
        </p>
      )}
    </div>
  );
};

export default AuctionDetail;
