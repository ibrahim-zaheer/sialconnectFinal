// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "../../lib/axios";
// import BidForm from "./BidForm";
// import { Link } from "react-router-dom";

// import { useLocation } from "react-router-dom";



// const SupplierDetails = () => {
//   const { id } = useParams();
//   const [userDetails, setUserDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const location = useLocation();
// const { auctionId, bidId } = location.state || {};

//   useEffect(() => {
//     const fetchAuctionDetails = async () => {
//       try {
//         setLoading(true);
//         setError(""); // Reset errors on new fetch

//         const response = await axios.get(`/api/bidding/user-details/${id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });

//         console.log("API Response:", response.data);

//         setUserDetails(response.data);
//         localStorage.setItem(`auction-${id}`, JSON.stringify(response.data)); // Cache updated data
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching auction details:", error);
//         setError("Failed to load auction details.");
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchAuctionDetails();
//     }
//   }, [id]);

//   if (loading) return <div>Loading details...</div>;
//   if (error) return <div>{error}</div>;
//   if (!userDetails) return <div>No details found.</div>;

//   return (
//     <div className="user-detail w-[80vw] mx-auto mt-20">
      

//       {/* Correctly display profile picture directly from profilePicture URL */}
//       {userDetails?.profilePicture && (
//         <img
//           src={userDetails?.profilePicture}
//           alt={userDetails?.name}
//           style={{ width: "250px", height: "auto", borderRadius: "10px", marginTop: "10px" }}
//         />
//       )}
//       <p><strong>Name:</strong> {userDetails?.name}</p>
//       <p><strong>Email:</strong> {userDetails?.email}</p>

//         <div className="mt-4">
//                       {/* <Link
//                         to={`/chat`}
//                         className="inline-block bg-blue-500 text-white py-1.5 px-3 rounded-lg hover:bg-blue-600 transition duration-300"
//                       >
//                         Chat
//                       </Link> */}

//                         <Link
//                                         to={`/chat?supplierId=${id}`}
//                                         className="inline-block bg-blue-500 text-white py-1.5 px-3 rounded-lg hover:bg-blue-600 transition duration-300"
//                                       >
//                                         Chat
//                                       </Link>
//                     </div>
//                     {auctionId && bidId && (
//   <button
//     onClick={async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.post(
//           "/api/bidding/accept",
//           { auctionId, bidId },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         alert("Bid accepted and order created!");
//       } catch (err) {
//         console.error("Error accepting bid:", err);
//         alert("Failed to accept bid.");
//       }
//     }}
//     className="ml-4 inline-block bg-green-600 text-white py-1.5 px-3 rounded-lg hover:bg-green-700 transition duration-300"
//   >
//     Accept Bid
//   </button>
// )}

//     </div>
//   );
// };

// export default SupplierDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../lib/axios";
import BidForm from "./BidForm";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";



const SupplierDetails = () => {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [auctionDetails, setAuctionDetails] = useState(null); // 🆕 for full auction
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();

  const { auctionId, bidId } = location.state || {};

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError("");

        // 1. Get user details
        const userResponse = await axios.get(`/api/bidding/user-details/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUserDetails(userResponse.data);

        // 2. Get auction details (for acceptedBid info)
        const auctionResponse = await axios.get(`/api/bidding/${auctionId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setAuctionDetails(auctionResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching details:", error);
        setError("Failed to load data.");
        setLoading(false);
      }
    };

    if (id && auctionId) fetchDetails();
  }, [id, auctionId]);

  const handleAcceptBid = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/bidding/accept",
        { auctionId, bidId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Bid accepted and order created!");
      setAuctionDetails((prev) => ({ ...prev, acceptedBid: bidId }));
    } catch (err) {
      console.error("Error accepting bid:", err);
      alert("Failed to accept bid.");
    }
  };

  if (loading) return <div>Loading details...</div>;
  if (error) return <div>{error}</div>;
  if (!userDetails) return <div>No details found.</div>;

  // Determine bid status
  const isAccepted = auctionDetails?.acceptedBid === bidId;
  const isRejected = auctionDetails?.acceptedBid && auctionDetails?.acceptedBid !== bidId;

  return (
    <div className="user-detail w-[80vw] mx-auto mt-20">
      {userDetails?.profilePicture && (
        <img
          src={userDetails.profilePicture}
          alt={userDetails.name}
          style={{ width: "250px", borderRadius: "10px", marginTop: "10px" }}
        />
      )}
      <p><strong>Name:</strong> {userDetails.name}</p>
      {/* <p><strong>Email:</strong> {userDetails.email}</p> */}

      <div className="mt-4">
        <Link
          to={`/chat?supplierId=${id}`}
          className="inline-block bg-blue-500 text-white py-1.5 px-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Chat
        </Link>
      </div>

      {/* Accept/Reject Button */}
      {auctionId && bidId && (
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
    </div>
  );
};

export default SupplierDetails;
