import React, { useState } from 'react';
import axios from 'axios';

const SampleApproval = ({ orderId, onApproveSuccess }) => {
  const [sampleStatus, setSampleStatus] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [isRejection, setIsRejection] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to handle approval of the sample
  const handleApproveSample = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post('/api/order/orders/approveSample', 
        { orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      setSampleStatus('sample_accepted');
      alert('Sample approved successfully!');
      
      // Trigger the callback function to fetch order details again
      if (onApproveSuccess) {
        onApproveSuccess();
      }
    } catch (error) {
      alert('Error approving sample');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle rejection of the sample
  const handleRejectSample = async () => {
    if (!rejectionReason) {
      alert('Please provide a reason for rejection');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post('/api/order/orders/rejectSample', 
        { orderId, rejectionReason },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      setSampleStatus('sample_rejected');
      alert('Sample rejected successfully!');
    } catch (error) {
      alert('Error rejecting sample');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 text-center">
        Sample Status: {sampleStatus || 'Waiting for action'}
      </h3>
      
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleApproveSample}
          disabled={loading || isRejection}
          className={`btn ${loading ? 'btn-loading' : 'btn-primary hover:bg-blue-700'}`}
          title="If sample is approved then order will be considered accepted and the token amount will be sent to Supplier"
        >
          Approve Sample
        </button>

        <button
          onClick={() => setIsRejection(true)}
          disabled={loading || sampleStatus === 'sample_accepted'}
          className={`btn ${loading ? 'btn-loading' : 'btn-error hover:bg-red-700'}`}
          title="If sample is rejected then order will be considered rejected and the half token amount will be sent to Supplier"
         
        >
          Reject Sample
        </button>
      </div>

      {isRejection && (
        <div className="mt-4">
          <textarea
            className="textarea textarea-bordered w-full h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Please provide a reason for rejection"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            required
          />
          <button
            onClick={handleRejectSample}
            disabled={loading}
            className={`btn ${loading ? 'btn-loading' : 'btn-error mt-4 hover:bg-red-700'}`}
            title="Submit rejection reason"
          >
            Submit Rejection
          </button>
        </div>
      )}
    </div>
  );
};

export default SampleApproval;
