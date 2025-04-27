

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { selectUser } from "../../../redux/reducers/userSlice";
// import CounterOffer from "../CounterOffer";
// import UpdateOffer from "../UpdateOffer";
// import { useDispatch } from "react-redux";
// import { setUpdated } from "../../../redux/reducers/updateSlice";

// export default function ExporterOffers() {
//   const user = useSelector(selectUser);
//   const token = user?.id ? localStorage.getItem("token") : null;
//   const [offers, setOffers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedOffer, setSelectedOffer] = useState(null);

//   const dispatch = useDispatch();
//   const acceptedCount = offers.filter(
//     (offer) => offer.status === "accepted"
//   ).length;
//   const rejectedCount = offers.filter(
//     (offer) => offer.status === "rejected"
//   ).length;

//   useEffect(() => {
//     const fetchOffers = async () => {
//       if (!token) {
//         setError("User not authenticated. Please log in.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get("/api/offers/exporter", {
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

//   const updateState = () => {
//     dispatch(setUpdated("Yes"));
//   };

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

//   const updateCounterOfferStatus = (
//     offerId,
//     newStatus,
//     newPrice = null,
//     newQuantity = null
//   ) => {
//     setOffers((prevOffers) =>
//       prevOffers.map((offer) =>
//         offer._id === offerId
//           ? {
//               ...offer,
//               status: newStatus,
//               counterOffer: { price: newPrice, quantity: newQuantity },
//             }
//           : offer
//       )
//     );
//   };

//   const handleUpdateOffer = (offerId, updatedData) => {
//     setOffers((prevOffers) =>
//       prevOffers.map((offer) =>
//         offer._id === offerId
//           ? { ...offer, ...updatedData, isUpdated: true }
//           : offer
//       )
//     );
//   };

//   return (
//     <div className="container mx-auto p-8">
//       <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">My Offers</h2>

//       <div className="flex justify-center gap-10 mb-8">
//         <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg shadow-md">
//           Accepted Offers: <span className="font-bold">{acceptedCount}</span>
//         </div>
//         <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg shadow-md">
//           Rejected Offers: <span className="font-bold">{rejectedCount}</span>
//         </div>
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-500 text-lg">Loading offers...</p>
//       ) : error ? (
//         <p className="text-center text-red-600 text-lg">{error}</p>
//       ) : offers.length === 0 ? (
//         <p className="text-center text-gray-500 text-lg">No offers found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {offers.map((offer) => (
//             <div key={offer._id} className="bg-white p-6 rounded-lg shadow-xl transform transition-all hover:scale-105 duration-300 ease-in-out">
//               <div className="mb-6">
//                 <h3 className="text-xl font-semibold text-gray-800">{offer.productId?.name || "Unknown Product"}</h3>
//                 <p className="text-sm text-gray-600">Supplier: {offer.supplierId?.name || "Unknown Supplier"}</p>
//                 <p className="text-lg font-semibold text-gray-800">Price: {offer.price} Rs</p>
//                 <p className="text-lg font-semibold text-gray-800">Quantity: {offer.quantity}</p>
//                 <p className="text-lg font-semibold text-gray-800">Total Value: {offer.quantity * offer.price} Rs</p>
//               </div>

//               {offer.history && offer.history.length > 0 && (
//                 <details className="bg-gray-100 p-4 rounded shadow-md mt-4">
//                   <summary className="cursor-pointer font-semibold text-blue-600">View Offer History</summary>
//                   <ul className="mt-2 space-y-3">
//                     {offer.history.map((entry, index) => (
//                       <li key={index} className="border-b pb-2">
//                         <p className="font-semibold text-gray-700">Price: {entry.price} Rs</p>
//                         <p className="text-gray-600">Quantity: {entry.quantity}</p>
//                         <p className="text-gray-600">Message: {entry.message || "No message"}</p>
//                         <p className="text-gray-600">Updated By: {entry.updatedBy?.name || entry.updatedBy}</p>
//                         <p className="text-gray-500 text-xs">Date: {new Date(entry.timestamp).toLocaleString()}</p>
//                       </li>
//                     ))}
//                   </ul>
//                 </details>
//               )}

