






// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ComplaintsList = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchComplaints = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("/api/complaint/complaints", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setComplaints(response.data);
//       } catch (err) {
//         setError("Error fetching complaints");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchComplaints();
//   }, []);

//   const handleResolveComplaint = async (complaintId) => {
//     try {
//       const token = localStorage.getItem("token");

//       // Send the PUT request to mark the complaint as resolved
//       const response = await axios.put(
//         `/api/complaint/complaints/resolve/${complaintId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // If successful, update the complaint status in the state
//       const updatedComplaint = response.data.complaint;
//       setComplaints((prevComplaints) =>
//         prevComplaints.map((complaint) =>
//           complaint._id === updatedComplaint._id
//             ? { ...complaint, resolved: true }
//             : complaint
//         )
//       );
//     } catch (err) {
//       setError("Error resolving complaint");
//       console.error(err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-lg font-medium text-gray-700">Loading complaints...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="p-6 max-w-md mx-auto bg-red-50 rounded-lg shadow-sm">
//           <div className="text-red-600 font-medium text-lg">{error}</div>
//           <p className="mt-2 text-gray-600">Please try again later.</p>
//         </div>
//       </div>
//     );
//   }

//   if (complaints.length === 0) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center p-6 max-w-md mx-auto bg-white rounded-lg shadow-sm">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-12 w-12 mx-auto text-gray-400"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//           <h3 className="mt-4 text-lg font-medium text-gray-900">No complaints found</h3>
//           <p className="mt-1 text-gray-500">There are currently no complaints to display.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold text-gray-800">Complaints Management</h2>
//         <p className="text-gray-600">View and manage all customer complaints</p>
//       </div>

//       <div className="grid gap-6">
//         {complaints.map((complaint) => (
//           <div key={complaint._id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-200">
//             <div className={`p-5 border-b ${complaint.resolved ? 'bg-green-50' : 'bg-yellow-50'}`}>
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     Complaint for Order #{complaint.orderId?._id?.slice(-8) || 'N/A'}
//                   </h3>
//                   <p className="text-sm text-gray-500 mt-1">
//                     {new Date(complaint.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${complaint.resolved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
//                   {complaint.resolved ? "Resolved" : "Pending"}
//                 </span>
//               </div>
//             </div>

//             <div className="p-5">
//               <div className="mb-4">
//                 <h4 className="text-sm font-medium text-gray-500">Topic</h4>
//                 <p className="mt-1 text-gray-800">{complaint.topic}</p>
//               </div>

//               <div className="mb-4">
//                 <h4 className="text-sm font-medium text-gray-500">Message</h4>
//                 <p className="mt-1 text-gray-800 whitespace-pre-line">{complaint.message}</p>
//               </div>

             
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500">Exporter</h4>
//                   <p className="mt-1 text-gray-800">
//                     {complaint.orderId?.exporterId?.name || 'Not specified'}<br/>
//                     {complaint.orderId?.exporterId?.email ? (
//                       <a
//                         href={`mailto:${complaint.orderId?.exporterId?.email}`}
//                         className="text-blue-600 hover:underline"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         {complaint.orderId?.exporterId?.email}
//                       </a>
//                     ) : 'Not specified'}
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500">Supplier</h4>
//                   <p className="mt-1 text-gray-800">
//                     {complaint.orderId?.supplierId?.name || 'Not specified'}<br/>
//                     {complaint.orderId?.supplierId?.email ? (
//                       <a
//                         href={`mailto:${complaint.orderId?.supplierId?.email}`}
//                         className="text-blue-600 hover:underline"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         {complaint.orderId?.supplierId?.email}
//                       </a>
//                     ) : 'Not specified'}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {!complaint.resolved && (
//               <div className="px-5 py-3 bg-gray-50 border-t flex justify-end">
//                 <button
//                   onClick={() => handleResolveComplaint(complaint._id)}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
//                 >
//                   Mark as Resolved
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ComplaintsList;



// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ComplaintsList = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchComplaints = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("/api/complaint/complaints", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setComplaints(response.data);
//       } catch (err) {
//         setError("Error fetching complaints");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchComplaints();
//   }, []);

//   const handleResolveComplaint = async (complaintId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.put(
//         `/api/complaint/complaints/resolve/${complaintId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const updatedComplaint = response.data.complaint;
//       setComplaints((prevComplaints) =>
//         prevComplaints.map((complaint) =>
//           complaint._id === updatedComplaint._id
//             ? { ...complaint, resolved: true }
//             : complaint
//         )
//       );
//     } catch (err) {
//       setError("Error resolving complaint");
//       console.error(err);
//     }
//   };

//   const handleEmailClick = (email) => {
//     // Create a temporary link and click it programmatically
//     const mailtoLink = document.createElement('a');
//     mailtoLink.href = `mailto:${email}`;
//     mailtoLink.target = '_blank';
//     mailtoLink.rel = 'noopener noreferrer';
//     document.body.appendChild(mailtoLink);
//     mailtoLink.click();
//     document.body.removeChild(mailtoLink);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-lg font-medium text-gray-700">Loading complaints...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="p-6 max-w-md mx-auto bg-red-50 rounded-lg shadow-sm">
//           <div className="text-red-600 font-medium text-lg">{error}</div>
//           <p className="mt-2 text-gray-600">Please try again later.</p>
//         </div>
//       </div>
//     );
//   }

//   if (complaints.length === 0) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center p-6 max-w-md mx-auto bg-white rounded-lg shadow-sm">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-12 w-12 mx-auto text-gray-400"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//           <h3 className="mt-4 text-lg font-medium text-gray-900">No complaints found</h3>
//           <p className="mt-1 text-gray-500">There are currently no complaints to display.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold text-gray-800">Complaints Management</h2>
//         <p className="text-gray-600">View and manage all customer complaints</p>
//       </div>

