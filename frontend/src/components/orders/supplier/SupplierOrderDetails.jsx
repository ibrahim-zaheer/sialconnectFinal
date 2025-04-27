

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

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import PDFGenerator from "../components/PDFGenerator";
// import { useSelector } from "react-redux";
// import AgreementComponent from "../components/AgreementComponent";
// import AgreementPDFGenerator from "../components/AgreementPDFGenerator";

// import PaymentForm from "../components/payment/PaymentForm";
// import LocalPaymentForm from "../components/payment/LocalPaymentForm";


// const SupplierOrderDetails = () => {

//       const user = useSelector((state) => state.user);
//       const userName = user?.name;
//       const userRole = user?.role;

//   const { orderId } = useParams();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const [description, setDescription] = useState("");
//   const [sampleImage, setSampleImage] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showForm, setShowForm] = useState(false);

//   const [paymentSubmitted, setPaymentSubmitted] = useState(false);

//   const fetchOrderDetails = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(`/api/order/orders/supplier/${orderId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setOrder(response.data.order);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to load order details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrderDetails();
//   }, [orderId]); // Removed any dependencies that might cause infinite loops

//   const handleSubmitSample = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setMessage(""); // Clear previous messages

//     try {
//       const token = localStorage.getItem("token");
//       const formData = new FormData();
//       formData.append("orderId", orderId);
//       formData.append("description", description);
//       formData.append("sampleImage", sampleImage);

//       const response = await axios.post(
//         "/api/order/orders/mark-sample-sent", 
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       // Reset form state
//       setDescription("");
//       setSampleImage(null);
//       setShowForm(false);
      
//       // Update order data
//       setOrder(response.data.order);
//       setMessage("Sample sent successfully!");
      
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to send sample.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//   const handlePaymentSubmitted = () => {
//     setPaymentSubmitted(true);
//     fetchOrderDetails();
//   };

//   const handleAcceptSuccess = () => {
//     fetchOrderDetails(); // Re-fetch order details after agreement is accepted
//   };

//   const handleRejectSuccess = () => {
//     fetchOrderDetails(); // Re-fetch order details after agreement is rejected
//   };

//   if (loading) return <p className="text-center mt-8">Loading order details...</p>;
//   if (!order) return null;

//   return (
//     <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-lg">
//       <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Order Details</h2>

//        {/* PDF Generation Button */}
//            {order.status === "completed" && (
//               <div className="mt-6">
//                 <PDFGenerator order={order} userName={userName} userRole={userRole}/>
//                 <AgreementPDFGenerator order={order} userName={userName} userRole={userRole} />
//               </div>
//             )}

//              {/* Order Agreement Payment Details */}
//            {order.Agreement === "Accepted" && order.paymentDetails.paymentStatus === "pending"&&(
//               <div className="mt-6">
//               {/* <PaymentForm orderId={order._id}/> */}
//               <PaymentForm orderId={order._id}onPaymentSubmitted={handlePaymentSubmitted} />
             
//               {paymentSubmitted && <p>Your payment details are submitted, awaiting approval.</p>}
//               </div>
//             )}
//              {order.Agreement === "Accepted" && order.paymentDetails.paymentStatus === "detailsGiven"&&(
//               <div className="mt-6">
//               {/* <PaymentForm orderId={order._id}/> */}
             
//               {<p>Your payment details are submitted, awaiting approval.</p>}
//               </div>
//             )}

//              {/* Agreement Component for Completed Orders */}
//                    {order.status === "completed" && order.Agreement =="waiting_for_supplier" && (
//                       <div className="mt-6">
//                         <AgreementComponent
//                           orderId={order._id}
//                           onAcceptSuccess={handleAcceptSuccess}
//                           onRejectSuccess={handleRejectSuccess}
//                           role={userRole}
//                         />
//                       </div>
//                     )}
      
