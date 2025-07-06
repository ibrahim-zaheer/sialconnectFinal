// import React, { useState } from "react";
// import axios from "axios";

// const AuctionForm = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     startingBid: "",
//     category: "",
//     quantity:"",
//     startTime: "",
//     endTime: "",
//     image: null, // For file input
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       image: e.target.files[0], // Set the file
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//       // Convert to numbers and validate
//       const startingBid = parseFloat(formData.startingBid);
//       const quantity = parseInt(formData.quantity, 10);

//       if (isNaN(startingBid) || isNaN(quantity) || startingBid * quantity <= 100000) {
//         alert("Error: Starting Bid * Quantity must be greater than 100,000");
//         return;
//       }

//     const form = new FormData();

//     // Append all the form data to FormData object
//     for (const key in formData) {
//       form.append(key, formData[key]);
//     }

//     try {
//         const token = localStorage.getItem("token");
//       const response = await axios.post(
//         "/api/bidding/create", // Your backend API endpoint
//         form,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             "Authorization": `Bearer ${token}`
//           },
//         }
//       );
//       alert("Auction created successfully!");
//       console.log(response.data); // Handle response data
//     } catch (error) {
//       console.error("Error creating auction:", error);
//       alert("Failed to create auction.");
//     }
//   };

//   return (
//     <div className="auction-form-container">
//       <h2>Create Auction</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="title">Title</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />

//         </div>

//         <div>
//           <label htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           ></textarea>
//         </div>

//         <div>
//           <label htmlFor="startingBid">Starting Bid</label>
//           <input
//             type="number"
//             id="startingBid"
//             name="startingBid"
//             value={formData.startingBid}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="category">Category</label>
//           <input
//             type="text"
//             id="category"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="quantity">Quantity</label>
//           <input
//             type="number"
//             id="quantity"
//             name="quantity"
//             value={formData.quantity}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="startTime">Start Time</label>
//           <input
//             type="datetime-local"
//             id="startTime"
//             name="startTime"
//             value={formData.startTime}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="endTime">End Time</label>
//           <input
//             type="datetime-local"
//             id="endTime"
//             name="endTime"
//             value={formData.endTime}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="image">Image</label>
//           <input
//             type="file"
//             id="image"
//             name="image"
//             accept="image/*"
//             onChange={handleFileChange}
//           />
//         </div>

//         <button type="submit">Create Auction</button>
//       </form>
//     </div>
//   );
// };

// export default AuctionForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryDropdown from "../Supplier/products/component/CategoryDropdown";

const AuctionForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startingBid: "",
    category: "",
    quantity: "",
    startTime: "",
    endTime: "",
    image: null,
  });

  const [minStartTime, setMinStartTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isDragging, setIsDragging] = useState(false);

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  };

  useEffect(() => {
    const updateMinTime = () => setMinStartTime(getCurrentDateTime());
    updateMinTime();
    const interval = setInterval(updateMinTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "startTime") {
      const selectedStartTime = new Date(value);
      const currentTime = new Date();

      if (selectedStartTime < currentTime) {
        alert("Start time must be in the future.");
        return;
      }

      const endTime = new Date(selectedStartTime);
      endTime.setHours(endTime.getHours() + 24);

      setFormData((prevData) => ({
        ...prevData,
        startTime: value,
        endTime: endTime.toISOString().slice(0, 16),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        image: e.dataTransfer.files,
      }));
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const startingBid = parseFloat(formData.startingBid);
    const quantity = parseInt(formData.quantity, 10);

    if (
      isNaN(startingBid) ||
      isNaN(quantity) ||
      startingBid * quantity <= 100000
    ) {
      alert("Error: Starting Bid * Quantity must be greater than 100,000");
      setIsSubmitting(false);
      return;
    }

    const now = new Date();
    const selectedStartTime = new Date(formData.startTime);
    const selectedEndTime = new Date(formData.endTime);

    if (selectedStartTime < now) {
      alert("Error: Start time cannot be in the past!");
      setIsSubmitting(false);
      return;
    }

    if (selectedEndTime <= selectedStartTime) {
      alert("Error: End time must be after start time!");
      setIsSubmitting(false);
      return;
    }

    const form = new FormData();
    for (const key in formData) {
      if (key === "image" && formData.image && formData.image.length > 0) {
        for (let i = 0; i < formData.image.length; i++) {
          form.append("images", formData.image[i]);
        }
      } else {
        form.append(key, formData[key]);
      }
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/bidding/create", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Auction created successfully!");
      setFormData({
        title: "",
        description: "",
        startingBid: "",
        category: "",
        quantity: "",
        startTime: "",
        endTime: "",
        image: null,
      });
    } catch (error) {
      console.error("Error creating auction:", error);
      alert("Failed to create auction. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mt-12 mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Create New Auction</h2>
        <p className="text-gray-600 mt-2">
          Fill in the details to list your auction
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-4">
          {/* Title */}
          <div className="flex justify-between items-center gap-5">
            <div className="flex-1">
              <label
                htmlFor="title"
                className="block font-medium text-gray-700 mb-1"
              >
                Auction Title <span className="text-red-500 text-lg">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., Premium Wooden Furniture Set"
                required
              />
            </div>

            {/* Starting Bid */}
            <div className="flex-1">
              <label
                htmlFor="startingBid"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Starting Bid (Rs){" "}
                <span className="text-red-500 text-lg">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  Rs
                </span>
                <input
                  type="number"
                  id="startingBid"
                  name="startingBid"
                  value={formData.startingBid}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
          </div>

          {/* Category */}
          {/* <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <CategoryDropdown
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div> */}
          <div className="flex justify-between items-center gap-5">
            <div className="flex-1">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category <span className="text-red-500 text-lg">*</span>
              </label>
              <CategoryDropdown
                value={formData.category}
                onChange={handleChange}
              />
            </div>

            {/* Quantity */}
            <div className="flex-1">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantity <span className="text-red-500 text-lg">*</span>
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1"
                min="1"
                required
              />
            </div>
          </div>

          {/* Start Time */}
          <div className="flex justify-between items-center gap-5">
            <div className="flex-1">
              <label
                htmlFor="startTime"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Start Time <span className="text-red-500 text-lg">*</span>
              </label>
              <input
                type="datetime-local"
                id="startTime"
                name="startTime"
                min={minStartTime}
                value={formData.startTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* End Time */}
            <div className="flex-1">
              <label
                htmlFor="endTime"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                End Time <span className="text-red-500 text-lg">*</span>
              </label>
              <input
                type="datetime-local"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description <span className="text-red-500 text-lg">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full resize-none px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="Provide detailed information about the auction item"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Auction Images
          </label>
          <div className="flex items-center justify-center w-full">
            {/* <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"> */}
            <label
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                isDragging
                  ? "bg-blue-50 border-blue-400"
                  : "bg-gray-50 hover:bg-gray-100 border-gray-300"
              }`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG</p>
              </div>
              <input
                id="images"
                name="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
          {formData.image && formData.image.length > 0 && (
            <p className="mt-2 text-sm text-gray-600">
              {formData.image.length} file(s) selected
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating Auction...
              </span>
            ) : (
              "Create Auction"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuctionForm;
