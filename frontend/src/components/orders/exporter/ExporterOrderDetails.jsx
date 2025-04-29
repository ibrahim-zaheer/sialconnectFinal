




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
//   const { orderId } = useParams(); // get orderId from URL
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const [activePaymentOrder, setActivePaymentOrder] = useState(null);
//   const [activeLocalPaymentOrder, setLocalActivePaymentOrder] = useState(null);
 
//     const [sampleRecievedImage, setSampleRecievedImage] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [description, setDescription] = useState(""); // Added missing state
//   const [showPaymentForm, setShowPaymentForm] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [showPaymentPopup, setShowPaymentPopup] = useState(false);
//   const [showLocalPaymentPopup, setShowLocalPaymentPopup] = useState(false);

//     const user = useSelector((state) => state.user);
//     const userName = user?.name;
//     const userRole = user?.role;

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
//       setMessage("Sample Recieved successfully!");
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

//   const handleLocalPaymentSuccess = ()=>{
//     fetchOrderDetails();
//   };

//   const handleApproveSuccess = () => {
//     fetchOrderDetails(); // Re-fetch order details after sample is approved
//   };
//   const handleAcceptSuccess = () => {
//     fetchOrderDetails(); // Re-fetch order details after agreement is accepted
//   };

//   const handleRejectSuccess = () => {
//     fetchOrderDetails(); // Re-fetch order details after agreement is rejected
//   };

//     const handlePaymentButtonClick = () => {
//     // Toggle the payment form visibility for the card payment method
//     setShowPaymentPopup(!showPaymentPopup);
//     if (showPaymentPopup) {
//       setActivePaymentOrder(null); // Close the payment form if already open
//     }
//   };

//   const handleLocalPaymentButtonClick = () => {
//     setShowLocalPaymentPopup(!showLocalPaymentPopup);
//     if (showLocalPaymentPopup) {
//       setLocalActivePaymentOrder(null); // Close the payment form if already open
//     }
//   };

//   if (loading)
//     return <p className="text-center mt-8">Loading order details...</p>;
//   if (message)
//     return <p className="text-center text-red-500 mt-8">{message}</p>;
//   if (!order) return null;

//   return (
//     <div className="container mx-auto p-8 space-y-6 bg-gradient-to-r from-blue-100 to-blue-300 shadow-lg rounded-xl">
//       <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//         Order Details
//       </h2>

//       {/* Order Information Card */}
//       <div className="card bg-white p-6 rounded-lg shadow-xl">
//         <h3 className="text-2xl font-semibold text-gray-700 mb-4">
//           Order Overview
//         </h3>
//            {/* PDF Generation Button */}
//      {/* PDF Generation Button */}
//      {order.status === "completed" && (
//         <div className="mt-6">
//           <PDFGenerator order={order} userName={userName} userRole={userRole}/>
//           <AgreementPDFGenerator order={order} userName={userName} userRole={userRole} />
//         </div>
//       )}
//        {/* Agreement Component for Completed Orders */}
//        {order.status === "completed" && order.Agreement =="waiting_for_approval" && (
//           <div className="mt-6">
//             <AgreementComponent
//               orderId={order._id}
//               onAcceptSuccess={handleAcceptSuccess}
//               onRejectSuccess={handleRejectSuccess}
//               role={userRole}
//             />
                

//           </div>
//         )}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//           <div className="font-semibold text-gray-600">
//             <strong>Auction:</strong> {order.auctionId?.title}
//           </div>
//           <div className="font-semibold text-gray-600">
//             <strong>Product:</strong> {order.productId?.name}
//           </div>
//           <div className="font-semibold text-gray-600">
//             <strong>Supplier:</strong> {order.supplierId?.name}
//           </div>
//           <div className="font-semibold text-gray-600">
//             <strong>Exporter:</strong> {userName}
//           </div>
//           <div className="font-semibold text-gray-600">
//             <strong>Email:</strong> {order.supplierId?.email}
//           </div>
//           <div className="font-semibold text-gray-600">
//             <strong>Quantity:</strong> {order.quantity}
//           </div>
//           <div className="font-semibold text-gray-600">
//             <strong>Price:</strong> Rs {order.price}
//           </div>
//           <div className="font-semibold text-gray-600">
//             <strong>Status:</strong> {order.status}
//           </div>
//           <div className="font-semibold text-gray-600">
//             <strong>Sample Status:</strong> {order.sampleStatus}
//           </div>
//           <div className="font-semibold text-gray-600">
//             <strong>Payment Status:</strong> {order.paymentStatus}
//           </div>
//           <div className="font-semibold text-gray-600">
//             <strong>Agreement:</strong> {order.Agreement}
//           </div>
//           <div className="font-semibold text-gray-600">
//             <strong>Ordered On:</strong>{" "}
//             {new Date(order.createdAt).toLocaleString()}
//           </div>
//         </div>
//       </div>

