import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/reducers/userSlice";

import AcceptOffer from "../AcceptOffer";
import RejectOffer from "../RejectOffer";

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
  

     // ✅ Function to refresh offers list after Accept/Reject
  const updateOfferStatus = (offerId, newStatus) => {
    setOffers((prevOffers) =>
      prevOffers.map((offer) =>
        offer._id === offerId ? { ...offer, status: newStatus } : offer
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
                <p>Supplier: {offer.exporterId?.name || "Unknown"}</p>
                <p>Price: {offer.price} Rs</p>
                <p>Quantity: {offer.quantity}</p>
                <p>
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

                  {/* ✅ Accept & Reject Components for Pending Offers */}
              {offer.status === "pending" && (
                <div className="mt-4 flex gap-2">
                  <AcceptOffer offerId={offer._id} updateStatus={updateOfferStatus} />
                  <RejectOffer offerId={offer._id} updateStatus={updateOfferStatus} />
                </div>
              )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
}
