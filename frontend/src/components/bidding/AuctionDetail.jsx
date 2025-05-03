

// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from "../../lib/axios";
// import { selectUser } from "../../redux/reducers/userSlice";
// import BidForm from "./BidForm";
// import BackButton from "../BackButton";

// const AuctionDetail = () => {
//   const { id } = useParams();
//   const [auctionDetails, setAuctionDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const user = useSelector(selectUser);
//   const role = user?.role;

//   useEffect(() => {
//     const fetchAuctionDetails = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         // Try to load from localStorage first
//         const cachedData = localStorage.getItem(`auction-${id}`);
//         if (cachedData) {
//           setAuctionDetails(JSON.parse(cachedData));
//         }

//         // Always fetch fresh data
//         const response = await axios.get(`/api/bidding/${id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });

//         setAuctionDetails(response.data);
//         localStorage.setItem(`auction-${id}`, JSON.stringify(response.data));
//       } catch (error) {
//         console.error("Error fetching auction details:", error);
//         setError(
//           error.response?.data?.message ||
//             "Failed to load auction details. Please try again later."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchAuctionDetails();
//     }
//   }, [id]);


//   const refreshAuctionDetails = async () => {
//     try {
//       const response = await axios.get(`/api/bidding/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
  
//       setAuctionDetails(response.data);
//       localStorage.setItem(`auction-${id}`, JSON.stringify(response.data));
//     } catch (error) {
//       console.error("Error refreshing auction:", error);
//     }
//   };
//   // Helper to handle image (array or object)
//   const getImageUrl = () => {
//     if (!auctionDetails?.image) return null;

//     if (Array.isArray(auctionDetails.image)) {
//       return auctionDetails.image[0]?.url || auctionDetails.image[0];
//     } else if (typeof auctionDetails.image === "object") {
//       return auctionDetails.image?.url;
//     }
//     return auctionDetails.image;
//   };

//   const imageUrl = getImageUrl();

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-4xl mx-auto my-20">
//         <div className="bg-error-50 border-l-4 border-error-500 p-4 rounded-lg">
//           <div className="flex items-center">
//             <svg
//               className="h-5 w-5 text-error-500 mr-3"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             <p className="text-error-700">{error}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!auctionDetails) {
//     return (
//       <div className="max-w-4xl mx-auto my-20">
//         <div className="bg-surface rounded-xl shadow-sm p-8 text-center">
//           <svg
//             className="mx-auto h-12 w-12 text-neutral-400"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={1}
//               d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//           <h3 className="mt-2 text-lg font-medium text-neutral-900">
//             No auction details found
//           </h3>
//           <p className="mt-1 text-neutral-500">
//             The auction you're looking for doesn't exist or may have been removed
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
//       <div className="mb-6">
//         <BackButton className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-surface bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200" />
//       </div>

//       <div className="bg-surface rounded-xl shadow-sm overflow-hidden border border-neutral-200">
//         {/* Auction Header */}
//         <div className="p-6 border-b border-neutral-200">
//           <h2 className="text-2xl font-bold text-neutral-900 mb-2">
//             {auctionDetails.title}
//           </h2>
//           <p className="text-neutral-600">{auctionDetails.description}</p>
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
//           {/* Left Column - Image */}
//           <div className="lg:col-span-1">
//             <div className="bg-neutral-100 rounded-lg overflow-hidden flex items-center justify-center h-64 lg:h-full">
//               {imageUrl ? (
//                 <img
//                   src={imageUrl}
//                   alt={auctionDetails.title}
//                   className="object-contain max-h-full max-w-full p-4"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
//                   }}
//                 />
//               ) : (
//                 <div className="text-neutral-400">
//                   <svg
//                     className="w-16 h-16"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="1"
//                       d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                     />
//                   </svg>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Middle Column - Details */}
//           <div className="lg:col-span-1 space-y-4">
//             <div className="bg-neutral-50 p-4 rounded-lg">
//               <h3 className="text-lg font-semibold text-neutral-800 mb-3">
//                 Auction Details
//               </h3>
//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-neutral-600">Starting Bid:</span>
//                   {/* <span className="font-medium text-neutral-800">
//                     Rs {auctionDetails.startingBid.toLocaleString()}
//                   </span> */}
//                   <span className="font-medium text-neutral-800">
//   Rs {auctionDetails.startingBid ? auctionDetails.startingBid.toLocaleString() : 'N/A'}
// </span>

