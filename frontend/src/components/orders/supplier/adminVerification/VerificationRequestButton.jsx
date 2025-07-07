import React, { useState, useRef } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../../redux/reducers/userSlice";

import { updateVerificationStatus } from "../../../../redux/reducers/userSlice";

// Custom hook for API submission
function useVerificationRequest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  //   const { token } = useSelector(selectUser);
  const token = localStorage.getItem("token");

  async function submitRequest(data) {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const formData = new FormData();
      formData.append("websiteUrl", data.websiteUrl);

      // Append each image file to formData
      data.images.forEach((file) => {
        formData.append(`images`, file);
      });

      const response = await axios.post(
        "/api/adminVerification/request",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Token:", token);

      setSuccess(true);
      return response.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to submit";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }

  return { submitRequest, loading, error, success };
}

// Modal component
function VerificationRequestModal({ isOpen, onClose, onSuccess }) {
  const { submitRequest, loading, error, success } = useVerificationRequest();
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      setError("Please upload at least one image");
      return;
    }

    try {
      await submitRequest({
        websiteUrl,
        images,
      });
      alert("Verification request sent successfully!");
      onSuccess();
      onClose();
    } catch {
      // error handled by hook
    }
  };

  const handleImageUpload = (e) => {
    const newFiles = Array.from(e.target.files);

    // Validate file types and size
    const validFiles = newFiles.filter((file) => {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      const isImage = validTypes.includes(file.type);
      const isSizeValid = file.size <= 5 * 1024 * 1024; // 5MB

      return isImage && isSizeValid;
    });

    setImages([...images, ...validFiles]);
    e.target.value = ""; // Reset input to allow same file re-selection
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Supplier Verification Request</h2>
          <button className="close-button" onClick={onClose} disabled={loading}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="verification-form">
          <div className="form-group">
            <label htmlFor="websiteUrl">FaceBook Page URL</label>
            <input
              id="websiteUrl"
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Upload Images</label>
            <div
              className="upload-area"
              onClick={() => fileInputRef.current.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                multiple
                accept="image/*"
                style={{ display: "none" }}
              />
              <div className="upload-prompt">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <p>Click to upload images</p>
                <p className="upload-hint">PNG, JPG up to 5MB</p>
              </div>
            </div>

            {images.length > 0 && (
              <div className="image-previews">
                {images.map((file, index) => (
                  <div key={index} className="image-preview-item">
                    <div className="preview-info">
                      <span>{file.name}</span>
                      <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="remove-image"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && (
            <div className="error-message">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="form-actions">
            <button
              type="submit"
              disabled={loading || images.length === 0}
              className="primary-button"
            >
              {loading ? (
                <>
                  <svg
                    className="spinner"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="secondary-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(2px);
        }

        .modal-container {
          background: white;
          border-radius: 12px;
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #eee;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 1.5rem;
          color: #333;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #999;
          padding: 0 5px;
        }

        .close-button:hover {
          color: #333;
        }

        .verification-form {
          padding: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #444;
        }

        input[type="url"] {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          transition: border-color 0.2s;
        }

        input[type="url"]:focus {
          outline: none;
          border-color: #4a90e2;
          box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
        }

        .upload-area {
          border: 2px dashed #ddd;
          border-radius: 6px;
          padding: 30px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .upload-area:hover {
          border-color: #4a90e2;
          background-color: #f8faff;
        }

        .upload-prompt {
          color: #666;
        }

        .upload-prompt svg {
          margin-bottom: 10px;
          color: #4a90e2;
        }

        .upload-hint {
          font-size: 0.8rem;
          color: #999;
          margin-top: 5px;
        }

        .image-previews {
          margin-top: 15px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .image-preview-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: #f5f5f5;
          border-radius: 4px;
          font-size: 0.9rem;
        }

        .preview-info {
          display: flex;
          flex-direction: column;
        }

        .preview-info span:last-child {
          font-size: 0.8rem;
          color: #777;
        }

        .remove-image {
          background: none;
          border: none;
          color: #999;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0 5px;
        }

        .remove-image:hover {
          color: #e74c3c;
        }

        .form-actions {
          display: flex;
          gap: 10px;
          margin-top: 25px;
        }

        .primary-button {
          background-color: #4a90e2;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background-color 0.2s;
        }

        .primary-button:hover {
          background-color: #3a7bc8;
        }

        .primary-button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .secondary-button {
          background-color: white;
          color: #333;
          border: 1px solid #ddd;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }

        .secondary-button:hover {
          border-color: #bbb;
        }

        .secondary-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #e74c3c;
          font-size: 0.9rem;
          margin-top: 15px;
          padding: 10px;
          background-color: #fef2f2;
          border-radius: 4px;
        }

        .spinner {
          animation: rotate 1s linear infinite;
        }

        @keyframes rotate {
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

// Button component
export default function VerificationRequestButton({
  className,
  disabled,
  onVerificationSubmitted,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  // Get token from your authentication system (localStorage, context, etc.)
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  const handleSuccess = () => {
    // Update Redux state
    dispatch(updateVerificationStatus({ status: "pending" }));
    // Call parent callback if provided
    if (onVerificationSubmitted) {
      onVerificationSubmitted();
    }
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        disabled={disabled}
        className={`${className} ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Verify Account
      </button>
      <style jsx>{`
        .request-button {
          background-color: #4a90e2;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.2s;
        }

        .request-button:hover {
          background-color: #3a7bc8;
        }
      `}</style>

      <VerificationRequestModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
}
