
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
//     dispatch(setUpdated("Yes")); // ✅ Updating the "updated" state globally
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
//   // ✅ Function to update counteroffer status
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
//               counterOffer: { price: newPrice, quantity: newQuantity }, // ✅ Update counteroffer details
//             }
//           : offer
//       )
//     );
//   };

//   // ✅ Update offer in state after editing
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
//     <div className="container mx-auto p-6">
//       <h2 className="text-2xl font-semibold text-center mb-6">My Offers</h2>
//       <div className="flex justify-center gap-10 mb-6">
//         <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg shadow">
//           Accepted Offers: <span className="font-bold">{acceptedCount}</span>
//         </div>
//         <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg shadow">
//           Rejected Offers: <span className="font-bold">{rejectedCount}</span>
//         </div>
//       </div>

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
//               <p>Supplier: {offer.supplierId?.name || "Unknown"}</p>
//               <p>Price: {offer.price} Rs</p>
//               <p>Quantity: {offer.quantity}</p>
//               <p>Total Value: {offer.quantity * offer.price}</p>
//               {/* chatgpt code */}
//               {offer.history && offer.history.length > 0 && (
//                 <details className="mt-3 bg-gray-100 p-2 rounded">
//                   <summary className="cursor-pointer font-semibold text-blue-600">
//                     View Offer History
//                   </summary>
//                   <ul className="mt-2">
//                     {offer.history.map((entry, index) => (
//                       <li key={index} className="border-b py-1">
//                         <p>Price: {entry.price} Rs</p>
//                         <p>Quantity: {entry.quantity}</p>
//                         <p>Message: {entry.message || "No message"}</p>
//                         <p>
//                           Updated By: {entry.updatedBy?.name || entry.updatedBy}
//                         </p>
//                         <p>
//                           Date: {new Date(entry.timestamp).toLocaleString()}
//                         </p>
//                       </li>
//                     ))}
//                   </ul>
//                 </details>
//               )}

//               {/* ✅ Show Update Offer Button only if status is "counter" */}
//               {/* {offer.status === "counter" && (
//                 <button
//                   onClick={() => setSelectedOffer(offer)}
//                   className="mt-3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//                 >
//                   Update Offer
//                 </button>
//               )} */}

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

//               <p>
//                 Status:
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

//               {/* ✅ Display Offer Creation Date */}
//               <p className="text-sm text-gray-600">
//                 Created On: {formatDate(offer.createdAt)}
//               </p>

//               {/* ✅ Show Counteroffer if it exists */}
//               {offer.counterOffer && (
//                 <div className="mt-4 p-3 bg-gray-100 rounded">
//                   <h3 className="font-semibold text-md">
//                     Counteroffer Details:
//                   </h3>
//                   <p>New Price: {offer.counterOffer.price} Rs</p>
//                   <p>New Quantity: {offer.counterOffer.quantity}</p>
//                   {offer.counterOffer.message && (
//                     <p>Message: {offer.counterOffer.message}</p>
//                   )}

//                   {/* ✅ Show CounterOffer button only if status is "counter" */}
//                   {/* {offer.status === "counter" && (
//                     <CounterOffer
//                       offerId={offer._id}
//                       updateStatus={updateCounterOfferStatus}
//                       disabled={offer.counterOfferCount >= 2} // Limit to 2 counteroffers per side
//                     />
//                   )} */}
//                   {/* ✅ Show UpdateOffer component only if status is "counter" */}
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
//               {/* ✅ Show UpdateOffer Component if an offer is selected */}
//               {/* {selectedOffer && (
//         <UpdateOffer
//           offerId={selectedOffer._id}
//           currentOffer={selectedOffer}
//           onClose={() => setSelectedOffer(null)} // Close popup on cancel
//           onUpdate={handleUpdateOffer} // Update state on success
//         />
//       )} */}
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
import CounterOffer from "../CounterOffer";
import UpdateOffer from "../UpdateOffer";
import { useDispatch } from "react-redux";
import { setUpdated } from "../../../redux/reducers/updateSlice";

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
        setError("User not authenticated. Please log in.");
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
        setError("Failed to fetch offers.");
        setLoading(false);
      }
    };

    fetchOffers();
  }, [token]);

  const updateState = () => {
    dispatch(setUpdated("Yes"));
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

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">My Offers</h2>

      <div className="flex justify-center gap-10 mb-8">
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg shadow-md">
          Accepted Offers: <span className="font-bold">{acceptedCount}</span>
        </div>
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg shadow-md">
          Rejected Offers: <span className="font-bold">{rejectedCount}</span>
        </div>
      </div>

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
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800">{offer.productId?.name || "Unknown Product"}</h3>
                <p className="text-sm text-gray-600">Supplier: {offer.supplierId?.name || "Unknown Supplier"}</p>
                <p className="text-lg font-semibold text-gray-800">Price: {offer.price} Rs</p>
                <p className="text-lg font-semibold text-gray-800">Quantity: {offer.quantity}</p>
                <p className="text-lg font-semibold text-gray-800">Total Value: {offer.quantity * offer.price} Rs</p>
              </div>

              {offer.history && offer.history.length > 0 && (
                <details className="bg-gray-100 p-4 rounded shadow-md mt-4">
                  <summary className="cursor-pointer font-semibold text-blue-600">View Offer History</summary>
                  <ul className="mt-2 space-y-3">
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

              {offer.status === "counter" && (
                <button
                  onClick={() => setSelectedOffer(offer)}
                  disabled={offer.updateCount >= 2}
                  className={`mt-3 p-2 rounded ${
                    offer.updateCount >= 2
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {offer.updateCount >= 2
                    ? "Update Limit Reached"
                    : "Update Offer"}
                </button>
              )}

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

              <p className="text-sm text-gray-600">Created On: {formatDate(offer.createdAt)}</p>

              {offer.counterOffer && (
                <div className="mt-4 p-4 bg-gray-100 rounded">
                  <h3 className="font-semibold text-md">Counteroffer Details:</h3>
                  <p>New Price: {offer.counterOffer.price} Rs</p>
                  <p>New Quantity: {offer.counterOffer.quantity}</p>
                  {offer.counterOffer.message && <p>Message: {offer.counterOffer.message}</p>}

                  {offer.status === "counter" &&
                    selectedOffer &&
                    selectedOffer._id === offer._id && (
                      <UpdateOffer
                        offerId={selectedOffer._id}
                        currentOffer={selectedOffer}
                        onClose={() => setSelectedOffer(null)} // Close popup on cancel
                        onUpdate={handleUpdateOffer} // Update state on success
                      />
                    )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
