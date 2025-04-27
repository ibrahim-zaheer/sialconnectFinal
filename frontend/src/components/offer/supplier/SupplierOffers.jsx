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


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { selectUser } from "../../../redux/reducers/userSlice";
// import { motion } from "framer-motion";
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
//         setError("Please log in to view your offers");
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
//         setError("We couldn't load your offers. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchOffers();
//   }, [token]);

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
//               status: newStatus,
//               counterOffer: {
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

//   const formatDate = (dateString) => {
//     if (!dateString) return "Date not available";
//     return new Date(dateString).toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="p-6">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//         className="max-w-7xl mx-auto"
//       >
//         <h2 className="text-2xl font-bold text-primary-800 mb-6">Your Offers</h2>
        
//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-pulse flex flex-col items-center">
//               <div className="w-16 h-16 bg-primary-100 rounded-full mb-4"></div>
//               <p className="text-neutral-600">Loading your offers...</p>
//             </div>
//           </div>
//         ) : error ? (
//           <div className="bg-error-50 border-l-4 border-error-400 p-4 mb-6 rounded">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <svg className="h-5 w-5 text-error-500" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm text-error-700">{error}</p>
//               </div>
//             </div>
//           </div>
//         ) : offers.length === 0 ? (
//           <div className="bg-surface rounded-xl shadow-sm p-8 text-center">
//             <svg className="mx-auto h-12 w-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <h3 className="mt-2 text-lg font-medium text-neutral-900">No offers yet</h3>
//             <p className="mt-1 text-neutral-500">You haven't received any offers yet. Check back later!</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {offers.map((offer) => (
//               <motion.div
//                 key={offer._id}
//                 whileHover={{ y: -5 }}
//                 className="bg-surface rounded-xl shadow-sm border border-neutral-100 overflow-hidden"
//               >
//                 <div className="p-6">
//                   <div className="flex justify-between items-start mb-4">
//                     <h3 className="text-lg font-semibold text-primary-800">
//                       {offer.productId?.name || "Unnamed Product"}
//                     </h3>
//                     <span className={`px-2 py-1 text-xs rounded-full ${
//                       offer.status === "pending"
//                         ? "bg-accent-100 text-accent-800"
//                         : offer.status === "accepted"
//                         ? "bg-success-100 text-success-800"
//                         : "bg-error-100 text-error-800"
//                     }`}>
//                       {offer.status}
//                     </span>
//                   </div>

//                   <div className="space-y-3 text-neutral-700">
//                     <div className="flex justify-between">
//                       <span>Price:</span>
//                       <span className="font-medium">{offer.price} Rs</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Quantity:</span>
//                       <span className="font-medium">{offer.quantity}</span>
//                     </div>
//                     <div className="flex justify-between border-b border-neutral-100 pb-3">
//                       <span>Total Value:</span>
//                       <span className="font-medium text-primary-700">
//                         {offer.quantity * offer.price} Rs
//                       </span>
//                     </div>

//                     {offer.message && (
//                       <div className="pt-3">
//                         <p className="text-sm text-neutral-600">
//                           <span className="font-medium">Message:</span> {offer.message}
//                         </p>
//                       </div>
//                     )}

//                     {offer.history?.length > 0 && (
//                       <details className="mt-3">
//                         <summary className="text-sm font-medium text-primary-600 cursor-pointer">
//                           Offer History
//                         </summary>
//                         <ul className="mt-2 space-y-2 text-sm">
//                           {offer.history.map((entry, index) => (
//                             <li key={index} className="border-l-2 border-primary-200 pl-3">
//                               <div className="flex justify-between">
//                                 <span>Price:</span>
//                                 <span>{entry.price} Rs</span>
//                               </div>
//                               <div className="flex justify-between">
//                                 <span>Quantity:</span>
//                                 <span>{entry.quantity}</span>
//                               </div>
//                               <p className="text-xs text-neutral-500 mt-1">
//                                 {new Date(entry.timestamp).toLocaleString()}
//                               </p>
//                             </li>
//                           ))}
//                         </ul>
//                       </details>
//                     )}
//                   </div>

//                   {(offer.status === "pending" || offer.status === "counter") && (
//                     <div className="mt-6 flex flex-wrap gap-3">
//                       <AcceptOffer
//                         offerId={offer._id}
//                         updateStatus={updateOfferStatus}
//                         className="flex-1 px-4 py-2 bg-success-500 hover:bg-success-600 text-white rounded-lg text-sm font-medium transition-colors"
//                       />
//                       <RejectOffer
//                         offerId={offer._id}
//                         updateStatus={updateOfferStatus}
//                         className="flex-1 px-4 py-2 bg-error-500 hover:bg-error-600 text-white rounded-lg text-sm font-medium transition-colors"
//                       />
//                       <CounterOffer
//                         offerId={offer._id}
//                         updateStatus={updateCounterOfferStatus}
//                         disabled={offer.counterOfferCount >= 2}
//                         className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                       />
//                     </div>
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// }








// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { selectUser } from "../../../redux/reducers/userSlice";
// import { motion } from "framer-motion";
// import AcceptOffer from "../AcceptOffer";
// import RejectOffer from "../RejectOffer";
// import CounterOffer from "../CounterOffer";
// import { useNavigate } from "react-router-dom";

// export default function SupplierOffers() {
//   const user = useSelector(selectUser);
//   const token = user?.id ? localStorage.getItem("token") : null;
//   const [offers, setOffers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [orderIds, setOrderIds] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchOffers = async () => {
//       if (!token) {
//         setError("Please log in to view your offers");
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
        
//         // Fetch order IDs for accepted offers
//         const acceptedOffers = response.data.offers.filter(offer => offer.status === "accepted");
//         await fetchOrderIds(acceptedOffers);
        
//         setLoading(false);
//       } catch (err) {
//         setError("We couldn't load your offers. Please try again later.");
//         setLoading(false);
//       }
//     };

//     const fetchOrderIds = async (acceptedOffers) => {
//       const ids = {};
//       console.log('Fetching orders for', acceptedOffers.length, 'accepted offers');
      
//       for (const offer of acceptedOffers) {
//         try {
//           console.log('Fetching order for offer:', offer._id);
//           const orderResponse = await axios.get(`/api/order/orders/offer/${offer._id}`, {
//             headers: { Authorization: `Bearer ${token}` }
//           });
          
//           if (orderResponse.data?.order?._id) {
//             console.log('Found order:', orderResponse.data.order._id);
//             ids[offer._id] = orderResponse.data.order._id;
//           } else {
//             console.warn('No order ID in response for offer:', offer._id);
//             ids[offer._id] = null;
//           }
//         } catch (err) {
//           console.error(`Failed to fetch order for offer ${offer._id}:`, err.response?.data || err.message);
//           ids[offer._id] = null;
//         }
//       }
      
//       console.log('Final order IDs:', ids);
//       setOrderIds(ids);
//     };

//     fetchOffers();
//   }, [token]);

//   const handleViewOrder = (offerId) => {
//     const orderId = orderIds[offerId];
//     if (orderId) {
//       navigate(`/supplier/order/${orderId}`);
//     } else {
//       alert("Order details not available yet. Please try again later.");
//     }
//   };

//   // ... keep all your existing helper functions (updateOfferStatus, updateCounterOfferStatus, formatDate) ...

//   return (
//     <div className="p-6">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//         className="max-w-7xl mx-auto"
//       >
//         <h2 className="text-2xl font-bold text-primary-800 mb-6">Your Offers</h2>
        
//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-pulse flex flex-col items-center">
//               <div className="w-16 h-16 bg-primary-100 rounded-full mb-4"></div>
//               <p className="text-neutral-600">Loading your offers...</p>
//             </div>
//           </div>
//         ) : error ? (
//           <div className="bg-error-50 border-l-4 border-error-400 p-4 mb-6 rounded">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <svg className="h-5 w-5 text-error-500" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm text-error-700">{error}</p>
//               </div>
//             </div>
//           </div>
//         ) : offers.length === 0 ? (
//           <div className="bg-surface rounded-xl shadow-sm p-8 text-center">
//             <svg className="mx-auto h-12 w-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <h3 className="mt-2 text-lg font-medium text-neutral-900">No offers yet</h3>
//             <p className="mt-1 text-neutral-500">You haven't received any offers yet. Check back later!</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {offers.map((offer) => (
//               <motion.div
//                 key={offer._id}
//                 whileHover={{ y: -5 }}
//                 className="bg-surface rounded-xl shadow-sm border border-neutral-100 overflow-hidden"
//               >
//                 <div className="p-6">
//                   <div className="flex justify-between items-start mb-4">
//                     <h3 className="text-lg font-semibold text-primary-800">
//                       {offer.productId?.name || "Unnamed Product"}
//                     </h3>
//                     <span className={`px-2 py-1 text-xs rounded-full ${
//                       offer.status === "pending"
//                         ? "bg-accent-100 text-accent-800"
//                         : offer.status === "accepted"
//                         ? "bg-success-100 text-success-800"
//                         : "bg-error-100 text-error-800"
//                     }`}>
//                       {offer.status}
//                     </span>
//                   </div>

                 

