// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const PaymentDetailsModal = ({ isOpen, paymentDetails, onClose }) => {
//     if (!isOpen) return null;

//     return (
//       <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
//         <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
//           <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
//           <div>
//             <div className="mb-4">
//               <strong>Payment Method:</strong> {paymentDetails?.paymentMethod || "N/A"}
//             </div>
//             <div className="mb-4">
//               <strong>Mobile Number:</strong> {paymentDetails?.mobileNumber || "N/A"}
//             </div>
//             <div className="mb-4">
//               <strong>Account Name:</strong> {paymentDetails?.accountName || "N/A"}
//             </div>
//             <div className="mb-4">
//               <strong>Payment Status:</strong> {paymentDetails?.paymentStatus || "N/A"}
//             </div>
//             <div className="mb-4">
//               <strong>Payment Amount:</strong> ${paymentDetails?.paymentAmount || "0.00"}
//             </div>
//           </div>
//           <div className="flex justify-end">
//             <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

// const SupplierOrdersList = ({ supplierId, apiEndpoint, title = "Supplier Orders" }) => {
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState("");
//   const [selectedPaymentDetails, setSelectedPaymentDetails] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     if (!supplierId || !apiEndpoint) return;

//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("token"); // Get the token from localStorage for authentication
//         const res = await axios.get(`${apiEndpoint}/${supplierId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`, // Include the token in the headers for authentication
//           },
//         });
//         setOrders(res.data.orders); // Set the orders received from the API response
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch orders"); // Handle any errors
//       }
//     };

//     fetchOrders(); // Call the function to fetch orders on component mount
//   }, [supplierId, apiEndpoint]); // Effect will run when either `supplierId` or `apiEndpoint` changes

//     // Handle opening of the modal
//     const handlePaymentClick = (paymentDetails) => {
//         setSelectedPaymentDetails(paymentDetails);
//         setIsModalOpen(true);
//       };

//       // Handle closing of the modal
//       const handleCloseModal = () => {
//         setIsModalOpen(false);
//         setSelectedPaymentDetails(null);
//       };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">{title}</h2>
//       {error && <p className="text-red-600">{error}</p>}

//       {orders.length === 0 && !error ? (
//         <p>No orders found for this supplier.</p> // Display message if no orders are found
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white shadow-md rounded-xl">
//             <thead className="bg-gray-100 text-gray-700">
//               <tr>
//                 <th className="py-2 px-4 text-left">Product</th>
//                 <th className="py-2 px-4 text-left">Exporter</th>
//                 <th className="py-2 px-4 text-left">Price</th>
//                 <th className="py-2 px-4 text-left">Quantity</th>
//                 <th className="py-2 px-4 text-left">Message</th>
//                 <th className="py-2 px-4 text-left">Payment Status</th>
//                 <th className="py-2 px-4 text-left">Status</th>
//                 <th className="py-2 px-4 text-left">Payment Method</th>

//                 <th className="py-2 px-4 text-left">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order._id} className="border-b">
//                   <td className="py-2 px-4">{order.productId?.name || order.auctionId?.title +"(Auction)" || "N/A"}</td>
//                   <td className="py-2 px-4">
//                     {order.exporterId?.name}<br />
//                     <span className="text-sm text-gray-500">{order.exporterId?.email}</span>
//                   </td>
//                   <td className="py-2 px-4">${order.price}</td>
//                   <td className="py-2 px-4">{order.quantity}</td>
//                   <td className="py-2 px-4">{order.message || "—"}</td>
//                   <td className="py-2 px-4">{order.paymentStatus || "—"}</td>
//                   <td className="py-2 px-4 capitalize">{order.status}</td>
//                     {/* Payment Method - Clickable */}
//                     <td
//                     className="py-2 px-4 text-blue-600 hover:underline cursor-pointer"
//                     onClick={() => handlePaymentClick(order.paymentDetails)}
//                   >
//                     {order.paymentDetails?.paymentMethod || "N/A"}
//                   </td>

//                   <td className="py-2 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//           {/* Payment Details Modal */}
//           <PaymentDetailsModal
//         isOpen={isModalOpen}
//         paymentDetails={selectedPaymentDetails}
//         onClose={handleCloseModal}
//       />
//     </div>
//   );
// };

// export default SupplierOrdersList;

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import BackButton from "../../BackButton";
import AgreementPDFGenerator from "../../orders/components/AgreementPDFGenerator";

