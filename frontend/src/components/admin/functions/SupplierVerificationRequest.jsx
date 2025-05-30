// import React, { useEffect, useState } from 'react';
// import { SupplierVerificationService } from '../hooks/supplierVerificationService';
// export default function SupplierVerificationRequest() {
// const [verifications, setVerifications] = useState([]);
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

//   if (loading) return <div>Loading admin verifications...</div>;
//   if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

//   return (
//     <div>
//       <h2>Admin Verifications</h2>
//       {verifications.length === 0 ? (
//         <p>No admin verifications found.</p>
//       ) : (
//         <ul>
//           {verifications.map((verification) => (
//             <li key={verification._id}>
//               <strong>User ID:</strong> {verification.user?._id || 'N/A'} <br />
//               <strong>Status:</strong> {verification.status} <br />
//               <strong>Requested At:</strong> {new Date(verification.requestedAt).toLocaleString()} <br />
//               {verification.rejectionReason && (
//                 <>
//                   <strong>Rejection Reason:</strong> {verification.rejectionReason} <br />
//                 </>
//               )}
//               {verification.websiteUrl && (
//                 <>
//                   <strong>Website:</strong> <a href={verification.websiteUrl} target="_blank" rel="noreferrer">{verification.websiteUrl}</a> <br />
//                 </>
//               )}
//               {verification.image && verification.image.length > 0 && (
//                 <img src={verification.image[0]} alt="Verification" style={{ width: 100, height: 100, objectFit: 'cover' }} />
//               )}
//               <hr />
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }


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
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || 'Failed to approve');
//       }
//       alert('Verification approved successfully!');
      
//       // Call onSuccess callback if provided
//       if (typeof onSuccess === 'function') {
//         onSuccess(id);
//       }

//       // Refresh list after approval
//       setLoading(true);
//       const data = await SupplierVerificationService(token);
//       setVerifications(data);
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (loading) return <div>Loading admin verifications...</div>;
//   if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

//   return (
//     <div>
//       <h2>Admin Verifications</h2>
//       {verifications.length === 0 ? (
//         <p>No admin verifications found.</p>
//       ) : (
//         <ul>
//           {verifications.map((verification) => (
//             <li key={verification._id}>
//               <strong>User ID:</strong> {verification.user?._id || 'N/A'} <br />
//               <strong>Status:</strong> {verification.status} <br />
//               <strong>Requested At:</strong> {new Date(verification.requestedAt).toLocaleString()} <br />
//               {verification.rejectionReason && (
//                 <>
//                   <strong>Rejection Reason:</strong> {verification.rejectionReason} <br />
//                 </>
//               )}
//               {verification.websiteUrl && (
//                 <>
//                   <strong>Website:</strong> <a href={verification.websiteUrl} target="_blank" rel="noreferrer">{verification.websiteUrl}</a> <br />
//                 </>
//               )}
//               {verification.image && verification.image.length > 0 && (
//                 <img src={verification.image[0]} alt="Verification" style={{ width: 100, height: 100, objectFit: 'cover' }} />
//               )}

//               {verification.status === 'pending' && (
//                 <button onClick={() => handleApprove(verification._id)}>Approve</button>
//               )}

//               <hr />
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import { SupplierVerificationService } from '../hooks/supplierVerificationService';

export default function SupplierVerificationRequest({ onSuccess }) {
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('User not authenticated');
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
    const token = localStorage.getItem('token');
    if (!token) {
      alert('User not authenticated');
      return;
    }
    try {
      const res = await fetch(`/api/adminVerification/approve/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to approve');
      }
      alert('Verification approved successfully!');

      if (typeof onSuccess === 'function') {
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
    const token = localStorage.getItem('token');
    if (!token) {
      alert('User not authenticated');
      return;
    }
    // Optional: You can add a prompt to ask for rejection reason here
    const rejectionReason = prompt('Please enter rejection reason:', 'Incomplete documents');

    if (rejectionReason === null) {
      // User cancelled prompt
      return;
    }

    try {
      const res = await fetch(`/api/adminVerification/reject/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rejectionReason }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to reject');
      }
      alert('Verification rejected successfully!');

      if (typeof onSuccess === 'function') {
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

  if (loading) return <div className="p-4 text-gray-600">Loading admin verifications...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Verifications</h2>
      {verifications.length === 0 ? (
        <p className="text-gray-600">No admin verifications found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {verifications.map((verification) => (
            <div
              key={verification._id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3"
            >
              <div>
                <strong className="font-medium text-gray-700">User ID:</strong> {verification.user?._id || 'N/A'}
              </div>
              <div>
                <strong className="font-medium text-gray-700">Status:</strong> 
                <span className={`ml-1 px-2 py-1 text-xs rounded-full ${
                  verification.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  verification.status === 'approved' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {verification.status}
                </span>
              </div>
              <div>
                <strong className="font-medium text-gray-700">Requested At:</strong>{' '}
                {new Date(verification.requestedAt).toLocaleString()}
              </div>
              {verification.rejectionReason && (
                <div>
                  <strong className="font-medium text-gray-700">Rejection Reason:</strong> 
                  <p className="text-sm text-gray-600 mt-1">{verification.rejectionReason}</p>
                </div>
              )}
              {verification.websiteUrl && (
                <div>
                  <strong className="font-medium text-gray-700">Website:</strong>{' '}
                  <a
                    href={verification.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline break-all"
                  >
                    {verification.websiteUrl}
                  </a>
                </div>
              )}
              {verification.image && verification.image.length > 0 && (
                <img
                  src={verification.image[0]}
                  alt="Verification"
                  className="w-full h-36 object-cover rounded mt-2 border border-gray-200"
                />
              )}

              {verification.status === 'pending' && (
                <div>
                <button
                  onClick={() => handleApprove(verification._id)}
                  className="mt-auto py-2 px-3 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Approve
                </button>
                 <button
                    onClick={() => handleReject(verification._id)}
                    className="py-2 px-3 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Reject
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