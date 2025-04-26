import React, { useState, useEffect } from 'react';
import ConfirmPaymentButton from './ConfirmPaymentButton';  // Import the reusable ConfirmPaymentButton
import axios from 'axios';

// Order Details Modal component
const OrderDetailsModal = ({ order, closeModal, fetchOrderDetails }) => {
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false); // State to control image popup visibility
  const [imageUrl, setImageUrl] = useState(""); // State to store the image URL

  // Handle image click to open the image popup
  const handleImageClick = (imageUrl) => {
    setImageUrl(imageUrl); // Store the image URL
    setIsImagePopupOpen(true); // Open the image popup
  };

  const closeImagePopup = () => {
    setIsImagePopupOpen(false); // Close the image popup
    setImageUrl(""); // Clear the image URL
  };

  // Success and error callbacks for payment confirmation
  const handleSuccess = (message) => {
    alert(message); // Display a success message
    fetchOrderDetails(); // Re-fetch the order details after payment confirmation
    closeModal(); // Close the modal after successful payment
  };

  const handleError = (message) => {
    alert(message); // Display an error message
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 font-bold text-xl"
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-4">Order Details - {order._id}</h2>
        <p><strong>Exporter:</strong> {order.exporterId?.name}</p>
        <p><strong>Supplier:</strong> {order.supplierId?.name}</p>
        <p><strong>Price:</strong> ${order.price}</p>
        <p><strong>Quantity:</strong> {order.quantity}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Account Name:</strong> {order.LocalPaymentDetails?.accountName}</p>
        <p><strong>Payment Method:</strong> {order.LocalPaymentDetails?.paymentMethod || "N/A"}</p>
        <p><strong>Payment Status:</strong> {order.LocalPaymentDetails?.paymentStatus || "N/A"}</p>
        <p><strong>Payment Amount:</strong> ${order.LocalPaymentDetails?.paymentAmount || "0.00"}</p>

        {/* Payment Proof button */}
        <p>
          <strong>Payment Proof:</strong> 
          {order.LocalPaymentDetails?.localPaymentProof || "No Proof Available" ? (
            <button 
              onClick={() => handleImageClick(order.LocalPaymentDetails?.localPaymentProof || "")}
              className="text-blue-500 underline cursor-pointer"
            >
              View Proof
            </button>
          ) : (
            "No Proof Available"
          )}
        </p>

        {/* Confirm Payment Button */}
        {order.LocalPaymentDetails?.paymentStatus === "detailsGiven" && (
          <div className="mt-4">
            <ConfirmPaymentButton 
              orderId={order._id}
              onSuccess={handleSuccess} // Call handleSuccess on success
              onError={handleError} // Call handleError on failure
            />
          </div>
        )}
      </div>

      {/* Image Popup Modal */}
      {isImagePopupOpen && imageUrl && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
            <button 
              onClick={closeImagePopup} 
              className="absolute top-2 right-2 text-gray-500 font-bold text-xl"
            >
              X
            </button>
            <img 
              src={imageUrl} 
              alt="Payment Proof" 
              className="w-full h-auto max-w-4xl max-h-[80vh] object-contain rounded-lg" 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsModal;
