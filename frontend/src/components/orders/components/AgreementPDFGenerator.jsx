import React from "react";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

const AgreementPDFGenerator = ({ order, userName, userRole }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add watermark
    doc.setFontSize(50);
    doc.setTextColor(200, 200, 200);
    doc.text("SialConnect", 105, 150, { align: "center", angle: 45 });

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

    // Add terms and conditions based on userRole
    const termsY = 50;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");

    const terms = [
      `I, the undersigned ${userRole === 'exporter' ? 'Exporter' : 'Supplier'}, acknowledge and agree to the following terms and conditions:`,
      "1. I promise to deal directly with the counterpart for the transaction, without involving the platform.",
      "2. I understand that the platform only provides contact details and cannot guarantee 100% fraud-free dealings.",
      "3. I will take full responsibility for ensuring safety and due diligence while conducting business.",
      "4. I understand that the platform provides a marketplace for connections, but the transaction responsibility lies with me."
    ];

    terms.forEach((line, index) => {
      doc.text(line, 20, termsY + (index * 8));
    });

    // Order details in a table with correct role-based logic
    const counterpartName = userRole === 'exporter' 
      ? order.supplierId?.name || "Unknown Supplier"
      : order.exporterId?.name || "Unknown Exporter";

    const orderData = [
      ["Order ID", String(order._id)],
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

    // AutoTable for better formatting
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

    // Signature section
    const signatureY = doc.lastAutoTable.finalY + 20;
    doc.setFontSize(12);
    doc.text("Signature: ___________________________", 20, signatureY);
    doc.text("Date: ___________________________", 120, signatureY);

    // Footer
    const footerY = signatureY + 20;
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("This agreement is electronically generated and valid without signature.", 105, footerY, { align: "center" });
    doc.text("© 2025 SialConnect. All rights reserved.", 105, footerY + 7, { align: "center" });

    doc.save(`agreement-${order._id}.pdf`);
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
        Download Agreement PDF
      </button>
    </div>
  );
};

export default AgreementPDFGenerator;