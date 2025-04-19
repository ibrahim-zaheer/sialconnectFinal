import React, { useState } from "react";
import axios from "axios";

const AgreementComponent = ({ orderId, onAcceptSuccess, onRejectSuccess, role }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Get token from localStorage or Redux (ensure user is authenticated)
  const token = localStorage.getItem("token");

  // Handle acceptance of the agreement
  const handleAccept = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "/api/order/orders/accept-agreement",
        { orderId, role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        onAcceptSuccess();
        setErrorMessage(""); // Clear any previous error messages
      }
    } catch (error) {
      setErrorMessage("Error accepting the agreement. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle rejection of the agreement
  const handleReject = async () => {
    setIsLoading(true);
    const rejectionReason = prompt("Please provide a rejection reason:");
    if (rejectionReason) {
      try {
        const response = await axios.post(
          "/api/order/orders/reject-agreement",
          { orderId, AgreementRejectionReason: rejectionReason, role },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          onRejectSuccess();
          setErrorMessage(""); // Clear any previous error messages
        }
      } catch (error) {
        setErrorMessage("Error rejecting the agreement. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Agreement for Order {orderId}
      </h3>

      {/* Error message */}
      {errorMessage && (
        <div className="text-red-500 mb-4">{errorMessage}</div>
      )}

      {/* Accept or Reject buttons */}
      <div className="flex space-x-4">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md"
          onClick={handleAccept}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Accept Agreement"}
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-md"
          onClick={handleReject}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Reject Agreement"}
        </button>
      </div>
    </div>
  );
};

export default AgreementComponent;
