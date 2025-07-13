


// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import CategoryDropdown from "./component/CategoryDropdown";

// const AddProduct = ({ onProductCreated }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "Other",
//     images: [],
//   });

//   const [discounts, setDiscounts] = useState([]);
// const [newDiscount, setNewDiscount] = useState({ minQuantity: "", discountedPrice: "" });


//   const [isDragging, setIsDragging] = useState(false);

//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleDiscountChange = (e) => {
//   const { name, value } = e.target;
//   setNewDiscount({ ...newDiscount, [name]: value });
// };

// const handleAddDiscount = () => {
//   if (!newDiscount.minQuantity || !newDiscount.discountedPrice) return;

//   const updated = [
//     ...discounts,
//     {
//       minQuantity: parseInt(newDiscount.minQuantity),
//       discountedPrice: parseFloat(newDiscount.discountedPrice),
//     },
//   ].sort((a, b) => a.minQuantity - b.minQuantity);

//   setDiscounts(updated);
//   setNewDiscount({ minQuantity: "", discountedPrice: "" });
// };

// const handleRemoveDiscount = (index) => {
//   setDiscounts(discounts.filter((_, i) => i !== index));
// };


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData({ ...formData, images: files });
//   };
//   const handleDragOver = (e) => {
//   e.preventDefault();
//   e.stopPropagation();
//   setIsDragging(true);
// };

// const handleDragLeave = (e) => {
//   e.preventDefault();
//   e.stopPropagation();
//   setIsDragging(false);
// };

// const handleDrop = (e) => {
//   e.preventDefault();
//   e.stopPropagation();
//   setIsDragging(false);

//   if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//     const files = Array.from(e.dataTransfer.files);
//     setFormData((prevData) => ({
//       ...prevData,
//       images: files,
//     }));
//     e.dataTransfer.clearData();
//   }
// };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     //chat
//      if (parseFloat(formData.price) <= 0) {
//     setMessage("Price must be greater than 0.");
//     setLoading(false);
//     return;
//   }

//     const form = new FormData();
//     form.append("name", formData.name);
//     form.append("description", formData.description);
//     form.append("price", formData.price);
//     form.append("category", formData.category);
//     form.append("discounts", JSON.stringify(discounts));


//     formData.images.forEach((image) => {
//       form.append("images", image);
//     });

//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post("/api/supplier/product/create", form, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setMessage("Product created successfully!");
//       setFormData({
//         name: "",
//         description: "",
//         price: "",
//         category: "",
//         images: [],
//       });

//       if (onProductCreated) {
//         onProductCreated(response.data.product);
//       }
//     } catch (error) {
//       console.error(
//         "Error creating product:",
//         error.response?.data || error.message
//       );
//       setMessage(
//         error.response?.data?.message ||
//           "Failed to create product. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8 max-w-4xl mx-auto">
//       <div className="flex justify-between items-start mb-6">
//         <h2 className="text-2xl font-bold text-neutral-900">Add New Product</h2>
//         {/* <button
//           onClick={() => navigate(-1)}
//           className="flex items-center px-4 py-2 border border-neutral-300 rounded-lg bg-white text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400 transition-colors duration-200"
//         >
//           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//           </svg>
//           Back
//         </button> */}
//       </div>

//       {message && (
//         <div
//           className={`mb-6 p-4 rounded ${
//             message.includes("success")
//               ? "bg-green-100 text-green-800 border border-green-200"
//               : "bg-red-100 text-red-800 border border-red-200"
//           }`}
//         >
//           {message}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="w-fit text-sm font-medium text-neutral-700 mb-1 flex justify-center gap-1 items-center">
//               Product Name <span className="text-red-500 text-2xl">*</span>
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//               required
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium text-neutral-700 mb-1 w-fit flex justify-center items-center gap-1">
//               Price (Rs) <span className="text-red-500 text-2xl">*</span>
//             </label>
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               min="0"
//               className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//               required
//             />
//           </div>
//         </div>

//         <div>
//           <label className="text-sm font-medium text-neutral-700 mb-1 w-fit flex justify-center items-center gap-1">
//             Category <span className="text-red-500 text-2xl">*</span>
//           </label>
//           <CategoryDropdown value={formData.category} onChange={handleChange} />
//         </div>

