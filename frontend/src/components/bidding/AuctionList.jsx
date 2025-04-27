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

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// import { useSelector } from "react-redux";
// import { selectUser } from "../../redux/reducers/userSlice"; // adjust path if needed

// const AuctionList = () => {
//   const [auctions, setAuctions] = useState([]); // Ensure initial state is an empty array
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const user = useSelector(selectUser);
//   const role = user?.role;

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

//   // Filter auctions based on the current date/time
//   const filteredAuctions = auctions.filter((auction) => {
//     const currentTime = new Date(); // Get the current date/time
//     const endTime = new Date(auction.endTime); // Convert auction's end time to a Date object
//     return endTime > currentTime; // Only include auctions where the endTime is in the future
//   });

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
//     <div className="auction-list w-[80vw] p-5">
//       <h2 className="text-2xl font-bold text-center">All Auctions</h2>
//       {filteredAuctions.length === 0 ? (
//         <p>No ongoing auctions available at the moment.</p>
//       ) : (
//         <ul className="flex gap-5 my-10">
//           {filteredAuctions.map((auction) => (
//             <li
//               key={auction._id}
//               className="auction-item p-5 border rounded-lg"
//             >
//               {/* {auction.image && auction.image.url && (
//                 <img
//                 className="mb-3 flex justify-center items-center"
//                   src={auction.image.url}
//                   alt={auction.title}
//                   style={{ width: "200px", height: "auto" }}
//                 />
//               )} */}
//               {/* {auction.image && auction.image.length > 0 && (
//   <img
//     className="mb-3 flex justify-center items-center"
//     src={auction.image[0]} // Show the first image
//     alt={auction.title}
//     style={{ width: "200px", height: "auto" }}
//   />
// )} */}
//               {auction.image && (
//                 <img
//                   src={
//                     Array.isArray(auction.image)
//                       ? auction.image[0] // New format
//                       : auction.image.url // Old format
//                   }
//                   alt="Auction"
//                   className="w-24 h-24 object-cover rounded-lg"
//                 />
//               )}

//               <h3>{auction.title}</h3>
//               <p>{auction.description}</p>
//               <p>Starting Bid: ${auction.startingBid}</p>
//               <p>Category: {auction.category}</p>
//               <p>
//                 Start Time: {new Date(auction.startTime).toLocaleString()}{" "}
//                 <br /> End Time: {new Date(auction.endTime).toLocaleString()}
//               </p>

//               <div className="mt-4">
//                 {role === "supplier" && (
//                   <Link
//                     to={`/bidding/${auction._id}`}
//                     className="inline-block bg-blue-500 py-1.5 px-3 rounded-lg hover:bg-blue-600 transition duration-300"
//                   >
//                     View mores
//                   </Link>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default AuctionList;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectUser } from "../../redux/reducers/userSlice";

// const AuctionList = () => {
//   const [auctions, setAuctions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const user = useSelector(selectUser);
//   const role = user?.role;

//   useEffect(() => {
//     const fetchAuctions = async () => {
//       try {
//         const response = await axios.get("/api/bidding/getAllAuctions");
//         setAuctions(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching auctions:", error);
//         setError("Failed to load auctions. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchAuctions();
//   }, []);

//   const filteredAuctions = auctions.filter((auction) => {
//     const currentTime = new Date();
//     const endTime = new Date(auction.endTime);
//     return endTime > currentTime;
//   });

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-error/10 p-4 rounded-lg border border-error/20 text-error max-w-md mx-auto mt-8 text-center">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="text-center mb-12">
//         <h2 className="text-3xl font-bold text-primary-900 mb-2">Current Auctions</h2>
//         <p className="text-neutral-600 max-w-2xl mx-auto">
//           Browse through our ongoing auctions and place your bids
//         </p>
//       </div>

//       {filteredAuctions.length === 0 ? (
//         <div className="bg-surface rounded-lg shadow-sm p-8 text-center">
//           <div className="mx-auto h-24 w-24 text-neutral-400 mb-4">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
//             </svg>
//           </div>
//           <h3 className="text-lg font-medium text-neutral-800 mb-1">No ongoing auctions</h3>
//           <p className="text-neutral-500">Check back later for new auction opportunities</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredAuctions.map((auction) => (
//             <div
//               key={auction._id}
//               className="bg-surface rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 border border-neutral-200"
//             >
//               <div className="relative h-48 bg-neutral-100 overflow-hidden">
//                 {auction.image && (
//                   <img
//                     src={
//                       Array.isArray(auction.image)
//                         ? auction.image[0]
//                         : auction.image.url
//                     }
//                     alt={auction.title}
//                     className="w-full h-full object-cover"
//                   />
//                 )}
//                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-neutral-900/70 to-transparent p-4">
//                   <h3 className="text-lg font-semibold text-surface truncate">{auction.title}</h3>
//                 </div>
//               </div>

