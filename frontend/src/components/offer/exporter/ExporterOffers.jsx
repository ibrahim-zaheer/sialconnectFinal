// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { selectUser } from "../../../redux/reducers/userSlice";

// export default function ExporterOffers() {
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
//               <p className="text-lg font-semibold">Product ID: {offer.productId}</p>
//               <p>Supplier ID: {offer.supplierId}</p>
//               <p>Price: {offer.price} Rs</p>
//               <p>Quantity: {offer.quantity}</p>
//               <p>Status: 
//                 <span className={`font-bold ${offer.status === "pending" ? "text-yellow-500" : offer.status === "accepted" ? "text-green-500" : "text-red-500"}`}>
//                   {offer.status}
//                 </span>
//               </p>
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

// export default function ExporterOffers() {
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
//               <p className="text-lg font-semibold">Product: {offer.productId?.name || "Unknown"}</p>
//               <p>Supplier: {offer.supplierId?.name || "Unknown"}</p>
//               <p>Price: {offer.price} Rs</p>
//               <p>Quantity: {offer.quantity}</p>
//               <p>
//                 Status: 
//                 <span className={`font-bold ${offer.status === "pending" ? "text-yellow-500" : offer.status === "accepted" ? "text-green-500" : "text-red-500"}`}>
//                   {offer.status}
//                 </span>
//               </p>
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
    dispatch(setUpdated("Yes")); // ✅ Updating the "updated" state globally
  };


    // ✅ Function to format date nicely
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
  // ✅ Function to update counteroffer status
  const updateCounterOfferStatus = (offerId, newStatus, newPrice = null, newQuantity = null) => {
    setOffers((prevOffers) =>
      prevOffers.map((offer) =>
        offer._id === offerId
          ? {
              ...offer,
              status: newStatus,
              counterOffer: { price: newPrice, quantity: newQuantity }, // ✅ Update counteroffer details
            }
          : offer
      )
    );
  };

    // ✅ Update offer in state after editing
    const handleUpdateOffer = (offerId, updatedData) => {
      setOffers((prevOffers) =>
        prevOffers.map((offer) =>
          offer._id === offerId ? { ...offer, ...updatedData, isUpdated: true  } : offer
        )
      );
      
    };
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">My Offers</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading offers...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : offers.length === 0 ? (
        <p className="text-center text-gray-500">No offers found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div key={offer._id} className="bg-white p-4 shadow-lg rounded-lg">
              <p className="text-lg font-semibold">Product: {offer.productId?.name || "Unknown"}</p>
              <p>Supplier: {offer.supplierId?.name || "Unknown"}</p>
              <p>Price: {offer.price} Rs</p>
              <p>Quantity: {offer.quantity}</p>
              {/* ✅ Show Update Offer Button only if status is "counter" */}
              {offer.status === "counter" && (
                <button
                  onClick={() => setSelectedOffer(offer)}
                  className="mt-3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Update Offer
                </button>
              )}
              <p>
                Status: 
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

              
              {/* ✅ Display Offer Creation Date */}
              <p className="text-sm text-gray-600">Created On: {formatDate(offer.createdAt)}</p>
              

              {/* ✅ Show Counteroffer if it exists */}
              {offer.counterOffer && (
                <div className="mt-4 p-3 bg-gray-100 rounded">
                  <h3 className="font-semibold text-md">Counteroffer Details:</h3>
                  <p>New Price: {offer.counterOffer.price} Rs</p>
                  <p>New Quantity: {offer.counterOffer.quantity}</p>
                  {offer.counterOffer.message && <p>Message: {offer.counterOffer.message}</p>}

                   {/* ✅ Show CounterOffer button only if status is "counter" */}
                   {/* {offer.status === "counter" && (
                    <CounterOffer
                      offerId={offer._id}
                      updateStatus={updateCounterOfferStatus}
                      disabled={offer.counterOfferCount >= 2} // Limit to 2 counteroffers per side
                    />
                  )} */}
                  {/* ✅ Show UpdateOffer component only if status is "counter" */}
{offer.status === "counter" && selectedOffer && selectedOffer._id === offer._id && (
  <UpdateOffer
    offerId={selectedOffer._id}
    currentOffer={selectedOffer}
    onClose={() => setSelectedOffer(null)} // Close popup on cancel
    onUpdate={handleUpdateOffer} // Update state on success
  />
)}

                </div>
                
                
              )}
                {/* ✅ Show UpdateOffer Component if an offer is selected */}
      {/* {selectedOffer && (
        <UpdateOffer
          offerId={selectedOffer._id}
          currentOffer={selectedOffer}
          onClose={() => setSelectedOffer(null)} // Close popup on cancel
          onUpdate={handleUpdateOffer} // Update state on success
        />
      )} */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
