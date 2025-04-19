

// export default SupplierOrderDetails;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const SupplierOrderDetails = () => {
//   const { orderId } = useParams();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const [description, setDescription] = useState("");
//   const [sampleImage, setSampleImage] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showForm, setShowForm] = useState(false);  // State to handle dropdown visibility

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(`/api/order/orders/supplier/${orderId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setOrder(response.data.order);
//       } catch (error) {
//         setMessage(error.response?.data?.message || "Failed to load order details.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrderDetails();
//   }, [orderId]);

//   const handleSubmitSample = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
  
//     try {
//       const token = localStorage.getItem("token");
//       const formData = new FormData();
//       formData.append("orderId", orderId);
//       formData.append("description", description);
//       formData.append("sampleImage", sampleImage);
  
//       const response = await axios.post("/api/order/orders/mark-sample-sent", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
  
//       setOrder(response.data.order);
//       setMessage("Sample sent successfully!");
//       setShowForm(false); // Close the form
//       setDescription(""); // Clear description
//       setSampleImage(null); // Clear image
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to send sample.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (loading) return <p className="text-center mt-8">Loading order details...</p>;
//   if (message && !isSubmitting) return <p className={`text-center mt-8 ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>{message}</p>;
//   if (!order) return null;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
//       <h2 className="text-2xl font-bold mb-4">Order Details</h2>
//       {order.auctionId && <p><strong>Auction:</strong> {order.auctionId.title}</p>}
//       {order.productId && <p><strong>Product:</strong> {order.productId.name}</p>}
//       <p><strong>Exporter:</strong> {order.exporterId?.name}</p>
//       <p><strong>Email:</strong> {order.exporterId?.email}</p>
//       <p><strong>Quantity:</strong> {order.quantity}</p>
//       <p><strong>Price:</strong> Rs {order.price}</p>
//       <p><strong>Status:</strong> {order.status}</p>
//       <p><strong>Sample Status:</strong> {order.sampleStatus}</p>
//       <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
//       <p className="text-sm text-gray-500 mt-2">Ordered On: {new Date(order.createdAt).toLocaleString()}</p>

//       {order.sampleStatus === "waiting_for_sample" && (
//         <div className="mt-6 p-4 border rounded">
//           <h3 className="text-lg font-semibold mb-3">Send Sample</h3>
//           <button
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             onClick={() => setShowForm(!showForm)} // Toggle the form visibility
//           >
//             {showForm ? "Cancel" : "Enter Sample Details"}
//           </button>

//           {showForm && (
//             <form onSubmit={handleSubmitSample} className="mt-4">
//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-2">Sample Description</label>
//                 <textarea
//                   className="w-full px-3 py-2 border rounded"
//                   rows="3"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   placeholder="Describe the sample..."
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-2">Sample Image</label>
//                 <input
//                   type="file"
//                   className="w-full px-3 py-2 border rounded"
//                   accept="image/jpeg, image/png"
//                   onChange={(e) => setSampleImage(e.target.files[0])}
//                   required
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Upload a clear image of the sample (JPEG or PNG)</p>
//               </div>

//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? "Sending..." : "Send Sample"}
//               </button>
//             </form>
//           )}
//         </div>
//       )}

//       {order.sampleProof && (
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold mb-2">Sample Proof</h3>
//           <img 
//             src={order.sampleProof} 
//             alt="Sample proof" 
//             className="max-w-full h-auto rounded border"
//           />
//           {order.sampleDescription && (
//             <p className="mt-2"><strong>Description:</strong> {order.sampleDescription}</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SupplierOrderDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PDFGenerator from "../components/PDFGenerator";
import { useSelector } from "react-redux";
import AgreementComponent from "../components/AgreementComponent";
import AgreementPDFGenerator from "../components/AgreementPDFGenerator";

import PaymentForm from "../components/payment/PaymentForm";


const SupplierOrderDetails = () => {

      const user = useSelector((state) => state.user);
      const userName = user?.name;
      const userRole = user?.role;

  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");
  const [sampleImage, setSampleImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [paymentSubmitted, setPaymentSubmitted] = useState(false);

  const fetchOrderDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/api/order/orders/supplier/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrder(response.data.order);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to load order details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]); // Removed any dependencies that might cause infinite loops

  const handleSubmitSample = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(""); // Clear previous messages

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("orderId", orderId);
      formData.append("description", description);
      formData.append("sampleImage", sampleImage);

      const response = await axios.post(
        "/api/order/orders/mark-sample-sent", 
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Reset form state
      setDescription("");
      setSampleImage(null);
      setShowForm(false);
      
      // Update order data
      setOrder(response.data.order);
      setMessage("Sample sent successfully!");
      
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send sample.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handlePaymentSubmitted = () => {
    setPaymentSubmitted(true);
    fetchOrderDetails();
  };

  const handleAcceptSuccess = () => {
    fetchOrderDetails(); // Re-fetch order details after agreement is accepted
  };

  const handleRejectSuccess = () => {
    fetchOrderDetails(); // Re-fetch order details after agreement is rejected
  };

  if (loading) return <p className="text-center mt-8">Loading order details...</p>;
  if (!order) return null;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Order Details</h2>

       {/* PDF Generation Button */}
           {order.status === "completed" && (
              <div className="mt-6">
                <PDFGenerator order={order} userName={userName} userRole={userRole}/>
                <AgreementPDFGenerator order={order} userName={userName} userRole={userRole} />
              </div>
            )}

             {/* Order Agreement Payment Details */}
           {order.Agreement === "Accepted" && order.paymentDetails.paymentStatus === "pending"&&(
              <div className="mt-6">
              {/* <PaymentForm orderId={order._id}/> */}
              <PaymentForm orderId={order._id}onPaymentSubmitted={handlePaymentSubmitted} />
              {paymentSubmitted && <p>Your payment details are submitted, awaiting approval.</p>}
              </div>
            )}
             {order.Agreement === "Accepted" && order.paymentDetails.paymentStatus === "detailsGiven"&&(
              <div className="mt-6">
              {/* <PaymentForm orderId={order._id}/> */}
             
              {<p>Your payment details are submitted, awaiting approval.</p>}
              </div>
            )}

             {/* Agreement Component for Completed Orders */}
                   {order.status === "completed" && order.Agreement =="waiting_for_supplier" && (
                      <div className="mt-6">
                        <AgreementComponent
                          orderId={order._id}
                          onAcceptSuccess={handleAcceptSuccess}
                          onRejectSuccess={handleRejectSuccess}
                          role={userRole}
                        />
                      </div>
                    )}
      
      {/* Display success/error message if exists */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg text-center ${
          message.includes("success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          {message}
        </div>
      )}

      <div className="space-y-4">
        {order.auctionId && <p className="text-lg font-medium"><strong>Auction:</strong> {order.auctionId.title}</p>}
        {order.productId && <p className="text-lg font-medium"><strong>Product:</strong> {order.productId.name}</p>}
        <p className="text-lg font-medium"><strong>Exporter:</strong> {order.exporterId?.name}</p>
        <p className="text-lg font-medium"><strong>Email:</strong> {order.exporterId?.email}</p>
        <p className="text-lg font-medium"><strong>Quantity:</strong> {order.quantity}</p>
        <p className="text-lg font-medium"><strong>Price:</strong> Rs {order.price}</p>
        <p className="text-lg font-medium"><strong>Status:</strong> {order.status}</p>
        <p className="text-lg font-medium"><strong>Sample Status:</strong> {order.sampleStatus}</p>
        {order.sampleStatus === 'sample_rejected' && (
          <>
    <p className="text-lg font-medium text-red-500">Order Rejected</p>
    <p className="text-lg font-medium"><strong>Reason:</strong> {order.rejectionReason}</p>
    </>
  )}
        <p className="text-lg font-medium"><strong>Payment Status:</strong> {order.paymentStatus}</p>
        <div className="font-semibold text-gray-600">
            <strong>Agreement:</strong> {order.Agreement}
          </div>

        <p className="text-sm text-gray-500">Ordered On: {new Date(order.createdAt).toLocaleString()}</p>
      </div>

      {/* Sample Submission Section */}
      {order.sampleStatus === "waiting_for_sample" && (
        <div className="mt-6 p-6 bg-gray-50 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Send Sample</h3>
          
          {order.sampleProof ? (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800">Sample already submitted</p>
            </div>
          ) : (
            <>
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={() => setShowForm(!showForm)}
                disabled={isSubmitting}
              >
                {showForm ? "Cancel" : "Enter Sample Details"}
              </button>

              {showForm && (
                <form onSubmit={handleSubmitSample} className="mt-6 space-y-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Sample Description</label>
                    <textarea
                      className="w-full px-4 py-2 border rounded-lg"
                      rows="4"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the sample..."
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Sample Image</label>
                    <input
                      type="file"
                      className="w-full px-4 py-2 border rounded-lg"
                      accept="image/jpeg, image/png"
                      onChange={(e) => setSampleImage(e.target.files[0])}
                      required
                      disabled={isSubmitting}
                    />
                    <p className="text-xs text-gray-500 mt-1">Upload a clear image of the sample (JPEG or PNG)</p>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-300 transition"
                    disabled={isSubmitting || !sampleImage}
                  >
                    {isSubmitting ? "Submitting..." : "Send Sample"}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      )}

      {/* Sample Proof Display */}
      {order.sampleProof && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Sample Proof</h3>
          <img 
            src={order.sampleProof} 
            alt="Sample proof" 
            className="max-w-full h-auto rounded-lg shadow-lg border"
          />
          {order.sampleDescription && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Description:</h4>
              <p className="text-gray-700">{order.sampleDescription}</p>
            </div>
          )}
        </div>
      )}
        {/* Sample Recieved Proof */}
        {order.sampleRecievedProof && (
        <div className="card bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            Sample Recieved Proof
          </h3>
          <img
            src={order.sampleRecievedProof}
            alt="Sample proof"
            className="max-w-full h-auto rounded-xl shadow-md"
          />
         
        </div>
      )}
    </div>
  );
};

export default SupplierOrderDetails;