//               {offer.status === "counter" && (
//                 <button
//                   onClick={() => setSelectedOffer(offer)}
//                   disabled={offer.updateCount >= 2}
//                   className={`mt-3 p-2 rounded ${
//                     offer.updateCount >= 2
//                       ? "bg-gray-400 cursor-not-allowed text-white"
//                       : "bg-blue-500 text-white hover:bg-blue-600"
//                   }`}
//                 >
//                   {offer.updateCount >= 2
//                     ? "Update Limit Reached"
//                     : "Update Offer"}
//                 </button>
//               )}

//               <p className="text-lg font-semibold">
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

//               <p className="text-sm text-gray-600">Created On: {formatDate(offer.createdAt)}</p>

//               {offer.counterOffer && (
//                 <div className="mt-4 p-4 bg-gray-100 rounded">
//                   <h3 className="font-semibold text-md">Counteroffer Details:</h3>
//                   <p>New Price: {offer.counterOffer.price} Rs</p>
//                   <p>New Quantity: {offer.counterOffer.quantity}</p>
//                   {offer.counterOffer.message && <p>Message: {offer.counterOffer.message}</p>}

//                   {offer.status === "counter" &&
//                     selectedOffer &&
//                     selectedOffer._id === offer._id && (
//                       <UpdateOffer
//                         offerId={selectedOffer._id}
//                         currentOffer={selectedOffer}
//                         onClose={() => setSelectedOffer(null)} // Close popup on cancel
//                         onUpdate={handleUpdateOffer} // Update state on success
//                       />
//                     )}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../redux/reducers/userSlice";
import { setUpdated } from "../../../redux/reducers/updateSlice";
import CounterOffer from "../CounterOffer";
import UpdateOffer from "../UpdateOffer";
import { motion } from "framer-motion";

