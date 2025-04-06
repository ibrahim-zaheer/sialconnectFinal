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

import React, { useState,useEffect } from "react";
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
    image: null, // For file input
  });


  const [minStartTime, setMinStartTime] = useState("");

  // Function to get current date-time in YYYY-MM-DDTHH:MM format for min attribute
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



  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Ensure startTime is not in the past
    if (name === "startTime") {
      const selectedStartTime = new Date(value);
      const currentTime = new Date();
  
      if (selectedStartTime < currentTime) {
        alert("Start time must be in the future.");
        return;
      }
  
      // Add 24 hours to startTime
      const endTime = new Date(selectedStartTime);
      endTime.setHours(endTime.getHours() + 24);
  
      setFormData((prevData) => ({
        ...prevData,
        startTime: value,
        endTime: endTime.toISOString().slice(0, 16), // Convert to datetime-local format
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
      image: e.target.files[0], // Set the file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert to numbers and validate
    const startingBid = parseFloat(formData.startingBid);
    const quantity = parseInt(formData.quantity, 10);

    if (
      isNaN(startingBid) ||
      isNaN(quantity) ||
      startingBid * quantity <= 100000
    ) {
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

    // Append all the form data to FormData object
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
        "/api/bidding/create", // Your backend API endpoint
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
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
    <div className="auction-form-container w-[60vw] bg-red-50 rounded-lg mx-auto p-10">
      <h2 className="text-center text-2xl font-bold">Create Auction</h2>
      <form className="my-10" onSubmit={handleSubmit}>
        <div className="w-[100%] flex justify-evenly items-center mt-3">
          <label htmlFor="title" className="font-semibold">
            Title:{" "}
          </label>
          {/* <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          /> */}

          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            class="input input-bordered w-full max-w-xs"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="w[100%] flex justify-evenly items-center mt-3">
          <label htmlFor="description">Description</label>
          {/* <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea> */}

          <textarea
            class="textarea textarea-bordered"
            placeholder="Bio"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="w-[100%] flex justify-evenly items-center mt-3">
          <label htmlFor="startingBid">Starting Bid</label>
          <input
            type="number"
            id="startingBid"
            name="startingBid"
            value={formData.startingBid}
            onChange={handleChange}
            required
            className="border rounded-lg"
          />
        </div>

        {/* <div className="w-[100%] flex justify-evenly items-center mt-3">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="border rounded-lg"
          />
        </div> */}
        <CategoryDropdown
  value={formData.category}
  onChange={handleChange}
/>


        <div className="w-[100%] flex justify-evenly items-center mt-3">
          <label htmlFor="quantity">Quantity</label>
          <input
            className="border rounded-lg"
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="w-[100%] flex justify-evenly items-center mt-3">
          <label htmlFor="startTime">Start Time</label>
          <input
            className="border rounded-lg"
            type="datetime-local"
            id="startTime"
            name="startTime"
            min={minStartTime} // Prevent past time selection
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>

        {/* <div className="w-[100%] flex justify-evenly items-center mt-3">
          <label htmlFor="endTime">End Time</label>
          <input
            className="border rounded-lg"
            type="datetime-local"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div> */}
        <div className="w-[100%] flex justify-evenly items-center mt-3">
  <label>End Time (Auto-filled)</label>
  <input
    className="border rounded-lg bg-gray-200"
    type="datetime-local"
    id="endTime"
    name="endTime"
    value={formData.endTime}
    readOnly
  />
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

        <div className="w-full flex justify-center mt-6">
          <button className="p-3 border rounded-lg" type="submit">
            Create Auction
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuctionForm;
