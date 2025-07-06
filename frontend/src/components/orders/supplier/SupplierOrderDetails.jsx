// ======================================

// import React, { useEffect, useState } from "react";
// import { useParams,Link } from "react-router-dom";
// import axios from "axios";
// import PDFGenerator from "../components/PDFGenerator";
// import { useSelector } from "react-redux";
// import AgreementComponent from "../components/AgreementComponent";
// import AgreementPDFGenerator from "../components/AgreementPDFGenerator";
// import PaymentForm from "../components/payment/PaymentForm";
// import WriteReview from "../../reviews/WriteReviews";
// import { OrderSent } from "./order/OrderSent";
// import DateDisplay from "../../DateDisplay";

// const SupplierOrderDetails = () => {
//   const { orderId } = useParams();
//   const user = useSelector((state) => state.user);
//   const userName = user?.name;
//   const userRole = user?.role;

//     const userID = user?.id;

//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const [description, setDescription] = useState("");
//   const [sampleImage, setSampleImage] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [paymentSubmitted, setPaymentSubmitted] = useState(false);
//   const [showPaymentForm, setShowPaymentForm] = useState(true);

//   const [isImageVisible, setIsImageVisible] = useState(false);

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
//   }, [orderId]);

// const toggleImageVisibility = () => {
//     setIsImageVisible(!isImageVisible);
//   };

//   const handleSubmitSample = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setMessage("");

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

//       setDescription("");
//       setSampleImage(null);
//       setShowForm(false);
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

//   const handleRejectedPaymentSubmitted = () => {
//     setPaymentSubmitted(true);
//     setShowPaymentForm(false); // Add this to close the form
//     fetchOrderDetails();
//   };

//   const handleAcceptSuccess = () => {
//     fetchOrderDetails();
//   };

//   const handleRejectSuccess = () => {
//     fetchOrderDetails();
//   };

//   const handleOrderSentSuccess = () => {
//     // Callback function when the order is sent successfully
//     setMessage("Order has been successfully marked as shipped.");
//     fetchOrderDetails(); // Refresh order details after success
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="bg-neutral-50 min-h-screen p-6 flex justify-center items-center">
//         <p className="text-neutral-600">Order not found</p>
//       </div>
//     );
//   }
//   const hasReviewed = order.reviews?.some((review) => review.user._id === user._id) || false;

//   return (
//     <div className="bg-neutral-50 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto space-y-6">
//         {/* Header Section */}
//         <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
//           <h1 className="text-2xl font-bold text-neutral-800 mb-2">
//             Order Details
//           </h1>
//           <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-600">
//             {/* <span>Order ID: {orderId}</span> */}
//             {order.orderId && (
//               <p className="text-neutral-600">Order ID: {order.orderId}</p>
//             )}
//             <span className="px-1">•</span>
//             <span>
//               Status:
//               <span
//                 className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${
//                   order.status === "completed"
//                     ? "bg-success-100 text-success-800"
//                     : "bg-warning-100 text-warning-800"
//                 }`}
//               >
//                 {order.status}
//               </span>
//             </span>
//           </div>
//         </div>

//           {/* Conditionally Render the OrderSent Component */}
//         {(order.Agreement === "Accepted" && order.status == "agreement_accepted") || (!order.sample_needed) && (
//           <OrderSent
//             orderId={order._id}
//             onSuccess={handleOrderSentSuccess}
//           />
//         )}

//         {/* Order Summary Card */}
//         <div className="bg-white rounded-xl shadow-xs border border-neutral-200 overflow-hidden">
//           <div className="p-6 border-b border-neutral-200">
//             <h2 className="text-xl font-semibold text-neutral-800">
//               Order Summary
//             </h2>
//           </div>
//           <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-4">
//               {/* <DetailItem label="Auction" value={order.auctionId?.title} />
//               <DetailItem label="Product" value={order.productId?.name} /> */}
//               {order.auctionId ? (
//                 <DetailItem label="Auction" value={order.auctionId?.title} />
//               ) : (
//                 <DetailItem label="Product" value={order.productId?.name} />
//               )}
//               <DetailItem label="Exporter" value={order.exporterId?.name} />
//               <DetailItem label="Supplier" value={order.supplierId?.name} />
//               {/* <DetailItem label="Days to deliever" value={order?.deliveryDays} /> */}
//               {/* {order?.deliveryDays ? (
//   <DetailItem label="Days to deliver" value={order.deliveryDays} />
// ) : null} */}
// {/* {order?.deliveryDays ? (
//   <DetailItem
//     label="Days to deliver"
//     value={new Date(order.deliveryDays).toISOString().split('T')[0]}
//   />
// ) : null} */}

