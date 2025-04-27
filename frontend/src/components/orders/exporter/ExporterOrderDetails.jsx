


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

export default function ExporterOrderDetails() {
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

  // ... (keep all existing handler functions unchanged)

  return (
    <div className="bg-neutral-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-6">
          <h1 className="text-2xl font-bold text-neutral-800 mb-2">Order Details</h1>
          <p className="text-neutral-600">Order ID: {orderId}</p>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-xl shadow-xs border border-neutral-200 overflow-hidden">
          <div className="p-6 border-b border-neutral-200">
            <h2 className="text-xl font-semibold text-neutral-800">Order Summary</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <DetailItem label="Auction" value={order.auctionId?.title} />
              <DetailItem label="Product" value={order.productId?.name} />
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
              onToggle={() => {
                setShowPaymentPopup(!showPaymentPopup);
                if (showPaymentPopup) setActivePaymentOrder(null);
              }}
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
              onToggle={() => {
                setShowLocalPaymentPopup(!showLocalPaymentPopup);
                if (showLocalPaymentPopup) setLocalActivePaymentOrder(null);
              }}
            >
              {showLocalPaymentPopup && (
                <LocalPaymentForm
                  orderId={order._id}
                  onPaymentSuccess={() => {
                    setLocalActivePaymentOrder(null);
                    fetchOrderDetails();
                  }}
                />
              )}
            </PaymentSection>
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable Components
const DetailItem = ({ label, value, badge = false }) => (
  <div>
    <span className="text-sm font-medium text-neutral-500">{label}: </span>
    {badge ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
        {value}
      </span>
    ) : (
      <span className="text-neutral-900">{value}</span>
    )}
  </div>
);

const StatusCard = ({ title, value, variant = "neutral" }) => {
  const variantClasses = {
    success: "bg-success-50 text-success-800",
    warning: "bg-warning-50 text-warning-800",
    neutral: "bg-neutral-50 text-neutral-800"
  };

  return (
    <div className={`${variantClasses[variant]} p-4 rounded-lg shadow-xs`}>
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-lg font-semibold mt-1 capitalize">{value?.replace(/_/g, ' ')}</p>
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