//       {/* Display success/error message if exists */}
//       {message && (
//         <div className={`mb-6 p-4 rounded-lg text-center ${
//           message.includes("success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//         }`}>
//           {message}
//         </div>
//       )}

//       <div className="space-y-4">
//         {order.auctionId && <p className="text-lg font-medium"><strong>Auction:</strong> {order.auctionId.title}</p>}
//         {order.productId && <p className="text-lg font-medium"><strong>Product:</strong> {order.productId.name}</p>}
//         <p className="text-lg font-medium"><strong>Exporter:</strong> {order.exporterId?.name}</p>
//         <p className="text-lg font-medium"><strong>Email:</strong> {order.exporterId?.email}</p>
//         <p className="text-lg font-medium"><strong>Quantity:</strong> {order.quantity}</p>
//         <p className="text-lg font-medium"><strong>Price:</strong> Rs {order.price}</p>
//         <p className="text-lg font-medium"><strong>Status:</strong> {order.status}</p>
//         <p className="text-lg font-medium"><strong>Sample Status:</strong> {order.sampleStatus}</p>
//         {order.sampleStatus === 'sample_rejected' && (
//           <>
//     <p className="text-lg font-medium text-red-500">Order Rejected</p>
//     <p className="text-lg font-medium"><strong>Reason:</strong> {order.rejectionReason}</p>
//     </>
//   )}
//         <p className="text-lg font-medium"><strong>Payment Status:</strong> {order.paymentStatus}</p>
//         <div className="font-semibold text-gray-600">
//             <strong>Agreement:</strong> {order.Agreement}
//           </div>
//           <div className="font-semibold text-gray-600">
//             <strong>Token Payment Status:</strong> {order.paymentDetails.paymentStatus}
//           </div>

//         <p className="text-sm text-gray-500">Ordered On: {new Date(order.createdAt).toLocaleString()}</p>
//       </div>

//       {/* Sample Submission Section */}
//       {order.sampleStatus === "waiting_for_sample" && (
//         <div className="mt-6 p-6 bg-gray-50 border border-gray-300 rounded-lg">
//           <h3 className="text-xl font-semibold mb-4">Send Sample</h3>
          
//           {order.sampleProof ? (
//             <div className="bg-blue-50 p-4 rounded-lg">
//               <p className="text-blue-800">Sample already submitted</p>
//             </div>
//           ) : (
//             <>
//               <button
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                 onClick={() => setShowForm(!showForm)}
//                 disabled={isSubmitting}
//               >
//                 {showForm ? "Cancel" : "Enter Sample Details"}
//               </button>

//               {showForm && (
//                 <form onSubmit={handleSubmitSample} className="mt-6 space-y-4">
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Sample Description</label>
//                     <textarea
//                       className="w-full px-4 py-2 border rounded-lg"
//                       rows="4"
//                       value={description}
//                       onChange={(e) => setDescription(e.target.value)}
//                       placeholder="Describe the sample..."
//                       disabled={isSubmitting}
//                     />
//                   </div>

//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Sample Image</label>
//                     <input
//                       type="file"
//                       className="w-full px-4 py-2 border rounded-lg"
//                       accept="image/jpeg, image/png"
//                       onChange={(e) => setSampleImage(e.target.files[0])}
//                       required
//                       disabled={isSubmitting}
//                     />
//                     <p className="text-xs text-gray-500 mt-1">Upload a clear image of the sample (JPEG or PNG)</p>
//                   </div>

//                   <button
//                     type="submit"
//                     className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-300 transition"
//                     disabled={isSubmitting || !sampleImage}
//                   >
//                     {isSubmitting ? "Submitting..." : "Send Sample"}
//                   </button>
//                 </form>
//               )}
//             </>
//           )}
//         </div>
//       )}