//         <div>
//           <label className="text-sm font-medium text-neutral-700 mb-1 w-fit flex justify-center items-center gap-1">
//             Description <span className="text-red-500 text-2xl">*</span>
//           </label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             rows={4}
//             className="w-full resize-none px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//             required
//           />
//         </div>

//         {/* <div>
//           <label className="text-sm font-medium text-neutral-700 mb-1 w-fit flex justify-center items-center gap-1">
//             Product Images (Multiple allowed up to 5){" "}
//             <span className="text-red-500 text-2xl">*</span>
//           </label>
//           <div className="mt-1 flex items-center">
//             <label className="cursor-pointer">
//               <span className="inline-block px-4 py-2 border border-neutral-300 rounded-lg bg-white text-neutral-700 hover:bg-neutral-50 transition-colors duration-200">
//                 Choose Files
//               </span>
//               <input
//                 type="file"
//                 name="images"
//                 multiple
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="hidden"
//               />
//             </label>
//             <span className="ml-4 text-sm text-neutral-600">
//               {formData.images.length > 0
//                 ? `${formData.images.length} file(s) selected`
//                 : "No files chosen"}
//             </span>
//           </div>
//           {formData.images.length > 0 && (
//             <div className="mt-2">
//               <p className="text-xs text-neutral-500">Selected files:</p>
//               <ul className="text-xs text-neutral-600 mt-1 space-y-1">
//                 {formData.images.map((image, index) => (
//                   <li key={index}>{image.name}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
        
//         */}

// {/* Discount Section */}
// <div className="mt-4">
//   <label className="font-semibold block mb-2">Volume Discounts:</label>

//   {/* Existing Discounts */}
//   <div className="mb-4">
//     <h4 className="text-sm font-medium mb-2">Current Discount Tiers:</h4>
//     {discounts.length === 0 ? (
//       <p className="text-gray-500">No discount tiers added</p>
//     ) : (
//       <ul className="space-y-2">
//         {discounts.map((discount, index) => (
//           <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
//             <span>{discount.minQuantity}+ units: Rs{discount.discountedPrice.toFixed(2)} each</span>
//             <button
//               type="button"
//               onClick={() => handleRemoveDiscount(index)}
//               className="text-red-500 hover:text-red-700"
//             >
//               × Remove
//             </button>
//           </li>
//         ))}
//       </ul>
//     )}
//   </div>

//   {/* Add Discount Form */}
//   <div className="border-t pt-4">
//     <h4 className="text-sm font-medium mb-2">Add New Discount Tier:</h4>
//     <div className="flex gap-4">
//       <div className="flex-1">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Minimum Quantity
//         </label>
//         <input
//           type="number"
//           name="minQuantity"
//           value={newDiscount.minQuantity}
//           onChange={handleDiscountChange}
//           className="border p-2 rounded-lg w-full"
//           min="1"
//           placeholder="e.g., 10"
//         />
//       </div>
//       <div className="flex-1">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Discounted Price
//         </label>
//         <input
//           type="number"
//           name="discountedPrice"
//           value={newDiscount.discountedPrice}
//           onChange={handleDiscountChange}
//           className="border p-2 rounded-lg w-full"
//           min="0"
//           step="0.01"
//           placeholder="e.g., 90.00"
//         />
//       </div>
//       <div className="flex items-end">
//         <button
//           type="button"
//           onClick={handleAddDiscount}
//           className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
//         >
//           Add
//         </button>
//       </div>
//     </div>
//     <p className="text-xs text-gray-500 mt-2">
//       Note: Discount tiers will be automatically sorted by quantity
//     </p>
//   </div>
// </div>


//         <div>



//   <label className="text-sm font-medium text-neutral-700 mb-1 w-fit flex justify-center items-center gap-1">
//     Product Images (Multiple allowed up to 5) <span className="text-red-500 text-2xl">*</span>
//   </label>

//   <div
//     onDragOver={handleDragOver}
//     onDragLeave={handleDragLeave}
//     onDrop={handleDrop}
//     className={`mt-2 flex items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ${
//       isDragging ? "bg-blue-50 border-blue-400" : "bg-white border-neutral-300 hover:bg-neutral-50"
//     }`}
//   >
//     <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
//       <svg className="w-8 h-8 mb-2 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12M7 16l-4 4m0 0l4 4m-4-4h18" />
//       </svg>
//       <p className="text-sm text-neutral-600">Click to upload or drag and drop</p>
//       <input
//         type="file"
//         name="images"
//         multiple
//         accept="image/*"
//         onChange={handleImageChange}
//         className="hidden"
//       />
//     </label>
//   </div>

