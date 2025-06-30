

// import React from "react";
// import { useParams, Link } from "react-router-dom";
// import ExporterOrdersList from "../../../components/admin/functions/ExporterOrdersList";
// import BackButton from "../../../components/BackButton";

// const ExporterOrdersPageByAdmin = () => {
//   const { exporterId } = useParams();
  


//   return (
//     <div className="pt-20 px-6">
//       {/* Title and Back Button */}
//       <div className="mb-6 flex items-center justify-between">
//         <h2 className="text-2xl font-semibold text-gray-800">Exporter Orders (Admin View)</h2>
//         <BackButton className="mb-4 bg-primary-800 text-white hover:bg-primary-600 px-4 py-2 rounded-lg shadow-md" />
//       </div>

//       {/* Exporter Orders List */}
//       <ExporterOrdersList
//         exporterId={exporterId}
//         apiEndpoint="/api/admin/orders/exporter"
//         title="Orders for Exporter"
//       />

//       {/* Chat with Exporter */}
//       <div className="mt-6 flex justify-center">
//         <Link
//           to={`/chat?supplierId=${exporterId}`}
//           className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
//         >
//           <svg
//             className="w-5 h-5 mr-2"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//             />
//           </svg>
//           Chat with Exporter
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ExporterOrdersPageByAdmin;





import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ExporterOrdersList from "../../../components/admin/functions/ExporterOrdersList";
import BackButton from "../../../components/BackButton";

const ExporterOrdersPageByAdmin = () => {
  const { exporterId } = useParams();
  const [exporter, setExporter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExporter = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(`/api/admin/users/${exporterId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setExporter(data);
      } catch (err) {
        console.error("Error fetching exporter:", err);
        setError("Failed to load exporter data.");
      } finally {
        setLoading(false);
      }
    };

    fetchExporter();
  }, [exporterId]);

  return (
    <div className="pt-20 px-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Exporter Orders (Admin View)</h2>
        <BackButton className="mb-4 bg-primary-800 text-white hover:bg-primary-600 px-4 py-2 rounded-lg shadow-md" />
      </div>

      {loading ? (
        <p className="text-gray-500">Loading exporter details...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : exporter ? (
        <>
          {/* Exporter Info Section */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow border border-gray-200">
            <h3 className="text-xl font-medium text-gray-700 mb-2">Exporter Info</h3>
            <p><strong>Name:</strong> {exporter.name}</p>
            <p><strong>Email:</strong> {exporter.email}</p>
            <p><strong>Phone:</strong> {exporter.phoneNumber || "N/A"}</p>
            <p><strong>Business:</strong> {exporter.businessName || "N/A"}</p>
            <p><strong>City:</strong> {exporter.city || "N/A"}</p>
            <p><strong>Role:</strong> {exporter.role}</p>
          </div>

          {/* Exporter Orders List */}
          <ExporterOrdersList
            exporterId={exporterId}
            apiEndpoint="/api/admin/orders/exporter"
            title="Orders for Exporter"
          />

          {/* Chat Button */}
          <div className="mt-6 flex justify-center">
            <Link
              to={`/chat?supplierId=${exporterId}`}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Chat with Exporter
            </Link>
          </div>
        </>
      ) : (
        <p className="text-red-600">Exporter not found.</p>
      )}
    </div>
  );
};

export default ExporterOrdersPageByAdmin;
