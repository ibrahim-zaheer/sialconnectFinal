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
//         const response = await axios.get("/api/bidding/getAllAuctions"); // Fetch auctions
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

//   // Render auctions
//   return (
//     <div className="auction-list">
//       <h2>All Auctions</h2>
//       {auctions.length === 0 ? (
//         <p>No auctions available at the moment.</p>
//       ) : (
//         <ul>
//           {auctions.map((auction) => (
//             <li key={auction._id} className="auction-item">
//               <h3>{auction.title}</h3>
//               <p>{auction.description}</p>
//               <p>Starting Bid: ${auction.startingBid}</p>
//               <p>Category: {auction.category}</p>
//               <p>
//                 Start Time: {new Date(auction.startTime).toLocaleString()} - End
//                 Time: {new Date(auction.endTime).toLocaleString()}
//               </p>
//               {auction.image && auction.image.url && (
//                 <img
//                   src={auction.image.url}
//                   alt={auction.title}
//                   style={{ width: "200px", height: "auto" }}
//                 />
//               )}
//               <div className="mt-4">
//                 <Link
//                   to={`/bidding/${auction._id}`}
//                   className="inline-block bg-blue-500 text-white py-1.5 px-3 rounded-lg hover:bg-blue-600 transition duration-300"
//                 >
//                   View more
//                 </Link>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default AuctionList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducers/userSlice"; // adjust path if needed

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]); // Ensure initial state is an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = useSelector(selectUser);
  const role = user?.role;

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axios.get("/api/bidding/getAllAuctions"); // Fetch auctions
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

  // Filter auctions based on the current date/time
  const filteredAuctions = auctions.filter((auction) => {
    const currentTime = new Date(); // Get the current date/time
    const endTime = new Date(auction.endTime); // Convert auction's end time to a Date object
    return endTime > currentTime; // Only include auctions where the endTime is in the future
  });

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
    <div className="auction-list w-[80vw] p-5">
      <h2 className="text-2xl font-bold text-center">All Auctions</h2>
      {filteredAuctions.length === 0 ? (
        <p>No ongoing auctions available at the moment.</p>
      ) : (
        <ul className="flex gap-5 my-10">
          {filteredAuctions.map((auction) => (
            <li
              key={auction._id}
              className="auction-item p-5 border rounded-lg"
            >
              {/* {auction.image && auction.image.url && (
                <img
                className="mb-3 flex justify-center items-center"
                  src={auction.image.url}
                  alt={auction.title}
                  style={{ width: "200px", height: "auto" }}
                />
              )} */}
              {/* {auction.image && auction.image.length > 0 && (
  <img
    className="mb-3 flex justify-center items-center"
    src={auction.image[0]} // Show the first image
    alt={auction.title}
    style={{ width: "200px", height: "auto" }}
  />
)} */}
              {auction.image && (
                <img
                  src={
                    Array.isArray(auction.image)
                      ? auction.image[0] // New format
                      : auction.image.url // Old format
                  }
                  alt="Auction"
                  className="w-24 h-24 object-cover rounded-lg"
                />
              )}

              <h3>{auction.title}</h3>
              <p>{auction.description}</p>
              <p>Starting Bid: ${auction.startingBid}</p>
              <p>Category: {auction.category}</p>
              <p>
                Start Time: {new Date(auction.startTime).toLocaleString()}{" "}
                <br /> End Time: {new Date(auction.endTime).toLocaleString()}
              </p>

              <div className="mt-4">
                {role === "exporter" && (
                  <Link
                    to={`/bidding/${auction._id}`}
                    className="inline-block bg-blue-500 text-white py-1.5 px-3 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    View mores
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AuctionList;
