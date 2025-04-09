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

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  };

  // useEffect(() => {
  //   setMinStartTime(getCurrentDateTime());
  // }, []);
  useEffect(() => {
    const updateMinTime = () => setMinStartTime(getCurrentDateTime());
    updateMinTime();
    const interval = setInterval(updateMinTime, 60000); // update every 60 seconds
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
  
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const startingBid = parseFloat(formData.startingBid);
    const quantity = parseInt(formData.quantity, 10);

    if (isNaN(startingBid) || isNaN(quantity) || startingBid * quantity <= 100000) {
      alert("Error: Starting Bid * Quantity must be greater than 100,000");
      return;
    }

    const now = new Date();
    const selectedStartTime = new Date(formData.startTime);
    const selectedEndTime = new Date(formData.endTime);

    if (selectedStartTime < now) {
      alert("Error: Start time cannot be in the past!");
      return;
    }

    if (selectedEndTime <= selectedStartTime) {
      alert("Error: End time must be after start time!");
      return;
    }

    const form = new FormData();
    // for (const key in formData) {
    //   form.append(key, formData[key]);
    // }
    for (const key in formData) {
      if (key === "image" && formData.image && formData.image.length > 0) {
        for (let i = 0; i < formData.image.length; i++) {
          form.append("images", formData.image[i]); // append multiple images
        }
      } else {
        form.append(key, formData[key]);
      }
    }
    
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/bidding/create",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Auction created successfully!");
      console.log(response.data);
      // Reset form after successful submission
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
      alert("Failed to create auction.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200 mb-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Auction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div className="space-y-1">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter auction title"
              required
            />
          </div>

          {/* Starting Bid */}
          <div className="space-y-1">
            <label htmlFor="startingBid" className="block text-sm font-medium text-gray-700">
              Starting Bid (Rs) *
            </label>
            <input
              type="number"
              id="startingBid"
              name="startingBid"
              value={formData.startingBid}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Category */}
          {/* <div className="space-y-1">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category *
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Electronics, Furniture"
              required
            />
          </div> */}
        <CategoryDropdown
  value={formData.category}
  onChange={handleChange}
/>


          {/* Quantity */}
          <div className="space-y-1">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity *
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1"
              min="1"
              required
            />
          </div>

          {/* Start Time */}
          <div className="space-y-1">
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
              Start Time *
            </label>
            <input
              type="datetime-local"
              id="startTime"
              name="startTime"
              min={minStartTime}
              value={formData.startTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* End Time */}
          <div className="space-y-1">
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
              End Time (Auto-calculated)
            </label>
            <input
              type="datetime-local"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Provide detailed information about the item"
            required
          ></textarea>
        </div>

        <div className="w-[100%] flex justify-evenly items-center mt-5">
          <label htmlFor="image">Image</label>
          {/* <input
            className="border rounded-lg overflow-hidden p-2"
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          /> */}
          <input
  type="file"
  id="images"
  name="images"
  accept="image/*"
  multiple
  onChange={(e) =>
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files, // This will now be a FileList
    }))
  }
/>

        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Create Auction
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuctionForm;