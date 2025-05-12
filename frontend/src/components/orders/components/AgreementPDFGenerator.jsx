

// import React from "react";
// import { jsPDF } from "jspdf";
// import { autoTable } from "jspdf-autotable";

// const AgreementPDFGenerator = ({ order, userName, userRole }) => {
//   const generatePDF = () => {
//     const doc = new jsPDF();

//     // Add watermark
//     doc.setFontSize(50);
//     doc.setTextColor(200, 200, 200);
//     doc.text("SialConnect", 105, 150, { align: "center", angle: 45 });

//     // Add header for Agreement
//     doc.setFontSize(22);
//     doc.setTextColor(40, 103, 248);
//     doc.setFont("helvetica", "bold");
//     doc.text("TRANSACTION AGREEMENT", 105, 20, { align: "center" });

//     // Add divider line
//     doc.setDrawColor(200, 200, 200);
//     doc.line(20, 25, 190, 25);

//     // User info section
//     doc.setFontSize(12);
//     doc.setTextColor(100, 100, 100);
//     doc.setFont("helvetica", "normal");
//     doc.text(`${userRole === 'exporter' ? 'Exporter' : 'Supplier'} Name: ${userName || "Unknown"}`, 20, 35);
//     doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 42);

//     // Add terms and conditions
//     const termsY = 50;
//     doc.setFontSize(12);
//     doc.setTextColor(0, 0, 0);
//     doc.setFont("helvetica", "normal");

//     const terms = [
//       `I, the undersigned ${userRole === 'exporter' ? 'Exporter' : 'Supplier'}, acknowledge and agree to the following terms and conditions:`,
//       "1. I promise to deal directly with the counterpart for the transaction, without involving the platform.",
//       "2. I understand that the platform only provides contact details and cannot guarantee 100% fraud-free dealings.",
//       "3. I will take full responsibility for ensuring safety and due diligence while conducting business.",
//       "4. I understand that the platform provides a marketplace for connections, but the transaction responsibility lies with me."
//     ];

//     terms.forEach((line, index) => {
//       doc.text(line, 20, termsY + (index * 8));
//     });

//     // Order details table
//     const counterpartName = userRole === 'exporter' 
//       ? order.supplierId?.name || "Unknown Supplier"
//       : order.exporterId?.name || "Unknown Exporter";

//     const orderData = [
//       ["Order ID", String(order._id)],
//       ["Product", order.productId?.name || "Unknown Product"],
//       [userRole === 'exporter' ? "Exporter" : "Supplier", userName || "Unknown"],
//       [userRole === 'exporter' ? "Supplier" : "Exporter", counterpartName],
//       ["Quantity", String(order.quantity)],
//       ["Price", `Rs ${String(order.price)}`],
//       ["Status", order.status || "Unknown Status"],
//       ["Sample Status", order.sampleStatus || "Unknown Sample Status"],
//       ["Payment Status", order.paymentStatus || "Unknown Payment Status"],
//       ["Ordered On", new Date(order.createdAt).toLocaleString()],
//     ];

//     // Generate table
//     autoTable(doc, {
//       startY: termsY + 50,
//       head: [['Field', 'Value']],
//       body: orderData,
//       theme: 'grid',
//       headStyles: {
//         fillColor: [40, 103, 248],
//         textColor: [255, 255, 255],
//         fontStyle: 'bold'
//       },
//       alternateRowStyles: {
//         fillColor: [245, 245, 245]
//       },
//       margin: { left: 20 }
//     });

//     // Signature section
//     const signatureY = doc.lastAutoTable.finalY + 20;
//     doc.setFontSize(12);
//     doc.text("Signature: ___________________________", 20, signatureY);
//     doc.text("Date: ___________________________", 120, signatureY);

//     // Footer
//     const footerY = signatureY + 20;
//     doc.setFontSize(10);
//     doc.setTextColor(150, 150, 150);
//     doc.text("This agreement is electronically generated and valid without signature.", 105, footerY, { align: "center" });
//     doc.text("© 2025 SialConnect. All rights reserved.", 105, footerY + 7, { align: "center" });

//     doc.save(`agreement-${order._id}.pdf`);
//   };

//   return (
//     <button
//       onClick={generatePDF}
//       className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 transition-colors"
//     >
//       <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//       </svg>
//       Download Agreement PDF
//     </button>
//   );
// };

