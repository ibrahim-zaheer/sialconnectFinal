import React from 'react'
import ExporterOrderDetails from '../../components/orders/exporter/ExporterOrderDetails'
import BackButton from '../../components/BackButton'
import BackButtonNewTab from '../../components/BackButtonNewTab'
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";

export default function ExporterOrderDetailsPage() {

    const navigate = useNavigate();
    const location = useLocation();
    const handleBackClick = () => {
    // navigate(`/SupplierProducts?tab=${activeTab}`);
      // navigate(-1); 
       navigate(`/myExporterOrders`);
  };
  return (
    <div>
      <div className="pt-20"></div>
      {/* <BackButton/> */}
       <BackButtonNewTab className="mb-4 ml-24 bg-primary-800 text-white hover:bg-primary-600" 
            onClick={handleBackClick}
            />
      <ExporterOrderDetails/>
    </div>
  )
}
