import React, { useState } from "react";
import axios from "axios";

const AuctionForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startingBid: "",
    category: "",
    quantity:"",
    startTime: "",
    endTime: "",
    image: null, // For file input
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0], // Set the file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      // Convert to numbers and validate
      const startingBid = parseFloat(formData.startingBid);
      const quantity = parseInt(formData.quantity, 10);
  
      if (isNaN(startingBid) || isNaN(quantity) || startingBid * quantity <= 100000) {
        alert("Error: Starting Bid * Quantity must be greater than 100,000");
        return;
      }

    const form = new FormData();

    // Append all the form data to FormData object
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
        const token = localStorage.getItem("token");
      const response = await axios.post(
        "/bidding/create", // Your backend API endpoint
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          },
        }
      );
      alert("Auction created successfully!");
      console.log(response.data); // Handle response data
    } catch (error) {
      console.error("Error creating auction:", error);
      alert("Failed to create auction.");
    }
  };

  return (
    <div className="auction-form-container">
      <h2>Create Auction</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="startingBid">Starting Bid</label>
          <input
            type="number"
            id="startingBid"
            name="startingBid"
            value={formData.startingBid}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="startTime">Start Time</label>
          <input
            type="datetime-local"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="endTime">End Time</label>
          <input
            type="datetime-local"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit">Create Auction</button>
      </form>
    </div>
  );
};

export default AuctionForm;
