

import React from "react";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable"; // Import autoTable

const PDFGenerator = ({ order, userName, userRole }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add watermark
    doc.setFontSize(50);
    doc.setTextColor(200, 200, 200); // Light gray color for the watermark
    doc.text("SialConnect", 105, 150, { align: "center", angle: 45 });

    // Add logo or header
    doc.setFontSize(22);
    doc.setTextColor(40, 103, 248);
    doc.setFont("helvetica", "bold");
    doc.text("ORDER DETAILS", 105, 20, { align: "center" });

    // Add divider line
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 25, 190, 25);

    // User info section
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.setFont("helvetica", "normal");
    doc.text(`Prepared for: ${userName || "Unknown Exporter"}`, 20, 35);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 42);

    // Conditional rendering for Exporter/Supplier based on userRole
    const userInfo = userRole === "exporter" 
      ? ["Exporter", userName || "Unknown Exporter"] 
      : ["Supplier", userName || "Unknown Supplier"];

    const partnerInfo = userRole === "exporter" 
      ? ["Supplier", order.supplierId?.name || "Unknown Supplier"]
      : ["Exporter", order.exporterId?.name || "Unknown Exporter"];

    // Order details in a table
    const orderData = [
      // ["Order ID", String(order._id)],
      ["Order ID", String(order.orderId)],
      ["Product", order.productId?.name || "Unknown Product"],
      userInfo,
      partnerInfo,
      ["Quantity", String(order.quantity)],
      ["Price", `Rs ${String(order.price)}`],
      ["Status", order.status || "Unknown Status"],
      ["Sample Status", order.sampleStatus || "Unknown Sample Status"],
      ["Payment Status", order.paymentStatus || "Unknown Payment Status"],
      ["Ordered On", new Date(order.createdAt).toLocaleString()],
    ];

    // AutoTable for better formatting
    autoTable(doc, {
      startY: 50,
      head: [['Field', 'Value']],
      body: orderData,
      theme: 'grid',
      headStyles: {
        fillColor: [40, 103, 248],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      margin: { left: 20 }
    });

    // Message section with styled box
    const messageY = doc.lastAutoTable.finalY + 15;
    doc.setFillColor(240, 248, 255);
    doc.roundedRect(20, messageY, 170, 30, 3, 3, 'F');
    doc.setTextColor(40, 103, 248);
    doc.setFont("helvetica", "bold");
    doc.text("Additional Message:", 25, messageY + 8);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.text(order.message || "No message provided", 25, messageY + 18, { maxWidth: 160 });

    // Footer
    const footerY = messageY + 40;
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("Thank you for your business!", 105, footerY, { align: "center" });
    doc.text("© 2025 SIalConnect. All rights reserved.", 105, footerY + 7, { align: "center" });

    doc.save(`order-${order._id}.pdf`);
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={generatePDF}
        className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download Order PDF
      </button>
    </div>
  );
};

export default PDFGenerator;