// export default AgreementPDFGenerator;

import React from "react";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

const AgreementPDFGenerator = ({ order, userName, userRole }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add header for Agreement
    doc.setFontSize(22);
    doc.setTextColor(40, 103, 248);
    doc.setFont("helvetica", "bold");
    doc.text("TRANSACTION AGREEMENT", 105, 20, { align: "center" });

    // Add divider line
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 25, 190, 25);

    // User info section
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.setFont("helvetica", "normal");
    doc.text(`${userRole === 'exporter' ? 'Exporter' : 'Supplier'} Name: ${userName || "Unknown"}`, 20, 35);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 42);

    // Add terms and conditions
    const termsY = 50;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");

    // const terms = [
    //   `I, the undersigned ${userRole === 'exporter' ? 'Exporter' : 'Supplier'}, acknowledge and agree to the following terms and conditions:`,
    //   "1. I promise to deal directly with the counterpart for the transaction, without involving the platform.",
    //   "2. I understand that the platform only provides contact details and cannot guarantee 100% fraud-free dealings.",
    //   "3. I will take full responsibility for ensuring safety and due diligence while conducting business.",
    //   "4. I understand that the platform provides a marketplace for connections, but the transaction responsibility lies with me."
    // ];
    const terms = [
      `I, the undersigned ${userRole === 'exporter' ? 'Exporter' : 'Supplier'}, acknowledge and agree to the following terms and conditions:`,
      "1. I promise to deal directly with the counterpart for the transaction,",
      "   without involving the platform.", // Line break here
      "2. I understand that the platform only provides contact details",
      "   and cannot guarantee 100% fraud-free dealings.",  // Line break here
      "3. I will take full responsibility for ensuring safety",
      "   and due diligence while conducting business.", // Line break here
      "4. I understand that the platform provides a marketplace",
      "   for connections, but the transaction responsibility lies with me."  // Line break here
    ];

    terms.forEach((line, index) => {
      doc.text(line, 20, termsY + (index * 8));
    });

    // Order details table
    const counterpartName = userRole === 'exporter' 
      ? order.supplierId?.name || "Unknown Supplier"
      : order.exporterId?.name || "Unknown Exporter";

    const orderData = [
      // ["Order ID", String(order._id)],
      ["Order ID", String(order.orderId)],

      ["Product", order.productId?.name || "Unknown Product"],
      [userRole === 'exporter' ? "Exporter" : "Supplier", userName || "Unknown"],
      [userRole === 'exporter' ? "Supplier" : "Exporter", counterpartName],
      ["Quantity", String(order.quantity)],
      ["Price", `Rs ${String(order.price)}`],
      ["Status", order.status || "Unknown Status"],
      ["Sample Status", order.sampleStatus || "Unknown Sample Status"],
      ["Payment Status", order.paymentStatus || "Unknown Payment Status"],
      ["Ordered On", new Date(order.createdAt).toLocaleString()],
    ];

    // Generate table
    autoTable(doc, {
      startY: termsY + 50,
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

    // Add watermark after table generation
    doc.setFontSize(50);
    doc.setTextColor(200, 200, 200); // Light gray color
    doc.text("SialConnect", 105, doc.lastAutoTable.finalY + 20, { align: "center", angle: 45 });

    // Signature section
    const signatureY = doc.lastAutoTable.finalY + 40;
    doc.setFontSize(12);
    doc.text("Signature: ___________________________", 20, signatureY);
    // doc.text("Date: ___________________________", 120, signatureY);
     // Use the "Ordered On" date from order.createdAt for the Date line
     const orderDate = new Date(order.createdAt).toLocaleString(); // Format the date as desired
     doc.text(`Date: ${orderDate}`, 120, signatureY);  // Place the order date here

    // Footer
    const footerY = signatureY + 20;
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("This agreement is electronically generated and valid without signature.", 105, footerY, { align: "center" });
    doc.text("© 2025 SialConnect. All rights reserved.", 105, footerY + 7, { align: "center" });

    doc.save(`agreementS-${order._id}.pdf`);
  };

  return (
    <button
      onClick={generatePDF}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 transition-colors"
    >
      <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Download Agreement PDF
    </button>
  );
};

export default AgreementPDFGenerator;
