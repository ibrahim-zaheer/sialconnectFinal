

import React from "react";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

const PDFGenerator = ({ order, userName, userRole }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

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

    // --- Draw watermark LAST so it appears on top ---
    doc.setFontSize(50);
    doc.setTextColor(200, 200, 200);
    doc.text("SialConnect", 105, 150, { align: "center", angle: 45 });

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



// import React from "react";
// import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

// const PDFGenerator = ({ order, userName, userRole }) => {
//   const generatePDF = async () => {
//     const pdfDoc = await PDFDocument.create();

//     // Set PDF permissions to disallow modification
//     pdfDoc.encrypt({
//       ownerPassword: 'ownerpassword',
//       userPassword: '',
//       permissions: {
//         modifying: false,
//         copying: false,
//         printing: true,
//         fillingForms: false,
//         annotating: false,
//         contentAccessibility: false,
//         documentAssembly: false,
//       },
//     });

//     const page = pdfDoc.addPage([595, 842]); // A4 size in points (approx 8.3 x 11.7 inches)
//     const { width, height } = page.getSize();

//     // Load fonts
//     const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
//     const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

//     // Draw header
//     page.drawText("ORDER DETAILS", {
//       x: width / 2 - helveticaBoldFont.widthOfTextAtSize("ORDER DETAILS", 22) / 2,
//       y: height - 50,
//       size: 22,
//       font: helveticaBoldFont,
//       color: rgb(40 / 255, 103 / 255, 248 / 255),
//     });

//     // Draw divider line
//     page.drawLine({
//       start: { x: 40, y: height - 70 },
//       end: { x: width - 40, y: height - 70 },
//       thickness: 1,
//       color: rgb(200 / 255, 200 / 255, 200 / 255),
//     });

//     // User info
//     page.drawText(`Prepared for: ${userName || "Unknown Exporter"}`, {
//       x: 40,
//       y: height - 90,
//       size: 12,
//       font: helveticaFont,
//       color: rgb(100 / 255, 100 / 255, 100 / 255),
//     });
//     page.drawText(`Date: ${new Date().toLocaleDateString()}`, {
//       x: 40,
//       y: height - 105,
//       size: 12,
//       font: helveticaFont,
//       color: rgb(100 / 255, 100 / 255, 100 / 255),
//     });

//     // Prepare order data
//     const userInfo = userRole === "exporter"
//       ? ["Exporter", userName || "Unknown Exporter"]
//       : ["Supplier", userName || "Unknown Supplier"];

//     const partnerInfo = userRole === "exporter"
//       ? ["Supplier", order.supplierId?.name || "Unknown Supplier"]
//       : ["Exporter", order.exporterId?.name || "Unknown Exporter"];

//     const orderData = [
//       ["Order ID", String(order.orderId)],
//       ["Product", order.productId?.name || "Unknown Product"],
//       userInfo,
//       partnerInfo,
//       ["Quantity", String(order.quantity)],
//       ["Price", `Rs ${String(order.price)}`],
//       ["Status", order.status || "Unknown Status"],
//       ["Sample Status", order.sampleStatus || "Unknown Sample Status"],
//       ["Payment Status", order.paymentStatus || "Unknown Payment Status"],
//       ["Ordered On", new Date(order.createdAt).toLocaleString()],
//     ];

//     // Draw table headers and rows manually
//     const tableTop = height - 140;
//     const marginLeft = 40;
//     const rowHeight = 20;
//     const col1Width = 120;
//     const col2Width = width - marginLeft * 2 - col1Width;
//     const tableWidth = col1Width + col2Width;
//     const tableHeight = rowHeight * (orderData.length + 1);

//     // Draw table header background
//     page.drawRectangle({
//       x: marginLeft,
//       y: tableTop - rowHeight,
//       width: tableWidth,
//       height: rowHeight,
//       color: rgb(40 / 255, 103 / 255, 248 / 255),
//     });

//     // Draw table header text
//     page.drawText("Field", {
//       x: marginLeft + 5,
//       y: tableTop - rowHeight + 5,
//       size: 12,
//       font: helveticaBoldFont,
//       color: rgb(1, 1, 1),
//     });
//     page.drawText("Value", {
//       x: marginLeft + col1Width + 5,
//       y: tableTop - rowHeight + 5,
//       size: 12,
//       font: helveticaBoldFont,
//       color: rgb(1, 1, 1),
//     });

//     // Draw rows
//     for (let i = 0; i < orderData.length; i++) {
//       const y = tableTop - rowHeight * (i + 2);

//       // Alternate row fill
//       if (i % 2 === 1) {
//         page.drawRectangle({
//           x: marginLeft,
//           y,
//           width: tableWidth,
//           height: rowHeight,
//           color: rgb(245 / 255, 245 / 255, 245 / 255),
//         });
//       }

//       // Draw field and value texts
//       page.drawText(orderData[i][0], {
//         x: marginLeft + 5,
//         y: y + 5,
//         size: 12,
//         font: helveticaFont,
//         color: rgb(0, 0, 0),
//       });
//       page.drawText(orderData[i][1], {
//         x: marginLeft + col1Width + 5,
//         y: y + 5,
//         size: 12,
//         font: helveticaFont,
//         color: rgb(0, 0, 0),
//       });

//       // Draw horizontal line under row
//       page.drawLine({
//         start: { x: marginLeft, y },
//         end: { x: marginLeft + tableWidth, y },
//         thickness: 0.5,
//         color: rgb(200 / 255, 200 / 255, 200 / 255),
//       });
//     }

//     // Draw vertical line between columns
//     page.drawLine({
//       start: { x: marginLeft + col1Width, y: tableTop - rowHeight },
//       end: { x: marginLeft + col1Width, y: tableTop - rowHeight - tableHeight + rowHeight },
//       thickness: 1,
//       color: rgb(255, 255, 255),
//     });

//     // Box for additional message
//     const messageBoxY = tableTop - tableHeight - 50;
//     page.drawRectangle({
//       x: marginLeft,
//       y: messageBoxY,
//       width: tableWidth,
//       height: 50,
//       color: rgb(240 / 255, 248 / 255, 255 / 255),
//       borderRadius: 3,
//     });

//     // Message title
//     page.drawText("Additional Message:", {
//       x: marginLeft + 5,
//       y: messageBoxY + 35,
//       size: 14,
//       font: helveticaBoldFont,
//       color: rgb(40 / 255, 103 / 255, 248 / 255),
//     });

//     // Message body (wrap if needed)
//     const message = order.message || "No message provided";
//     const maxWidth = tableWidth - 10;
//     const fontSize = 12;
//     const textLines = helveticaFont.splitTextIntoLines(message, fontSize, maxWidth);

//     let textY = messageBoxY + 15;
//     textLines.forEach((line) => {
//       page.drawText(line, {
//         x: marginLeft + 5,
//         y: textY,
//         size: fontSize,
//         font: helveticaFont,
//         color: rgb(0, 0, 0),
//       });
//       textY -= fontSize + 2;
//     });

//     // Footer text
//     const footerY = 40;
//     page.drawText("Thank you for your business!", {
//       x: width / 2 - helveticaFont.widthOfTextAtSize("Thank you for your business!", 10) / 2,
//       y: footerY + 10,
//       size: 10,
//       font: helveticaFont,
//       color: rgb(150 / 255, 150 / 255, 150 / 255),
//     });

//     page.drawText("© 2025 SialConnect. All rights reserved.", {
//       x: width / 2 - helveticaFont.widthOfTextAtSize("© 2025 SialConnect. All rights reserved.", 10) / 2,
//       y: footerY,
//       size: 10,
//       font: helveticaFont,
//       color: rgb(150 / 255, 150 / 255, 150 / 255),
//     });

//     // Watermark rotated text
//     page.drawText("SialConnect", {
//       x: width / 2 - helveticaBoldFont.widthOfTextAtSize("SialConnect", 50) / 2,
//       y: height / 2,
//       size: 50,
//       font: helveticaBoldFont,
//       color: rgb(0.78, 0.78, 0.78),
//       rotate: { degrees: 45 },
//       opacity: 0.3,
//     });

//     // Serialize the PDFDocument to bytes (a Uint8Array)
//     const pdfBytes = await pdfDoc.save();

//     // Trigger file download in browser
//     const blob = new Blob([pdfBytes], { type: "application/pdf" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `order-${order._id}.pdf`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="flex justify-center mt-4">
//       <button
//         onClick={generatePDF}
//         className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
//       >
//         <svg
//           className="w-5 h-5 mr-2"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//           />
//         </svg>
//         Download Order PDF
//       </button>
//     </div>
//   );
// };

// export default PDFGenerator;
