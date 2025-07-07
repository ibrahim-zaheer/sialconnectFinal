

// import React, { useState } from "react";
// import axios from "axios";

// const WriteReview = ({ supplierId, productName }) => {
//   const [rating, setRating] = useState(1);
//   const [reviewText, setReviewText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const submitReview = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     const token = localStorage.getItem("token");
//     if (!token) {
//       setMessage("You must be logged in to submit a review.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "/api/reviews", 
//         { supplierId, productName, rating, reviewText },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setMessage("Review submitted successfully!");
//       setRating(1);
//       setReviewText("");
//     } catch (error) {
//       setMessage("Error submitting review. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4">Write a Review</h2>
//       {message && <p className="text-sm text-center text-green-600">{message}</p>}

//       <form onSubmit={submitReview} className="space-y-4">
//         {/* Product Name */}
//         <div>
//           <label className="block font-medium">Product Name:</label>
//           <input
//             type="text"
//             value={productName}
//             readOnly
//             className="w-full p-2 border rounded-lg bg-gray-200"
//           />
//         </div>

//         {/* Rating */}
//         <div>
//           <label className="block font-medium">Rating:</label>
//           <div className="rating">
//             {[1, 2, 3, 4, 5].map((num) => (
//               <input
//                 key={num}
//                 type="radio"
//                 name="rating"
//                 className={`mask mask-star ${rating === num ? "bg-yellow-500" : ""}`}
//                 checked={rating === num}
//                 onChange={() => setRating(num)}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Review Text */}
//         <div>
//           <label className="block font-medium">Review:</label>
//           <textarea
//             value={reviewText}
//             onChange={(e) => setReviewText(e.target.value)}
//             className="w-full p-2 border rounded-lg"
//             rows="4"
//             required
//           ></textarea>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
//           disabled={loading}
//         >
//           {loading ? "Submitting..." : "Submit Review"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default WriteReview;




// import React, { useState } from "react";
// import axios from "axios";

// const WriteReview = ({ supplierId, productName, reviewerRole, orderId }) => {
//   const [rating, setRating] = useState(1);
//   const [reviewText, setReviewText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const submitReview = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     const token = localStorage.getItem("token");
//     if (!token) {
//       setMessage("You must be logged in to submit a review.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "/api/reviews", 
//         { 
//           supplierId, 
//           productName, 
//           rating, 
//           reviewText, 
//           orderId, 
//           reviewerRole 
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setMessage("Review submitted successfully!");
//       setRating(1);
//       setReviewText("");
//     } catch (error) {
//       setMessage("Error submitting review. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4">Write a Review</h2>
//       {message && <p className="text-sm text-center text-green-600">{message}</p>}

//       <form onSubmit={submitReview} className="space-y-4">
//         {/* Product Name */}
//         <div>
//           <label className="block font-medium">Product Name:</label>
//           <input
//             type="text"
//             value={productName}
//             readOnly
//             className="w-full p-2 border rounded-lg bg-gray-200"
//           />
//         </div>

//         {/* Rating */}
//         <div>
//           <label className="block font-medium">Rating:</label>
//           <div className="rating">
//             {[1, 2, 3, 4, 5].map((num) => (
//               <input
//                 key={num}
//                 type="radio"
//                 name="rating"
//                 className={`mask mask-star ${rating === num ? "bg-yellow-500" : ""}`}
//                 checked={rating === num}
//                 onChange={() => setRating(num)}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Review Text */}
//         <div>
//           <label className="block font-medium">Review:</label>
//           <textarea
//             value={reviewText}
//             onChange={(e) => setReviewText(e.target.value)}
//             className="w-full p-2 border rounded-lg"
//             rows="4"
//             required
//           ></textarea>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
//           disabled={loading}
//         >
//           {loading ? "Submitting..." : "Submit Review"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default WriteReview;



// import React, { useState } from "react";
// import axios from "axios";

// const WriteReview = ({ supplierId, productName, reviewerRole, orderId }) => {
//   const [rating, setRating] = useState(1);
//   const [reviewText, setReviewText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const submitReview = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     const token = localStorage.getItem("token");
//     if (!token) {
//       setMessage("You must be logged in to submit a review.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "/api/reviews", 
//         { 
//           supplierId, 
//           productName, 
//           rating, 
//           reviewText, 
//           orderId, 
//           reviewerRole // pass the userRole (exporter/supplier)
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setMessage("Review submitted successfully!");
//       setRating(1);
//       setReviewText("");
//     } catch (error) {
//       setMessage("Error submitting review. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4">Write a Review</h2>
//       {message && <p className="text-sm text-center text-green-600">{message}</p>}

