import React from "react";
import { useParams,Link } from "react-router-dom";
import ExporterOrdersList from "../../../components/admin/functions/ExporterOrdersList";
import BackButton from "../../../components/BackButton";


const ExporterOrdersPageByAdmin = () => {
  const { exporterId } = useParams();

  return (
    <>
     {/* <BackButton label="← Back to User List" className="mb-4" /> */}
   
      <ExporterOrdersList
        exporterId={exporterId}
        apiEndpoint="/api/admin/orders/exporter"
        title="Exporter Orders (Admin View)"
      />
           <BackButton className="mb-4 bg-primary-800 text-white hover:bg-primary-600" />

      
                          <Link
                            to={`/chat?supplierId=${exporterId}`}
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            Chat with Exporter
                          </Link>
                        
     
    </>
  );
};

export default ExporterOrdersPageByAdmin;
