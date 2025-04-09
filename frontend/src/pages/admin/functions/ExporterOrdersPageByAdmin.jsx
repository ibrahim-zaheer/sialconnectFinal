import React from "react";
import { useParams } from "react-router-dom";
import ExporterOrdersList from "../../../components/admin/functions/ExporterOrdersList";
import BackButton from "../../../components/BackButton";

const ExporterOrdersPageByAdmin = () => {
  const { exporterId } = useParams();

  return (
    <>
      <ExporterOrdersList
        exporterId={exporterId}
        apiEndpoint="/api/admin/orders/exporter"
        title="Exporter Orders (Admin View)"
      />
      <BackButton label="← Back to User List" className="mb-4" />
    </>
  );
};

export default ExporterOrdersPageByAdmin;