//  {order?.deliveryDays ? (
//           <DateDisplay date={order.deliveryDays} />
//         ) : (
//           <span>No delivery date set</span>
//         )}

//             </div>
//             <div className="space-y-4">
//               <DetailItem label="Quantity" value={order.quantity} />
//               <DetailItem
//                 label="Price"
//                 value={`Rs ${order.price?.toLocaleString()}`}
//               />
//               <DetailItem
//                 label="Order Date"
//                 value={new Date(order.createdAt).toLocaleString()}
//               />
//             </div>
//           </div>
//         </div>

//              {userRole === "supplier" && (
//                   <Link
//                     to={`/chat?supplierId=${order.exporterId?._id}`}
//                     className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                   >
//                     <svg
//                       className="w-5 h-5 mr-2"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                       />
//                     </svg>
//                     Chat with Exporter
//                   </Link>
//                 )}

//                  <Link
//                     to={`/chat?supplierId=${"673b05acd7ab61f6819baa08"}`}
//                     className="inline-flex items-center px-6 py-3 bg-red-700 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                   >
//                     <svg
//                       className="w-5 h-5 mr-2"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                       />
//                     </svg>
//                     Complain to Admin
//                   </Link>

//         {/* <OrderSent/> */}

//             {/* Conditionally Render the OrderSent Component */}
//         {order.Agreement === "Accepted" && order.status == "agreement_accepted" && (
//           <OrderSent
//             orderId={order._id}
//             onSuccess={handleOrderSentSuccess}
//           />
//         )}

//         {/* Status Cards */}
//         {order.sample_needed &&(
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <StatusCard
//             title="Sample Status"
//             value={order.sampleStatus}
//             variant={
//               order.sampleStatus === "approved"
//                 ? "success"
//                 : order.sampleStatus === "sample_rejected"
//                 ? "error"
//                 : "warning"
//             }
//           />
//           <StatusCard
//             title="Payment Status"
//             value={order.paymentStatus}
//             variant={
//               order.paymentStatus === "completed" ? "success" : "warning"
//             }
//           />
//           <StatusCard
//             title="Agreement"
//             value={order.Agreement}
//             variant={
//               order.Agreement === "Accepted"
//                 ? "success"
//                 : order.Agreement === "Rejected"
//                 ? "error"
//                 : "warning"
//             }
//           />
//         </div>
//         )}

//          {order.sample_needed ? <>sample is here</>:<>sample not here</> }
//         {/* Documents Section */}
//         {order.status === "completed" && (
//           <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
//             <h2 className="text-xl font-semibold text-neutral-800 mb-4">
//               Documents
//             </h2>
//             <div className="flex flex-wrap gap-4">
//               <PDFGenerator
//                 order={order}
//                 userName={userName}
//                 userRole={userRole}
//               />
//               <AgreementPDFGenerator
//                 order={order}
//                 userName={userName}
//                 userRole={userRole}
//               />
//             </div>
//           </div>
//         )}

//         {/* Agreement Section */}
//         {order.status === "completed" &&
//           order.Agreement === "waiting_for_supplier" && (
//             <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
//               <AgreementComponent
//                 orderId={order._id}
//                 onAcceptSuccess={handleAcceptSuccess}
//                 onRejectSuccess={handleRejectSuccess}
//                 role={userRole}
//               />
//             </div>
//           )}

//         {/* Payment Form */}
//         {/* {order.Agreement === "Accepted" && order.paymentDetails?.paymentStatus === "pending" && (
//           <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
//             <h2 className="text-xl font-semibold text-neutral-800 mb-4">Payment Details</h2>
//             <PaymentForm orderId={order._id} onPaymentSubmitted={handlePaymentSubmitted} />
//           </div>
//         )} */}
//         {order.Agreement === "Accepted" &&
//           order.paymentDetails?.paymentStatus === "pending" && (
//             <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-6">
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                 Payment Details
//               </h2>
//               <PaymentForm
//                 orderId={order._id}
//                 onPaymentSubmitted={handlePaymentSubmitted}
//                 orderPrice={order.price} // Pass the order price here
//               />
//             </div>
//           )}
//         {/*
// {(order.sampleStatus === "sample_rejected") && (
//   <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-6">
//     <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Details</h2>
//     <PaymentForm
//       orderId={order._id}
//       onPaymentSubmitted={handlePaymentSubmitted}
//       orderPrice={order.price} // Pass the order price here
//     />
//   </div>
// )} */}
//         {/* Payment Form for Rejected Sample */}
//         {order.sampleStatus === "sample_rejected" &&
//           order.paymentStatus !== "completed" &&
//           showPaymentForm && (
//             <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-6">
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                 Payment Details
//               </h2>
//               <PaymentForm
//                 orderId={order._id}
//                 onPaymentSubmitted={handlePaymentSubmitted}
//                 orderPrice={order.price / 2}
//               />
//             </div>
//           )}

//         {/* Payment Status */}
//         {order.Agreement === "Accepted" &&
//           order.paymentDetails?.paymentStatus === "detailsGiven" && (
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//               <p className="text-blue-800">
//                 Your payment details are submitted, awaiting approval.
//               </p>
//             </div>
//           )}

//         {/* Sample Submission */}
//         {order.sampleStatus === "waiting_for_sample" && (
//           <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold text-neutral-800">
//                 Send Sample
//               </h2>
//               {!order.sampleProof && (
//                 <button
//                   className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition"
//                   onClick={() => setShowForm(!showForm)}
//                   disabled={isSubmitting}
//                 >
//                   {showForm ? "Cancel" : "Enter Details"}
//                 </button>
//               )}
//             </div>

//             {order.sampleProof ? (
//               <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//                 <p className="text-green-800">Sample already submitted</p>
//               </div>
//             ) : (
//               showForm && (
//                 <form onSubmit={handleSubmitSample} className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-neutral-700 mb-1">
//                       Sample Description
//                     </label>
//                     <textarea
//                       className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                       rows="4"
//                       value={description}
//                       onChange={(e) => setDescription(e.target.value)}
//                       placeholder="Describe the sample..."
//                       disabled={isSubmitting}
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-neutral-700 mb-1">
//                       Sample Image
//                     </label>
//                     <input
//                       type="file"
//                       className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                       accept="image/jpeg, image/png"
//                       onChange={(e) => setSampleImage(e.target.files[0])}
//                       required
//                       disabled={isSubmitting}
//                     />
//                     <p className="text-xs text-neutral-500 mt-1">
//                       JPEG or PNG, max 5MB
//                     </p>
//                   </div>

//                   <button
//                     type="submit"
//                     className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-primary-300 transition"
//                     disabled={isSubmitting || !sampleImage}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <svg
//                           className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                           ></path>
//                         </svg>
//                         Submitting...
//                       </>
//                     ) : (
//                       "Submit Sample"
//                     )}
//                   </button>
//                 </form>
//               )
//             )}
//           </div>
//         )}

//         {/* Sample Proof Display */}
//         {/* {order.sampleProof && (
//           <ImageCard
//             title="Sample Proof"
//             imageUrl={order.sampleProof}
//             description={order.sampleDescription}
//           />
//         )} */}

//         {order.sampleProof && (
//           <div>
//             <button onClick={toggleImageVisibility}>
//               {isImageVisible ? "Hide Sample Image" : "Show Sample Image"}
//             </button>

//             {isImageVisible && (
//               <ImageCard
//                 title="Sample Proof"
//                 imageUrl={order.sampleProof}
//                 description={order.sampleDescription}
//               />
//             )}
//           </div>
//         )}

//         {/* Sample Received Proof */}
//         {order.sampleRecievedProof && (

//            <div>
//             {/* <button onClick={toggleImageVisibility}>
//               {isImageVisible ? "Hide Sample Image" : "Show Sample Image"}
//             </button> */}

//             {isImageVisible && (
//               <ImageCard
//                 title="Sample Received Proof"
//             imageUrl={order.sampleRecievedProof}
//                 description={order.sampleDescription}
//               />
//             )}
//           </div>
//         )}

//         {/* Rejection Reason */}
//         {order.sampleStatus === "sample_rejected" && (
//           <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//             <h3 className="text-lg font-medium text-red-800 mb-2">
//               Order Rejected
//             </h3>
//             <p className="text-red-700">
//               <strong>Reason:</strong> {order.rejectionReason}
//             </p>
//           </div>
//         )}
//         {order.Agreement === "Accepted" && !hasReviewed && (
//           <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
//             <h2 className="text-xl font-semibold text-neutral-800 mb-4">
//               Write a Review
//             </h2>
//             <p>Exporter ID : {order.exporterId?._id} </p>
//             <p>UserID : {userID} </p>
//             <p>UserRole : {userRole} </p>

//             <WriteReview
//               supplierId={order.exporterId?._id}
//               productName={order.productId?.name}
//               reviewerRole={userRole} // pass the userRole (exporter/supplier)
//               orderId={order._id} // pass the orderId to associate the review
//             />
//           </div>
//         )}
//         {/* Message Display */}
//         {message && (
//           <div
//             className={`p-4 rounded-lg ${
//               message.includes("success")
//                 ? "bg-green-50 border border-green-200 text-green-800"
//                 : "bg-red-50 border border-red-200 text-red-800"
//             }`}
//           >
//             {message}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Reusable Components
// const DetailItem = ({ label, value }) => (
//   <div>
//     <span className="text-sm font-medium text-neutral-500">{label}: </span>
//     <span className="text-neutral-900">{value || "—"}</span>
//   </div>
// );

// const StatusCard = ({ title, value, variant = "neutral" }) => {
//   const variantClasses = {
//     success: "bg-success-50 text-success-800",
//     warning: "bg-warning-50 text-warning-800",
//     error: "bg-error-50 text-error-800",
//     neutral: "bg-neutral-50 text-neutral-800"
//   };

//   return (
//     <div className={`${variantClasses[variant]} p-4 rounded-lg shadow-xs`}>
//       <h3 className="text-sm font-medium">{title}</h3>
//       <p className="text-lg font-semibold mt-1 capitalize">
//         {value ? value.replace(/_/g, ' ') : "—"}
//       </p>
//     </div>
//   );
// };

// const ImageCard = ({ title, imageUrl, description }) => (
//   <div className="bg-white rounded-xl shadow-xs border border-neutral-200 overflow-hidden">
//     <div className="p-4 border-b border-neutral-200">
//       <h2 className="text-lg font-medium text-neutral-800">{title}</h2>
//     </div>
//     <div className="p-4">
//       <img
//         src={imageUrl}
//         alt={title}
//         className="w-full h-auto max-h-96 object-contain rounded-lg border border-neutral-200"
//       />
//       {description && (
//         <div className="mt-4 p-3 bg-neutral-50 rounded-lg">
//           <p className="text-neutral-700">{description}</p>
//         </div>
//       )}
//     </div>
//   </div>
// );

// export default SupplierOrderDetails;

// ==============================================

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import PDFGenerator from "../components/PDFGenerator";
import { useSelector } from "react-redux";
import AgreementComponent from "../components/AgreementComponent";
import AgreementPDFGenerator from "../components/AgreementPDFGenerator";
import PaymentForm from "../components/payment/PaymentForm";
import WriteReview from "../../reviews/WriteReviews";
import { OrderSent } from "./order/OrderSent";
import DateDisplay from "../../DateDisplay";

const SupplierOrderDetails = () => {
  const { orderId } = useParams();
  const user = useSelector((state) => state.user);
  const userName = user?.name;
  const userRole = user?.role;
  const userID = user?.id;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");
  const [sampleImage, setSampleImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(true);
  const [isImageVisible, setIsImageVisible] = useState(false);

  const fetchOrderDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `/api/order/orders/supplier/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrder(response.data.order);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to load order details."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const toggleImageVisibility = () => {
    setIsImageVisible(!isImageVisible);
  };

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

  const handleRejectedPaymentSubmitted = () => {
    setPaymentSubmitted(true);
    setShowPaymentForm(false);
    fetchOrderDetails();
  };

  const handleAcceptSuccess = () => {
    fetchOrderDetails();
  };

  const handleRejectSuccess = () => {
    fetchOrderDetails();
  };

  const handleOrderSentSuccess = () => {
    setMessage("Order has been successfully marked as shipped.");
    fetchOrderDetails();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-gray-50 min-h-screen p-6 flex justify-center items-center">
        <p className="text-gray-600">Order not found</p>
      </div>
    );
  }

  const hasReviewed =
    order.reviews?.some((review) => review.user._id === user._id) || false;

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6">
      <div className="mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Order Details
              </h1>
              {order.orderId && (
                <p className="text-gray-600 mt-1">Order ID: {order.orderId}</p>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Status:</span>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  order.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        </div>

        {/* Order Sent Component */}
        {(order.Agreement === "Accepted" &&
          order.status === "agreement_accepted") ||
        !order.sample_needed ? (
          <OrderSent orderId={order._id} onSuccess={handleOrderSentSuccess} />
        ) : null}

        {/* Order Summary Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">
              Order Summary
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {order.auctionId ? (
                <DetailItem label="Auction" value={order.auctionId?.title} />
              ) : (
                <DetailItem label="Product" value={order.productId?.name} />
              )}
              <DetailItem label="Exporter" value={order.exporterId?.name} />
              <DetailItem label="Supplier" value={order.supplierId?.name} />
              {order?.deliveryDays ? (
                <div className="my-3">
                  Delievery Date:
                  <DateDisplay date={order.deliveryDays} />
                </div>
              ) : (
                <div>
                  <DetailItem label="Delivery Date" value="Not set" />
                </div>
                // <></>
              )}
            </div>
            <div className="space-y-4">
              <DetailItem label="Quantity" value={order.quantity} />
              <DetailItem
                label="Price"
                value={`Rs ${order.price?.toLocaleString()}`}
              />
              <DetailItem
                label="Order Date"
                value={new Date(order.createdAt).toLocaleString()}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          {userRole === "supplier" && (
            <Link
              to={`/chat?supplierId=${order.exporterId?._id}`}
              className="inline-flex items-center px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Chat with Exporter
            </Link>
          )}

          <Link
            to={`/chat?supplierId=673b05acd7ab61f6819baa08`}
            className="inline-flex items-center px-4 py-2.5 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Complain to Admin
          </Link>
        </div>

        {/* Status Cards */}
        {order.sample_needed && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatusCard
              title="Sample Status"
              value={order.sampleStatus}
              variant={
                order.sampleStatus === "sample_accepted"
                  ? "success"
                  : order.sampleStatus === "sample_rejected"
                  ? "error"
                  : "warning"
              }
            />
            <StatusCard
              title="Payment Status"
              value={order.paymentStatus}
              variant={
                order.paymentStatus === "completed" ? "success" : "warning"
              }
            />
            <StatusCard
              title="Agreement"
              value={order.Agreement}
              variant={
                order.Agreement === "Accepted"
                  ? "success"
                  : order.Agreement === "Rejected"
                  ? "error"
                  : "warning"
              }
            />
          </div>
        )}

        {/* Documents Section */}
        {order.status === "completed" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Documents
            </h2>
            <div className="flex flex-wrap gap-4">
              <PDFGenerator
                order={order}
                userName={userName}
                userRole={userRole}
              />
              <AgreementPDFGenerator
                order={order}
                userName={userName}
                userRole={userRole}
              />
            </div>
          </div>
        )}

        {/* Agreement Section */}
        {order.status === "completed" &&
          order.Agreement === "waiting_for_supplier" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <AgreementComponent
                orderId={order._id}
                onAcceptSuccess={handleAcceptSuccess}
                onRejectSuccess={handleRejectSuccess}
                role={userRole}
              />
            </div>
          )}

        {/* Payment Forms */}
        {order.Agreement === "Accepted" &&
          order.paymentDetails?.paymentStatus === "pending" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Payment Details
              </h2>
              <PaymentForm
                orderId={order._id}
                onPaymentSubmitted={handlePaymentSubmitted}
                orderPrice={order.price}
              />
            </div>
          )}

        {order.sampleStatus === "sample_rejected" &&
          order.paymentStatus !== "completed" &&
          showPaymentForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Payment Details
              </h2>
              <PaymentForm
                orderId={order._id}
                onPaymentSubmitted={handlePaymentSubmitted}
                orderPrice={order.price / 2}
              />
            </div>
          )}

        {/* Payment Status */}
        {order.Agreement === "Accepted" &&
          order.paymentDetails?.paymentStatus === "detailsGiven" && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800">
                Your payment details are submitted, awaiting approval.
              </p>
            </div>
          )}

        {/* Sample Submission */}
        {order.sampleStatus === "waiting_for_sample" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Send Sample
              </h2>
              {!order.sampleProof && (
                <button
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  onClick={() => setShowForm(!showForm)}
                  disabled={isSubmitting}
                >
                  {showForm ? (
                    <>
                      <svg
                        className="w-5 h-5 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Cancel
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Enter Details
                    </>
                  )}
                </button>
              )}
            </div>

            {order.sampleProof ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800">Sample already submitted</p>
              </div>
            ) : (
              showForm && (
                <form onSubmit={handleSubmitSample} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sample Description
                    </label>
                    <textarea
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      rows="4"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the sample..."
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sample Image
                    </label>
                    <input
                      type="file"
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                      accept="image/jpeg, image/png"
                      onChange={(e) => setSampleImage(e.target.files[0])}
                      required
                      disabled={isSubmitting}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      JPEG or PNG, max 5MB
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    disabled={isSubmitting || !sampleImage}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      "Submit Sample"
                    )}
                  </button>
                </form>
              )
            )}
          </div>
        )}

        {/* Sample Proof Display */}
        {order.sampleProof && (
          <div className="space-y-2">
            <button
              onClick={toggleImageVisibility}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {isImageVisible ? (
                <>
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  Hide Sample Image
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  Show Sample Image
                </>
              )}
            </button>

            {isImageVisible && (
              <ImageCard
                title="Sample Proof"
                imageUrl={order.sampleProof}
                description={order.sampleDescription}
              />
            )}
          </div>
        )}

        {/* Sample Received Proof */}
        {order.sampleRecievedProof && isImageVisible && (
          <ImageCard
            title="Sample Received Proof"
            imageUrl={order.sampleRecievedProof}
            description={order.sampleDescription}
          />
        )}

        {/* Rejection Reason */}
        {order.sampleStatus === "sample_rejected" && (
          <div className="border border-red-200 rounded-lg p-4">
            <h3 className="text-base font-medium text-red-800 mb-1">
              Order Rejected
            </h3>
            <p className="text-red-700">
              <span className="font-medium">Reason:</span>{" "}
              {order.rejectionReason}
            </p>
          </div>
        )}

        {/* Write Review Section */}
        {order.Agreement === "Accepted" && !hasReviewed && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Write a Review
            </h2>
            <WriteReview
              supplierId={order.exporterId?._id}
              productName={order.productId?.name}
              reviewerRole={userRole}
              orderId={order._id}
            />
          </div>
        )}

        {/* Message Display */}
        {message && (
          <div
            className={`p-4 rounded-md ${
              message.includes("success")
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable Components
const DetailItem = ({ label, value }) => (
  <div className="flex items-start">
    <span className="text-sm font-medium text-gray-500 w-32 flex-shrink-0">
      {label}:
    </span>
    <span className="text-gray-900 break-words">{value || "—"}</span>
  </div>
);

const StatusCard = ({ title, value, variant = "neutral" }) => {
  const variantClasses = {
    success: "bg-green-50 text-green-800",
    warning: "bg-yellow-50 text-yellow-800",
    error: "bg-red-50 text-red-800",
    neutral: "bg-gray-50 text-gray-800",
  };

  return (
    <div
      className={`${variantClasses[variant]} p-4 rounded-lg border border-transparent`}
    >
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-base font-semibold mt-1 capitalize">
        {value ? value.replace(/_/g, " ") : "—"}
      </p>
    </div>
  );
};

const ImageCard = ({ title, imageUrl, description }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
      <h2 className="text-sm font-medium text-gray-900">{title}</h2>
    </div>
    <div className="p-4">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-auto rounded border border-gray-200 max-h-80 object-contain"
      />
      {description && (
        <div className="mt-3 p-3 bg-gray-50 rounded text-sm text-gray-700">
          {description}
        </div>
      )}
    </div>
  </div>
);

export default SupplierOrderDetails;
