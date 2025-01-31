// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AuctionDetail = ({ auctionId }) => {
//   const [auctionDetails, setAuctionDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Fetch auction details when auctionId changes
//   useEffect(() => {
//     const fetchAuctionDetails = async () => {
//       try {
//         const response = await axios.get(`/bidding/${auctionId}`); // API to get auction details by ID
//         setAuctionDetails(response.data); // Store auction details
//         setLoading(false);
//       } catch (error) {
//         setError("Failed to load auction details.");
//         setLoading(false);
//       }
//     };

//     if (auctionId) {
//       fetchAuctionDetails(); // Fetch details when auctionId is available
//     }
//   }, [auctionId]); // Runs every time auctionId changes

//   if (loading) {
//     return <div>Loading details...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!auctionDetails) {
//     return <div>No details found.</div>;
//   }

//   return (
//     <div className="auction-detail">
//       <h3>{auctionDetails.title}</h3>
//       <p>{auctionDetails.description}</p>
//       <p>Starting Bid: ${auctionDetails.startingBid}</p>
//       <p>Current Bid: ${auctionDetails.currentBid}</p>
//       <p>Category: {auctionDetails.category}</p>
//       <p>Start Time: {new Date(auctionDetails.startTime).toLocaleString()}</p>
//       <p>End Time: {new Date(auctionDetails.endTime).toLocaleString()}</p>
//       {auctionDetails.image && (
//         <img
//           src={auctionDetails.image.url}
//           alt={auctionDetails.title}
//           style={{ width: "200px", height: "auto" }}
//         />
//       )}

//       {/* Display Bids */}
//       <h4>Bids:</h4>
//       <ul>
//         {auctionDetails.bids.map((bid) => (
//           <li key={bid.userId}>
//             <p>{bid.userName} - ${bid.amount}</p>
//             <img
//               src={bid.profileImage}
//               alt={bid.userName}
//               style={{ width: "50px", height: "50px", borderRadius: "50%" }}
//             />
//           </li>
//         ))}
//       </ul>

//       {/* Highest Bidder */}
//       {auctionDetails.highestBidder && (
//         <p>
//           <strong>Highest Bidder:</strong> {auctionDetails.highestBidder.name}
//         </p>
//       )}
//     </div>
//   );
// };

// export default AuctionDetail;







import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../lib/axios";

const AuctionDetail = () => {
  const { id } = useParams(); // Get the auction ID from the URL
  const [auctionDetails, setAuctionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        const response = await axios.get(`/bidding/${id}`); // Correct API endpoint
        console.log("API Response:", response.data); // Debugging Line
        setAuctionDetails(response.data);
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
      <h2>{auctionDetails.title}</h2>
      <p><strong>Description:</strong> {auctionDetails.description}</p>
      <p><strong>Starting Bid:</strong> ${auctionDetails.startingBid}</p>
      <p><strong>Current Bid:</strong> ${auctionDetails.currentBid}</p>
      <p><strong>Category:</strong> {auctionDetails.category}</p>
      <p><strong>Start Time:</strong> {new Date(auctionDetails.startTime).toLocaleString()}</p>
      <p><strong>End Time:</strong> {new Date(auctionDetails.endTime).toLocaleString()}</p>
      
      {auctionDetails.image && auctionDetails.image.url && (
        <img
          src={auctionDetails.image.url}
          alt={auctionDetails.title}
          style={{ width: "250px", height: "auto", borderRadius: "10px", marginTop: "10px" }}
        />
      )}

      {auctionDetails.createdBy && (
        <div style={{ marginTop: "20px" }}>
          <h4>Created By:</h4>
          <p><strong>Name:</strong> {auctionDetails.createdBy.name}</p>
          <p><strong>Email:</strong> {auctionDetails.createdBy.email}</p>
          {auctionDetails.createdBy.profilePicture && (
            <img
              src={auctionDetails.createdBy.profilePicture}
              alt={auctionDetails.createdBy.name}
              style={{ width: "60px", height: "60px", borderRadius: "50%", marginTop: "10px" }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AuctionDetail;
