// import React, { useState } from "react";
// import axios from "axios";

// const AddProduct = () => {
//     const [formData, setFormData] = useState({
//         name: "",
//         description: "",
//         price: "",
//     });

//     const [message, setMessage] = useState(""); // Success/Error message
//     const [loading, setLoading] = useState(false); // For loading state

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage("");

//         try {
//             const token = localStorage.getItem("token"); // Fetch token from local storage
//             const response = await axios.post(
//                 "/supplier/product/create",
//                 formData, // Send formData directly as JSON
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`, // Pass token for authentication
//                     },
//                 }
//             );

//             setMessage("Product created successfully!");
//             setFormData({ name: "", description: "", price: "" }); // Reset form
//         } catch (error) {
//             console.error("Error creating product:", error.response?.data || error.message);
//             setMessage(error.response?.data?.message || "Failed to create product. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <h1>Add a Product</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Product Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Description</label>
//                     <textarea
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         required
//                     ></textarea>
//                 </div>
//                 <div>
//                     <label>Price</label>
//                     <input
//                         type="number"
//                         name="price"
//                         value={formData.price}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <button type="submit" disabled={loading}>
//                     {loading ? "Submitting..." : "Add Product"}
//                 </button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// };

// export default AddProduct;

// when using managecomponet
import React, { useState } from "react";
import axios from "axios";

const AddProduct = ({ onProductCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("price", formData.price);
    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/supplier/product/create",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Product created successfully!");
      setFormData({ name: "", description: "", price: "", image: null });

      if (onProductCreated) {
        onProductCreated(response.data.product);
      }
    } catch (error) {
      console.error("Error creating product:", error.response?.data || error.message);
      setMessage(
        error.response?.data?.message ||
          "Failed to create product. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">Add New Product</h2>
      
      {message && (
        <div className={`mb-6 p-4 rounded ${
          message.includes("success") ? "bg-secondary-100 text-secondary-800" 
                                    : "bg-red-100 text-red-800"
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Price (Rs)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Product Image
          </label>
          <div className="mt-1 flex items-center">
            <label className="cursor-pointer">
              <span className="inline-block px-4 py-2 border border-neutral-300 rounded-lg bg-white text-neutral-700 hover:bg-neutral-50">
                Choose File
              </span>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <span className="ml-4 text-sm text-neutral-600">
              {formData.image ? formData.image.name : "No file chosen"}
            </span>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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