// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function UpdateOffer({ offerId, currentOffer, onClose, onUpdate }) {
//   const [offerData, setOfferData] = useState({
//     price: "",
//     quantity: "",
//     message: "",
//   });

//   const [responseMessage, setResponseMessage] = useState("");

//   useEffect(() => {
//     if (currentOffer) {
//       setOfferData({
//         price: currentOffer.price || "",
//         quantity: currentOffer.quantity || "",
//         message: currentOffer.message || "",
//       });
//     }
//   }, [currentOffer]);

//   const handleChange = (e) => {
//     setOfferData({ ...offerData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     if (!token) {
//       setResponseMessage("User not authenticated. Please log in.");
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `/api/offers/update/${offerId}`,
//         offerData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data) {
//         setResponseMessage("Offer updated successfully!");
//         onUpdate(offerId, offerData); // ✅ Update parent state
//         setTimeout(() => {
//           setResponseMessage("");
//           onClose(); // ✅ Close the popup after success
//         }, 2000);
//       }
//     } catch (error) {
//       console.error("Error updating offer:", error);
//       setResponseMessage("Failed to update offer. Try again.");
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h3 className="text-lg font-semibold mb-3">Update Offer</h3>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-2">
//           <input
//             type="number"
//             name="price"
//             placeholder="New Price"
//             value={offerData.price}
//             onChange={handleChange}
//             required
//             className="p-2 border rounded"
//           />

//           <input
//             type="number"
//             name="quantity"
//             placeholder="New Quantity"
//             value={offerData.quantity}
//             onChange={handleChange}
//             required
//             className="p-2 border rounded"
//           />

//           <input
//             type="text"
//             name="message"
//             placeholder="Message (optional)"
//             value={offerData.message}
//             onChange={handleChange}
//             className="p-2 border rounded"
//           />

//           <div className="flex justify-between mt-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
//             >
//               Submit
//             </button>
//           </div>
//         </form>

//         {responseMessage && <p className="text-sm mt-2 text-green-600">{responseMessage}</p>}
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateOffer({ offerId, currentOffer, onClose, onUpdate }) {
  const [offerData, setOfferData] = useState({
    price: "",
    quantity: "",
    message: "",
    deliveryDays: "", // Added deliveryDays
    sample_needed: false,
  });

  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    if (currentOffer) {
      setOfferData({
        price: currentOffer.price || "",
        quantity: currentOffer.quantity || "",
        message: currentOffer.message || "",
        deliveryDays: currentOffer.deliveryDays || "", // Initialize deliveryDays
          sample_needed: currentOffer.sample_needed || false,
      });
    }
  }, [currentOffer]);

  const handleChange = (e) => {
    setOfferData({ ...offerData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setOfferData({ ...offerData, sample_needed: e.target.checked });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setResponseMessage("User not authenticated. Please log in.");
      return;
    }

    // Validate deliveryDays
    // if (offerData.deliveryDays < 1 || offerData.deliveryDays > 100) {
    //   setResponseMessage("Delivery days must be between 1 and 100.");
    //   return;
    // }

        const deliveryDays = new Date(offerData.deliveryDays);
    if (isNaN(deliveryDays.getTime())) {
      setResponseMessage("Please enter a valid delivery date.");
      return;
    }


    try {
      const response = await axios.put(
        `/api/offers/update/${offerId}`,
        offerData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setResponseMessage("Offer updated successfully!");
        onUpdate(offerId, offerData); // ✅ Update parent state
        setTimeout(() => {
          setResponseMessage("");
          onClose(); // ✅ Close the popup after success
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating offer:", error);
      setResponseMessage("Failed to update offer. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-3">Update Offer</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="number"
            name="price"
            placeholder="New Price"
            value={offerData.price}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />

          <input
            type="number"
            name="quantity"
            placeholder="New Quantity"
            value={offerData.quantity}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />

          {/* <input
            type="number"
            name="deliveryDays"
            placeholder="Delivery Days (1-100)"
            value={offerData.deliveryDays}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          /> */}
             <input
                type="date" // Changed from number to date input for deliveryDate
                name="deliveryDays"
                placeholder="Delivery Date"
                value={offerData.deliveryDays}
                onChange={handleChange}
                required
                className="p-2 border rounded"
              />

          <input
            type="text"
            name="message"
            placeholder="Message (optional)"
            value={offerData.message}
            onChange={handleChange}
            maxLength="50"
            className="p-2 border rounded"
          />

           {/* Sample Needed Checkbox */}
          <div className="flex items-center mt-3">
            <input
              type="checkbox"
              name="sample_needed"
              checked={offerData.sample_needed}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label htmlFor="sample_needed" className="text-sm text-gray-700">
              Sample Needed
            </label>
          </div>


          <div className="flex justify-between mt-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </form>

        {responseMessage && <p className="text-sm mt-2 text-green-600">{responseMessage}</p>}
      </div>
    </div>
  );
}
