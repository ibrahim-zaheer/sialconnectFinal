import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import PDFGenerator from "../components/PDFGenerator";
import AgreementPDFGenerator from "../components/AgreementPDFGenerator";

export default function AdminOrderDetails() {
    const { orderId } = useParams(); // get orderId from URL
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    
    const user = useSelector((state) => state.user);
    const userName = user?.name;
    const userRole = user?.role;
  
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `/api/admin/orders/details/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrder(response.data.order);
        console.log(response.data.order);
      } catch (error) {
        setMessage(
          error.response?.data?.message || "Failed to load order details."
        );
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchOrderDetails();
    }, [orderId]);
  
    if (loading)
      return <p className="text-center mt-8">Loading order details...</p>;
    if (message)
      return <p className="text-center text-red-500 mt-8">{message}</p>;
    if (!order) return null;
  
    return (
      <div className="container mx-auto p-8 space-y-6 bg-gradient-to-r from-blue-100 to-blue-300 shadow-lg rounded-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Order Details
        </h2>
  
        {/* Order Information Card */}
        <div className="card bg-white p-6 rounded-lg shadow-xl">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Order Overview
          </h3>
          
          {/* PDF Generation Buttons */}
          {order.status === "completed" && (
            <div className="mt-6">
              <PDFGenerator order={order} userName={userName} userRole={userRole}/>
              <AgreementPDFGenerator order={order} userName={userName} userRole={userRole} />
            </div>
          )}
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="font-semibold text-gray-600">
              <strong>Auction:</strong> {order.auctionId?.title}
            </div>
            <div className="font-semibold text-gray-600">
              <strong>Product:</strong> {order.productId?.name}
            </div>
            <div className="font-semibold text-gray-600">
              <strong>Supplier:</strong> {order.supplierId?.name}
            </div>
            <div className="font-semibold text-gray-600">
              <strong>Exporter:</strong> {userName}
            </div>
            <div className="font-semibold text-gray-600">
              <strong>Email:</strong> {order.supplierId?.email}
            </div>
            <div className="font-semibold text-gray-600">
              <strong>Quantity:</strong> {order.quantity}
            </div>
            <div className="font-semibold text-gray-600">
              <strong>Price:</strong> Rs {order.price}
            </div>
            <div className="font-semibold text-gray-600">
              <strong>Status:</strong> {order.status}
            </div>
            <div className="font-semibold text-gray-600">
              <strong>Sample Status:</strong> {order.sampleStatus}
            </div>
            <div className="font-semibold text-gray-600">
              <strong>Payment Status:</strong> {order.paymentStatus}
            </div>
            <div className="font-semibold text-gray-600">
              <strong>Agreement:</strong> {order.Agreement}
            </div>
            <div className="font-semibold text-gray-600">
              <strong>Ordered On:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
  
        {/* Payment Status Indicators */}
        {order.sampleStatus === "waiting_for_sample" && (
          <div className="alert alert-success mt-4">
            <span>Token Payment Paid</span>
          </div>
        )}
        
        {order.sampleStatus !== "waiting_for_payment" && (
          <div className="card bg-white p-6 rounded-lg shadow-md mt-6">
            Token Payment Sent
          </div>
        )}
  
        {/* Sample Proof */}
        {order.sampleProof && (
          <div className="card bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              Sample Proof
            </h3>
            <img
              src={order.sampleProof}
              alt="Sample proof"
              className="max-w-full h-auto rounded-xl shadow-md"
            />
            {order.sampleDescription && (
              <p className="mt-2 text-gray-600">
                <strong>Description:</strong> {order.sampleDescription}
              </p>
            )}
          </div>
        )}
  
        {/* Sample Received Proof */}
        {order.sampleRecievedProof && (
          <div className="card bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              Sample Received Proof
            </h3>
            <img
              src={order.sampleRecievedProof}
              alt="Sample proof"
              className="max-w-full h-auto rounded-xl shadow-md"
            />
          </div>
        )}
      </div>
    );
}