//       <div className="grid gap-6">
//         {complaints.map((complaint) => (
//           <div key={complaint._id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-200">
//             <div className={`p-5 border-b ${complaint.resolved ? 'bg-green-50' : 'bg-yellow-50'}`}>
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     Complaint for Order #{complaint.orderId?._id?.slice(-8) || 'N/A'}
//                   </h3>
//                   <p className="text-sm text-gray-500 mt-1">
//                     {new Date(complaint.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${complaint.resolved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
//                   {complaint.resolved ? "Resolved" : "Pending"}
//                 </span>
//               </div>
//             </div>

//             <div className="p-5">
//               <div className="mb-4">
//                 <h4 className="text-sm font-medium text-gray-500">Topic</h4>
//                 <p className="mt-1 text-gray-800">{complaint.topic}</p>
//               </div>

//               <div className="mb-4">
//                 <h4 className="text-sm font-medium text-gray-500">Message</h4>
//                 <p className="mt-1 text-gray-800 whitespace-pre-line">{complaint.message}</p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500">Exporter</h4>
//                   <p className="mt-1 text-gray-800">
//                     {complaint.orderId?.exporterId?.name || 'Not specified'}<br/>
//                     {complaint.orderId?.exporterId?.email ? (
//                       <button
//                         onClick={() => handleEmailClick(complaint.orderId.exporterId.email)}
//                         className="text-blue-600 hover:underline focus:outline-none"
//                       >
//                         {complaint.orderId.exporterId.email}
//                       </button>
//                     ) : 'Not specified'}
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500">Supplier</h4>
//                   <p className="mt-1 text-gray-800">
//                     {complaint.orderId?.supplierId?.name || 'Not specified'}<br/>
//                     {complaint.orderId?.supplierId?.email ? (
//                       <button
//                         onClick={() => handleEmailClick(complaint.orderId.supplierId.email)}
//                         className="text-blue-600 hover:underline focus:outline-none"
//                       >
//                         {complaint.orderId.supplierId.email}
//                       </button>
//                     ) : 'Not specified'}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {!complaint.resolved && (
//               <div className="px-5 py-3 bg-gray-50 border-t flex justify-end">
//                 <button
//                   onClick={() => handleResolveComplaint(complaint._id)}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
//                 >
//                   Mark as Resolved
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ComplaintsList;

import React, { useState, useEffect } from "react";
import axios from "axios";

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const MAX_MESSAGE_LENGTH = 10;

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/complaint/complaints", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComplaints(response.data);
      } catch (err) {
        setError("Error fetching complaints");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleResolveComplaint = async (complaintId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `/api/complaint/complaints/resolve/${complaintId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedComplaint = response.data.complaint;
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === updatedComplaint._id
            ? { ...complaint, resolved: true }
            : complaint
        )
      );
    } catch (err) {
      setError("Error resolving complaint");
      console.error(err);
    }
  };
  





  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading complaints...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-6 max-w-md mx-auto bg-red-50 rounded-lg shadow-sm">
          <div className="text-red-600 font-medium text-lg">{error}</div>
          <p className="mt-2 text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  if (complaints.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 max-w-md mx-auto bg-white rounded-lg shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No complaints found</h3>
          <p className="mt-1 text-gray-500">There are currently no complaints to display.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Complaints Management</h2>
        <p className="text-gray-600">View and manage all customer complaints</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-2 px-4 text-left">Complaint ID</th>
              <th className="py-2 px-4 text-left">Order ID</th>
              <th className="py-2 px-4 text-left">Topic</th>
              <th className="py-2 px-4 text-left">Message</th>
              <th className="py-2 px-4 text-left">Exporter</th>
              <th className="py-2 px-4 text-left">Supplier</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {complaints.map((complaint) => (
              <tr key={complaint._id} className="border-b">
                <td className="py-2 px-4">{complaint._id}</td>
                <td className="py-2 px-4">{complaint.orderId?._id?.slice(-8) || "N/A"}</td>
                <td className="py-2 px-4">{complaint.topic}</td>
                {/* <td className="py-2 px-4">{complaint.message}</td> */}
                <td className="py-2 px-4" title={complaint.message}>
  {complaint.message.length > MAX_MESSAGE_LENGTH
    ? complaint.message.substring(0, MAX_MESSAGE_LENGTH) + "..."
    : complaint.message}
</td>

                <td className="py-2 px-4">
                  {complaint.orderId?.exporterId?.name || "Not specified"}
                  <br />
                  {complaint.orderId?.exporterId?.email && (
                  //  <>
                  //     {complaint.orderId.exporterId.email}
                  //   </>
                  <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${complaint.orderId.exporterId.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {complaint.orderId.exporterId.email}
                    </a>
                  )}
                </td>
                <td className="py-2 px-4">
                  {complaint.orderId?.supplierId?.name || "Not specified"}
                  <br />
                  {complaint.orderId?.supplierId?.email && (
                    // <>
                    //   {complaint.orderId.supplierId.email}
                    // </>
                     <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${complaint.orderId.supplierId.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {complaint.orderId.supplierId.email}
                    </a>
                  )}
                </td>
                <td className="py-2 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      complaint.resolved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {complaint.resolved ? "Resolved" : "Pending"}
                  </span>
                </td>
                <td className="py-2 px-4">
                  {!complaint.resolved && (
                    <button
                      onClick={() => handleResolveComplaint(complaint._id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Mark as Resolved
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintsList;