export default function ExporterOffers() {
  const user = useSelector(selectUser);
  const token = user?.id ? localStorage.getItem("token") : null;
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOffer, setSelectedOffer] = useState(null);
  const dispatch = useDispatch();

  const acceptedCount = offers.filter(
    (offer) => offer.status === "accepted"
  ).length;
  const rejectedCount = offers.filter(
    (offer) => offer.status === "rejected"
  ).length;

  useEffect(() => {
    const fetchOffers = async () => {
      if (!token) {
        setError("Please log in to view your offers");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("/api/offers/exporter", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOffers(response.data.offers);
        setLoading(false);
      } catch (err) {
        setError("We couldn't load your offers. Please try again later.");
        setLoading(false);
      }
    };

    fetchOffers();
  }, [token]);

  const updateState = () => {
    dispatch(setUpdated("Yes"));
  };

  const updateCounterOfferStatus = (
    offerId,
    newStatus,
    newPrice = null,
    newQuantity = null
  ) => {
    setOffers((prevOffers) =>
      prevOffers.map((offer) =>
        offer._id === offerId
          ? {
              ...offer,
              status: newStatus,
              counterOffer: { price: newPrice, quantity: newQuantity },
            }
          : offer
      )
    );
  };

  const handleUpdateOffer = (offerId, updatedData) => {
    setOffers((prevOffers) =>
      prevOffers.map((offer) =>
        offer._id === offerId
          ? { ...offer, ...updatedData, isUpdated: true }
          : offer
      )
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-2xl font-bold text-primary-800 mb-6">Your Offers</h2>
        
        <div className="flex justify-center gap-4 mb-6">
          <div className="bg-success-50 text-success-800 px-4 py-2 rounded-lg shadow-sm">
            Accepted Offers: <span className="font-bold">{acceptedCount}</span>
          </div>
          <div className="bg-error-50 text-error-800 px-4 py-2 rounded-lg shadow-sm">
            Rejected Offers: <span className="font-bold">{rejectedCount}</span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full mb-4"></div>
              <p className="text-neutral-600">Loading your offers...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-error-50 border-l-4 border-error-400 p-4 mb-6 rounded">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-error-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-error-700">{error}</p>
              </div>
            </div>
          </div>
        ) : offers.length === 0 ? (
          <div className="bg-surface rounded-xl shadow-sm p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-neutral-900">No offers yet</h3>
            <p className="mt-1 text-neutral-500">You haven't made any offers yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <motion.div
                key={offer._id}
                whileHover={{ y: -5 }}
                className="bg-surface rounded-xl shadow-sm border border-neutral-100 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-primary-800">
                      {offer.productId?.name || "Unnamed Product"}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      offer.status === "pending"
                        ? "bg-accent-100 text-accent-800"
                        : offer.status === "accepted"
                        ? "bg-success-100 text-success-800"
                        : "bg-error-100 text-error-800"
                    }`}>
                      {offer.status}
                    </span>
                  </div>

                  <div className="text-sm text-neutral-600 mb-2">
                    Supplier: {offer.supplierId?.name || "Unknown Supplier"}
                  </div>

                  <div className="space-y-3 text-neutral-700">
                    <div className="flex justify-between">
                      <span>Price:</span>
                      <span className="font-medium">{offer.price} Rs</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quantity:</span>
                      <span className="font-medium">{offer.quantity}</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-100 pb-3">
                      <span>Total Value:</span>
                      <span className="font-medium text-primary-700">
                        {offer.quantity * offer.price} Rs
                      </span>
                    </div>

                    {offer.message && (
                      <div className="pt-3">
                        <p className="text-sm text-neutral-600">
                          <span className="font-medium">Message:</span> {offer.message}
                        </p>
                      </div>
                    )}

                    {offer.history?.length > 0 && (
                      <details className="mt-3">
                        <summary className="text-sm font-medium text-primary-600 cursor-pointer">
                          Offer History
                        </summary>
                        <ul className="mt-2 space-y-2 text-sm">
                          {offer.history.map((entry, index) => (
                            <li key={index} className="border-l-2 border-primary-200 pl-3">
                              <div className="flex justify-between">
                                <span>Price:</span>
                                <span>{entry.price} Rs</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Quantity:</span>
                                <span>{entry.quantity}</span>
                              </div>
                              {entry.message && (
                                <p className="text-neutral-600">
                                  <span className="font-medium">Message:</span> {entry.message}
                                </p>
                              )}
                              <p className="text-xs text-neutral-500 mt-1">
                                {new Date(entry.timestamp).toLocaleString()} • Updated by: {entry.updatedBy?.name || entry.updatedBy}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}

                    <div className="text-xs text-neutral-500 mt-3">
                      Created: {formatDate(offer.createdAt)}
                    </div>

                    {offer.counterOffer && (
                      <div className="mt-4 p-3 bg-neutral-50 rounded-lg">
                        <h4 className="text-sm font-medium text-primary-700 mb-2">Counteroffer Details</h4>
                        <div className="flex justify-between text-sm">
                          <span>New Price:</span>
                          <span className="font-medium">{offer.counterOffer.price} Rs</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>New Quantity:</span>
                          <span className="font-medium">{offer.counterOffer.quantity}</span>
                        </div>
                        {offer.counterOffer.message && (
                          <p className="text-sm text-neutral-600 mt-2">
                            <span className="font-medium">Message:</span> {offer.counterOffer.message}
                          </p>
                        )}
                      </div>
                    )}

                    {offer.status === "counter" && (
                      <button
                        onClick={() => setSelectedOffer(offer)}
                        disabled={offer.updateCount >= 2}
                        className={`mt-4 w-full px-4 py-2 rounded-lg text-sm font-medium ${
                          offer.updateCount >= 2
                            ? "bg-neutral-300 text-neutral-600 cursor-not-allowed"
                            : "bg-primary-500 hover:bg-primary-600 text-white"
                        }`}
                      >
                        {offer.updateCount >= 2
                          ? "Update Limit Reached"
                          : "Update Offer"}
                      </button>
                    )}
                  </div>
                </div>

                {selectedOffer && selectedOffer._id === offer._id && (
                  <UpdateOffer
                    offerId={selectedOffer._id}
                    currentOffer={selectedOffer}
                    onClose={() => setSelectedOffer(null)}
                    onUpdate={handleUpdateOffer}
                  />
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}