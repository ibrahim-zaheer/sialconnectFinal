// import React, { useState } from "react";
// import axios from "axios";

// const CreateComplaint = ({ orderId, closeModal }) => {
//   const [topic, setTopic] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!topic || !message) {
//       setError("All fields are required");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const response = await axios.post("/api/complaint/complaints", {
//         orderId,
//         topic,
//         message,
//       });

//       setSuccessMessage("Complaint submitted successfully!");
//       setTopic("");
//       setMessage("");
//       setError("");
//     } catch (err) {
//       setError("Error creating complaint");
//       console.error(err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
//         <button
//           onClick={closeModal}
//           className="absolute top-2 right-2 text-xl font-semibold text-gray-500"
//         >
//           &times;
//         </button>
//         <h3 className="text-lg font-semibold mb-4">Create a Complaint for Order {orderId}</h3>
//         {error && <p className="text-red-600">{error}</p>}
//         {successMessage && <p className="text-green-600">{successMessage}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Topic</label>
//             <select
//               value={topic}
//               onChange={(e) => setTopic(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               required
//             >
//               <option value="">Select Topic</option>
//               <option value="Money">Money</option>
//               <option value="Delay">Delay</option>
//               <option value="Quality">Quality</option>
//               <option value="Customer Service">Customer Service</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Message</label>
//             <textarea
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               required
//               maxLength="500"
//             />
//           </div>
//           <button
//             type="submit"
//             className={`w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Submitting..." : "Submit Complaint"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateComplaint;


import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateComplaint = ({ orderId, closeModal }) => {
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasComplaint, setHasComplaint] = useState(false); // Track if a complaint exists

  useEffect(() => {
    // Check if a complaint already exists for this order
    const checkComplaintExistence = async () => {
      try {
        const response = await axios.get(`/api/complaint/complaints/${orderId}`);
        if (response.data.length > 0) {
          setHasComplaint(true); // Complaint already exists
        }
      } catch (err) {
        console.error("Error checking for existing complaint:", err);
      }
    };

    checkComplaintExistence();
  }, [orderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic || !message) {
      setError("All fields are required");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/complaint/complaints", {
        orderId,
        topic,
        message,
      });

      setSuccessMessage("Complaint submitted successfully!");
      setTopic("");
      setMessage("");
      setError("");
    } catch (err) {
      setError("Error creating complaint");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-xl font-semibold text-gray-500"
        >
          &times;
        </button>
        <h3 className="text-lg font-semibold mb-4">Create a Complaint for Order {orderId}</h3>

        {hasComplaint ? (
          <p className="text-red-600">A complaint has already been submitted for this order.</p>
        ) : (
          <>
            {error && <p className="text-red-600">{error}</p>}
            {successMessage && <p className="text-green-600">{successMessage}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Topic</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                  disabled={hasComplaint} // Disable the form if complaint exists
                >
                  <option value="">Select Topic</option>
                  <option value="Money">Money</option>
                  <option value="Delay">Delay</option>
                  <option value="Quality">Quality</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                  maxLength="500"
                  disabled={hasComplaint} // Disable the form if complaint exists
                />
              </div>
              <button
                type="submit"
                className={`w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none ${isSubmitting || hasComplaint ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting || hasComplaint} // Disable the button if complaint exists or while submitting
              >
                {hasComplaint ? "Complaint Submitted Already" : isSubmitting ? "Submitting..." : "Submit Complaint"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateComplaint;
