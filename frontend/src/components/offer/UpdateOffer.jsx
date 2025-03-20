import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateOffer({ offerId, currentOffer, onClose, onUpdate }) {
  const [offerData, setOfferData] = useState({
    price: "",
    quantity: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    if (currentOffer) {
      setOfferData({
        price: currentOffer.price || "",
        quantity: currentOffer.quantity || "",
        message: currentOffer.message || "",
      });
    }
  }, [currentOffer]);

  const handleChange = (e) => {
    setOfferData({ ...offerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setResponseMessage("User not authenticated. Please log in.");
      return;
    }

    try {
      const response = await axios.put(
        `/api/offers/update/${offerId}`,
        offerData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setResponseMessage("Offer updated successfully!");
        onUpdate(offerId, offerData); // ✅ Update parent state
        setTimeout(() => {
          setResponseMessage("");
          onClose(); // ✅ Close the popup after success
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating offer:", error);
      setResponseMessage("Failed to update offer. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-3">Update Offer</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="number"
            name="price"
            placeholder="New Price"
            value={offerData.price}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />

          <input
            type="number"
            name="quantity"
            placeholder="New Quantity"
            value={offerData.quantity}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />

          <input
            type="text"
            name="message"
            placeholder="Message (optional)"
            value={offerData.message}
            onChange={handleChange}
            className="p-2 border rounded"
          />

          <div className="flex justify-between mt-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </form>

        {responseMessage && <p className="text-sm mt-2 text-green-600">{responseMessage}</p>}
      </div>
    </div>
  );
}
