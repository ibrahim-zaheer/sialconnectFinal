// import React from "react";
// import { useParams, Link } from "react-router-dom";
// import BackButton from "../../../components/BackButton";

// export default function SupplierList() {
//   const { supplierId } = useParams(); // Get supplierId from the URL

//   return (
//     <div>
//       <div className="pt-20"></div>
//       <BackButton />
//       <h2 className="text-xl font-semibold">Supplier Details</h2>

//       {/* Display Supplier's Order and Product Links */}
//       <div className="border-b p-4">
//         <h3>Supplier ID: {supplierId}</h3>

//         {/* Link to Orders Page for the specific supplier */}
//         <div className="mt-2">
//           <Link
//             to={`/admin/user/supplier/order/${supplierId}`}
//             className="text-blue-600 hover:text-blue-800"
//           >
//             View Orders
//           </Link>
//         </div>

//         <Link
//           to={`/chat?supplierId=${supplierId}`}
//           className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
//           Chat with Supplier
//         </Link>

//         {/* Link to Products Page for the specific supplier */}
//         <div className="mt-2">
//           <Link
//             to={`/admin/user/supplier/product/${supplierId}`}
//             className="text-blue-600 hover:text-blue-800"
//           >
//             View Products
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import { useParams, Link } from "react-router-dom";
// import BackButton from "../../../components/BackButton";

// export default function SupplierList() {
//   const { supplierId } = useParams(); // Get supplierId from the URL

//   return (
//     <div className="pt-20 px-6">
//       <BackButton />
//       <h2 className="text-2xl font-semibold text-gray-800">Supplier Details</h2>

//       {/* Display Supplier's Order and Product Links */}
//       <div className="mt-6">
//         <h3 className="text-lg text-gray-600">Supplier ID: {supplierId}</h3>

//         {/* Card Container for Options */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">

//           {/* View Orders Card */}
//           <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
//             <div className="p-6">
//               <h4 className="text-xl font-medium text-gray-800 mb-4">Orders</h4>
//               <p className="text-gray-600 mb-4">View and manage the orders from this supplier.</p>
//               <Link
//                 to={`/admin/user/supplier/order/${supplierId}`}
//                 className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
//               >
//                 View Orders
//               </Link>
//             </div>
//           </div>

//           {/* View Products Card */}
//           <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
//             <div className="p-6">
//               <h4 className="text-xl font-medium text-gray-800 mb-4">Products</h4>
//               <p className="text-gray-600 mb-4">Explore the products offered by this supplier.</p>
//               <Link
//                 to={`/admin/user/supplier/product/${supplierId}`}
//                 className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
//               >
//                 View Products
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Chat Button */}
//         <div className="mt-6 flex justify-center">
//           <Link
//             to={`/chat?supplierId=${supplierId}`}
//             className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
//           >
//             <svg
//               className="w-5 h-5 mr-2"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//               />
//             </svg>
//             Chat with Supplier
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import BackButton from "../../../components/BackButton";

// export default function SupplierList() {
//   const { supplierId } = useParams(); // Get supplierId from the URL
//   const [supplier, setSupplier] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchSupplier = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const { data } = await axios.get(`/api/admin/users/${supplierId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setSupplier(data);
//       } catch (err) {
//         console.error("Error fetching supplier:", err);
//         setError("Failed to load supplier data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSupplier();
//   }, [supplierId]);

//   return (
//     <div className="pt-20 px-10">
//       <BackButton />
//       <h2 className="text-2xl font-semibold text-gray-800">Supplier Details</h2>

//       {loading ? (
//         <p className="mt-4 text-gray-500">Loading...</p>
//       ) : error ? (
//         <p className="mt-4 text-red-600">{error}</p>
//       ) : supplier ? (
//         <>
//           {/* Supplier Info Section */}
//           <div className="mt-4 bg-white p-4 rounded-lg shadow border border-gray-200">
//             <h3 className="text-xl font-medium text-gray-700 mb-2">
//               Basic Info
//             </h3>
//             <p>
//               <strong>Name:</strong> {supplier.name}
//             </p>
//             <p>
//               <strong>Email:</strong> {supplier.email}
//             </p>
//             <p>
//               <strong>Phone:</strong> {supplier.phoneNumber || "N/A"}
//             </p>
//             <p>
//               <strong>Business:</strong> {supplier.businessName || "N/A"}
//             </p>
//             <p>
//               <strong>City:</strong> {supplier.city || "N/A"}
//             </p>
//             <p>
//               <strong>Role:</strong> {supplier.role}
//             </p>
//           </div>

