// import React, { useState } from "react";
// import { useSelector } from "react-redux"; // Import Redux hook
// import { selectUser } from "../../redux/reducers/userSlice"; // Import the Redux selector
// import axios from "axios"; // Import Axios

// export default function CreateOffer() {
//   // Get user info from Redux state
//   const user = useSelector(selectUser);
//   const token = user?.id ? localStorage.getItem("token") : null; // Get token from localStorage if user is logged in

//   // Offer data state
//   const [offerData, setOfferData] = useState({
//     supplierId: "",
//     productId: "",
//     price: "",
//     quantity: "",
//     message: "",
//   });

//   const [responseMessage, setResponseMessage] = useState("");

//   // Function to create an offer using Axios
//   const createOffer = async (offerData, token) => {
//     try {
//       const response = await axios.post(
//         "/api/offers/create",
//         offerData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error creating offer:", error);
//       return { message: "Failed to send offer. Try again." };
//     }
//   };

//   // Handle form input changes
//   const handleChange = (e) => {
//     setOfferData({ ...offerData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!token) {
//       setResponseMessage("User not authenticated. Please log in.");
//       return;
//     }
  
//     // Ensure `message` field is not empty (backend expects it)
//     if (!offerData.message) {
//       setOfferData((prevData) => ({ ...prevData, message: "No message provided" }));
//     }
  
//     try {
//       const response = await createOffer(offerData, token);
//       if (response.message) {
//         setResponseMessage(response.message);
//       } else {
//         setResponseMessage("Offer sent successfully!");
//       }
//     } catch (error) {
//       setResponseMessage("Failed to send offer. Try again.");
//     }
//   };
  

//   return (
//     <div className="container">
//       <h2>Create an Offer</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Supplier ID:</label>
//         <input
//           type="text"
//           name="supplierId"
//           value={offerData.supplierId}
//           onChange={handleChange}
//           required
//         />

//         <label>Product ID:</label>
//         <input
//           type="text"
//           name="productId"
//           value={offerData.productId}
//           onChange={handleChange}
//           required
//         />

//         <label>Price:</label>
//         <input
//           type="number"
//           name="price"
//           value={offerData.price}
//           onChange={handleChange}
//           required
//         />

//         <label>Quantity:</label>
//         <input
//           type="number"
//           name="quantity"
//           value={offerData.quantity}
//           onChange={handleChange}
//           required
//         />

//         <label>Message:</label>
//         <textarea
//           name="message"
//           value={offerData.message}
//           onChange={handleChange}
//         ></textarea>

//         <button type="submit">Send Offer</button>
//       </form>

//       {responseMessage && <p>{responseMessage}</p>}
//     </div>
//   );
// }



// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { selectUser } from "../../redux/reducers/userSlice";
// import axios from "axios";

// export default function CreateOffer() {
//   const user = useSelector(selectUser);
//   const token = user?.id ? localStorage.getItem("token") : null;

//   const [offerData, setOfferData] = useState({
//     supplierId: "",
//     productId: "",
//     price: "",
//     quantity: "",
//     message: "",
//   });

//   const [responseMessage, setResponseMessage] = useState("");

//   const createOffer = async (offerData, token) => {
//     try {
//       const response = await axios.post(
//         "/api/offers/create",
//         offerData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error creating offer:", error);
//       return { message: "Failed to send offer. Try again." };
//     }
//   };

//   const handleChange = (e) => {
//     setOfferData({ ...offerData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!token) {
//       setResponseMessage("User not authenticated. Please log in.");
//       return;
//     }
//     if (!offerData.message) {
//       setOfferData((prevData) => ({ ...prevData, message: "No message provided" }));
//     }
//     try {
//       const response = await createOffer(offerData, token);
//       setResponseMessage(response.message || "Offer sent successfully!");
//     } catch (error) {
//       setResponseMessage("Failed to send offer. Try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
//         <h2 className="text-xl font-semibold text-center mb-4">Create an Offer</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="supplierId"
//             placeholder="Supplier ID"
//             value={offerData.supplierId}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <input
//             type="text"
//             name="productId"
//             placeholder="Product ID"
//             value={offerData.productId}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <input
//             type="number"
//             name="price"
//             placeholder="Price"
//             value={offerData.price}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <input
//             type="number"
//             name="quantity"
//             placeholder="Quantity"
//             value={offerData.quantity}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <textarea
//             name="message"
//             placeholder="Message"
//             value={offerData.message}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           ></textarea>

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
//           >
//             Send Offer
//           </button>
//         </form>
//         {responseMessage && <p className="text-center text-sm text-red-500 mt-2">{responseMessage}</p>}
//       </div>
//     </div>
//   );
// }







// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import { selectUser } from "../../redux/reducers/userSlice";
// import axios from "axios";

// export default function CreateOffer() {
//   const user = useSelector(selectUser);
//   const token = user?.id ? localStorage.getItem("token") : null;
//   const location = useLocation();
//   const { supplierId, productId, price } = location.state || {};

//   const [offerData, setOfferData] = useState({
//     supplierId: supplierId || "",
//     productId: productId || "",
//     price: price || "",
//     quantity: "",
//     message: "",
//   });

//   const [responseMessage, setResponseMessage] = useState("");

//   const createOffer = async (offerData, token) => {
//     try {
//       const response = await axios.post(
//         "/api/offers/create",
//         offerData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error creating offer:", error);
//       return { message: "Failed to send offer. Try again." };
//     }
//   };

//   const handleChange = (e) => {
//     setOfferData({ ...offerData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!token) {
//       setResponseMessage("User not authenticated. Please log in.");
//       return;
//     }
//     if (!offerData.message) {
//       setOfferData((prevData) => ({ ...prevData, message: "No message provided" }));
//     }
//     try {
//       const response = await createOffer(offerData, token);
//       setResponseMessage(response.message || "Offer sent successfully!");
//     } catch (error) {
//       setResponseMessage("Failed to send offer. Try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
//         <h2 className="text-xl font-semibold text-center mb-4">Create an Offer</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="supplierId"
//             value={offerData.supplierId}
//             readOnly
//             className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200 cursor-not-allowed"
//           />

//           <input
//             type="text"
//             name="productId"
//             value={offerData.productId}
//             readOnly
//             className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200 cursor-not-allowed"
//           />

//           <input
//             type="number"
//             name="price"
//             value={offerData.price}
            
//             className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200 cursor-not-allowed"
//           />

//           <input
//             type="number"
//             name="quantity"
//             placeholder="Quantity"
//             value={offerData.quantity}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <textarea
//             name="message"
//             placeholder="Message"
//             value={offerData.message}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           ></textarea>

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
//           >
//             Send Offer
//           </button>
//         </form>
//         {responseMessage && <p className="text-center text-sm text-red-500 mt-2">{responseMessage}</p>}
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducers/userSlice";
import axios from "axios";

export default function CreateOffer({ supplierId, productId, price, onClose }) {
  const user = useSelector(selectUser);
  const token = user?.id ? localStorage.getItem("token") : null;

  const [offerData, setOfferData] = useState({
    supplierId: supplierId || "",
    productId: productId || "",
    price: price || "", // Make the price editable
    quantity: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const createOffer = async (offerData, token) => {
    try {
      const response = await axios.post("/api/offers/create", offerData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating offer:", error);
      return { message: "Failed to send offer. Try again." };
    }
  };

  const handleChange = (e) => {
    setOfferData({ ...offerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setResponseMessage("User not authenticated. Please log in.");
      return;
    }
    if (!offerData.message) {
      setOfferData((prevData) => ({
        ...prevData,
        message: "No message provided",
      }));
    }
    try {
      const response = await createOffer(offerData, token);
      const successMsg = response.message || "Offer sent successfully!";
      setResponseMessage(response.message || "Offer sent successfully!");
         // ✅ Show alert BEFORE closing popup
    alert(successMsg);         // Show alert
      onClose();
    } catch (error) {
      setResponseMessage("Failed to send offer. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-xl font-semibold text-center mb-4">
          Create an Offer
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Price input field is now editable */}
          <input
            type="number"
            name="price"
            value={offerData.price}
            onChange={handleChange} // Allow user to update the price
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={offerData.quantity}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="message"
            placeholder="Message"
            value={offerData.message}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
          >
            Send Offer
          </button>
        </form>
        {responseMessage && (
          <p className="text-center text-sm text-red-500 mt-2">
            {responseMessage}
          </p>
        )}
      </div>
    </div>
  );
}
