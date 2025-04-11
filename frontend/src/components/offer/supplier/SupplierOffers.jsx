// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { selectUser } from "../../../redux/reducers/userSlice";

// import AcceptOffer from "../AcceptOffer";
// import RejectOffer from "../RejectOffer";
// import CounterOffer from "../CounterOffer";

// export default function SupplierOffers() {
//   const user = useSelector(selectUser);
//   const token = user?.id ? localStorage.getItem("token") : null;
//   const [offers, setOffers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchOffers = async () => {
//       if (!token) {
//         setError("User not authenticated. Please log in.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get("/api/offers/supplier", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setOffers(response.data.offers);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch offers.");
//         setLoading(false);
//       }
//     };

//     fetchOffers();
//   }, [token]);

//   // ✅ Function to refresh offers list after Accept/Reject
//   const updateOfferStatus = (offerId, newStatus) => {
//     setOffers((prevOffers) =>
//       prevOffers.map((offer) =>
//         offer._id === offerId ? { ...offer, status: newStatus } : offer
//       )
//     );
//   };

//   const updateCounterOfferStatus = (
//     offerId,
//     newStatus,
//     newPrice = null,
//     newQuantity = null,
//     newMessage = null
//   ) => {
//     setOffers((prevOffers) =>
//       prevOffers.map((offer) =>
//         offer._id === offerId
//           ? {
//               ...offer,
//               status: newStatus, // ✅ Update status
//               counterOffer: {
//                 // ✅ Store counteroffer separately
//                 price: newPrice !== null ? newPrice : offer.counterOffer?.price,
//                 quantity:
//                   newQuantity !== null
//                     ? newQuantity
//                     : offer.counterOffer?.quantity,
//                 message:
//                   newMessage !== null
//                     ? newMessage
//                     : offer.counterOffer?.message,
//               },
//             }
//           : offer
//       )
//     );
//   };

//   // ✅ Function to format date nicely
//   const formatDate = (dateString) => {
//     if (!dateString) return "Unknown";
//     return new Date(dateString).toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-2xl font-semibold text-center mb-6">My Offers</h2>
//       {loading ? (
//         <p className="text-center text-gray-500">Loading offers...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : offers.length === 0 ? (
//         <p className="text-center text-gray-500">No offers found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {offers.map((offer) => (
//             <div key={offer._id} className="bg-white p-4 shadow-lg rounded-lg">
//               <p className="text-lg font-semibold">
//                 Product: {offer.productId?.name || "Unknown"}
//               </p>
//               {/* ✅ Display Offer Creation Date */}
//               <p className="text-sm text-gray-600">
//                 Created On: {formatDate(offer.createdAt)}
//               </p>

//               {/* ✅ Display "Updated" tag if offer was modified by exporter */}
//               {offer.isUpdated && (
//                 <p className="text-sm font-bold text-blue-600">Updated</p>
//               )}
//               <p>Supplier: {offer.exporterId?.name || "Unknown"}</p>
//               <p>Price: {offer.price} Rs</p>
//               <p>Quantity: {offer.quantity}</p>
//               <p>Total Value: {offer.quantity * offer.price}</p>

//               {/* Chatgpt update code */}
//               {offer.history && offer.history.length > 0 && (
//   <details className="mt-3 bg-gray-100 p-2 rounded">
//     <summary className="cursor-pointer font-semibold text-blue-600">
//       View Offer History
//     </summary>
//     <ul className="mt-2">
//       {offer.history.map((entry, index) => (
//         <li key={index} className="border-b py-1">
//           <p>Price: {entry.price} Rs</p>
//           <p>Quantity: {entry.quantity}</p>
//           <p>Message: {entry.message || "No message"}</p>
//           <p>Updated By: {entry.updatedBy?.name || entry.updatedBy}</p>
//           <p>Date: {new Date(entry.timestamp).toLocaleString()}</p>
//         </li>
//       ))}
//     </ul>
//   </details>
// )}

//               <p>Message: {offer.message}</p>
//               <p>
//                 Status:{" "}
//                 <span
//                   className={`font-bold ${
//                     offer.status === "pending"
//                       ? "text-yellow-500"
//                       : offer.status === "accepted"
//                       ? "text-green-500"
//                       : "text-red-500"
//                   }`}
//                 >
//                   {offer.status}
//                 </span>
//               </p>