//   <div className="mt-2 text-sm text-neutral-600">
//     {formData.images.length > 0
//       ? `${formData.images.length} file(s) selected`
//       : "No files selected"}
//   </div>

//   {formData.images.length > 0 && (
//     <ul className="mt-1 text-xs text-neutral-600 space-y-1">
//       {formData.images.map((image, idx) => (
//         <li key={idx}>{image.name}</li>
//       ))}
//     </ul>
//   )}
// </div>


//         <div className="pt-4 flex justify-between items-center">
//           <button
//             type="button"
//             onClick={() => navigate(-1)}
//             className="flex items-center px-6 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400 transition-colors duration-200"
//           >
//             <svg
//               className="w-5 h-5 mr-2"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M10 19l-7-7m0 0l7-7m-7 7h18"
//               />
//             </svg>
//             Back
//           </button>
//           <button
//             type="submit"
//             disabled={loading}
//             className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
//           >
//             {loading ? (
//               <>
//                 <svg
//                   className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Processing...
//               </>
//             ) : (
//               "Add Product"
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;






import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CategoryDropdown from "./component/CategoryDropdown";

const AddProduct = ({ onProductCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    samplePrice: "", 
    category: "Other",
    images: [],
  });

  const [discounts, setDiscounts] = useState([]);
const [newDiscount, setNewDiscount] = useState({ minQuantity: "", discountedPrice: "" });


  const [isDragging, setIsDragging] = useState(false);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDiscountChange = (e) => {
  const { name, value } = e.target;
  setNewDiscount({ ...newDiscount, [name]: value });
};

const handleAddDiscount = () => {
  if (!newDiscount.minQuantity || !newDiscount.discountedPrice) return;

  const updated = [
    ...discounts,
    {
      minQuantity: parseInt(newDiscount.minQuantity),
      discountedPrice: parseFloat(newDiscount.discountedPrice),
    },
  ].sort((a, b) => a.minQuantity - b.minQuantity);

  setDiscounts(updated);
  setNewDiscount({ minQuantity: "", discountedPrice: "" });
};