//       {/* Display Token Payment Paid message when payment is done */}
//       {order.sampleStatus === "waiting_for_sample" && (
//         <div className="alert alert-success mt-4">
//           <span>Token Payment Paid</span>
//         </div>
//       )}
//        {order.sampleStatus !== "waiting_for_payment" && (
//         <div className="card bg-white p-6 rounded-lg shadow-md mt-6">
//           Token Payment Sent
//         </div>
//       )}

//       {/* Sample Proof */}
//       {order.sampleProof && (
//         <div className="card bg-white p-6 rounded-lg shadow-md mt-6">
//           <h3 className="text-lg font-semibold mb-2 text-gray-700">
//             Sample Proof
//           </h3>
//           <img
//             src={order.sampleProof}
//             alt="Sample proof"
//             className="max-w-full h-auto rounded-xl shadow-md"
//           />
//           {order.sampleDescription && (
//             <p className="mt-2 text-gray-600">
//               <strong>Description:</strong> {order.sampleDescription}
//             </p>
//           )}
//         </div>
//       )}

//        {/* Sample Recieved Proof */}
//        {order.sampleRecievedProof && (
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
//          {order.sampleStatus === "received" && (
//        <div className="mt-6 p-6 bg-gray-50 border border-gray-300 rounded-lg">
//        <SampleApproval orderId={order._id} onApproveSuccess={handleApproveSuccess} />
//      </div>
//       )}

      
// {order.sampleStatus === "sent" && (
//         <div className="mt-6 p-6 bg-gray-50 border border-gray-300 rounded-lg">
//           <h3 className="text-xl font-semibold mb-4">Sample Received</h3>
//           <button
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//             onClick={() => setShowForm(!showForm)}
//           >
//             {showForm ? "Cancel" : "Enter Sample Details"}
//           </button>

//           {showForm && (
//             <form onSubmit={handleImageSample} className="mt-6 space-y-4">
//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-2">Sample Image</label>
//                 <input
//                   type="file"
//                   className="w-full px-4 py-2 border rounded-lg"
//                   accept="image/jpeg, image/png"
//                   onChange={(e) => setSampleRecievedImage(e.target.files[0])}
//                   required
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Upload a clear image of the sample (JPEG or PNG)
//                 </p>
//               </div>

//               <button
//                 type="submit"
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? "Sending..." : "Send Sample"}
//               </button>
//             </form>
//           )}
//         </div>
//       )}
      

//       {/* Payment Button Display */}
//       {(order.sampleStatus === "waiting_for_payment" && order.paymentStatus === "pending" ) && (
//         <div className="card bg-white p-6 rounded-lg shadow-md mt-6">
//           <button
//             className="btn btn-primary w-full mt-4"
//             onClick={() => {setActivePaymentOrder(order._id);
//             handlePaymentButtonClick()}
//             }
           
//           >
//                     {showPaymentPopup ? "Cancel" : "Send Token Payment with Card"}
//           </button>
        

//           {/* Render Payment Page when user clicks the button */}
//           {activePaymentOrder === order._id && (
//             <div className="mt-4">
//               <PaymentPage
//                 orderId={order._id}
//                 tokenAmount={order.price}
//                 onPaymentSuccess={() => {
//                   setActivePaymentOrder(null); // Hide the payment form after success
//                   fetchOrderDetails(); // Re-fetch order details after payment success
//                 }}
//               />
              
//             </div>
//           )}
           
          
//         </div>
//       )}
// {(order.paymentStatus === "pending" && order.sampleStatus === "waiting_for_payment" ) && (
//         <div className="card bg-white p-6 rounded-lg shadow-md mt-6">
          
//           <button
//             className="btn btn-primary w-full mt-4"
//           //   onClick={() => setLocalActivePaymentOrder(order._id)}
//           // >
//           //   Send Token Payment with mobile wallet
//           onClick={() => {setLocalActivePaymentOrder(order._id);
//             handleLocalPaymentButtonClick()}
//             }>
//               {showLocalPaymentPopup ? "Cancel" : "Send Token Payment with Mobile"}
//           </button>

          
//             {/* {activeLocalPaymentOrder === order._id && (
//             <div className="mt-4">
//               <LocalPaymentForm
//                 orderId={order._id}
//                onPaymentSuccess={handleLocalPaymentSuccess} 
               
//               />
              
