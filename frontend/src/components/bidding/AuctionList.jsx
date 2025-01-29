import React, { useEffect, useState } from "react";
import axios from "axios";

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all auctions from the backend when the component mounts
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axios.get("/bidding/getAllAuctions"); // API endpoint for getting all auctions
        setAuctions(response.data); // Store auctions data in state
        setLoading(false);
      } catch (error) {
        setError("Failed to load auctions.");
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="auction-list">
      <h2>All Auctions</h2>
      {auctions.length === 0 ? (
        <p>No auctions available at the moment.</p>
      ) : (
        <ul>
          {auctions.map((auction) => (
            <li key={auction._id} className="auction-item">
              <h3>{auction.title}</h3>
              <p>{auction.description}</p>
              <p>Starting Bid: ${auction.startingBid}</p>
              <p>Category: {auction.category}</p>
              <p>
                Start Time: {new Date(auction.startTime).toLocaleString()} - End Time: {new Date(auction.endTime).toLocaleString()}
              </p>
              {auction.image && (
                <img src={auction.image.url} alt={auction.title} style={{ width: '200px', height: 'auto' }} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AuctionList;
