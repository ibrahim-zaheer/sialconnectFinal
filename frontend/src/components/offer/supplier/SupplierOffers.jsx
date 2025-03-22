import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/reducers/userSlice";

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

  // ✅ Function to refresh offers list after Accept/Reject
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
              status: newStatus, // ✅ Update status
              counterOffer: {
                // ✅ Store counteroffer separately
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
              <p className="text-lg font-semibold">
                Product: {offer.productId?.name || "Unknown"}
              </p>
              {/* ✅ Display Offer Creation Date */}
              <p className="text-sm text-gray-600">
                Created On: {formatDate(offer.createdAt)}
              </p>

              {/* ✅ Display "Updated" tag if offer was modified by exporter */}
              {offer.isUpdated && (
                <p className="text-sm font-bold text-blue-600">Updated</p>
              )}
              <p>Supplier: {offer.exporterId?.name || "Unknown"}</p>
              <p>Price: {offer.price} Rs</p>
              <p>Quantity: {offer.quantity}</p>
              <p>Total Value: {offer.quantity * offer.price}</p>
              <p>Message: {offer.message}</p>
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
              {/* {offer.status === "pending" && (
                <div className="mt-4 flex gap-2">
                  <AcceptOffer offerId={offer._id} updateStatus={updateOfferStatus} />
                  <RejectOffer offerId={offer._id} updateStatus={updateOfferStatus} />
                  <CounterOffer offerId={offer._id} updateStatus={updateCounterOfferStatus} />
                </div>
              )} */}
              {/* ✅ Show Accept, Reject & Counter Offer buttons for "pending" & "counter" status */}
              {offer.status === "pending" || offer.status === "counter" ? (
                <div className="mt-4 flex gap-2">
                  <AcceptOffer
                    offerId={offer._id}
                    updateStatus={updateOfferStatus}
                  />
                  <RejectOffer
                    offerId={offer._id}
                    updateStatus={updateOfferStatus}
                  />
                  <CounterOffer
                    offerId={offer._id}
                    updateStatus={updateCounterOfferStatus}
                    disabled={offer.counterOfferCount >= 2}
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