//       <form onSubmit={submitReview} className="space-y-4">
//         {/* Product Name */}
//         <div>
//           <label className="block font-medium">Product Name:</label>
//           <input
//             type="text"
//             value={productName}
//             readOnly
//             className="w-full p-2 border rounded-lg bg-gray-200"
//           />
//         </div>

//         {/* Rating */}
//         <div>
//           <label className="block font-medium">Rating:</label>
//           <div className="rating">
//             {[1, 2, 3, 4, 5].map((num) => (
//               <input
//                 key={num}
//                 type="radio"
//                 name="rating"
//                 className={`mask mask-star ${rating === num ? "bg-yellow-500" : ""}`}
//                 checked={rating === num}
//                 onChange={() => setRating(num)}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Review Text */}
//         <div>
//           <label className="block font-medium">Review:</label>
//           <textarea
//             value={reviewText}
//             onChange={(e) => setReviewText(e.target.value)}
//             className="w-full p-2 border rounded-lg"
//             rows="4"
//             required
//           ></textarea>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
//           disabled={loading}
//         >
//           {loading ? "Submitting..." : "Submit Review"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default WriteReview;



import React, { useState, useEffect } from "react";
import axios from "axios";
import MessageSelector from "../MessageSelector";

const WriteReview = ({ supplierId, productName, reviewerRole, orderId,productId }) => {
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [reviewExists, setReviewExists] = useState(false); // State to track if the review exists


  
  useEffect(() => {
    const checkIfReviewExists = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/reviews/check/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviewExists(response.data.reviewExists); // Set the state based on the response
      } catch (error) {
        console.error("Error checking if review exists:", error);
      }
    };

    checkIfReviewExists(); // Call the check function when the component mounts
  }, [orderId]);

  const submitReview = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You must be logged in to submit a review.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "/api/reviews", 
        { 
          supplierId, 
           productId, 
          productName, 
          rating, 
          reviewText, 
          orderId, 
          reviewerRole 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Review submitted successfully!");
      setRating(1);
      setReviewText("");
    } catch (error) {
      setMessage("Error submitting review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // If a review exists, do not render the form
  if (reviewExists) {
    return <p className="text-green-600">You have already reviewed this order.</p>;
  }


  // Predefined messages based on the role (Exporter or Supplier)
  const predefinedMessages = reviewerRole === "exporter" 
    ? [
        "The product quality met my expectations. Looking forward to working together again.",
        "The delivery was prompt, and the product was as described. Thank you for the smooth transaction.",
        "Good experience overall. I appreciate the timely response and the quality of the product.",
        "The transaction was seamless, and the product was exactly what I needed. Will definitely consider for future orders.",
        "Great business interaction. The product was delivered on time, and I am satisfied with the purchase."
      ]
    : [
        "The order has been successfully processed and shipped. Looking forward to your feedback.",
        "Your order has been dispatched. Please let us know if you need any further details.",
        "The product has been shipped as per the order. We hope it meets your expectations.",
        "Order dispatched and on the way. We appreciate your business and look forward to future orders.",
        "Your order has been shipped. Kindly confirm once it has been received in good condition."
      ];


  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Write a Review</h2>
      {message && <p className="text-sm text-center text-green-600">{message}</p>}

      <form onSubmit={submitReview} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block font-medium">Product Name:</label>
          <input
            type="text"
            value={productName}
            readOnly
            className="w-full p-2 border rounded-lg bg-gray-200"
          />
        </div>

        

        {/* Rating */}
        <div>
          <label className="block font-medium">Rating:</label>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((num) => (
              <input
                key={num}
                type="radio"
                name="rating"
                className={`mask mask-star ${rating === num ? "bg-yellow-500" : ""}`}
                checked={rating === num}
                onChange={() => setRating(num)}
              />
            ))}
          </div>
        </div>

        {/* Review Text */}
        <div>
          <label className="block font-medium">Review:</label>
               {/* Reusable MessageSelector Component */}
        <MessageSelector 
          predefinedMessages={predefinedMessages} 
           setMessage={(msg) => setReviewText(msg)}
        />
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full p-2 border rounded-lg"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default WriteReview;
