


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import PaymentPage from "../../../pages/payments/PaymentPage";

// export default function ExporterOrderDetails() {
//   const { orderId } = useParams(); // get orderId from URL
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const [activePaymentOrder, setActivePaymentOrder] = useState(null);
//   const [sampleRecievedImage, setSampleRecievedImage] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [description, setDescription] = useState(""); // Added missing state

//   // useEffect(() => {
//   //   let isMounted = true;
    
//   //   const fetchData = async () => {
//   //     try {
//   //       const token = localStorage.getItem("token");
//   //       const response = await axios.get(
//   //         `/api/order/orders/exporter/${orderId}`,
//   //         {
//   //           headers: {
//   //             Authorization: `Bearer ${token}`,
//   //           },
//   //         }
//   //       );
//   //       if (isMounted) {
//   //         setOrder(response.data.order);
//   //       }
//   //     } catch (error) {
//   //       if (isMounted) {
//   //         setMessage(
//   //           error.response?.data?.message || "Failed to load order details."
//   //         );
//   //       }
//   //     } finally {
//   //       if (isMounted) {
//   //         setLoading(false);
//   //       }
//   //     }
//   //   };

//   //   fetchData();

//   //   return () => {
//   //     isMounted = false;
//   //   };
//   // }, [orderId]);

//   useEffect(() => {
//     let isMounted = true;
  
//     const fetchData = async () => {
//       // Ensure we don't fetch data again if it's already present
//       if (!order) {  // Check if order data is already fetched
//         try {
//           const token = localStorage.getItem("token");
//           const response = await axios.get(
//             `/api/order/orders/exporter/${orderId}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           if (isMounted) {
//             setOrder(response.data.order);
//           }
//         } catch (error) {
//           if (isMounted) {
//             setMessage(
//               error.response?.data?.message || "Failed to load order details."
//             );
//           }
//         } finally {
//           if (isMounted) {
//             setLoading(false);
//           }
//         }
//       }
//     };
  
//     fetchData();
  
//     return () => {
//       isMounted = false;
//     };
//   }, [orderId, order]); // Add order to dependency array, ensuring fetch only when necessary
  

//   const handleImageSample = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
  
//     try {
//       const token = localStorage.getItem("token");
//       const formData = new FormData();
//       formData.append("orderId", orderId);
//       formData.append("sampleImage", sampleRecievedImage);
    

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
//       setMessage("Sample sent successfully!");
//       setShowForm(false);
      
//       setSampleRecievedImage(null);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to send sample.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//   if (loading) return <p className="text-center mt-8">Loading order details...</p>;
//   if (message) return <p className="text-center text-red-500 mt-8">{message}</p>;
  
//   // if (!order) {
//   //   return <p className="text-center text-gray-500 mt-8">No order found.</p>; // Display a message if order is not available
//   // }
  

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
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//           <div className="font-semibold text-gray-600">
//             <strong>Auction:</strong> {order.auctionId?.title}
//           </div>
//           <div className="font-semibold text-gray-600">
//             <strong>Product:</strong> {order.productId?.name}
//           </div>
//           <div className="font-semibold text-gray-600">
//             <strong>Exporter:</strong> {order.supplierId?.name}
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
//       {order.sampleStatus !== "waiting_for_payment" && (
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

//       {order.sampleStatus === "sent" && (
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
//       {order.sampleStatus === "waiting_for_payment" && (
//         <div className="card bg-white p-6 rounded-lg shadow-md mt-6">
//           <button
//             className="btn btn-primary w-full mt-4"
//             onClick={() => setActivePaymentOrder(order._id)}
//           >
//             Send Token Payment
//           </button>

//           {activePaymentOrder === order._id && (
//             <div className="mt-4">
//               <PaymentPage
//                 orderId={order._id}
//                 tokenAmount={order.price}
//                 onPaymentSuccess={() => {
//                   setActivePaymentOrder(null);
//                   setOrder(prev => ({...prev, sampleStatus: "waiting_for_sample"}));
//                 }}
//               />
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import PaymentPage from "../../../pages/payments/PaymentPage";

// export default function ExporterOrderDetails() {
//   const { orderId } = useParams(); // get orderId from URL
//   console.log("Rendering component. orderId:", orderId); // Debug 1
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const [activePaymentOrder, setActivePaymentOrder] = useState(null);
//   const [sampleRecievedImage, setSampleRecievedImage] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [description, setDescription] = useState(""); // Added missing state

//   useEffect(() => {
//     console.log("useEffect triggered. orderId:", orderId); // Debug 2
//     let isMounted = true;
//     setLoading(true);  // Ensure loading is set when starting fetch
  
//     const fetchData = async () => {
//       console.log("Starting fetch..."); // Debug 3
//       try {
//         const token = localStorage.getItem("token");
//         console.log("Token exists:", !!token); // Debug 4
//         const response = await axios.get(
//           `/api/order/orders/exporter/${orderId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         console.log("API response:", response.data); // Debug 5
//         if (isMounted) {
//           setOrder(response.data.order);
//           setMessage("");  // Clear any previous errors
//         }
//       } catch (error) {
//         console.error("Fetch error:", error); // Debug 6
//         if (isMounted) {
//           console.log("Fetch completed. Setting loading false"); // Debug 7
//           setMessage(
//             error.response?.data?.message || "Failed to load order details."
//           );
//           setOrder(null);  // Explicitly set order to null on error
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };
  
//     fetchData();
  
//     return () => {
//       isMounted = false;
//     };
//   }, [orderId]);  // Only orderId as dependency

//   console.log("Current state:", { loading, message, order }); // Debug 8

  // const handleImageSample = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   try {
  //     const token = localStorage.getItem("token");
  //     const formData = new FormData();
  //     formData.append("orderId", orderId);
  //     formData.append("sampleImage", sampleRecievedImage);
  //     if (description) {
  //       formData.append("description", description);
  //     }

  //     const response = await axios.post(
  //       "/api/order/orders/confirm-sample-receipt",
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     setOrder(response.data.order);
  //     setMessage("Sample Recieved successfully!");
  //     setShowForm(false);
  //     setDescription("");
  //     setSampleRecievedImage(null);
  //   } catch (error) {
  //     setMessage(error.response?.data?.message || "Failed to send sample.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

//   if (loading) {
//     console.log("Rendering loading state"); // Debug 9
//     return <p className="text-center mt-8">Loading order details...</p>;
//   }
//   if (message) {
//     console.log("Rendering message state:", message); // Debug 10
//     return <p className="text-center text-red-500 mt-8">{message}</p>;
//   }
//   if (!order) {
//     console.log("Rendering no-order state"); // Debug 11
//     return <p className="text-center mt-8">No order data available</p>;
//   }
//   console.log("Rendering main component"); 
//   return (<>
//   <div style={{ color: 'red', fontSize: '24px' }}>TEST VISIBILITY</div>
//     <div className="container mx-auto p-8 space-y-6 bg-gradient-to-r from-blue-100 to-blue-300 shadow-lg rounded-xl">
//        <div style={{ color: 'red', fontSize: '24px' }}>TEST VISIBILITY</div>
//       <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//         Order Details
//       </h2>

//       {/* Order Information Card */}
//       <div className="card bg-white p-6 rounded-lg shadow-xl">
//         <h3 className="text-2xl font-semibold text-gray-700 mb-4">
//           Order Overview
//         </h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//           <div className="font-semibold text-gray-600">
//             <strong>Auction:</strong> {order.auctionId?.title}
//           </div>
//           <div className="font-semibold text-gray-600">
//             <strong>Product:</strong> {order.productId?.name}
//           </div>
//           <div className="font-semibold text-gray-600">
//             <strong>Exporter:</strong> {order.supplierId?.name}
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
//       {order.sampleStatus !== "waiting_for_payment" && (
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

      // {order.sampleStatus === "sent" && (
      //   <div className="mt-6 p-6 bg-gray-50 border border-gray-300 rounded-lg">
      //     <h3 className="text-xl font-semibold mb-4">Sample Received</h3>
      //     <button
      //       className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      //       onClick={() => setShowForm(!showForm)}
      //     >
      //       {showForm ? "Cancel" : "Enter Sample Details"}
      //     </button>

      //     {showForm && (
      //       <form onSubmit={handleImageSample} className="mt-6 space-y-4">
      //         <div className="mb-4">
      //           <label className="block text-gray-700 mb-2">Sample Image</label>
      //           <input
      //             type="file"
      //             className="w-full px-4 py-2 border rounded-lg"
      //             accept="image/jpeg, image/png"
      //             onChange={(e) => setSampleRecievedImage(e.target.files[0])}
      //             required
      //           />
      //           <p className="text-xs text-gray-500 mt-1">
      //             Upload a clear image of the sample (JPEG or PNG)
      //           </p>
      //         </div>

      //         <button
      //           type="submit"
      //           className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition"
      //           disabled={isSubmitting}
      //         >
      //           {isSubmitting ? "Sending..." : "Send Sample"}
      //         </button>
      //       </form>
      //     )}
      //   </div>
      // )}

