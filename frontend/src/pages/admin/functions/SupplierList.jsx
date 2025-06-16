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


import React from "react";
import { useParams, Link } from "react-router-dom";
import BackButton from "../../../components/BackButton";

export default function SupplierList() {
  const { supplierId } = useParams(); // Get supplierId from the URL

  return (
    <div className="pt-20 px-6">
      <BackButton />
      <h2 className="text-2xl font-semibold text-gray-800">Supplier Details</h2>

      {/* Display Supplier's Order and Product Links */}
      <div className="mt-6">
        <h3 className="text-lg text-gray-600">Supplier ID: {supplierId}</h3>

        {/* Card Container for Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          
          {/* View Orders Card */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <h4 className="text-xl font-medium text-gray-800 mb-4">Orders</h4>
              <p className="text-gray-600 mb-4">View and manage the orders from this supplier.</p>
              <Link
                to={`/admin/user/supplier/order/${supplierId}`}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                View Orders
              </Link>
            </div>
          </div>

          {/* View Products Card */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <h4 className="text-xl font-medium text-gray-800 mb-4">Products</h4>
              <p className="text-gray-600 mb-4">Explore the products offered by this supplier.</p>
              <Link
                to={`/admin/user/supplier/product/${supplierId}`}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                View Products
              </Link>
            </div>
          </div>
        </div>

        {/* Chat Button */}
        <div className="mt-6 flex justify-center">
          <Link
            to={`/chat?supplierId=${supplierId}`}
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
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
      </div>
    </div>
  );
}