//               {/* ✅ Accept & Reject Components for Pending Offers */}
//               {/* {offer.status === "pending" && (
//                 <div className="mt-4 flex gap-2">
//                   <AcceptOffer offerId={offer._id} updateStatus={updateOfferStatus} />
//                   <RejectOffer offerId={offer._id} updateStatus={updateOfferStatus} />
//                   <CounterOffer offerId={offer._id} updateStatus={updateCounterOfferStatus} />
//                 </div>
//               )} */}
//               {/* ✅ Show Accept, Reject & Counter Offer buttons for "pending" & "counter" status */}
//               {offer.status === "pending" || offer.status === "counter" ? (
//                 <div className="mt-4 flex gap-2">
//                   <AcceptOffer
//                     offerId={offer._id}
//                     updateStatus={updateOfferStatus}
//                   />
//                   <RejectOffer
//                     offerId={offer._id}
//                     updateStatus={updateOfferStatus}
//                   />
//                   <CounterOffer
//                     offerId={offer._id}
//                     updateStatus={updateCounterOfferStatus}
//                     disabled={offer.counterOfferCount >= 2}
//                   />
//                 </div>
//               ) : null}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/reducers/userSlice";

import Pagination from "../../Pagination";
import AcceptOffer from "../AcceptOffer";
import RejectOffer from "../RejectOffer";
import CounterOffer from "../CounterOffer";

export default function SupplierOffers() {
  const user = useSelector(selectUser);
  const token = user?.id ? localStorage.getItem("token") : null;
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOffers = async () => {
      if (!token) {
        setError("User not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("/api/offers/supplier", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOffers(response.data.offers);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch offers.");
        setLoading(false);
      }
    };

    fetchOffers();
  }, [token]);

  const updateOfferStatus = (offerId, newStatus) => {
    setOffers((prevOffers) =>
      prevOffers.map((offer) =>
        offer._id === offerId ? { ...offer, status: newStatus } : offer
      )
    );
  };

  const updateCounterOfferStatus = (
    offerId,
    newStatus,
    newPrice = null,
    newQuantity = null,
    newMessage = null
  ) => {
    setOffers((prevOffers) =>
      prevOffers.map((offer) =>
        offer._id === offerId
          ? {
              ...offer,
              status: newStatus,
              counterOffer: {
                price: newPrice !== null ? newPrice : offer.counterOffer?.price,
                quantity:
                  newQuantity !== null
                    ? newQuantity
                    : offer.counterOffer?.quantity,
                message:
                  newMessage !== null
                    ? newMessage
                    : offer.counterOffer?.message,
              },
            }
          : offer
      )
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">My Offers</h2>
      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading offers...</p>
      ) : error ? (
        <p className="text-center text-red-600 text-lg">{error}</p>
      ) : offers.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No offers found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div key={offer._id} className="bg-white p-6 rounded-lg shadow-xl transform transition-all hover:scale-105 duration-300 ease-in-out">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{offer.productId?.name || "Unknown Product"}</h3>
                <p className="text-sm text-gray-600">Created On: {formatDate(offer.createdAt)}</p>
                {offer.isUpdated && (
                  <p className="text-sm font-bold text-blue-600">Updated</p>
                )}
                <p className="text-sm text-gray-600">Supplier: {offer.exporterId?.name || "Unknown Supplier"}</p>
              </div>
              <div className="space-y-3">
                <p className="text-lg font-semibold text-gray-800">Price: {offer.price} Rs</p>
                <p className="text-lg font-semibold text-gray-800">Quantity: {offer.quantity}</p>
                <p className="text-lg font-semibold text-gray-800">Total Value: {offer.quantity * offer.price} Rs</p>
                {offer.history && offer.history.length > 0 && (
                  <details className="bg-gray-100 p-4 rounded shadow-md">
                    <summary className="cursor-pointer font-semibold text-blue-600">View Offer History</summary>
                    <ul className="mt-2 space-y-2">
                      {offer.history.map((entry, index) => (
                        <li key={index} className="border-b pb-2">
                          <p className="font-semibold text-gray-700">Price: {entry.price} Rs</p>
                          <p className="text-gray-600">Quantity: {entry.quantity}</p>
                          <p className="text-gray-600">Message: {entry.message || "No message"}</p>
                          <p className="text-gray-600">Updated By: {entry.updatedBy?.name || entry.updatedBy}</p>
                          <p className="text-gray-500 text-xs">Date: {new Date(entry.timestamp).toLocaleString()}</p>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
                <p className="text-lg font-semibold text-gray-800">Message: {offer.message}</p>
                <p className="text-lg font-semibold">
                  Status:{" "}
                  <span
                    className={`font-bold ${
                      offer.status === "pending"
                        ? "text-yellow-500"
                        : offer.status === "accepted"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {offer.status}
                  </span>
                </p>
              </div>
              {(offer.status === "pending" || offer.status === "counter") && (
                <div className="mt-6 flex gap-4 justify-center">
                  <AcceptOffer offerId={offer._id} updateStatus={updateOfferStatus} />
                  <RejectOffer offerId={offer._id} updateStatus={updateOfferStatus} />
                  <CounterOffer offerId={offer._id} updateStatus={updateCounterOfferStatus} disabled={offer.counterOfferCount >= 2} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
