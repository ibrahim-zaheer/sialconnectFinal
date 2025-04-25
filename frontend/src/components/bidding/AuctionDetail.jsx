// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "../../lib/axios";
// import BidForm from "./BidForm";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectUser } from "../../redux/reducers/userSlice";

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

//         const cachedData = localStorage.getItem(`auction-${id}`);
//         if (cachedData) {
//           setAuctionDetails(JSON.parse(cachedData));
//         }

//         const response = await axios.get(`/api/bidding/${id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });

//         setAuctionDetails(response.data);
//         localStorage.setItem(`auction-${id}`, JSON.stringify(response.data));
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

//   if (loading) return (
//     <div className="flex justify-center items-center h-64">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
//     </div>
//   );

//   if (error) return (
//     <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded max-w-4xl mx-auto my-20">
//       {error}
//     </div>
//   );

//   if (!auctionDetails) return (
//     <div className="text-center text-neutral-500 py-20">
//       No auction details found
//     </div>
//   );

//   return (
//     <div className="auction-detail my-20 w-[80vw] mx-auto">
//       <h2>{auctionDetails?.title}</h2>
//       <p>
//         <strong>Description:</strong> {auctionDetails?.description}
//       </p>
//       <p>
//         <strong>Starting Bid:</strong> ${auctionDetails?.startingBid}
//       </p>
//       <p>
//         <strong>Current Bid:</strong> ${auctionDetails?.currentBid}
//       </p>
//       <p>
//         <strong>Category:</strong> {auctionDetails?.category}
//       </p>
//       <p>
//         <strong>Start Time:</strong>{" "}
//         {new Date(auctionDetails?.startTime).toLocaleString()}
//       </p>
//       <p>
//         <strong>End Time:</strong>{" "}
//         {new Date(auctionDetails?.endTime).toLocaleString()}
//       </p>

//       {auctionDetails?.image?.url && (
//         <img
//           src={auctionDetails?.image?.url}
//           alt={auctionDetails?.title}
//           style={{
//             width: "250px",
//             height: "auto",
//             borderRadius: "10px",
//             marginTop: "10px",
//           }}
//         />
//       )}

//       {auctionDetails?.createdBy && (
//         <div style={{ marginTop: "20px" }}>
//           <h4>Created By:</h4>
//           <p>
//             <strong>Name:</strong> {auctionDetails?.createdBy?.name}
//           </p>
//           <p>
//             <strong>Email:</strong> {auctionDetails?.createdBy?.email}
//           </p>
//           {auctionDetails?.createdBy?.profilePicture && (
//             <img
//               src={auctionDetails?.createdBy?.profilePicture}
//               alt={auctionDetails?.createdBy?.name}
//               style={{
//                 width: "60px",
//                 height: "60px",
//                 borderRadius: "50%",
//                 marginTop: "10px",
//               }}
//             />
//           )}
//         </div>
//       )}

//       {/* Render Bid Form only if the user hasn't placed a bid */}
//       <BidForm
//         auctionId={id}
//         refreshAuction={setAuctionDetails}
//         userHasBid={auctionDetails?.userHasBid}
//       />