//       {/* Sample Proof Display */}
//       {order.sampleProof && (
//         <div className="mt-8">
//           <h3 className="text-xl font-semibold mb-4">Sample Proof</h3>
//           <img 
//             src={order.sampleProof} 
//             alt="Sample proof" 
//             className="max-w-full h-auto rounded-lg shadow-lg border"
//           />
//           {order.sampleDescription && (
//             <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//               <h4 className="font-medium mb-2">Description:</h4>
//               <p className="text-gray-700">{order.sampleDescription}</p>
//             </div>
//           )}
//         </div>
//       )}
//         {/* Sample Recieved Proof */}
//         {order.sampleRecievedProof && (
//         <div className="card bg-white p-6 rounded-lg shadow-md mt-6">
//           <h3 className="text-lg font-semibold mb-2 text-gray-700">
//             Sample Recieved Proof
//           </h3>
//           <img
//             src={order.sampleRecievedProof}
//             alt="Sample proof"
//             className="max-w-full h-auto rounded-xl shadow-md"
//           />
         
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
  const { orderId } = useParams();
  const user = useSelector((state) => state.user);
  const userName = user?.name;
  const userRole = user?.role;

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
  }, [orderId]);

  const handleSubmitSample = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

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

      setDescription("");
      setSampleImage(null);
      setShowForm(false);
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
    fetchOrderDetails();
  };

  const handleRejectSuccess = () => {
    fetchOrderDetails();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-neutral-50 min-h-screen p-6 flex justify-center items-center">
        <p className="text-neutral-600">Order not found</p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
          <h1 className="text-2xl font-bold text-neutral-800 mb-2">Order Details</h1>
          <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-600">
            <span>Order ID: {orderId}</span>
            <span className="px-1">•</span>
            <span>Status: 
              <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                order.status === 'completed' 
                  ? 'bg-success-100 text-success-800' 
                  : 'bg-warning-100 text-warning-800'
              }`}>
                {order.status}
              </span>
            </span>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-xl shadow-xs border border-neutral-200 overflow-hidden">
          <div className="p-6 border-b border-neutral-200">
            <h2 className="text-xl font-semibold text-neutral-800">Order Summary</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {/* <DetailItem label="Auction" value={order.auctionId?.title} />
              <DetailItem label="Product" value={order.productId?.name} /> */}
                {order.auctionId ? (
    <DetailItem label="Auction" value={order.auctionId?.title} />
  ) : (
    <DetailItem label="Product" value={order.productId?.name} />
  )}
              <DetailItem label="Exporter" value={order.exporterId?.name} />
              <DetailItem label="Supplier" value={order.supplierId?.name} />
            </div>
            <div className="space-y-4">
              <DetailItem label="Quantity" value={order.quantity} />
              <DetailItem label="Price" value={`Rs ${order.price?.toLocaleString()}`} />
              <DetailItem label="Order Date" value={new Date(order.createdAt).toLocaleString()} />
            </div>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatusCard 
            title="Sample Status" 
            value={order.sampleStatus} 
            variant={order.sampleStatus === "approved" ? "success" : 
                    order.sampleStatus === "sample_rejected" ? "error" : "warning"}
          />
          <StatusCard 
            title="Payment Status" 
            value={order.paymentStatus} 
            variant={order.paymentStatus === "completed" ? "success" : "warning"}
          />
          <StatusCard 
            title="Agreement" 
            value={order.Agreement} 
            variant={order.Agreement === "Accepted" ? "success" : 
                    order.Agreement === "Rejected" ? "error" : "warning"}
          />
        </div>

        {/* Documents Section */}
        {order.status === "completed" && (
          <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Documents</h2>
            <div className="flex flex-wrap gap-4">
              <PDFGenerator order={order} userName={userName} userRole={userRole} />
              <AgreementPDFGenerator order={order} userName={userName} userRole={userRole} />
            </div>
          </div>
        )}

        {/* Agreement Section */}
        {order.status === "completed" && order.Agreement === "waiting_for_supplier" && (
          <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
            <AgreementComponent
              orderId={order._id}
              onAcceptSuccess={handleAcceptSuccess}
              onRejectSuccess={handleRejectSuccess}
              role={userRole}
            />
          </div>
        )}

        {/* Payment Form */}
        {order.Agreement === "Accepted" && order.paymentDetails?.paymentStatus === "pending" && (
          <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Payment Details</h2>
            <PaymentForm orderId={order._id} onPaymentSubmitted={handlePaymentSubmitted} />
          </div>
        )}

        {/* Payment Status */}
        {order.Agreement === "Accepted" && order.paymentDetails?.paymentStatus === "detailsGiven" && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">Your payment details are submitted, awaiting approval.</p>
          </div>
        )}

        {/* Sample Submission */}
        {order.sampleStatus === "waiting_for_sample" && (
          <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-neutral-800">Send Sample</h2>
              {!order.sampleProof && (
                <button
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition"
                  onClick={() => setShowForm(!showForm)}
                  disabled={isSubmitting}
                >
                  {showForm ? "Cancel" : "Enter Details"}
                </button>
              )}
            </div>

            {order.sampleProof ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800">Sample already submitted</p>
              </div>
            ) : showForm && (
              <form onSubmit={handleSubmitSample} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Sample Description</label>
                  <textarea
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the sample..."
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Sample Image</label>
                  <input
                    type="file"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    accept="image/jpeg, image/png"
                    onChange={(e) => setSampleImage(e.target.files[0])}
                    required
                    disabled={isSubmitting}
                  />
                  <p className="text-xs text-neutral-500 mt-1">JPEG or PNG, max 5MB</p>
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-primary-300 transition"
                  disabled={isSubmitting || !sampleImage}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : "Submit Sample"}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Sample Proof Display */}
        {order.sampleProof && (
          <ImageCard 
            title="Sample Proof" 
            imageUrl={order.sampleProof} 
            description={order.sampleDescription}
          />
        )}

        {/* Sample Received Proof */}
        {order.sampleRecievedProof && (
          <ImageCard 
            title="Sample Received Proof" 
            imageUrl={order.sampleRecievedProof}
          />
        )}

        {/* Rejection Reason */}
        {order.sampleStatus === 'sample_rejected' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-red-800 mb-2">Order Rejected</h3>
            <p className="text-red-700"><strong>Reason:</strong> {order.rejectionReason}</p>
          </div>
        )}

        {/* Message Display */}
        {message && (
          <div className={`p-4 rounded-lg ${
            message.includes("success") ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable Components
const DetailItem = ({ label, value }) => (
  <div>
    <span className="text-sm font-medium text-neutral-500">{label}: </span>
    <span className="text-neutral-900">{value || "—"}</span>
  </div>
);

const StatusCard = ({ title, value, variant = "neutral" }) => {
  const variantClasses = {
    success: "bg-success-50 text-success-800",
    warning: "bg-warning-50 text-warning-800",
    error: "bg-error-50 text-error-800",
    neutral: "bg-neutral-50 text-neutral-800"
  };

  return (
    <div className={`${variantClasses[variant]} p-4 rounded-lg shadow-xs`}>
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-lg font-semibold mt-1 capitalize">
        {value ? value.replace(/_/g, ' ') : "—"}
      </p>
    </div>
  );
};

const ImageCard = ({ title, imageUrl, description }) => (
  <div className="bg-white rounded-xl shadow-xs border border-neutral-200 overflow-hidden">
    <div className="p-4 border-b border-neutral-200">
      <h2 className="text-lg font-medium text-neutral-800">{title}</h2>
    </div>
    <div className="p-4">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-auto max-h-96 object-contain rounded-lg border border-neutral-200"
      />
      {description && (
        <div className="mt-4 p-3 bg-neutral-50 rounded-lg">
          <p className="text-neutral-700">{description}</p>
        </div>
      )}
    </div>
  </div>
);

export default SupplierOrderDetails;