//       {/* Payment Button Display */}
//       {order.sampleStatus === "waiting_for_payment" && (
//         <div className="card bg-white p-6 rounded-lg shadow-md mt-6">
//           <button
//             className="btn btn-primary w-full mt-4"
//             onClick={() => setActivePaymentOrder(order._id)}
//           >
//             Send Token Payment
//           </button>

//           {activePaymentOrder === order._id && (
//             <div className="mt-4">
//               <PaymentPage
//                 orderId={order._id}
//                 tokenAmount={order.price}
//                 onPaymentSuccess={() => {
//                   setActivePaymentOrder(null);
//                   setOrder(prev => ({...prev, sampleStatus: "waiting_for_sample"}));
//                 }}
//               />
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//     </>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import PaymentPage from "../../../pages/payments/PaymentPage";
// import Payment from "../../payments/Payment";

// export default function ExporterOrderDetails() {
//   const { orderId } = useParams(); // get orderId from URL
//   const [showMessage, setShowMessage] = useState(false);
//   console.log("Rendering component. orderId:", orderId); // Debug 1
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const [activePaymentOrder, setActivePaymentOrder] = useState(null);
//   const [sampleRecievedImage, setSampleRecievedImage] = useState(null);
  // const [showForm, setShowForm] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [description, setDescription] = useState(""); // Added missing state
//   const [showPaymentForm, setShowPaymentForm] = useState(false);

//   const handlePaymentSuccess = async () => {
//     setActivePaymentOrder(null); // Close payment form
//     await fetchOrderData(); // Refresh order details
//     setMessage("Payment successful! Order updated.");
//     setTimeout(() => setMessage(""), 3000);
//   };
//    // Fetch order data from API
//    const fetchOrderData = async () => {
//     setLoading(true); // Show loading state while fetching data
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(`/api/order/orders/exporter/${orderId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setOrder(response.data.order);
//       setMessage(""); // Clear any previous errors
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to load order details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch order on component mount or when orderId changes
//   useEffect(() => {
//     fetchOrderData();
//   }, [orderId]);

//   useEffect(() => {
//     console.log("useEffect triggered. orderId:", orderId); // Debug 2
//     let isMounted = true;
//     setLoading(true);  // Ensure loading is set when starting fetch

//       // Function to handle successful payment
//   const handlePaymentSuccess = async () => {
//     // Refresh the order details after payment success
//     await fetchOrderData();
//     setMessage("Payment successful! Order updated.");
//     setTimeout(() => setMessage(""), 3000); // Clear the success message after 3 seconds
//   };
  
//     const fetchData = async () => {
//       console.log("Starting fetch..."); // Debug 3
//       try {
//         const token = localStorage.getItem("token");
//         console.log("Token exists:", !!token); // Debug 4
//         const response = await axios.get(
//           `/api/order/orders/exporter/${orderId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         console.log("API response:", response.data); // Debug 5
//         if (isMounted) {
//           setOrder(response.data.order);
//           setMessage("");  // Clear any previous errors
//         }
//       } catch (error) {
//         console.error("Fetch error:", error); // Debug 6
//         if (isMounted) {
//           console.log("Fetch completed. Setting loading false"); // Debug 7
//           setMessage(
//             error.response?.data?.message || "Failed to load order details."
//           );
//           setOrder(null);  // Explicitly set order to null on error
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };
  
//     fetchData();
  
//     return () => {
//       isMounted = false;
//     };
//   }, [orderId]);  // Only orderId as dependency

//   // Add this function near your other state declarations

// const fetchOrderDataWithRetry = async (retries = 3) => {
//   try {
//     setOrder(null);
//     setLoading(true);
    
//     const token = localStorage.getItem("token");
//     const response = await axios.get(
//       `/api/order/orders/exporter/${orderId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     // Check if status actually changed
//     if (response.data.order.paymentStatus !== 'paid' && retries > 0) {
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       return fetchOrderDataWithRetry(retries - 1);
//     }

//     setOrder(response.data.order);
//     setMessage("Payment successful! Order updated.");
//     setShowMessage(true);
//     setTimeout(() => setShowMessage(false), 3000);

//   } catch (error) {
//     console.error("Error refreshing order:", error);
//     setMessage(error.response?.data?.message || "Failed to refresh order data.");
//     setShowMessage(true);
//     setTimeout(() => setShowMessage(false), 3000);
//   } finally {
//     setLoading(false);
//   }
// };

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

//       // Update order state with the latest data after sample submission
//       setOrder(response.data.order);
//       setMessage("Sample Received successfully!"); // Show the success message
//       setShowForm(false);
//       setDescription("");
//       setSampleRecievedImage(null);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to send sample.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Handle loading, message, and no order cases
//   if (loading) {
//     return <p className="text-center mt-8">Loading order details...</p>;
//   }
//   // if (message) {
//   //   return <p className="text-center text-red-500 mt-8">{message}</p>;
//   // }
//   if (!order) {
//     return <p className="text-center mt-8">No order data available</p>;
//   }

//   return (
//     <>
//       {/* Add padding-top to avoid navbar overlap */}
//       <div className="container mx-auto p-8 space-y-6 bg-gradient-to-r from-blue-100 to-blue-300 shadow-lg rounded-xl pt-24">
//       {showMessage && (
//       <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded">
//         {message}
//       </div>
//     )}
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           Order Details
//         </h2>

//         {/* Order Information Card */}
//         <div className="card bg-white p-6 rounded-lg shadow-xl">
//           <h3 className="text-2xl font-semibold text-gray-700 mb-4">
//             Order Overview
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div className="font-semibold text-gray-600">
//               <strong>Auction:</strong> {order.auctionId?.title}
//             </div>
//             <div className="font-semibold text-gray-600">
//               <strong>Product:</strong> {order.productId?.name}
//             </div>
//             <div className="font-semibold text-gray-600">
//               <strong>Exporter:</strong> {order.supplierId?.name}
//             </div>
//             <div className="font-semibold text-gray-600">
//               <strong>Email:</strong> {order.supplierId?.email}
//             </div>
//             <div className="font-semibold text-gray-600">
//               <strong>Quantity:</strong> {order.quantity}
//             </div>
//             <div className="font-semibold text-gray-600">
//               <strong>Price:</strong> Rs {order.price}
//             </div>
//             <div className="font-semibold text-gray-600">
//               <strong>Status:</strong> {order.status}
//             </div>
//             <div className="font-semibold text-gray-600">
//               <strong>Sample Status:</strong> {order.sampleStatus}
//             </div>
//             <div className="font-semibold text-gray-600">
//               <strong>Payment Status:</strong> {order.paymentStatus}
//             </div>
//             <div className="font-semibold text-gray-600">
//               <strong>Ordered On:</strong>{" "}
//               {new Date(order.createdAt).toLocaleString()}
//             </div>
//           </div>
//         </div>

//         {/* Sample Proof */}
//         {order.sampleProof && (
//           <div className="card bg-white p-6 rounded-lg shadow-md mt-6">
//             <h3 className="text-lg font-semibold mb-2 text-gray-700">
//               Sample Proof
//             </h3>
//             <img
//               src={order.sampleProof}
//               alt="Sample proof"
//               className="max-w-full h-auto rounded-xl shadow-md"
//             />
//             {order.sampleDescription && (
//               <p className="mt-2 text-gray-600">
//                 <strong>Description:</strong> {order.sampleDescription}
//               </p>
//             )}
//           </div>
//         )}

//         {/* Show Sample Status and Payment Info */}
//         {order.sampleStatus === "waiting_for_sample" && (
//           <div className="alert alert-success mt-4">
//             <span>Token Payment Paid</span>
//           </div>
//         )}

//         {/* Allow user to enter sample details if not done already */}
//         {order.sampleStatus === "sent" && (
//           <div className="mt-6 p-6 bg-gray-50 border border-gray-300 rounded-lg">
//             <h3 className="text-xl font-semibold mb-4">Sample Received</h3>
//             <button
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//               onClick={() => setShowForm(!showForm)}
//             >
//               {showForm ? "Cancel" : "Enter Sample Details"}
//             </button>

//             {showForm && (
//               <form onSubmit={handleImageSample} className="mt-6 space-y-4">
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-2">Sample Image</label>
//                   <input
//                     type="file"
//                     className="w-full px-4 py-2 border rounded-lg"
//                     accept="image/jpeg, image/png"
//                     onChange={(e) => setSampleRecievedImage(e.target.files[0])}
//                     required
//                   />
//                   <p className="text-xs text-gray-500 mt-1">
//                     Upload a clear image of the sample (JPEG or PNG)
//                   </p>
//                 </div>

//                 <button
//                   type="submit"
//                   className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? "Sending..." : "Send Sample"}
//                 </button>
//               </form>
//             )}
//           </div>
//         )}

//         {/* Payment Button Display */}
//         {order.sampleStatus === "waiting_for_payment" && (
//           <div className="card bg-white p-6 rounded-lg shadow-md mt-6">
//             <button
//               className="btn btn-primary w-full mt-4"
//               onClick={() => setActivePaymentOrder(order._id)}
//             >
//               Send Token Payment
//             </button>

//             {activePaymentOrder === order._id && (
//               <div className="mt-4">
//                 <PaymentPage
//                   orderId={order._id}
//                   tokenAmount={order.price}
//                 onPaymentSuccess={handlePaymentSuccess} 
//                 />
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }





import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PaymentPage from "../../../pages/payments/PaymentPage";
import SampleApproval from "../components/SampleApproval";
import PDFGenerator from "../components/PDFGenerator";
import { useSelector } from "react-redux";
import AgreementComponent from "../components/AgreementComponent";
import AgreementPDFGenerator from "../components/AgreementPDFGenerator";

export default function ExporterOrderDetails() {
  const { orderId } = useParams(); // get orderId from URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [activePaymentOrder, setActivePaymentOrder] = useState(null);
 
    const [sampleRecievedImage, setSampleRecievedImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [description, setDescription] = useState(""); // Added missing state
  const [showPaymentForm, setShowPaymentForm] = useState(false);

    const user = useSelector((state) => state.user);
    const userName = user?.name;
    const userRole = user?.role;

  const handleImageSample = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("orderId", orderId);
      formData.append("sampleImage", sampleRecievedImage);
      if (description) {
        formData.append("description", description);
      }

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
      setMessage("Sample Recieved successfully!");
      setShowForm(false);
      setDescription("");
      setSampleRecievedImage(null);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send sample.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchOrderDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `/api/order/orders/exporter/${orderId}`,
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

  const handleApproveSuccess = () => {
    fetchOrderDetails(); // Re-fetch order details after sample is approved
  };
  const handleAcceptSuccess = () => {
    fetchOrderDetails(); // Re-fetch order details after agreement is accepted
  };

  const handleRejectSuccess = () => {
    fetchOrderDetails(); // Re-fetch order details after agreement is rejected
  };

  if (loading)
    return <p className="text-center mt-8">Loading order details...</p>;
  if (message)
    return <p className="text-center text-red-500 mt-8">{message}</p>;
  if (!order) return null;

  return (
    <div className="container mx-auto p-8 space-y-6 bg-gradient-to-r from-blue-100 to-blue-300 shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Order Details
      </h2>

      {/* Order Information Card */}
      <div className="card bg-white p-6 rounded-lg shadow-xl">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Order Overview
        </h3>
           {/* PDF Generation Button */}
     {/* PDF Generation Button */}
     {order.status === "completed" && (
        <div className="mt-6">
          <PDFGenerator order={order} userName={userName} userRole={userRole}/>
          <AgreementPDFGenerator order={order} userName={userName} userRole={userRole} />
        </div>
      )}
       {/* Agreement Component for Completed Orders */}
       {order.status === "completed" && order.Agreement =="waiting_for_approval" && (
          <div className="mt-6">
            <AgreementComponent
              orderId={order._id}
              onAcceptSuccess={handleAcceptSuccess}
              onRejectSuccess={handleRejectSuccess}
              role={userRole}
            />
                

          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="font-semibold text-gray-600">
            <strong>Auction:</strong> {order.auctionId?.title}
          </div>
          <div className="font-semibold text-gray-600">
            <strong>Product:</strong> {order.productId?.name}
          </div>
          <div className="font-semibold text-gray-600">
            <strong>Supplier:</strong> {order.supplierId?.name}
          </div>
          <div className="font-semibold text-gray-600">
            <strong>Exporter:</strong> {userName}
          </div>
          <div className="font-semibold text-gray-600">
            <strong>Email:</strong> {order.supplierId?.email}
          </div>
          <div className="font-semibold text-gray-600">
            <strong>Quantity:</strong> {order.quantity}
          </div>
          <div className="font-semibold text-gray-600">
            <strong>Price:</strong> Rs {order.price}
          </div>
          <div className="font-semibold text-gray-600">
            <strong>Status:</strong> {order.status}
          </div>
          <div className="font-semibold text-gray-600">
            <strong>Sample Status:</strong> {order.sampleStatus}
          </div>
          <div className="font-semibold text-gray-600">
            <strong>Payment Status:</strong> {order.paymentStatus}
          </div>
          <div className="font-semibold text-gray-600">
            <strong>Agreement:</strong> {order.Agreement}
          </div>
          <div className="font-semibold text-gray-600">
            <strong>Ordered On:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Display Token Payment Paid message when payment is done */}
      {order.sampleStatus === "waiting_for_sample" && (
        <div className="alert alert-success mt-4">
          <span>Token Payment Paid</span>
        </div>
      )}
       {order.sampleStatus !== "waiting_for_payment" && (
        <div className="card bg-white p-6 rounded-lg shadow-md mt-6">
          Token Payment Sent
        </div>
      )}

      {/* Sample Proof */}
      {order.sampleProof && (
        <div className="card bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            Sample Proof
          </h3>
          <img
            src={order.sampleProof}
            alt="Sample proof"
            className="max-w-full h-auto rounded-xl shadow-md"
          />
          {order.sampleDescription && (
            <p className="mt-2 text-gray-600">
              <strong>Description:</strong> {order.sampleDescription}
            </p>
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
         {order.sampleStatus === "received" && (
       <div className="mt-6 p-6 bg-gray-50 border border-gray-300 rounded-lg">
       <SampleApproval orderId={order._id} onApproveSuccess={handleApproveSuccess} />
     </div>
      )}

      
{order.sampleStatus === "sent" && (
        <div className="mt-6 p-6 bg-gray-50 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Sample Received</h3>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Enter Sample Details"}
          </button>

          {showForm && (
            <form onSubmit={handleImageSample} className="mt-6 space-y-4">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Sample Image</label>
                <input
                  type="file"
                  className="w-full px-4 py-2 border rounded-lg"
                  accept="image/jpeg, image/png"
                  onChange={(e) => setSampleRecievedImage(e.target.files[0])}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload a clear image of the sample (JPEG or PNG)
                </p>
              </div>

              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Sample"}
              </button>
            </form>
          )}
        </div>
      )}
      

      {/* Payment Button Display */}
      {order.sampleStatus === "waiting_for_payment" && (
        <div className="card bg-white p-6 rounded-lg shadow-md mt-6">
          <button
            className="btn btn-primary w-full mt-4"
            onClick={() => setActivePaymentOrder(order._id)}
          >
            Send Token Payment
          </button>

          {/* Render Payment Page when user clicks the button */}
          {activePaymentOrder === order._id && (
            <div className="mt-4">
              <PaymentPage
                orderId={order._id}
                tokenAmount={order.price}
                onPaymentSuccess={() => {
                  setActivePaymentOrder(null); // Hide the payment form after success
                  fetchOrderDetails(); // Re-fetch order details after payment success
                }}
              />
            </div>
          )}
        </div>
      )}

     
    </div>
  );}