const handleRemoveDiscount = (index) => {
  setDiscounts(discounts.filter((_, i) => i !== index));
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
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
    const files = Array.from(e.dataTransfer.files);
    setFormData((prevData) => ({
      ...prevData,
      images: files,
    }));
    e.dataTransfer.clearData();
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    //chat
     if (parseFloat(formData.price) <= 0) {
    setMessage("Price must be greater than 0.");
    setLoading(false);
    return;
  }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("samplePrice", formData.samplePrice);
    form.append("category", formData.category);
    form.append("discounts", JSON.stringify(discounts));


    formData.images.forEach((image) => {
      form.append("images", image);
    });

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/supplier/product/create", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Product created successfully!");
      setFormData({
        name: "",
        description: "",
        price: "",
        samplePrice: "",
        category: "",
        images: [],
      });

      if (onProductCreated) {
        onProductCreated(response.data.product);
      }
    } catch (error) {
      console.error(
        "Error creating product:",
        error.response?.data || error.message
      );
      setMessage(
        error.response?.data?.message ||
          "Failed to create product. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold text-neutral-900">Add New Product</h2>
        {/* <button
          onClick={() => navigate(-1)}
          className="flex items-center px-4 py-2 border border-neutral-300 rounded-lg bg-white text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button> */}
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded ${
            message.includes("success")
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="w-fit text-sm font-medium text-neutral-700 mb-1 flex justify-center gap-1 items-center">
              Product Name <span className="text-red-500 text-2xl">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-700 mb-1 w-fit flex justify-center items-center gap-1">
              Price (Rs) <span className="text-red-500 text-2xl">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
              {/* Sample Price Field */}
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-1 w-fit flex justify-center items-center gap-1">
              Sample Price (Rs)
            </label>
            <input
              type="number"
              name="samplePrice"
              value={formData.samplePrice}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        

        <div>
          <label className="text-sm font-medium text-neutral-700 mb-1 w-fit flex justify-center items-center gap-1">
            Category <span className="text-red-500 text-2xl">*</span>
          </label>
          <CategoryDropdown value={formData.category} onChange={handleChange} />
        </div>

        <div>
          <label className="text-sm font-medium text-neutral-700 mb-1 w-fit flex justify-center items-center gap-1">
            Description <span className="text-red-500 text-2xl">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full resize-none px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        {/* <div>
          <label className="text-sm font-medium text-neutral-700 mb-1 w-fit flex justify-center items-center gap-1">
            Product Images (Multiple allowed up to 5){" "}
            <span className="text-red-500 text-2xl">*</span>
          </label>
          <div className="mt-1 flex items-center">
            <label className="cursor-pointer">
              <span className="inline-block px-4 py-2 border border-neutral-300 rounded-lg bg-white text-neutral-700 hover:bg-neutral-50 transition-colors duration-200">
                Choose Files
              </span>
              <input
                type="file"
                name="images"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <span className="ml-4 text-sm text-neutral-600">
              {formData.images.length > 0
                ? `${formData.images.length} file(s) selected`
                : "No files chosen"}
            </span>
          </div>
          {formData.images.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-neutral-500">Selected files:</p>
              <ul className="text-xs text-neutral-600 mt-1 space-y-1">
                {formData.images.map((image, index) => (
                  <li key={index}>{image.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        */}

{/* Discount Section */}
<div className="mt-4">
  <label className="font-semibold block mb-2">Volume Discounts:</label>

  {/* Existing Discounts */}
  <div className="mb-4">
    <h4 className="text-sm font-medium mb-2">Current Discount Tiers:</h4>
    {discounts.length === 0 ? (
      <p className="text-gray-500">No discount tiers added</p>
    ) : (
      <ul className="space-y-2">
        {discounts.map((discount, index) => (
          <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
            <span>{discount.minQuantity}+ units: Rs{discount.discountedPrice.toFixed(2)} each</span>
            <button
              type="button"
              onClick={() => handleRemoveDiscount(index)}
              className="text-red-500 hover:text-red-700"
            >
              × Remove
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>

  {/* Add Discount Form */}
  <div className="border-t pt-4">
    <h4 className="text-sm font-medium mb-2">Add New Discount Tier:</h4>
    <div className="flex gap-4">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Minimum Quantity
        </label>
        <input
          type="number"
          name="minQuantity"
          value={newDiscount.minQuantity}
          onChange={handleDiscountChange}
          className="border p-2 rounded-lg w-full"
          min="1"
          placeholder="e.g., 10"
        />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Discounted Price
        </label>
        <input
          type="number"
          name="discountedPrice"
          value={newDiscount.discountedPrice}
          onChange={handleDiscountChange}
          className="border p-2 rounded-lg w-full"
          min="0"
          step="0.01"
          placeholder="e.g., 90.00"
        />
      </div>
      <div className="flex items-end">
        <button
          type="button"
          onClick={handleAddDiscount}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          Add
        </button>
      </div>
    </div>
    <p className="text-xs text-gray-500 mt-2">
      Note: Discount tiers will be automatically sorted by quantity
    </p>
  </div>
</div>


        <div>



  <label className="text-sm font-medium text-neutral-700 mb-1 w-fit flex justify-center items-center gap-1">
    Product Images (Multiple allowed up to 5) <span className="text-red-500 text-2xl">*</span>
  </label>

  <div
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}
    className={`mt-2 flex items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ${
      isDragging ? "bg-blue-50 border-blue-400" : "bg-white border-neutral-300 hover:bg-neutral-50"
    }`}
  >
    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
      <svg className="w-8 h-8 mb-2 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12M7 16l-4 4m0 0l4 4m-4-4h18" />
      </svg>
      <p className="text-sm text-neutral-600">Click to upload or drag and drop</p>
      <input
        type="file"
        name="images"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </label>
  </div>

  <div className="mt-2 text-sm text-neutral-600">
    {formData.images.length > 0
      ? `${formData.images.length} file(s) selected`
      : "No files selected"}
  </div>

  {formData.images.length > 0 && (
    <ul className="mt-1 text-xs text-neutral-600 space-y-1">
      {formData.images.map((image, idx) => (
        <li key={idx}>{image.name}</li>
      ))}
    </ul>
  )}
</div>


        <div className="pt-4 flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center px-6 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? (
              <>
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
                Processing...
              </>
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