//                   {/* Action buttons */}
//                   {(offer.status === "pending" || offer.status === "counter") && (
//                     <div className="mt-6 flex flex-wrap gap-3">
//                       <AcceptOffer
//                         offerId={offer._id}
//                         updateStatus={updateOfferStatus}
//                         className="flex-1 px-4 py-2 bg-success-500 hover:bg-success-600 text-white rounded-lg text-sm font-medium transition-colors"
//                       />
//                       <RejectOffer
//                         offerId={offer._id}
//                         updateStatus={updateOfferStatus}
//                         className="flex-1 px-4 py-2 bg-error-500 hover:bg-error-600 text-white rounded-lg text-sm font-medium transition-colors"
//                       />
//                       <CounterOffer
//                         offerId={offer._id}
//                         updateStatus={updateCounterOfferStatus}
//                         disabled={offer.counterOfferCount >= 2}
//                         className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                       />
//                     </div>
//                   )}

//                   {/* View Order button for accepted offers */}
//                   {offer.status === "accepted" && (
//                     <div className="mt-4">
//                       {orderIds[offer._id] === undefined ? (
//                         <div className="text-sm text-gray-500">Checking order status...</div>
//                       ) : orderIds[offer._id] ? (
//                         <button
//                           onClick={() => handleViewOrder(offer._id)}
//                           className="w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium"
//                         >
//                           View Order Details
//                         </button>
//                       ) : (
//                         <div className="text-sm text-yellow-600">
//                           Order processing not completed
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/reducers/userSlice";
import { motion } from "framer-motion";
import AcceptOffer from "../AcceptOffer";
import RejectOffer from "../RejectOffer";
import CounterOffer from "../CounterOffer";
import { useNavigate } from "react-router-dom";

export default function SupplierOffers() {
  const user = useSelector(selectUser);
  const token = user?.id ? localStorage.getItem("token") : null;
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orderIds, setOrderIds] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      if (!token) {
        setError("Please log in to view your offers");
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
        
        // Fetch order IDs for accepted offers
        const acceptedOffers = response.data.offers.filter(offer => offer.status === "accepted");
        await fetchOrderIds(acceptedOffers);
        
        setLoading(false);
      } catch (err) {
        setError("We couldn't load your offers. Please try again later.");
        setLoading(false);
      }
    };

    const fetchOrderIds = async (acceptedOffers) => {
      const ids = {};
      console.log('Fetching orders for', acceptedOffers.length, 'accepted offers');
      
      for (const offer of acceptedOffers) {
        try {
          console.log('Fetching order for offer:', offer._id);
          const orderResponse = await axios.get(`/api/order/orders/offer/${offer._id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          if (orderResponse.data?.order?._id) {
            console.log('Found order:', orderResponse.data.order._id);
            ids[offer._id] = orderResponse.data.order._id;
          } else {
            console.warn('No order ID in response for offer:', offer._id);
            ids[offer._id] = null;
          }
        } catch (err) {
          console.error(`Failed to fetch order for offer ${offer._id}:`, err.response?.data || err.message);
          ids[offer._id] = null;
        }
      }
      
      console.log('Final order IDs:', ids);
      setOrderIds(ids);
    };

    fetchOffers();
  }, [token]);

  const handleViewOrder = (offerId) => {
    const orderId = orderIds[offerId];
    if (orderId) {
      navigate(`/supplier/order/${orderId}`);
    } else {
      alert("Order details not available yet. Please try again later.");
    }
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
            <p className="mt-1 text-neutral-500">You haven't received any offers yet. Check back later!</p>
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

                  <div className="space-y-3 text-neutral-700">
                    <div className="flex justify-between">
                      <span>Offer ID:</span>
                      <span className="font-medium">{offer._id}</span>
                    </div>
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
                              <p className="text-xs text-neutral-500 mt-1">
                                {new Date(entry.timestamp).toLocaleString()}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </div>

                  {(offer.status === "pending" || offer.status === "counter") && (
                    <div className="mt-6 flex flex-wrap gap-3">
                      <AcceptOffer
                        offerId={offer._id}
                        updateStatus={updateOfferStatus}
                        className="flex-1 px-4 py-2 bg-success-500 hover:bg-success-600 text-white rounded-lg text-sm font-medium transition-colors"
                      />
                      <RejectOffer
                        offerId={offer._id}
                        updateStatus={updateOfferStatus}
                        className="flex-1 px-4 py-2 bg-error-500 hover:bg-error-600 text-white rounded-lg text-sm font-medium transition-colors"
                      />
                      <CounterOffer
                        offerId={offer._id}
                        updateStatus={updateCounterOfferStatus}
                        disabled={offer.counterOfferCount >= 2}
                        className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  )}

                  {/* View Order button for accepted offers */}
                  {offer.status === "accepted" && (
                    <div className="mt-4">
                      {orderIds[offer._id] === undefined ? (
                        <div className="text-sm text-gray-500">Checking order status...</div>
                      ) : orderIds[offer._id] ? (
                        <button
                          onClick={() => handleViewOrder(offer._id)}
                          className="w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium"
                        >
                          View Order Details
                        </button>
                      ) : (
                        <div className="text-sm text-yellow-600">
                          Order processing not completed
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