//             </div> */}
//              {showLocalPaymentPopup && activeLocalPaymentOrder === order._id && (
//             <div className="mt-4">
//               <LocalPaymentForm
//                 orderId={order._id}
//                 onPaymentSuccess={() => {
//                   setLocalActivePaymentOrder(null); // Hide the local payment form after success
//                   fetchOrderDetails(); // Re-fetch order details after payment success
//                 }}
//               />
//             </div>
//           )}
//         </div>
//       )}

     
//     </div>
//   );}

// ExporterOrderDetails.jsx
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

//   // ... (keep all existing handler functions unchanged)

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
//           <div className="space-y-2">
//   {order.auctionId && <DetailItem label="Auction" value={order.auctionId.title} />}
//   {order.productId && <DetailItem label="Product" value={order.productId.name} />}
//   <DetailItem label="Supplier" value={order.supplierId?.name} />
//   <DetailItem label="Exporter" value={userName} />
// </div>
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
//       <span className="text-neutral-900">{value}</span>
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
//       <p className="text-lg font-semibold mt-1 capitalize">{value?.replace(/_/g, ' ')}</p>
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
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PaymentPage from "../../../pages/payments/PaymentPage";
import SampleApproval from "../components/SampleApproval";
import PDFGenerator from "../components/PDFGenerator";
import { useSelector } from "react-redux";
import AgreementComponent from "../components/AgreementComponent";
import AgreementPDFGenerator from "../components/AgreementPDFGenerator";
import LocalPaymentForm from "../components/payment/LocalPaymentForm";

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

  const user = useSelector((state) => state.user);
  const userName = user?.name;
  const userRole = user?.role;

  const fetchOrderDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/api/order/orders/exporter/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrder(res.data.order);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to fetch order details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-8 text-neutral-600">
        Order not found
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
          <h1 className="text-2xl font-bold text-neutral-800 mb-2">Order Details</h1>
          <p className="text-neutral-600">Order ID: {orderId}</p>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-xs border border-neutral-200 overflow-hidden">
          <div className="p-6 border-b border-neutral-200">
            <h2 className="text-xl font-semibold text-neutral-800">Order Summary</h2>
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
</div>
            <div className="space-y-2">
              <DetailItem label="Quantity" value={order.quantity} />
              <DetailItem label="Price" value={`Rs ${order.price}`} />
              <DetailItem label="Status" value={order.status} badge />
              <DetailItem label="Order Date" value={new Date(order.createdAt).toLocaleString()} />
            </div>
          </div>
        </div>

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
            variant={order.paymentStatus === "completed" ? "success" : "warning"}
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
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Documents</h2>
            <div className="flex flex-wrap gap-4">
              <PDFGenerator order={order} userName={userName} userRole={userRole} />
              <AgreementPDFGenerator order={order} userName={userName} userRole={userRole} />
            </div>
          </div>
        )}

        {/* Agreement Section */}
        {order.status === "completed" && order.Agreement === "waiting_for_approval" && (
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
        {order.sampleProof && (
          <ImageCard 
            title="Sample Proof" 
            imageUrl={order.sampleProof} 
            description={order.sampleDescription}
          />
        )}

        {order.sampleRecievedProof && (
          <ImageCard 
            title="Sample Received Proof" 
            imageUrl={order.sampleRecievedProof}
          />
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
              <h2 className="text-xl font-semibold text-neutral-800">Sample Receipt</h2>
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
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Sample Image</label>
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

        {/* Payment Sections */}
        {(order.sampleStatus === "waiting_for_payment" && order.paymentStatus === "pending") && (
          <div className="space-y-6">
            <PaymentSection
              title="Card Payment"
              isOpen={showPaymentPopup}
              onToggle={togglePaymentPopup}
            >
              {showPaymentPopup && (
                <PaymentPage
                  orderId={order._id}
                  tokenAmount={order.price}
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
                  orderPrice={order.price} 
                  onPaymentSuccess={handleLocalPaymentSuccess}
                />
              )}
            </PaymentSection>
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
const DetailItem = ({ label, value, badge = false }) => (
  <div>
    <span className="text-sm font-medium text-neutral-500">{label}: </span>
    {badge ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
        {value}
      </span>
    ) : (
      <span className="text-neutral-900">{value || 'N/A'}</span>
    )}
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
      <p className="text-lg font-semibold mt-1 capitalize">{value?.replace(/_/g, ' ') || 'N/A'}</p>
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
        className={`w-5 h-5 text-neutral-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    {isOpen && <div className="p-4 border-t border-neutral-200">{children}</div>}
  </div>
);

export default ExporterOrderDetails;