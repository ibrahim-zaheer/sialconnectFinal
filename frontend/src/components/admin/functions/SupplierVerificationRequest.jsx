// import React, { useEffect, useState } from 'react';
// import { SupplierVerificationService } from '../hooks/supplierVerificationService';

// export default function SupplierVerificationRequest({ onSuccess }) {
//   const [verifications, setVerifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     if (!token) {
//       setError('User not authenticated');
//       setLoading(false);
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         const data = await SupplierVerificationService(token);
//         setVerifications(data);
//       } catch (err) {
//         setError(err.response?.data?.message || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   async function handleApprove(id) {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('User not authenticated');
//       return;
//     }
//     try {
//       const res = await fetch(`/api/adminVerification/approve/${id}`, {
//         method: 'PUT',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || 'Failed to approve');
//       }
//       alert('Verification approved successfully!');

//       if (typeof onSuccess === 'function') {
//         onSuccess(id);
//       }

//       setLoading(true);
//       const data = await SupplierVerificationService(token);
//       setVerifications(data);
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//    async function handleReject(id) {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('User not authenticated');
//       return;
//     }
//     // Optional: You can add a prompt to ask for rejection reason here
//     const rejectionReason = prompt('Please enter rejection reason:', 'Incomplete documents');

//     if (rejectionReason === null) {
//       // User cancelled prompt
//       return;
//     }

//     try {
//       const res = await fetch(`/api/adminVerification/reject/${id}`, {
//         method: 'PUT',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ rejectionReason }),
//       });
//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || 'Failed to reject');
//       }
//       alert('Verification rejected successfully!');

//       if (typeof onSuccess === 'function') {
//         onSuccess(id);
//       }

//       setLoading(true);
//       const data = await SupplierVerificationService(token);
//       setVerifications(data);
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (loading) return <div className="p-4 text-gray-600">Loading admin verifications...</div>;
//   if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Verifications</h2>
//       {verifications.length === 0 ? (
//         <p className="text-gray-600">No admin verifications found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//           {verifications.map((verification) => (
//             <div
//               key={verification._id}
//               className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3"
//             >
//               <div>
//                 <strong className="font-medium text-gray-700">User ID:</strong> {verification.user?._id || 'N/A'}
//               </div>
//               <div>
//                 <strong className="font-medium text-gray-700">Status:</strong>
//                 <span className={`ml-1 px-2 py-1 text-xs rounded-full ${
//                   verification.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//                   verification.status === 'approved' ? 'bg-green-100 text-green-800' :
//                   'bg-red-100 text-red-800'
//                 }`}>
//                   {verification.status}
//                 </span>
//               </div>
//               <div>
//                 <strong className="font-medium text-gray-700">Requested At:</strong>{' '}
//                 {new Date(verification.requestedAt).toLocaleString()}
//               </div>
//               {verification.rejectionReason && (
//                 <div>
//                   <strong className="font-medium text-gray-700">Rejection Reason:</strong>
//                   <p className="text-sm text-gray-600 mt-1">{verification.rejectionReason}</p>
//                 </div>
//               )}
//               {verification.websiteUrl && (
//                 <div>
//                   <strong className="font-medium text-gray-700">Website:</strong>{' '}
//                   <a
//                     href={verification.websiteUrl}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="text-blue-600 hover:text-blue-800 hover:underline break-all"
//                   >
//                     {verification.websiteUrl}
//                   </a>
//                 </div>
//               )}
//               {verification.image && verification.image.length > 0 && (
//                 <img
//                   src={verification.image[0]}
//                   alt="Verification"
//                   className="w-full h-36 object-cover rounded mt-2 border border-gray-200"
//                 />
//               )}

//               {verification.status === 'pending' && (
//                 <div>
//                 <button
//                   onClick={() => handleApprove(verification._id)}
//                   className="mt-auto py-2 px-3 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//                 >
//                   Approve
//                 </button>
//                  <button
//                     onClick={() => handleReject(verification._id)}
//                     className="py-2 px-3 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
//                   >
//                     Reject
//                   </button>
//                   </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

//17th June 2025

// import React, { useEffect, useState } from 'react';
// import { SupplierVerificationService } from '../hooks/supplierVerificationService';

// export default function SupplierVerificationRequest({ onSuccess }) {
//   const [verifications, setVerifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     if (!token) {
//       setError('User not authenticated');
//       setLoading(false);
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         const data = await SupplierVerificationService(token);
//         setVerifications(data);
//       } catch (err) {
//         setError(err.response?.data?.message || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   async function handleApprove(id) {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('User not authenticated');
//       return;
//     }
//     try {
//       const res = await fetch(`/api/adminVerification/approve/${id}`, {
//         method: 'PUT',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || 'Failed to approve');
//       }
//       alert('Verification approved successfully!');

