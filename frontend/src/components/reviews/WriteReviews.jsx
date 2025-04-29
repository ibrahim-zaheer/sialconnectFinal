// import React, { useState } from "react";
// import axios from "axios";

// const WriteReview = ({ supplierId }) => {
//   const [productName, setProductName] = useState("");
//   const [rating, setRating] = useState(1);
//   const [reviewText, setReviewText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Handle form submission
//   const submitReview = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     // Get token from localStorage
//     const token = localStorage.getItem("token");
//     if (!token) {
//         setMessage("You must be logged in to submit a review.");
//         setLoading(false);
//         return;
//     }

//     try {
//         const response = await axios.post(
//             "/api/reviews", // Ensure full URL if needed
//             {
//                 supplierId, // Passed as prop
//                 productName,
//                 rating,
//                 reviewText,
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "application/json",
//                 },
//             }
//         );

//         setMessage("Review submitted successfully!");
//         setProductName("");
//         setRating(1);
//         setReviewText("");
//     } catch (error) {
//         setMessage("Error submitting review. Please try again.");
//         console.error("Review submission error:", error.response);
//     } finally {
//         setLoading(false);
//     }
// };

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
//             onChange={(e) => setProductName(e.target.value)}
//             className="w-full p-2 border rounded-lg"
//             required
//           />
//         </div>

//         {/* Rating */}
//         {/* <div>
//           <label className="block font-medium">Rating:</label>
//           <select
//             value={rating}
//             onChange={(e) => setRating(Number(e.target.value))}
//             className="w-full p-2 border rounded-lg"
//             required
//           >
//             {[1, 2, 3, 4, 5].map((num) => (
//               <option key={num} value={num}>
//                 {num} Star{num > 1 ? "s" : ""}
//               </option>
//             ))}
//           </select>
        
        
//         </div> */}
//         <div>
//         <label className="block font-medium">Rating:</label>
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

// const WriteReview = ({ supplierId }) => {
//   const [productName, setProductName] = useState("");
//   const [rating, setRating] = useState(1);
//   const [reviewText, setReviewText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Handle form submission
//   const submitReview = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     // Get token from localStorage
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setMessage("You must be logged in to submit a review.");
//       setLoading(false);
//       return;
//     }
//     console.log({
//       supplierId,       // Check if this is passed correctly
//       productName,      // Check if this is passed correctly
//       rating,           // Ensure this is a valid value (1-5)
//       reviewText,       // Ensure this is a non-empty string
//     });

//     try {
//       const response = await axios.post(
//         "/api/reviews", // Backend route to submit the review and trigger notification
//         {
//           supplierId, // Passed as prop
//           productName,
//           rating,
//           reviewText,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setMessage("Review submitted successfully!");
//       setProductName("");
//       setRating(1);
//       setReviewText("");
//     } catch (error) {
//       setMessage("Error submitting review. Please try again.");
//       console.error("Review submission error:", error.response);
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
//             onChange={(e) => setProductName(e.target.value)}
//             className="w-full p-2 border rounded-lg"
//             required
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


import React, { useState } from "react";
import axios from "axios";

const WriteReview = ({ supplierId, productName }) => {
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
        { supplierId, productName, rating, reviewText },
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