//               <div className="p-5">
//                 <p className="text-neutral-600 line-clamp-2 mb-4">{auction.description}</p>
                
//                 <div className="grid grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Starting Bid</p>
//                     <p className="font-bold text-primary-700">${auction.startingBid.toLocaleString()}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Category</p>
//                     <p className="font-medium text-neutral-700 capitalize">{auction.category}</p>
//                   </div>
//                 </div>

//                 <div className="space-y-2 mb-5">
//                   <div className="flex items-center text-sm text-neutral-600">
//                     <svg className="w-4 h-4 mr-2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                     </svg>
//                     <span>{new Date(auction.startTime).toLocaleDateString()}</span>
//                   </div>
//                   <div className="flex items-center text-sm text-neutral-600">
//                     <svg className="w-4 h-4 mr-2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span>Ends {new Date(auction.endTime).toLocaleString()}</span>
//                   </div>
//                 </div>

//                 {role === "supplier" && (
//                   <Link
//                     to={`/bidding/${auction._id}`}
//                     className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-surface bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
//                   >
//                     View Details
//                     <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                   </Link>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AuctionList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducers/userSlice";

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = useSelector(selectUser);
  const role = user?.role;

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axios.get("/api/bidding/getAllAuctions");
        setAuctions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching auctions:", error);
        setError("Failed to load auctions. Please try again later.");
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  const filteredAuctions = auctions.filter((auction) => {
    const currentTime = new Date();
    const endTime = new Date(auction.endTime);
    return endTime > currentTime;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-error/10 p-4 rounded-lg border border-error/20 text-error max-w-md mx-auto mt-8 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-primary-900 mb-2">Current Auctions</h2>
        <p className="text-neutral-600 max-w-2xl mx-auto">
          Browse through our ongoing auctions and place your bids
        </p>
      </div>

      {filteredAuctions.length === 0 ? (
        <div className="bg-surface rounded-lg shadow-sm p-8 text-center">
          <div className="mx-auto h-24 w-24 text-neutral-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-neutral-800 mb-1">No ongoing auctions</h3>
          <p className="text-neutral-500">Check back later for new auction opportunities</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAuctions.map((auction) => (
            <div
              key={auction._id}
              className="bg-surface rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 border border-neutral-200 flex flex-col"
            >
              {/* Image container with fixed aspect ratio */}
              <div className="relative h-48 w-full bg-neutral-100 overflow-hidden flex items-center justify-center">
                {auction.image ? (
                  <img
                    src={
                      Array.isArray(auction.image)
                        ? auction.image[0]
                        : auction.image.url
                    }
                    alt={auction.title}
                    className="object-contain max-h-full max-w-full p-2"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                    }}
                  />
                ) : (
                  <div className="bg-neutral-200 w-full h-full flex items-center justify-center text-neutral-400">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-neutral-900/70 to-transparent p-4">
                  <h3 className="text-lg font-semibold text-surface truncate">{auction.title}</h3>
                </div>
              </div>

              <div className="p-5 flex-grow flex flex-col">
                <p className="text-neutral-600 line-clamp-2 mb-4">{auction.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Starting Bid</p>
                    <p className="font-bold text-primary-700">${auction.startingBid.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Category</p>
                    <p className="font-medium text-neutral-700 capitalize">{auction.category}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-5">
                  <div className="flex items-center text-sm text-neutral-600">
                    <svg className="w-4 h-4 mr-2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{new Date(auction.startTime).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-sm text-neutral-600">
                    <svg className="w-4 h-4 mr-2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Ends {new Date(auction.endTime).toLocaleString()}</span>
                  </div>
                </div>

                {role === "supplier" && (
                  <Link
                    to={`/bidding/${auction._id}`}
                    className="mt-auto w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-surface bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                  >
                    View Details
                    <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuctionList;