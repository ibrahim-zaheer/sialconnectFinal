// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import PaymentPage from "../../../pages/payments/PaymentPage";
// import SampleApproval from "../components/SampleApproval";
// import PDFGenerator from "../components/PDFGenerator";
// import { useSelector } from "react-redux";
// import AgreementComponent from "../components/AgreementComponent";
// import AgreementPDFGenerator from "../components/AgreementPDFGenerator";
// import LocalPaymentForm from "../components/payment/LocalPaymentForm";

// export default function ExporterOrderDetails() {
//   const { orderId } = useParams();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const [activePaymentOrder, setActivePaymentOrder] = useState(null);
//   const [activeLocalPaymentOrder, setLocalActivePaymentOrder] = useState(null);
//   const [sampleRecievedImage, setSampleRecievedImage] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [description, setDescription] = useState("");
//   const [showPaymentPopup, setShowPaymentPopup] = useState(false);
//   const [showLocalPaymentPopup, setShowLocalPaymentPopup] = useState(false);

//   const user = useSelector((state) => state.user);
//   const userName = user?.name;
//   const userRole = user?.role;

//   const handleImageSample = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const token = localStorage.getItem("token");
//       const formData = new FormData();
//       formData.append("orderId", orderId);
//       formData.append("sampleImage", sampleRecievedImage);
//       if (description) {
//         formData.append("description", description);
//       }

//       const response = await axios.post(
//         "/api/order/orders/confirm-sample-receipt",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setOrder(response.data.order);
//       setMessage("Sample Received successfully!");
//       setShowForm(false);
//       setDescription("");
//       setSampleRecievedImage(null);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to send sample.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const fetchOrderDetails = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         `/api/order/orders/exporter/${orderId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setOrder(response.data.order);
//     } catch (error) {
//       setMessage(
//         error.response?.data?.message || "Failed to load order details."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrderDetails();
//   }, [orderId]);

//   const handleLocalPaymentSuccess = () => {
//     fetchOrderDetails();
//   };

//   const handleApproveSuccess = () => {
//     fetchOrderDetails();
//   };

//   const handleAcceptSuccess = () => {
//     fetchOrderDetails();
//   };

//   const handleRejectSuccess = () => {
//     fetchOrderDetails();
//   };

//   const handlePaymentButtonClick = () => {
//     setShowPaymentPopup(!showPaymentPopup);
//     if (showPaymentPopup) {
//       setActivePaymentOrder(null);
//     }
//   };

//   const handleLocalPaymentButtonClick = () => {
//     setShowLocalPaymentPopup(!showLocalPaymentPopup);
//     if (showLocalPaymentPopup) {
//       setLocalActivePaymentOrder(null);
//     }
//   };

//   if (loading) return <p className="text-center mt-8">Loading order details...</p>;
//   if (message) return <p className="text-center text-red-500 mt-8">{message}</p>;
//   if (!order) return null;

//   return (
//     <div className="bg-neutral-50 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto space-y-6">
//         {/* Header Section */}
//         <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
//           <h1 className="text-2xl font-bold text-neutral-800 mb-2">Order Details</h1>
//           <p className="text-neutral-600">Order ID: {orderId}</p>
//         </div>

//         {/* Order Summary Card */}
//         <div className="bg-white rounded-xl shadow-xs border border-neutral-200 overflow-hidden">
//           <div className="p-6 border-b border-neutral-200">
//             <h2 className="text-xl font-semibold text-neutral-800">Order Summary</h2>
//           </div>
//           <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <DetailItem label="Auction" value={order.auctionId?.title} />
//               <DetailItem label="Product" value={order.productId?.name} />
//               <DetailItem label="Supplier" value={order.supplierId?.name} />
//               <DetailItem label="Exporter" value={userName} />
//             </div>
//             <div className="space-y-2">
//               <DetailItem label="Quantity" value={order.quantity} />
//               <DetailItem label="Price" value={`Rs ${order.price}`} />
//               <DetailItem label="Status" value={order.status} badge />
//               <DetailItem label="Order Date" value={new Date(order.createdAt).toLocaleString()} />
//             </div>
//           </div>
//         </div>

//         {/* Status Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <StatusCard
//             title="Sample Status"
//             value={order.sampleStatus}
//             variant={order.sampleStatus === "approved" ? "success" : "warning"}
//           />
//           <StatusCard
//             title="Payment Status"
//             value={order.paymentStatus}
//             variant={order.paymentStatus === "completed" ? "success" : "warning"}
//           />
//           <StatusCard
//             title="Agreement"
//             value={order.Agreement}
//             variant={order.Agreement === "Accepted" ? "success" : "warning"}
//           />
//         </div>

//         {/* Documents Section */}
//         {order.status === "completed" && (
//           <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
//             <h2 className="text-xl font-semibold text-neutral-800 mb-4">Documents</h2>
//             <div className="flex flex-wrap gap-4">
//               <PDFGenerator order={order} userName={userName} userRole={userRole} />
//               <AgreementPDFGenerator order={order} userName={userName} userRole={userRole} />
//             </div>
//           </div>
//         )}

//         {/* Agreement Section */}
//         {order.status === "completed" && order.Agreement === "waiting_for_approval" && (
//           <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
//             <AgreementComponent
//               orderId={order._id}
//               onAcceptSuccess={handleAcceptSuccess}
//               onRejectSuccess={handleRejectSuccess}
//               role={userRole}
//             />
//           </div>
//         )}

//         {/* Sample Proof Sections */}
//         {order.sampleProof && (
//           <ImageCard
//             title="Sample Proof"
//             imageUrl={order.sampleProof}
//             description={order.sampleDescription}
//           />
//         )}

//         {order.sampleRecievedProof && (
//           <ImageCard
//             title="Sample Received Proof"
//             imageUrl={order.sampleRecievedProof}
//           />
//         )}

//         {/* Sample Approval */}
//         {order.sampleStatus === "received" && (
//           <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
//             <SampleApproval
//               orderId={order._id}
//               onApproveSuccess={handleApproveSuccess}
//             />
//           </div>
//         )}

//         {/* Sample Receipt Form */}
//         {order.sampleStatus === "sent" && (
//           <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold text-neutral-800">Sample Receipt</h2>
//               <button
//                 className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition"
//                 onClick={() => setShowForm(!showForm)}
//               >
//                 {showForm ? "Cancel" : "Enter Details"}
//               </button>
//             </div>

//             {showForm && (
//               <form onSubmit={handleImageSample} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-neutral-700 mb-1">Sample Image</label>
//                   <input
//                     type="file"
//                     className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                     accept="image/jpeg, image/png"
//                     onChange={(e) => setSampleRecievedImage(e.target.files[0])}
//                     required
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-primary-300 transition"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? "Submitting..." : "Submit Sample"}
//                 </button>
//               </form>
//             )}
//           </div>
//         )}

//         {/* Payment Sections */}
//         {(order.sampleStatus === "waiting_for_payment" && order.paymentStatus === "pending") && (
//           <div className="space-y-6">
//             <PaymentSection
//               title="Card Payment"
//               isOpen={showPaymentPopup}
//               onToggle={() => {
//                 setShowPaymentPopup(!showPaymentPopup);
//                 if (showPaymentPopup) setActivePaymentOrder(null);
//               }}
//             >
//               {showPaymentPopup && (
//                 <PaymentPage
//                   orderId={order._id}
//                   tokenAmount={order.price}
//                   onPaymentSuccess={() => {
//                     setActivePaymentOrder(null);
//                     fetchOrderDetails();
//                   }}
//                 />
//               )}
//             </PaymentSection>

//             <PaymentSection
//               title="Mobile Payment"
//               isOpen={showLocalPaymentPopup}
//               onToggle={() => {
//                 setShowLocalPaymentPopup(!showLocalPaymentPopup);
//                 if (showLocalPaymentPopup) setLocalActivePaymentOrder(null);
//               }}
//             >
//               {showLocalPaymentPopup && (
//                 <LocalPaymentForm
//                   orderId={order._id}
//                   onPaymentSuccess={() => {
//                     setLocalActivePaymentOrder(null);
//                     fetchOrderDetails();
//                   }}
//                 />
//               )}
//             </PaymentSection>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // Reusable Components
// const DetailItem = ({ label, value, badge = false }) => (
//   <div>
//     <span className="text-sm font-medium text-neutral-500">{label}: </span>
//     {badge ? (
//       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
//         {value}
//       </span>
//     ) : (
//       <span className="text-neutral-900">{value || 'N/A'}</span>
//     )}
//   </div>
// );

// const StatusCard = ({ title, value, variant = "neutral" }) => {
//   const variantClasses = {
//     success: "bg-success-50 text-success-800",
//     warning: "bg-warning-50 text-warning-800",
//     neutral: "bg-neutral-50 text-neutral-800"
//   };

//   return (
//     <div className={`${variantClasses[variant]} p-4 rounded-lg shadow-xs`}>
//       <h3 className="text-sm font-medium">{title}</h3>
//       <p className="text-lg font-semibold mt-1 capitalize">
//         {value?.replace(/_/g, ' ') || 'N/A'}
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
//         className="w-full h-auto rounded-lg border border-neutral-200"
//       />
//       {description && (
//         <div className="mt-4 p-3 bg-neutral-50 rounded-lg">
//           <p className="text-neutral-700">{description}</p>
//         </div>
//       )}
//     </div>
//   </div>
// );

// const PaymentSection = ({ title, isOpen, onToggle, children }) => (
//   <div className="bg-white rounded-xl shadow-xs border border-neutral-200 overflow-hidden">
//     <button
//       className="w-full p-4 flex justify-between items-center hover:bg-neutral-50 transition"
//       onClick={onToggle}
//     >
//       <h2 className="text-lg font-medium text-neutral-800">{title}</h2>
//       <svg
//         className={`w-5 h-5 text-neutral-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//       >
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//       </svg>
//     </button>
//     {isOpen && <div className="p-4 border-t border-neutral-200">{children}</div>}
//   </div>
// );

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import PaymentPage from "../../../pages/payments/PaymentPage";
// import SampleApproval from "../components/SampleApproval";
// import PDFGenerator from "../components/PDFGenerator";
// import { useSelector } from "react-redux";
// import AgreementComponent from "../components/AgreementComponent";
// import AgreementPDFGenerator from "../components/AgreementPDFGenerator";
// import LocalPaymentForm from "../components/payment/LocalPaymentForm";
// import WriteReview from "../../reviews/WriteReviews"

// const ExporterOrderDetails = () => {
//   const { orderId } = useParams();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const [activePaymentOrder, setActivePaymentOrder] = useState(null);
//   const [activeLocalPaymentOrder, setLocalActivePaymentOrder] = useState(null);
//   const [sampleRecievedImage, setSampleRecievedImage] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [description, setDescription] = useState("");
//   const [showPaymentPopup, setShowPaymentPopup] = useState(false);
//   const [showLocalPaymentPopup, setShowLocalPaymentPopup] = useState(false);

//   const user = useSelector((state) => state.user);
//   const userName = user?.name;
//   const userRole = user?.role;

//   const fetchOrderDetails = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get(/api/order/orders/exporter/${orderId}, {
//         headers: { Authorization: Bearer ${token} },
//       });
//       setOrder(res.data.order);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Failed to fetch order details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrderDetails();
//   }, [orderId]);

//   const handleImageSample = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const token = localStorage.getItem("token");
//       const formData = new FormData();
//       formData.append("orderId", orderId);
//       formData.append("sampleImage", sampleRecievedImage);
//       if (description) formData.append("description", description);

//       const response = await axios.post(
//         "/api/order/orders/confirm-sample-receipt",
//         formData,
//         {
//           headers: {
//             Authorization: Bearer ${token},
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setOrder(response.data.order);
//       setMessage("Sample received successfully!");
//       setShowForm(false);
//       setDescription("");
//       setSampleRecievedImage(null);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to send sample.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleApproveSuccess = () => fetchOrderDetails();
//   const handleAcceptSuccess = () => fetchOrderDetails();
//   const handleRejectSuccess = () => fetchOrderDetails();
//   const handleLocalPaymentSuccess = () => fetchOrderDetails();

//   const togglePaymentPopup = () => {
//     setShowPaymentPopup(!showPaymentPopup);
//     if (showPaymentPopup) setActivePaymentOrder(null);
//   };

//   const toggleLocalPaymentPopup = () => {
//     setShowLocalPaymentPopup(!showLocalPaymentPopup);
//     if (showLocalPaymentPopup) setLocalActivePaymentOrder(null);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="text-center py-8 text-neutral-600">
//         Order not found
//       </div>
//     );
//   }

//   return (
//     <div className="bg-neutral-50 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto space-y-6">
//         {/* Header Section */}
//         <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
//           <h1 className="text-2xl font-bold text-neutral-800 mb-2">Order Details</h1>
//           <p className="text-neutral-600">Order ID: {orderId}</p>
//         </div>

//         {/* Order Summary */}
//         <div className="bg-white rounded-xl shadow-xs border border-neutral-200 overflow-hidden">
//           <div className="p-6 border-b border-neutral-200">
//             <h2 className="text-xl font-semibold text-neutral-800">Order Summary</h2>
//           </div>
//           <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* <div className="space-y-2">
//               <DetailItem label="Auction" value={order.auctionId?.title} />
//               <DetailItem label="Product" value={order.productId?.name} />
//               <DetailItem label="Supplier" value={order.supplierId?.name} />
//               <DetailItem label="Exporter" value={userName} />
//             </div> */}
//             <div className="space-y-2">
//   {order.auctionId ? (
//     <DetailItem label="Auction" value={order.auctionId?.title} />
//   ) : (
//     <DetailItem label="Product" value={order.productId?.name} />
//   )}
//   <DetailItem label="Supplier" value={order.supplierId?.name} />
//   <DetailItem label="Exporter" value={userName} />
// </div>
//             <div className="space-y-2">
//               <DetailItem label="Quantity" value={order.quantity} />
//               <DetailItem label="Price" value={Rs ${order.price}} />
//               <DetailItem label="Status" value={order.status} badge />
//               <DetailItem label="Order Date" value={new Date(order.createdAt).toLocaleString()} />
//             </div>
//           </div>
//         </div>

//         {/* Status Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <StatusCard
//             title="Sample Status"
//             value={order.sampleStatus}
//             variant={order.sampleStatus === "approved" ? "success" : "warning"}
//           />
//           <StatusCard
//             title="Payment Status"
//             value={order.paymentStatus}
//             variant={order.paymentStatus === "completed" ? "success" : "warning"}
//           />
//           <StatusCard
//             title="Agreement"
//             value={order.Agreement}
//             variant={order.Agreement === "Accepted" ? "success" : "warning"}
//           />
//         </div>

//         {/* Documents Section */}
//         {order.status === "completed" && (
//           <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
//             <h2 className="text-xl font-semibold text-neutral-800 mb-4">Documents</h2>
//             <div className="flex flex-wrap gap-4">
//               <PDFGenerator order={order} userName={userName} userRole={userRole} />
//               <AgreementPDFGenerator order={order} userName={userName} userRole={userRole} />
//             </div>
//           </div>
//         )}

//         {/* Agreement Section */}
//         {order.status === "completed" && order.Agreement === "waiting_for_approval" && (
//           <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
//             <AgreementComponent
//               orderId={order._id}
//               onAcceptSuccess={handleAcceptSuccess}
//               onRejectSuccess={handleRejectSuccess}
//               role={userRole}
//             />
//           </div>
//         )}

//         {/* Sample Proof Sections */}
//         {order.sampleProof && (
//           <ImageCard
//             title="Sample Proof"
//             imageUrl={order.sampleProof}
//             description={order.sampleDescription}
//           />
//         )}

//         {order.sampleRecievedProof && (
//           <ImageCard
//             title="Sample Received Proof"
//             imageUrl={order.sampleRecievedProof}
//           />
//         )}

//         {/* Sample Approval */}
//         {order.sampleStatus === "received" && (
//           <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
//             <SampleApproval
//               orderId={order._id}
//               onApproveSuccess={handleApproveSuccess}
//             />
//           </div>
//         )}

//         {/* Sample Receipt Form */}
//         {order.sampleStatus === "sent" && (
//           <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold text-neutral-800">Sample Receipt</h2>
//               <button
//                 className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition"
//                 onClick={() => setShowForm(!showForm)}
//               >
//                 {showForm ? "Cancel" : "Enter Details"}
//               </button>
//             </div>

//             {showForm && (
//               <form onSubmit={handleImageSample} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-neutral-700 mb-1">Sample Image</label>
//                   <input
//                     type="file"
//                     className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                     accept="image/jpeg, image/png"
//                     onChange={(e) => setSampleRecievedImage(e.target.files[0])}
//                     required
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-primary-300 transition"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? "Submitting..." : "Submit Sample"}
//                 </button>
//               </form>
//             )}
//           </div>
//         )}

//         {/* Write Review Section (only show when agreement is "Accepted") */}
//         {order.Agreement === "Accepted" && (
//           <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
//             <h2 className="text-xl font-semibold text-neutral-800 mb-4">Write a Review</h2>
//             <WriteReview supplierId={order.supplierId?._id} productName={order.productId?.name} /> {/* Pass productName to WriteReview */}
//           </div>
//         )}

//         {/* Payment Sections */}
//         {(order.sampleStatus === "waiting_for_payment" && order.paymentStatus === "pending") && (
//           <div className="space-y-6">
//             <PaymentSection
//               title="Card Payment"
//               isOpen={showPaymentPopup}
//               onToggle={togglePaymentPopup}
//             >
//               {showPaymentPopup && (
//                 <PaymentPage
//                   orderId={order._id}
//                   tokenAmount={order.price}
//                   onPaymentSuccess={() => {
//                     setActivePaymentOrder(null);
//                     fetchOrderDetails();
//                   }}
//                 />
//               )}
//             </PaymentSection>

//             <PaymentSection
//               title="Mobile Payment"
//               isOpen={showLocalPaymentPopup}
//               onToggle={toggleLocalPaymentPopup}
//             >
//               {showLocalPaymentPopup && (
//                 <LocalPaymentForm
//                   orderId={order._id}
//                   orderPrice={order.price}
//                   onPaymentSuccess={handleLocalPaymentSuccess}
//                 />
//               )}
//             </PaymentSection>
//           </div>
//         )}

//         {/* Message Display */}
//         {message && (
//           <div className={p-4 rounded-lg ${
//             message.includes("success") ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"
//           }}>
//             {message}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Reusable Components
// const DetailItem = ({ label, value, badge = false }) => (
//   <div>
//     <span className="text-sm font-medium text-neutral-500">{label}: </span>
//     {badge ? (
//       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
//         {value}
//       </span>
//     ) : (
//       <span className="text-neutral-900">{value || 'N/A'}</span>
//     )}
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
//     <div className={${variantClasses[variant]} p-4 rounded-lg shadow-xs}>
//       <h3 className="text-sm font-medium">{title}</h3>
//       <p className="text-lg font-semibold mt-1 capitalize">{value?.replace(/_/g, ' ') || 'N/A'}</p>
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
//         className="w-full h-auto rounded-lg border border-neutral-200"
//       />
//       {description && (
//         <div className="mt-4 p-3 bg-neutral-50 rounded-lg">
//           <p className="text-neutral-700">{description}</p>
//         </div>
//       )}
//     </div>
//   </div>
// );

// const PaymentSection = ({ title, isOpen, onToggle, children }) => (
//   <div className="bg-white rounded-xl shadow-xs border border-neutral-200 overflow-hidden">
//     <button
//       className="w-full p-4 flex justify-between items-center hover:bg-neutral-50 transition"
//       onClick={onToggle}
//     >
//       <h2 className="text-lg font-medium text-neutral-800">{title}</h2>
//       <svg
//         className={w-5 h-5 text-neutral-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}}
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//       >
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//       </svg>
//     </button>
//     {isOpen && <div className="p-4 border-t border-neutral-200">{children}</div>}
//   </div>
// );

// export default ExporterOrderDetails;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import PaymentPage from "../../../pages/payments/PaymentPage";
import SampleApproval from "../components/SampleApproval";
import PDFGenerator from "../components/PDFGenerator";
import { useSelector } from "react-redux";
import AgreementComponent from "../components/AgreementComponent";
import AgreementPDFGenerator from "../components/AgreementPDFGenerator";
import LocalPaymentForm from "../components/payment/LocalPaymentForm";
import WriteReview from "../../reviews/WriteReviews";
import { OrderReceived } from "../supplier/order/OrderRecieved";
import DateDisplay from "../../DateDisplay";
const ExporterOrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [activePaymentOrder, setActivePaymentOrder] = useState(null);
  const [activeLocalPaymentOrder, setLocalActivePaymentOrder] = useState(null);
  const [sampleRecievedImage, setSampleRecievedImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [description, setDescription] = useState("");
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [showLocalPaymentPopup, setShowLocalPaymentPopup] = useState(false);

  const [isImageVisible, setIsImageVisible] = useState(false);

  const user = useSelector((state) => state.user);
  const userName = user?.name;
  const userID = user?.id;
  const userRole = user?.role;
  const userSubscription = user?.subscription.plan;

  const fetchOrderDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/api/order/orders/exporter/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrder(res.data.order);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to fetch order details."
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

  const handleImageSample = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("orderId", orderId);
      formData.append("sampleImage", sampleRecievedImage);
      if (description) formData.append("description", description);

      const response = await axios.post(
        "/api/order/orders/confirm-sample-receipt",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setOrder(response.data.order);
      setMessage("Sample received successfully!");
      setShowForm(false);
      setDescription("");
      setSampleRecievedImage(null);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send sample.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApproveSuccess = () => fetchOrderDetails();
  const handleAcceptSuccess = () => fetchOrderDetails();
  const handleRejectSuccess = () => fetchOrderDetails();
  const handleLocalPaymentSuccess = () => fetchOrderDetails();

  const togglePaymentPopup = () => {
    setShowPaymentPopup(!showPaymentPopup);
    if (showPaymentPopup) setActivePaymentOrder(null);
  };

  const toggleLocalPaymentPopup = () => {
    setShowLocalPaymentPopup(!showLocalPaymentPopup);
    if (showLocalPaymentPopup) setLocalActivePaymentOrder(null);
  };
  const handleOrderRecievedSuccess = () => {
    // Callback function when the order is sent successfully
    setMessage("Order has been successfully marked as shipped.");
    fetchOrderDetails(); // Refresh order details after success
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-8 text-neutral-600">Order not found</div>
    );
  }
  const hasReviewed =
    order.reviews?.some((review) => review.user._id === user._id) || false;

  return (
    <div className="bg-neutral-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
          <h1 className="text-2xl font-bold text-neutral-800 mb-2">
            Order Details
          </h1>
          {/* <p className="text-neutral-600">Order ID: {orderId}</p> */}
          {order.orderId && (
            <p className="text-neutral-600">Order ID: {order.orderId}</p>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-xs border border-neutral-200 overflow-hidden">
          <div className="p-6 border-b border-neutral-200">
            <h2 className="text-xl font-semibold text-neutral-800">
              Order Summary
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* <div className="space-y-2">
              <DetailItem label="Auction" value={order.auctionId?.title} />
              <DetailItem label="Product" value={order.productId?.name} />
              <DetailItem label="Supplier" value={order.supplierId?.name} />
              <DetailItem label="Exporter" value={userName} />
            </div> */}
            <div className="space-y-2">
              {order.auctionId ? (
                <DetailItem label="Auction" value={order.auctionId?.title} />
              ) : (
                <DetailItem label="Product" value={order.productId?.name} />
              )}
              <DetailItem label="Supplier" value={order.supplierId?.name} />
              <DetailItem label="Exporter" value={userName} />
              {/* <DetailItem label="Day to Deliever" value={} /> */}
              {/* {order?.deliveryDays ? (
  <DetailItem label="Days to deliver" value={order.deliveryDays} />
) : null} */}
              {order?.deliveryDays ? (
                <DateDisplay date={order.deliveryDays} />
              ) : (
                <span>No delivery date set</span>
              )}
            </div>
            <div className="space-y-2">
              <DetailItem label="Quantity" value={order.quantity} />
              <DetailItem label="Price" value={`Rs ${order.price}`} />

              <DetailItem label="Status" value={order.status} badge />
              <DetailItem
                label="Order Date"
                value={new Date(order.createdAt).toLocaleString()}
              />
            </div>
          </div>
        </div>
        {/* <div>Hello world</div> */}
        {userRole === "exporter" && (
          <Link
            to={`/chat?supplierId=${order.supplierId?._id}`}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
            Chat with Supplier
          </Link>
        )}
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatusCard
            title="Sample Status"
            value={order.sampleStatus}
            variant={order.sampleStatus === "approved" ? "success" : "warning"}
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
            variant={order.Agreement === "Accepted" ? "success" : "warning"}
          />
        </div>

        {/* Documents Section */}
        {order.status === "completed" && (
          <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">
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
          order.Agreement === "waiting_for_approval" && (
            <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
              <AgreementComponent
                orderId={order._id}
                onAcceptSuccess={handleAcceptSuccess}
                onRejectSuccess={handleRejectSuccess}
                role={userRole}
              />
            </div>
          )}

        {/* Sample Proof Sections */}
        {/* {order.sampleProof && (
          <ImageCard 
            title="Sample Proof" 
            imageUrl={order.sampleProof} 
            description={order.sampleDescription}
          />
        )} */}

        {order.sampleProof && (
          <div>
            {/* <button onClick={toggleImageVisibility}>
              {isImageVisible ? "Hide Sample Image" : "Show Sample Image"}
            </button> */}
            {/* <button className="toggle-button" onClick={toggleImageVisibility}>
              {isImageVisible ? "Hide Sample Image" : "Show Sample Image"}
            </button> */}
            <button
              onClick={toggleImageVisibility}
              className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 border-2 border-blue-500 rounded-lg transition-all duration-300 hover:bg-blue-700 hover:border-blue-700 hover:transform hover:translate-y-1 active:bg-blue-800 focus:outline-none"
            >
              {isImageVisible ? "Hide Sample Image" : "Show Sample Image"}
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

        {/* {order.sampleRecievedProof && (
          <ImageCard 
            title="Sample Received Proof" 
            imageUrl={order.sampleRecievedProof}
          />
        )}
        
        */}

        {order.sampleRecievedProof && (
          <div>
            {/* <button onClick={toggleImageVisibility}>
              {isImageVisible ? "Hide Sample Image" : "Show Sample Image"}
            </button> */}

            {isImageVisible && (
              <ImageCard
                title="Sample Received Proof"
                imageUrl={order.sampleRecievedProof}
                description={order.sampleDescription}
              />
            )}
          </div>
        )}

        {/* Sample Approval */}
        {order.sampleStatus === "received" && (
          <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
            <SampleApproval
              orderId={order._id}
              onApproveSuccess={handleApproveSuccess}
            />
          </div>
        )}

        {/* Sample Receipt Form */}
        {order.sampleStatus === "sent" && (
          <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-neutral-800">
                Sample Receipt
              </h2>
              <button
                className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition"
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? "Cancel" : "Enter Details"}
              </button>
            </div>

            {showForm && (
              <form onSubmit={handleImageSample} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Sample Image
                  </label>
                  <input
                    type="file"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    accept="image/jpeg, image/png"
                    onChange={(e) => setSampleRecievedImage(e.target.files[0])}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-primary-300 transition"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Sample"}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Write Review Section (only show when agreement is "Accepted") */}

        {/* {order.Agreement === "Accepted" && order.status === "order_shipped" && (
          <OrderReceived
            orderId={order._id}
            onSuccess={handleOrderRecievedSuccess}
          />
        )} */}
        {order.Agreement === "Accepted" && order.status === "order_shipped" && (
          <>
            {order.trackingId && <div>Tracking ID: {order.trackingId}</div>}{" "}
            {/* Conditionally render if trackingId exists */}
            <OrderReceived
              orderId={order._id}
              onSuccess={handleOrderRecievedSuccess}
            />
          </>
        )}

        {/* Write Review Section */}
        {order.Agreement === "Accepted" && !hasReviewed && (
          <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">
              Write a Review
            </h2>
            <p>Supplier ID : {order.supplierId?._id} </p>
            <p>UserID : {userID} </p>
            <WriteReview
              supplierId={order.supplierId?._id}
              productName={order.productId?.name}
              reviewerRole={userRole} // pass the userRole (exporter/supplier)
              orderId={order._id} // pass the orderId to associate the review
            />
          </div>
        )}

        {/* Payment Sections */}
        {order.sampleStatus === "waiting_for_payment" &&
          order.paymentStatus === "pending" && (
            <div className="space-y-6">
              <PaymentSection
                title="Card Payment"
                isOpen={showPaymentPopup}
                onToggle={togglePaymentPopup}
              >
                {showPaymentPopup && (
                  <PaymentPage
                    orderId={order._id}
                    // tokenAmount={order.price + (order.price*0.2)}
                    tokenAmount={
                      userSubscription === "free"
                        ? order.price + order.price * 0.2
                        : order.price
                    }
                    onPaymentSuccess={() => {
                      setActivePaymentOrder(null);
                      fetchOrderDetails();
                    }}
                  />
                )}
              </PaymentSection>

              <PaymentSection
                title="Mobile Payment"
                isOpen={showLocalPaymentPopup}
                onToggle={toggleLocalPaymentPopup}
              >
                {showLocalPaymentPopup && (
                  <LocalPaymentForm
                    orderId={order._id}
                    // orderPrice={order.price}
                    orderPrice={
                      userSubscription === "free"
                        ? order.price + order.price * 0.2
                        : order.price
                    }
                    onPaymentSuccess={handleLocalPaymentSuccess}
                  />
                )}
              </PaymentSection>
            </div>
          )}

        {/* Message Display */}
        {message && (
          <div
            className={`p-4 rounded-lg ${
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
const DetailItem = ({ label, value, badge = false }) => (
  <div>
    <span className="text-sm font-medium text-neutral-500">{label}: </span>
    {badge ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
        {value}
      </span>
    ) : (
      <span className="text-neutral-900">{value || "N/A"}</span>
    )}
  </div>
);

const StatusCard = ({ title, value, variant = "neutral" }) => {
  const variantClasses = {
    success: "bg-success-50 text-success-800",
    warning: "bg-warning-50 text-warning-800",
    error: "bg-error-50 text-error-800",
    neutral: "bg-neutral-50 text-neutral-800",
  };

  return (
    <div className={`${variantClasses[variant]} p-4 rounded-lg shadow-xs`}>
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-lg font-semibold mt-1 capitalize">
        {value?.replace(/_/g, " ") || "N/A"}
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
        className="w-full h-auto rounded-lg border border-neutral-200"
      />
      {description && (
        <div className="mt-4 p-3 bg-neutral-50 rounded-lg">
          <p className="text-neutral-700">{description}</p>
        </div>
      )}
    </div>
  </div>
);

const PaymentSection = ({ title, isOpen, onToggle, children }) => (
  <div className="bg-white rounded-xl shadow-xs border border-neutral-200 overflow-hidden">
    <button
      className="w-full p-4 flex justify-between items-center hover:bg-neutral-50 transition"
      onClick={onToggle}
    >
      <h2 className="text-lg font-medium text-neutral-800">{title}</h2>
      <svg
        className={`w-5 h-5 text-neutral-500 transform transition-transform ${
          isOpen ? "rotate-180" : ""
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
    {isOpen && (
      <div className="p-4 border-t border-neutral-200">{children}</div>
    )}
  </div>
);

export default ExporterOrderDetails;