const   PaymentDetailsModal = ({
  isOpen,
  orderID,
  paymentDetails,
  onClose,
  onPayClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
        <div>
          <div className="mb-4">
            <strong>Order ID:</strong> {orderID || "N/A"}
          </div>
          <div className="mb-4">
            <strong>Payment Method:</strong>{" "}
            {paymentDetails?.paymentMethod || "N/A"}
          </div>
          <div className="mb-4">
            <strong>Mobile Number:</strong>{" "}
            {paymentDetails?.mobileNumber || "N/A"}
          </div>
          <div className="mb-4">
            <strong>Account Name:</strong>{" "}
            {paymentDetails?.accountName || "N/A"}
          </div>
          <div className="mb-4">
            <strong>Payment Status:</strong>{" "}
            {paymentDetails?.paymentStatus || "N/A"}
          </div>
          <div className="mb-4">
            <strong>Payment Amount:</strong> $
            {paymentDetails?.paymentAmount || "0.00"}
          </div>
        </div>
        {/* Pay Button */}
        <div className="flex justify-end">
          {paymentDetails?.paymentStatus === "detailsGiven" && (
            <button
              onClick={onPayClick}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              Pay
            </button>
          )}

          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const   SupplierOrdersList = ({
  supplierId,
  apiEndpoint,
  title = "Supplier Orders",
}) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [selectedPaymentDetails, setSelectedPaymentDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!supplierId || !apiEndpoint) return;

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage for authentication
        const res = await axios.get(`${apiEndpoint}/${supplierId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers for authentication
          },
        });
        setOrders(res.data.orders); // Set the orders received from the API response
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch orders"); // Handle any errors
      }
    };

    fetchOrders(); // Call the function to fetch orders on component mount
  }, [supplierId, apiEndpoint]); // Effect will run when either `supplierId` or `apiEndpoint` changes
  const fetchOrders = useCallback(async () => {
    if (!supplierId || !apiEndpoint) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${apiEndpoint}/${supplierId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data.orders);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch orders");
    }
  }, [supplierId, apiEndpoint]); // Add dependencies here

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]); // Now depends on the memoized fetchOrders

  // Handle opening of the modal when payment method is clicked
  // const handlePaymentClick = (paymentDetails) => {
  //   setSelectedPaymentDetails(paymentDetails);
  //   setIsModalOpen(true);
  // };
  const handlePaymentClick = (paymentDetails, orderId) => {
    setSelectedPaymentDetails({ ...paymentDetails, orderId });
    setIsModalOpen(true);
  };

  // Function to handle "Pay" button click and make the API request to complete payment
  const handlePayClick = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage

      // Call the API to mark payment as completed
      const res = await axios.post(
        `${apiEndpoint}/mark-payment-completed`,
        { orderId: selectedPaymentDetails?.orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // On success, update the UI accordingly
      setIsModalOpen(false);
      setSelectedPaymentDetails(null); // Close the modal after marking payment as completed
      alert(res.data.message); // Show success message

      // Optionally, you can refresh the orders list or trigger other UI updates here
      fetchOrders(); // Fetch orders again if needed
    } catch (error) {
      console.error("Error completing payment:", error);
      alert("Failed to complete the payment. Please try again.");
    }
  };

  // Handle closing of the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPaymentDetails(null);
  };

  return (
    <div className="mt-12">
      <div className="w-full flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">{title}</h2>
        <BackButton className="bg-blue-800 hover:bg-blue-700 text-white" />
      </div>
      {error && <p className="text-red-600">{error}</p>}

      {orders.length === 0 && !error ? (
        <p>No orders found for this supplier.</p> // Display message if no orders are found
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-xl">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-4 text-left">Product</th>
                <th className="py-2 px-4 text-left">Exporter</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Quantity</th>
                <th className="py-2 px-4 text-left">Message</th>
                <th className="py-2 px-4 text-left">Payment Status</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Payment Method</th>

                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Download Agreement</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="py-2 px-4">
                    {order.productId?.name ||
                      order.auctionId?.title + "(Auction)" ||
                      "N/A"}
                  </td>
                  <td className="py-2 px-4">
                    {order.exporterId?.name}
                    <br />
                    <span className="text-sm text-gray-500">
                      {order.exporterId?.email}
                    </span>
                  </td>
                  <td className="py-2 px-4">Rs {order.price}</td>
                  <td className="py-2 px-4">{order.quantity}</td>
                  <td className="py-2 px-4">{order.message || "—"}</td>
                  <td className="py-2 px-4">{order.paymentStatus || "—"}</td>
                  <td className="py-2 px-4 capitalize">{order.status}</td>
                  <td
                    className="py-2 px-4 text-blue-600 hover:underline cursor-pointer"
                    onClick={() =>
                      handlePaymentClick(order.paymentDetails, order._id)
                    }
                  >
                    {order.paymentDetails?.paymentMethod || "N/A"}
                  </td>
                  <td className="py-2 px-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                   <td className="py-2 px-4">
                    <AgreementPDFGenerator
                      order={order}
                      userName={order.exporterId?.name}
                      userRole="exporter" // Use the appropriate role
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Payment Details Modal */}
      {/* <PaymentDetailsModal
        isOpen={isModalOpen}
        
        paymentDetails={selectedPaymentDetails}
        onClose={handleCloseModal}
        onPayClick={handlePayClick} // Pass the handlePayClick function
      /> */}
      <PaymentDetailsModal
        isOpen={isModalOpen}
        orderID={selectedPaymentDetails?.orderId}
        paymentDetails={selectedPaymentDetails}
        onClose={handleCloseModal}
        onPayClick={handlePayClick}
      />
    </div>
  );
};

export default SupplierOrdersList;
