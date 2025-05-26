// import React, { useState } from "react";
// import axios from "axios";
// import CategoryDropdown from "./component/CategoryDropdown";

// const EditProductForm = ({ product, onClose, onProductUpdated }) => {
//   const [formData, setFormData] = useState({
//     name: product.name,
//     description: product.description,
//     price: product.price,
//     category: product.category || "Other", // default fallback
//   });

//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.put(
//         `/api/supplier/product/update/${product._id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setMessage("Product updated successfully!");
//       onProductUpdated(response.data.product); // Update state in parent
//       onClose(); // Close the modal or form
//     } catch (error) {
//       console.error(
//         "Error updating product:",
//         error.response?.data || error.message
//       );
//       setMessage(error.response?.data?.message || "Failed to update product.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="w-[50vw] h-[80vh] bg-white p-16 rounded-xl shadow-md overflow-y-auto">
//         <h2 className="text-center text-4xl font-semibold mb-8">
//           Edit Product
//         </h2>
//         <form
//           onSubmit={handleSubmit}
//           className="flex flex-col justify-center mx-auto w-[70%] text-lg"
//         >
//           <div className="flex items-center justify-between">
//             <label className="font-semibold">
//               Name <span className="text-[red]">*</span> :
//             </label>
//             <input
//               className="border rounded-lg p-2"
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="flex flex-col gap-2 my-3">
//             <label className="font-semibold">
//               Description <span className="text-[red]">*</span> :
//             </label>
//             <textarea
//               className="block border p-2 rounded-lg resize-none"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               required
//             ></textarea>
//           </div>
//           <CategoryDropdown value={formData.category} onChange={handleChange} />

//           <div className="flex items-center justify-between my-2">
//             <label className="font-semibold flex-1">
//               Price <span className="text-[red]">*</span> :{" "}
//             </label>
//             <input
//               className="border p-2 rounded-lg"
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="flex justify-around items-center mt-10 w-[60%] mx-auto">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-300 hover:bg-gray-200 transition-all duration-300 py-2 px-5 rounded-lg"
//             >
//               Cancel
//             </button>

//             <button
//               className="bg-blue-600 hover:bg-blue-500 transition-all duration-300 text-white py-2 px-5 rounded-lg"
//               type="submit"
//               disabled={loading}
//             >
//               {loading ? "Updating..." : "Update"}
//             </button>
//           </div>
//         </form>
//         {message && <p>{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default EditProductForm;

//24th May 2025




import React, { useState } from "react";
import axios from "axios";
import CategoryDropdown from "./component/CategoryDropdown";

const EditProductForm = ({ product, onClose, onProductUpdated }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category || "Other", // default fallback
    images: product.image || [],
       discounts: product.discounts || []
  });
  const [newImages, setNewImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [newDiscount, setNewDiscount] = useState({
    minQuantity: "",
    discountedPrice: ""
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewImages([...e.target.files]);
  };

  const handleRemoveImage = (index, isNewImage) => {
    if (isNewImage) {
      setNewImages(newImages.filter((_, i) => i !== index));
    } else {
      setImagesToDelete([...imagesToDelete, formData.images[index]]);
      setFormData({
        ...formData,
        images: formData.images.filter((_, i) => i !== index)
      });
    }
  };

    const handleDiscountChange = (e) => {
    const { name, value } = e.target;
    setNewDiscount({
      ...newDiscount,
      [name]: value
    });
  };

  const handleAddDiscount = () => {
    if (!newDiscount.minQuantity || !newDiscount.discountedPrice) return;
    
    const updatedDiscounts = [
      ...formData.discounts,
      {
        minQuantity: parseInt(newDiscount.minQuantity),
        discountedPrice: parseFloat(newDiscount.discountedPrice)
      }
    ].sort((a, b) => a.minQuantity - b.minQuantity);

    setFormData({
      ...formData,
      discounts: updatedDiscounts
    });
    
    setNewDiscount({
      minQuantity: "",
      discountedPrice: ""
    });
  };

  const handleRemoveDiscount = (index) => {
    const updatedDiscounts = formData.discounts.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      discounts: updatedDiscounts
    });
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
        const token = localStorage.getItem("token");
        const formDataToSend = new FormData();

        // Append text fields
        formDataToSend.append("name", formData.name);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("category", formData.category);

        formDataToSend.append("discounts", JSON.stringify(formData.discounts));

        // Append images to delete as separate fields
        imagesToDelete.forEach((img, index) => {
            formDataToSend.append(`imagesToDelete`, img);
        });

        // Append new images
        newImages.forEach((file, index) => {
            formDataToSend.append(`images`, file);
        });

        const response = await axios.put(
            `/api/supplier/product/update/${product._id}`,
            formDataToSend,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setMessage("Product updated successfully!");
        onProductUpdated(response.data.product);
        onClose();
    } catch (error) {
        console.error("Error updating product:", error.response?.data || error.message);
        setMessage(error.response?.data?.message || "Failed to update product.");
    } finally {
        setLoading(false);
    }
};
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-[50vw] h-[80vh] bg-white p-16 rounded-xl shadow-md overflow-y-auto">
        <h2 className="text-center text-4xl font-semibold mb-8">
          Edit Product
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center mx-auto w-[70%] text-lg"
        >
          <div className="flex items-center justify-between">
            <label className="font-semibold">
              Name <span className="text-[red]">*</span> :
            </label>
            <input
              className="border rounded-lg p-2"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-2 my-3">
            <label className="font-semibold">
              Description <span className="text-[red]">*</span> :
            </label>
            <textarea
              className="block border p-2 rounded-lg resize-none"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <CategoryDropdown value={formData.category} onChange={handleChange} />

          <div className="flex items-center justify-between my-2">
            <label className="font-semibold flex-1">
              Price <span className="text-[red]">*</span> :{" "}
            </label>
            <input
              className="border p-2 rounded-lg"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          
          {/* Discount Section */}
          <div className="mt-4">
            <label className="font-semibold block mb-2">Volume Discounts:</label>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Current Discount Tiers:</h4>
              {formData.discounts.length === 0 ? (
                <p className="text-gray-500">No discount tiers added</p>
              ) : (
                <ul className="space-y-2">
                  {formData.discounts.map((discount, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span>
                        {discount.minQuantity}+ units: Rs{discount.discountedPrice.toFixed(2)} each
                      </span>
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
            {/* Existing form fields (name, description, price, category) */}
          {/* ... keep all the existing form fields as they are ... */}

          {/* Image Upload Section */}
          <div className="mt-4">
            <label className="font-semibold block mb-2">Product Images:</label>
            
            {/* Current Images */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Current Images:</h4>
              <div className="flex flex-wrap gap-2">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={img} 
                      alt={`Product ${index}`} 
                      className="w-24 h-24 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index, false)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* New Images */}
            <div>
              <h4 className="text-sm font-medium mb-2">Add New Images:</h4>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {newImages.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`New image ${index}`}
                      className="w-24 h-24 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index, true)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-around items-center mt-10 w-[60%] mx-auto">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-200 transition-all duration-300 py-2 px-5 rounded-lg"
            >
              Cancels
            </button>

            <button
              className="bg-blue-600 hover:bg-blue-500 transition-all duration-300 text-white py-2 px-5 rounded-lg"
              type="submit"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default EditProductForm;