//           {/* Navigation Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
//             {/* Orders */}
//             <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
//               <div className="p-6">
//                 <h4 className="text-xl font-medium text-gray-800 mb-4">
//                   Orders
//                 </h4>
//                 <p className="text-gray-600 mb-4">
//                   View and manage the orders from this supplier.
//                 </p>
//                 <Link
//                   to={`/admin/user/supplier/order/${supplierId}`}
//                   className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
//                 >
//                   View Orders
//                 </Link>
//               </div>
//             </div>

//             {/* Products */}
//             <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
//               <div className="p-6">
//                 <h4 className="text-xl font-medium text-gray-800 mb-4">
//                   Products
//                 </h4>
//                 <p className="text-gray-600 mb-4">
//                   Explore the products offered by this supplier.
//                 </p>
//                 <Link
//                   to={`/admin/user/supplier/product/${supplierId}`}
//                   className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
//                 >
//                   View Products
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Chat Button */}
//           <div className="mt-6 flex justify-center">
//             <Link
//               to={`/chat?supplierId=${supplierId}`}
//               className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
//             >
//               <svg
//                 className="w-5 h-5 mr-2"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                 />
//               </svg>
//               Chat with Supplier
//             </Link>
//           </div>
//         </>
//       ) : (
//         <p className="mt-4 text-red-600">Supplier not found.</p>
//       )}
//     </div>
//   );
// }

// ================================

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import BackButton from "../../../components/BackButton";

export default function SupplierList() {
  const { supplierId } = useParams();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`/api/admin/users/${supplierId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSupplier(data);
      } catch (err) {
        console.error("Error fetching supplier:", err);
        setError("Failed to load supplier data.");
      } finally {
        setLoading(false);
      }
    };

    fetchSupplier();
  }, [supplierId]);

  return (
    <div className="space-y-6 p-10 pt-20">
      {/* Header Section */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-neutral-800">
            Supplier Details
          </h2>
          <p className="text-neutral-500">
            {loading
              ? "Loading supplier information..."
              : "View and manage supplier details"}
          </p>
        </div>
        <BackButton className="bg-primary-800 text-white hover:bg-primary-600" />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : error ? (
        <div className="bg-surface rounded-xl p-6 shadow-xs border border-neutral-200">
          <p className="text-red-600">{error}</p>
        </div>
      ) : supplier ? (
        <>
          {/* Supplier Info Section */}
          <div className="bg-surface rounded-xl p-6 shadow-xs border border-neutral-200 hover:shadow-sm transition-shadow">
            <h3 className="text-lg font-medium text-neutral-700 mb-4">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-neutral-600">
                  <span className="font-medium">Name:</span> {supplier.name}
                </p>
                <p className="text-neutral-600">
                  <span className="font-medium">Email:</span> {supplier.email}
                </p>
                <p className="text-neutral-600">
                  <span className="font-medium">Phone:</span>{" "}
                  {supplier.phoneNumber || "N/A"}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-neutral-600">
                  <span className="font-medium">Business:</span>{" "}
                  {supplier.businessName || "N/A"}
                </p>
                <p className="text-neutral-600">
                  <span className="font-medium">City:</span>{" "}
                  {supplier.city || "N/A"}
                </p>
                <p className="text-neutral-600">
                  <span className="font-medium">Role:</span> {supplier.role}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Orders Card */}
            <div className="bg-surface rounded-xl p-6 shadow-xs border border-neutral-200 hover:shadow-sm transition-shadow">
              <h3 className="text-lg font-medium text-neutral-700 mb-4">
                Orders
              </h3>
              <p className="text-neutral-500 mb-6">
                View and manage the orders from this supplier.
              </p>
              <Link
                to={`/admin/user/supplier/order/${supplierId}`}
                className="inline-flex items-center justify-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                View Orders
              </Link>
            </div>

            {/* Products Card */}
            <div className="bg-surface rounded-xl p-6 shadow-xs border border-neutral-200 hover:shadow-sm transition-shadow">
              <h3 className="text-lg font-medium text-neutral-700 mb-4">
                Products
              </h3>
              <p className="text-neutral-500 mb-6">
                Explore the products offered by this supplier.
              </p>
              <Link
                to={`/admin/user/supplier/product/${supplierId}`}
                className="inline-flex items-center justify-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                View Products
              </Link>
            </div>
          </div>

          {/* Chat Button */}
          <div className="flex justify-center">
            <Link
              to={`/chat?supplierId=${supplierId}`}
              className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Chat with Supplier
            </Link>
          </div>
        </>
      ) : (
        <div className="bg-surface rounded-xl p-6 shadow-xs border border-neutral-200">
          <p className="text-red-600">Supplier not found.</p>
        </div>
      )}
    </div>
  );
}