//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-neutral-600">Current Bid:</span>
//                   <span className="font-medium text-primary-600">
//                     Rs{" "}
//                     {(auctionDetails.currentBid || auctionDetails.startingBid).toLocaleString()}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-neutral-600">Category:</span>
//                   <span className="font-medium text-neutral-800 capitalize">
//                     {auctionDetails.category}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-neutral-600">Started:</span>
//                   <span className="font-medium text-neutral-800">
//                     {formatDate(auctionDetails.startTime)}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-neutral-600">Ends:</span>
//                   <span className="font-medium text-neutral-800">
//                     {formatDate(auctionDetails.endTime)}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Creator Info */}
//             {auctionDetails.createdBy && (
//               <div className="bg-neutral-50 p-4 rounded-lg">
//                 <h3 className="text-lg font-semibold text-neutral-800 mb-3">
//                   Created By
//                 </h3>
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0">
//                     <img
//                       src={
//                         auctionDetails.createdBy.profilePicture ||
//                         "https://via.placeholder.com/150"
//                       }
//                       alt={auctionDetails.createdBy.name}
//                       className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = "https://via.placeholder.com/150";
//                       }}
//                     />
//                   </div>
//                   <div className="ml-4">
//                     <p className="font-medium text-neutral-800">
//                       {auctionDetails.createdBy.name}
//                     </p>
//                     <p className="text-sm text-neutral-500">Auction Creator</p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Column - Bid Form */}
//           {role === "supplier" && (
//             <div className="lg:col-span-1">
//               <BidForm
//                 auctionId={id}
//                 refreshAuction={refreshAuctionDetails}
//                 userHasBid={auctionDetails.userHasBid}
//                 currentBid={auctionDetails.currentBid || auctionDetails.startingBid}
//               />
//             </div>
//           )}
//         </div>

//         {/* Bids Section */}
//         {auctionDetails.bids?.length > 0 && (
//           <div className="border-t border-neutral-200 p-6">
//             <h3 className="text-xl font-semibold text-neutral-800 mb-4">
//               Bid History
//             </h3>
//             <div className="space-y-4">
//               {auctionDetails.bids.map((bid) => (
//                 <div key={bid._id} className="bg-neutral-50 p-4 rounded-lg">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <div className="flex-shrink-0">
//                         <img
//                           src={
//                             bid.bidder?.profilePicture ||
//                             "https://via.placeholder.com/150"
//                           }
//                           alt={bid.bidder?.id?.name}
//                           className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = "https://via.placeholder.com/150";
//                           }}
//                         />
//                       </div>
//                       <div className="ml-3">
//                         <p className="font-medium text-neutral-800">
//                           {bid.bidder?.id?.name || "Anonymous Bidder"}
//                         </p>
//                         <p className="text-sm text-neutral-500">
//                           {formatDate(bid.createdAt)}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-lg font-bold text-primary-600">
//                         Rs {bid.amount.toLocaleString()}
//                       </p>
//                       {role === "exporter" && (
//                         <Link
//                           to={`/bidding/supplier/${bid.bidder?.id?._id}`}
//                           state={{ auctionId: id, bidId: bid._id }}
//                           className="inline-flex items-center mt-2 text-sm font-medium rounded-md shadow-sm text-surface bg-primary-600 hover:bg-primary-700 px-3 py-1 transition-colors duration-200"
//                         >
//                           View Supplier
//                         </Link>
//                       )}
//                      <div className="mt-4">
//                              <Link
//                                to={`/chat?supplierId=${bid.bidder?.id?._id}`}
//                                className="inline-block bg-blue-500 text-white py-1.5 px-3 rounded-lg hover:bg-blue-600 transition duration-300"
//                              >
//                                Chat
//                              </Link>
//                            </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AuctionDetail;
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../../lib/axios";
import { selectUser } from "../../redux/reducers/userSlice";
import BidForm from "./BidForm";
import BackButton from "../BackButton";
import BidActionButton from "./components/BidActionButton";  // Import the reusable BidActionButton component

const AuctionDetail = () => {
  const { id } = useParams();
  const [auctionDetails, setAuctionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = useSelector(selectUser);
  const role = user?.role;

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        setLoading(true);
        setError("");

        // Try to load from localStorage first
        const cachedData = localStorage.getItem(`auction-${id}`);
        if (cachedData) {
          setAuctionDetails(JSON.parse(cachedData));
        }

        // Always fetch fresh data
        const response = await axios.get(`/api/bidding/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setAuctionDetails(response.data);
        localStorage.setItem(`auction-${id}`, JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching auction details:", error);
        setError(
          error.response?.data?.message ||
            "Failed to load auction details. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAuctionDetails();
    }
  }, [id]);

  const refreshAuctionDetails = async () => {
    try {
      const response = await axios.get(`/api/bidding/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setAuctionDetails(response.data);
      localStorage.setItem(`auction-${id}`, JSON.stringify(response.data));
    } catch (error) {
      console.error("Error refreshing auction:", error);
    }
  };

  // Helper to handle image (array or object)
  const getImageUrl = () => {
    if (!auctionDetails?.image) return null;

    if (Array.isArray(auctionDetails.image)) {
      return auctionDetails.image[0]?.url || auctionDetails.image[0];
    } else if (typeof auctionDetails.image === "object") {
      return auctionDetails.image?.url;
    }
    return auctionDetails.image;
  };

  const imageUrl = getImageUrl();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto my-20">
        <div className="bg-error-50 border-l-4 border-error-500 p-4 rounded-lg">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-error-500 mr-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-error-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!auctionDetails) {
    return (
      <div className="max-w-4xl mx-auto my-20">
        <div className="bg-surface rounded-xl shadow-sm p-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-neutral-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-neutral-900">
            No auction details found
          </h3>
          <p className="mt-1 text-neutral-500">
            The auction you're looking for doesn't exist or may have been removed
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
      <div className="mb-6">
        <BackButton className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-surface bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200" />
      </div>

      <div className="bg-surface rounded-xl shadow-sm overflow-hidden border border-neutral-200">
        {/* Auction Header */}
        <div className="p-6 border-b border-neutral-200">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            {auctionDetails.title}
          </h2>
          <p className="text-neutral-600">{auctionDetails.description}</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Left Column - Image */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-100 rounded-lg overflow-hidden flex items-center justify-center h-64 lg:h-full">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={auctionDetails.title}
                  className="object-contain max-h-full max-w-full p-4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />
              ) : (
                <div className="text-neutral-400">
                  <svg
                    className="w-16 h-16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Middle Column - Details */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-neutral-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                Auction Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Starting Bid:</span>
                  <span className="font-medium text-neutral-800">
                    Rs {auctionDetails.startingBid ? auctionDetails.startingBid.toLocaleString() : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Current Bid:</span>
                  <span className="font-medium text-primary-600">
                    Rs{" "}
                    {(auctionDetails.currentBid || auctionDetails.startingBid).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Category:</span>
                  <span className="font-medium text-neutral-800 capitalize">
                    {auctionDetails.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Started:</span>
                  <span className="font-medium text-neutral-800">
                    {formatDate(auctionDetails.startTime)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Ends:</span>
                  <span className="font-medium text-neutral-800">
                    {formatDate(auctionDetails.endTime)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Bid Form */}
          {role === "supplier" && (
            <div className="lg:col-span-1">
              <BidForm
                auctionId={id}
                refreshAuction={refreshAuctionDetails}
                userHasBid={auctionDetails.userHasBid}
                currentBid={auctionDetails.currentBid || auctionDetails.startingBid}
              />
            </div>
          )}
        </div>

        {/* Bids Section */}
        {auctionDetails.bids?.length > 0 && (
          <div className="border-t border-neutral-200 p-6">
            <h3 className="text-xl font-semibold text-neutral-800 mb-4">
              Bid History
            </h3>
            <div className="space-y-4">
              {auctionDetails.bids.map((bid) => (
                <div key={bid._id} className="bg-neutral-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          src={bid.bidder?.profilePicture || "https://via.placeholder.com/150"}
                          alt={bid.bidder?.id?.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/150";
                          }}
                        />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-neutral-800">
                          {bid.bidder?.id?.name || "Anonymous Bidder"}
                        </p>
                        <p className="text-sm text-neutral-500">{formatDate(bid.createdAt)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary-600">
                        Rs {bid.amount.toLocaleString()}
                      </p>

                      <BidActionButton
                        auctionId={id}
                        bidId={bid._id}
                        acceptedBidId={auctionDetails.acceptedBid}
                        onBidAccepted={() => refreshAuctionDetails()}
                      />
                        <div className="mt-4">
                              <Link
                                to={`/chat?supplierId=${bid.bidder?.id._id}`}
                                className="inline-block bg-blue-500 text-white py-1.5 px-3 rounded-lg hover:bg-blue-600 transition duration-300"
                              >
                                Chat
                              </Link>
                            </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionDetail;
