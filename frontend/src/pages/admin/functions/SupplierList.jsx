import React from "react";
import { useParams, Link } from "react-router-dom";
import BackButton from "../../../components/BackButton";

export default function SupplierList() {
  const { supplierId } = useParams(); // Get supplierId from the URL

  return (
    <div>
      <div className="pt-20"></div>
      <BackButton/>
      <h2 className="text-xl font-semibold">Supplier Details</h2>

      {/* Display Supplier's Order and Product Links */}
      <div className="border-b p-4">
        <h3>Supplier ID: {supplierId}</h3>

        {/* Link to Orders Page for the specific supplier */}
        <div className="mt-2">
          <Link
            to={`/admin/user/supplier/order/${supplierId}`}
            className="text-blue-600 hover:text-blue-800"
          >
            View Orders
          </Link>
        </div>

                
                  
                    <Link
                      to={`/chat?supplierId=${supplierId}`}
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Chat with Supplier
                    </Link>
                  
        

        {/* Link to Products Page for the specific supplier */}
        <div className="mt-2">
          <Link
            to={`/admin/user/supplier/product/${supplierId}`}
            className="text-blue-600 hover:text-blue-800"
          >
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
}