//       if (typeof onSuccess === 'function') {
//         onSuccess(id);
//       }

//       setLoading(true);
//       const data = await SupplierVerificationService(token);
//       setVerifications(data);
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleReject(id) {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('User not authenticated');
//       return;
//     }
//     const rejectionReason = prompt('Please enter rejection reason:', 'Incomplete documents');
//     if (rejectionReason === null) return;

//     try {
//       const res = await fetch(`/api/adminVerification/reject/${id}`, {
//         method: 'PUT',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ rejectionReason }),
//       });
//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || 'Failed to reject');
//       }
//       alert('Verification rejected successfully!');

//       if (typeof onSuccess === 'function') {
//         onSuccess(id);
//       }

//       setLoading(true);
//       const data = await SupplierVerificationService(token);
//       setVerifications(data);
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (loading) return <div className="p-4 text-gray-600">Loading admin verifications...</div>;
//   if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Supplier Verification Requests</h2>
//       {verifications.length === 0 ? (
//         <p className="text-gray-600">No verification requests found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//           {verifications.map((verification) => (
//             <div
//               key={verification._id}
//               className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
//             >
//               {/* User Information */}
//               <div className="mb-4">
//                 <h3 className="font-bold text-lg text-gray-800 mb-2">
//                   {verification.user?.name || 'No name provided'}
//                 </h3>
//                 <div className="flex items-center mb-2">
//                   <img
//                     src={verification.user?.profilePicture}
//                     alt="Profile"
//                     className="w-10 h-10 rounded-full mr-3"
//                   />
//                   <div>
//                     <p className="text-sm text-gray-600">{verification.user?.email}</p>
//                     <span className={`text-xs px-2 py-1 rounded-full ${
//                       verification.user?.role === 'supplier' ? 'bg-purple-100 text-purple-800' :
//                       verification.user?.role === 'exporter' ? 'bg-blue-100 text-blue-800' :
//                       'bg-gray-100 text-gray-800'
//                     }`}>
//                       {verification.user?.role}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Business Verification Details */}
//               <div className="space-y-2 mb-4">
//                 <h4 className="font-semibold text-gray-700 border-b pb-1">Business Details</h4>
//                 <div>
//                   <strong className="text-gray-700">Business Name:</strong>
//                   <p>{verification.user?.businessName || 'Not provided'}</p>
//                 </div>
//                 <div>
//                   <strong className="text-gray-700">Address:</strong>
//                   <p>{verification.user?.businessAddress || 'Not provided'}</p>
//                 </div>
//                 <div>
//                   <strong className="text-gray-700">Phone:</strong>
//                   <p>{verification.user?.phoneNumber || 'Not provided'}</p>
//                 </div>
//                 <div>
//                   <strong className="text-gray-700">CNIC:</strong>
//                   <p>{verification.user?.cnic || 'Not provided'}</p>
//                 </div>
//               </div>

//               {/* Verification Metadata */}
//               <div className="space-y-2 border-t pt-3">
//                 <div className="flex justify-between">
//                   <strong className="text-gray-700">Status:</strong>
//                   <span className={`px-2 py-1 text-xs rounded-full ${
//                     verification.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//                     verification.status === 'approved' ? 'bg-green-100 text-green-800' :
//                     'bg-red-100 text-red-800'
//                   }`}>
//                     {verification.status}
//                   </span>
//                 </div>
//                 <div>
//                   <strong className="text-gray-700">Requested:</strong>
//                   <p>{new Date(verification.requestedAt).toLocaleString()}</p>
//                 </div>
//                 {verification.websiteUrl && (
//                   <div>
//                     <strong className="text-gray-700">Website:</strong>
//                     <a
//                       href={verification.websiteUrl}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-blue-600 hover:underline block truncate"
//                     >
//                       {verification.websiteUrl}
//                     </a>
//                   </div>
//                 )}
//                 {verification.rejectionReason && (
//                   <div>
//                     <strong className="text-gray-700">Rejection Reason:</strong>
//                     <p className="text-sm text-red-600">{verification.rejectionReason}</p>
//                   </div>
//                 )}
//               </div>

//               {/* Document Preview */}
//               {verification.image && verification.image.length > 0 && (
//                 <div className="mt-3">
//                   <strong className="text-gray-700 block mb-1">Submitted Documents:</strong>
//                   <div className="grid grid-cols-2 gap-2">
//                     {verification.image.map((img, index) => (
//                       <img
//                         key={index}
//                         src={img}
//                         alt={`Document ${index + 1}`}
//                         className="w-full h-24 object-contain border rounded-md cursor-pointer hover:border-blue-400"
//                         onClick={() => window.open(img, '_blank')}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Action Buttons */}
//               {verification.status === 'pending' && (
//                 <div className="flex justify-end space-x-2 mt-4">
//                   <button
//                     onClick={() => handleReject(verification._id)}
//                     className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
//                   >
//                     Reject
//                   </button>
//                   <button
//                     onClick={() => handleApprove(verification._id)}
//                     className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
//                   >
//                     Approve
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { SupplierVerificationService } from "../hooks/SupplierVerificationService";

export default function SupplierVerificationRequest({ onSuccess }) {
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const data = await SupplierVerificationService(token);
        setVerifications(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  async function handleApprove(id) {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated");
      return;
    }
    try {
      const res = await fetch(`/api/adminVerification/approve/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to approve");
      }
      alert("Verification approved successfully!");

      if (typeof onSuccess === "function") {
        onSuccess(id);
      }

      setLoading(true);
      const data = await SupplierVerificationService(token);
      setVerifications(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleReject(id) {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated");
      return;
    }
    const rejectionReason = prompt(
      "Please enter rejection reason:",
      "Incomplete documents"
    );
    if (rejectionReason === null) return;

    try {
      const res = await fetch(`/api/adminVerification/reject/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rejectionReason }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to reject");
      }
      alert("Verification rejected successfully!");

      if (typeof onSuccess === "function") {
        onSuccess(id);
      }

      setLoading(true);
      const data = await SupplierVerificationService(token);
      setVerifications(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading)
    return (
      <div className="p-4 text-gray-600">Loading admin verifications...</div>
    );
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Supplier Verification Requests
      </h2>
      {verifications.length === 0 ? (
        <p className="text-gray-600">No verification requests found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {verifications.map((verification) => (
            <div
              key={verification._id}
              className="border border-gray-200 rounded-lg p-5 shadow-lg hover:shadow-xl transition-shadow bg-white"
            >
              {/* User Information */}
              <div className="flex items-center mb-4">
                <img
                  src={verification.user?.profilePicture}
                  alt="Profile"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {verification.user?.name || "No name provided"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {verification.user?.email}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 mt-2 inline-block rounded-full ${
                      verification.user?.role === "supplier"
                        ? "bg-purple-100 text-purple-800"
                        : verification.user?.role === "exporter"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {verification.user?.role}
                  </span>
                </div>
              </div>

              {/* Business Verification Details */}
              <div className="space-y-3 mb-4">
                <h4 className="font-semibold text-gray-700 border-b pb-1">
                  Business Details
                </h4>
                <div className="text-sm">
                  <strong className="text-gray-700">Business Name:</strong>
                  <p>{verification.user?.businessName || "Not provided"}</p>
                </div>
                <div className="text-sm">
                  <strong className="text-gray-700">Address:</strong>
                  <p>{verification.user?.businessAddress || "Not provided"}</p>
                </div>
                <div className="text-sm">
                  <strong className="text-gray-700">Phone:</strong>
                  <p>{verification.user?.phoneNumber || "Not provided"}</p>
                </div>
                <div className="text-sm">
                  <strong className="text-gray-700">CNIC:</strong>
                  <p>{verification.user?.cnic || "Not provided"}</p>
                </div>
              </div>

              {/* Verification Metadata */}
              <div className="space-y-3 border-t pt-3">
                <div className="flex justify-between text-sm">
                  <strong className="text-gray-700">Status:</strong>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      verification.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : verification.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {verification.status}
                  </span>
                </div>
                <div className="text-sm">
                  <strong className="text-gray-700">Requested:</strong>
                  <p>{new Date(verification.requestedAt).toLocaleString()}</p>
                </div>
                {verification.websiteUrl && (
                  <div className="text-sm">
                    <strong className="text-gray-700">Website:</strong>
                    <a
                      href={verification.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline block truncate"
                    >
                      {verification.websiteUrl}
                    </a>
                  </div>
                )}
                {verification.rejectionReason && (
                  <div className="text-sm">
                    <strong className="text-gray-700">Rejection Reason:</strong>
                    <p className="text-sm text-red-600">
                      {verification.rejectionReason}
                    </p>
                  </div>
                )}
              </div>

              {/* Document Preview */}
              {verification.image && verification.image.length > 0 && (
                <div className="mt-4">
                  <strong className="text-gray-700 block mb-1">
                    Submitted Documents:
                  </strong>
                  <div className="grid grid-cols-2 gap-3">
                    {verification.image.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Document ${index + 1}`}
                        className="w-full h-24 object-contain border rounded-md cursor-pointer hover:border-blue-400"
                        onClick={() => window.open(img, "_blank")}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {verification.status === "pending" && (
                <div className="flex justify-end space-x-3 mt-5">
                  <button
                    onClick={() => handleReject(verification._id)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(verification._id)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm transition"
                  >
                    Approve
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
