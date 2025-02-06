







import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]); // Ensure initial state is an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axios.get("/bidding/getAllAuctions"); // Fetch auctions
        console.log("API Response:", response.data); // Debugging: Check API response
        setAuctions(response.data); // Set auctions state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching auctions:", error);
        setError("Failed to load auctions.");
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>{error}</div>;
  }

  // Render auctions
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
                Start Time: {new Date(auction.startTime).toLocaleString()} - End
                Time: {new Date(auction.endTime).toLocaleString()}
              </p>
              {auction.image && auction.image.url && (
                <img
                  src={auction.image.url}
                  alt={auction.title}
                  style={{ width: "200px", height: "auto" }}
                />
              )}
              <div className="mt-4">
                <Link
                  to={`/bidding/${auction._id}`}
                  className="inline-block bg-blue-500 text-white py-1.5 px-3 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  View more
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AuctionList;



// this is optional code to implement time


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const AuctionList = () => {
//   const [auctions, setAuctions] = useState([]); // Ensure initial state is an empty array
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchAuctions = async () => {
//       try {
//         const response = await axios.get("/bidding/getAllAuctions"); // Fetch auctions
//         console.log("API Response:", response.data); // Debugging: Check API response
//         setAuctions(response.data); // Set auctions state
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching auctions:", error);
//         setError("Failed to load auctions.");
//         setLoading(false);
//       }
//     };

//     fetchAuctions();
//   }, []);

//   // Handle loading state
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // Handle error state
//   if (error) {
//     return <div>{error}</div>;
//   }

//   // Get the current time
//   const currentTime = new Date();

//   // Render auctions
//   return (
//     <div className="auction-list">
//       <h2>All Auctions</h2>
//       {auctions.length === 0 ? (
//         <p>No auctions available at the moment.</p>
//       ) : (
//         <ul>
//           {auctions
//             .filter((auction) => {
//               const startTime = new Date(auction.startTime);
//               const endTime = new Date(auction.endTime);

//               // Show auction if current time is between start and end time
//               return currentTime >= startTime && currentTime <= endTime;
//             })
//             .map((auction) => (
//               <li key={auction._id} className="auction-item">
//                 <h3>{auction.title}</h3>
//                 <p>{auction.description}</p>
//                 <p>Starting Bid: ${auction.startingBid}</p>
//                 <p>Category: {auction.category}</p>
//                 <p>
//                   Start Time: {new Date(auction.startTime).toLocaleString()} - End
//                   Time: {new Date(auction.endTime).toLocaleString()}
//                 </p>
//                 {auction.image && auction.image.url && (
//                   <img
//                     src={auction.image.url}
//                     alt={auction.title}
//                     style={{ width: "200px", height: "auto" }}
//                   />
//                 )}
//                 <div className="mt-4">
//                   <Link
//                     to={`/api/bidding/${auction._id}`}
//                     className="inline-block bg-blue-500 text-white py-1.5 px-3 rounded-lg hover:bg-blue-600 transition duration-300"
//                   >
//                     View more
//                   </Link>
//                 </div>
//               </li>
//             ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default AuctionList;