//       {/* Bids Section */}
//       {auctionDetails?.bids?.length > 0 && (
//         <div>
//           <h4>Bids:</h4>
//           <ul>
//             {auctionDetails?.bids?.map((bid) => (
//               <li key={bid?._id}>
//                 <p>
//                   <strong>{bid?.bidder?.id?.name}:</strong> ${bid?.amount}
//                 </p>
//                 <p>Bid ID: {bid?._id}</p>
//                 <p>User ID: {bid?.bidder?.id?._id}</p>
//                 {bid?.bidder?.profilePicture && (
//                   <img
//                     src={bid?.bidder?.profilePicture}
//                     alt={bid?.bidder?.id?.name}
//                     style={{
//                       width: "50px",
//                       height: "50px",
//                       borderRadius: "50%",
//                       marginLeft: "10px",
//                     }}
//                   />
//                 )}
//                 <div className="mt-4">
//                   {role === "exporter" && (
//                     <Link
//                       to={`/bidding/supplier/${bid?.bidder?.id?._id}`}
//                       state={{ auctionId: id, bidId: bid?._id }}
//                       className="inline-block bg-blue-500 text-white py-1.5 px-3 rounded-lg hover:bg-blue-600 transition duration-300"
//                     >
//                       View more
//                     </Link>
//                   )}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AuctionDetail;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../lib/axios";
import BidForm from "./BidForm";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducers/userSlice";

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

        const cachedData = localStorage.getItem(`auction-${id}`);
        if (cachedData) {
          setAuctionDetails(JSON.parse(cachedData));
        }

        const response = await axios.get(`/api/bidding/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setAuctionDetails(response.data);
        localStorage.setItem(`auction-${id}`, JSON.stringify(response.data));
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

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded max-w-4xl mx-auto my-20">
      {error}
    </div>
  );

  if (!auctionDetails) return (
    <div className="text-center text-neutral-500 py-20">
      No auction details found
    </div>
  );

  return (
    <div className="auction-detail my-20 w-[80vw] mx-auto p-6 bg-white shadow-xl rounded-lg space-y-8">
      <h2 className="text-3xl font-bold text-center text-gray-800">{auctionDetails?.title}</h2>
      <p className="text-lg text-gray-700">{auctionDetails?.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div><strong>Starting Bid:</strong> ${auctionDetails?.startingBid}</div>
        <div><strong>Current Bid:</strong> ${auctionDetails?.currentBid}</div>
        <div><strong>Category:</strong> {auctionDetails?.category}</div>
        <div><strong>Start Time:</strong> {new Date(auctionDetails?.startTime).toLocaleString()}</div>
        <div><strong>End Time:</strong> {new Date(auctionDetails?.endTime).toLocaleString()}</div>
      </div>

      {auctionDetails?.image?.url && (
        <img
          src={auctionDetails?.image?.url}
          alt={auctionDetails?.title}
          className="w-full h-64 object-cover rounded-xl mt-4 shadow-lg"
        />
      )}

      {auctionDetails?.createdBy && (
        <div className="mt-6 bg-gray-100 p-4 rounded-xl shadow-md">
          <h4 className="text-xl font-semibold">Created By:</h4>
          <div className="flex items-center">
            <img
              src={auctionDetails?.createdBy?.profilePicture}
              alt={auctionDetails?.createdBy?.name}
              className="w-16 h-16 rounded-full"
            />
            <div className="ml-4">
              <p><strong>Name:</strong> {auctionDetails?.createdBy?.name}</p>
              {/* <p><strong>Email:</strong> {auctionDetails?.createdBy?.email}</p> */}
            </div>
          </div>
        </div>
      )}

      {/* Render Bid Form only if the user hasn't placed a bid */}
      <BidForm
        auctionId={id}
        refreshAuction={setAuctionDetails}
        userHasBid={auctionDetails?.userHasBid}
      />

      {/* Bids Section */}
      {auctionDetails?.bids?.length > 0 && (
        <div className="bg-gray-100 p-6 rounded-xl mt-6 shadow-md">
          <h4 className="text-xl font-semibold">Bids:</h4>
          <ul>
            {auctionDetails?.bids?.map((bid) => (
              <li key={bid?._id} className="border-b border-gray-300 py-4">
                <div className="flex items-center">
                  <strong>{bid?.bidder?.id?.name}:</strong> ${bid?.amount}
                  <img
                    src={bid?.bidder?.profilePicture}
                    alt={bid?.bidder?.id?.name}
                    className="w-10 h-10 rounded-full ml-4"
                  />
                </div>
                <p className="text-sm text-gray-500">Bid ID: {bid?._id}</p>
                <p className="text-sm text-gray-500">User ID: {bid?.bidder?.id?._id}</p>
                <div className="mt-2">
                  {role === "exporter" && (
                    <Link
                      to={`/bidding/supplier/${bid?.bidder?.id?._id}`}
                      state={{ auctionId: id, bidId: bid?._id }}
                      className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                      View More
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AuctionDetail;
