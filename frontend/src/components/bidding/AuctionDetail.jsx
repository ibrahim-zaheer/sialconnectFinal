
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../lib/axios";
import BidForm from "./BidForm";
import { Link } from "react-router-dom";

const AuctionDetail = () => {
  const { id } = useParams();
  const [auctionDetails, setAuctionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        setLoading(true);
        setError(""); // Reset errors on new fetch

        // Get data from localStorage first
        const cachedData = localStorage.getItem(`auction-${id}`);
        if (cachedData) {
          setAuctionDetails(JSON.parse(cachedData));
        }

        // Fetch fresh data from API
        // const response = await axios.get(`/api/bidding/${id}`);

        const response = await axios.get(`/api/bidding/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("API Response:", response.data);

        setAuctionDetails(response.data);
        localStorage.setItem(`auction-${id}`, JSON.stringify(response.data)); // Cache updated data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching auction details:", error);
        setError("Failed to load auction details.");
        setLoading(false);
      }
    };

    if (id) {
      fetchAuctionDetails();
    }
  }, [id]);

  if (loading) return <div>Loading details...</div>;
  if (error) return <div>{error}</div>;
  if (!auctionDetails) return <div>No details found.</div>;

  return (
    <div className="auction-detail">
      <h2>{auctionDetails?.title}</h2>
      <p><strong>Description:</strong> {auctionDetails?.description}</p>
      <p><strong>Starting Bid:</strong> ${auctionDetails?.startingBid}</p>
      <p><strong>Current Bid:</strong> ${auctionDetails?.currentBid}</p>
      <p><strong>Category:</strong> {auctionDetails?.category}</p>
      <p><strong>Start Time:</strong> {new Date(auctionDetails?.startTime).toLocaleString()}</p>
      <p><strong>End Time:</strong> {new Date(auctionDetails?.endTime).toLocaleString()}</p>

      {auctionDetails?.image?.url && (
        <img
          src={auctionDetails?.image?.url}
          alt={auctionDetails?.title}
          style={{ width: "250px", height: "auto", borderRadius: "10px", marginTop: "10px" }}
        />
      )}

      {auctionDetails?.createdBy && (
        <div style={{ marginTop: "20px" }}>
          <h4>Created By:</h4>
          <p><strong>Name:</strong> {auctionDetails?.createdBy?.name}</p>
          <p><strong>Email:</strong> {auctionDetails?.createdBy?.email}</p>
          {auctionDetails?.createdBy?.profilePicture && (
            <img
              src={auctionDetails?.createdBy?.profilePicture}
              alt={auctionDetails?.createdBy?.name}
              style={{ width: "60px", height: "60px", borderRadius: "50%", marginTop: "10px" }}
            />
          )}
        </div>
      )}

      {/* Render Bid Form only if the user hasn't placed a bid */}
      <BidForm
        auctionId={id}
        refreshAuction={setAuctionDetails}
        userHasBid={auctionDetails?.userHasBid}
      />

      {/* Bids Section */}
      {auctionDetails?.bids?.length > 0 ? (
        <div>
          <h4>Bids:</h4>
          <ul>
            {auctionDetails?.bids?.map((bid) => (
              <li key={bid?.userId}>
                <p><strong>{bid?.userName}:</strong> ${bid?.amount}</p>
                <p>{bid?._id}</p>
                <p>UserID: {bid?.userId?._id}</p>
                {bid?.profileImage && (
                  <img
                    src={bid?.profileImage}
                    alt={bid?.userName}
                    style={{ width: "50px", height: "50px", borderRadius: "50%", marginLeft: "10px" }}
                  />
                )}
                <div className="mt-4">
                                <Link
                                  to={`/bidding/supplier/${bid?.userId._id}`}
                                  className="inline-block bg-blue-500 text-white py-1.5 px-3 rounded-lg hover:bg-blue-600 transition duration-300"
                                >
                                  View more
                                </Link>
                              </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No bids placed yet.</p>
      )}
    </div>
  );
};

export default AuctionDetail;
