// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { selectUser } from "../../redux/reducers/userSlice";
// import axios from "axios";

// export default function CounterOffer({ offerId, updateStatus,disabled  }) {
//   const user = useSelector(selectUser);
//   const token = user?.id ? localStorage.getItem("token") : null;

//   const [showForm, setShowForm] = useState(false);
//   const [counterData, setCounterData] = useState({
//     price: "",
//     quantity: "",
//     message: "",
//   });

//   const [responseMessage, setResponseMessage] = useState("");

//   const handleChange = (e) => {
//     setCounterData({ ...counterData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!token) {
//       setResponseMessage("User not authenticated. Please log in.");
//       return;
//     }
//     // ✅ Close the popup immediately when submit is clicked
//     setShowForm(false);
//      // ✅ Optimistically update UI before the API call
//   updateStatus(offerId, "counter", counterData.price, counterData.quantity);
//     try {
//       const response = await axios.put(
//         `/api/offers/counter/${offerId}`,
//         counterData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.success) {

//         // ✅ Update UI with new offer details
//         updateStatus(offerId, "counter", counterData.price, counterData.quantity);
//         setShowForm(false);
//         // ✅ Clear form fields for the next use
//         setCounterData({ price: "", quantity: "", message: "" });

//         // ✅ Show success message temporarily
//         setResponseMessage("Counteroffer sent successfully!");
//         setTimeout(() => setResponseMessage(""), 3000);
//       } else {
//         setResponseMessage(response.data.message || "Failed to send counteroffer.");
//       }
//     } catch (error) {
//       console.error("Error sending counteroffer:", error);
//       setResponseMessage("Failed to send counteroffer. Try again.");
//     }
//   };

//   return (
//     <div>
//       {/* ✅ Counteroffer Button */}
//       <button
//         onClick={() => setShowForm(true)}
//         disabled={disabled}
//         className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//       >
//       {disabled ? "Limit Reached" : "Counter Offer"}
//       </button>

//       {/* ✅ Popup Form */}
//       {showForm && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h3 className="text-lg font-semibold mb-3">Counter Offer</h3>
//             <form onSubmit={handleSubmit} className="flex flex-col gap-2">
//               <input
//                 type="number"
//                 name="price"
//                 placeholder="New Price"
//                 value={counterData.price}
//                 onChange={handleChange}
//                 required
//                 className="p-2 border rounded"
//               />

//               <input
//                 type="number"
//                 name="quantity"
//                 placeholder="New Quantity"
//                 value={counterData.quantity}
//                 onChange={handleChange}
//                 required
//                 className="p-2 border rounded"
//               />

//               <input
//                 type="text"
//                 name="message"
//                 placeholder="Message (optional)"
//                 value={counterData.message}
//                 onChange={handleChange}
//                 className="p-2 border rounded"
//               />

//               <div className="flex justify-between mt-3">
//                 <button
//                   type="button"
//                   onClick={() => setShowForm(false)}
//                   className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"

//                   className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>

//             {responseMessage && <p className="text-sm mt-2">{responseMessage}</p>}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducers/userSlice";
import axios from "axios";

export default function CounterOffer({ offerId, updateStatus, disabled }) {
  const user = useSelector(selectUser);
  const token = user?.id ? localStorage.getItem("token") : null;

  const [showForm, setShowForm] = useState(false);
  const [counterData, setCounterData] = useState({
    price: "",
    quantity: "",
    message: "",
    deliveryDays: "", // Added deliveryDays field
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setCounterData({ ...counterData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setCounterData({ ...counterData, sample_needed: e.target.checked }); // Update sample_needed value based on checkbox state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setResponseMessage("User not authenticated. Please log in.");
      return;
    }

    // Validate deliveryDays
    // if (counterData.deliveryDays < 1 || counterData.deliveryDays > 100) {
    //   setResponseMessage("Delivery days must be between 1 and 100.");
    //   return;
    // }

    const deliveryDays = new Date(counterData.deliveryDays);
    if (isNaN(deliveryDays.getTime())) {
      setResponseMessage("Please enter a valid delivery date.");
      return;
    }

    // Close the form immediately after submission
    setShowForm(false);

    // Optimistically update the UI before the API call
    updateStatus(
      offerId,
      "counter",
      counterData.price,
      counterData.quantity,
      counterData.deliveryDays
    );

    try {
      const response = await axios.put(
        `/api/offers/counter/${offerId}`,
        counterData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Update UI with new offer details
        updateStatus(
          offerId,
          "counter",
          counterData.price,
          counterData.quantity,
          counterData.deliveryDays
        );
        setShowForm(false);
        // Clear form fields for next use
        setCounterData({
          price: "",
          quantity: "",
          message: "",
          deliveryDays: "",
          sample_needed: false,
        });

        // Show success message temporarily
        setResponseMessage("Counteroffer sent successfully!");
        setTimeout(() => setResponseMessage(""), 3000);
      } else {
        setResponseMessage(
          response.data.message || "Failed to send counteroffer."
        );
      }
    } catch (error) {
      console.error("Error sending counteroffer:", error);
      setResponseMessage("Failed to send counteroffer. Try again.");
    }
  };

  return (
    <div>
      {/* Counteroffer Button */}
      {/* <button
        onClick={() => setShowForm(true)}
        disabled={disabled}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {disabled ? "Limit Reached" : "Counter Offer"}
      </button> */}
      {disabled ? (
        <p className="text-red-600 font-semibold mb-2">Limit Reached</p>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Counter Offer
        </button>
      )}

      {/* Popup Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-3">Counter Offer</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                type="number"
                name="price"
                placeholder="New Price"
                value={counterData.price}
                onChange={handleChange}
                required
                className="p-2 border rounded"
              />

              <input
                type="number"
                name="quantity"
                placeholder="New Quantity"
                value={counterData.quantity}
                onChange={handleChange}
                required
                className="p-2 border rounded"
              />

              {/* <input
                type="number"
                name="deliveryDays"
                placeholder="Delivery Days (1-100)"
                value={counterData.deliveryDays}
                onChange={handleChange}
                required
                className="p-2 border rounded"
              /> */}

              <input
                type="date" // Changed from number to date input for deliveryDate
                name="deliveryDays"
                placeholder="Delivery Date"
                value={counterData.deliveryDays}
                onChange={handleChange}
                required
                className="p-2 border rounded"
              />

              <input
                type="text"
                name="message"
                placeholder="Message (optional)"
                value={counterData.message}
                maxLength="50"
                onChange={handleChange}
                className="p-2 border rounded"
              />

              {/* Sample Needed Checkbox */}
              <div className="flex items-center mt-3">
                <input
                  type="checkbox"
                  name="sample_needed"
                  checked={counterData.sample_needed}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label
                  htmlFor="sample_needed"
                  className="text-sm text-gray-700"
                >
                  Sample Needed
                </label>
              </div>

              <div className="flex justify-between mt-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
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

            {responseMessage && (
              <p className="text-sm mt-2">{responseMessage}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
