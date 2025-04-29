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
// import React, { useState } from "react";
// import axios from "axios";
// import CategoryDropdown from "./component/CategoryDropdown";

// const AddProduct = ({ onProductCreated }) => {
//   // const [formData, setFormData] = useState({
//   //   name: "",
//   //   description: "",
//   //   price: "",
//   //   image: null, // For image file
//   // });
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "Other",
//     images: [], // changed from image: null
//   });

//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // const handleImageChange = (e) => {
//   //   const file = e.target.files[0];
//   //   if (file) {
//   //     setFormData({ ...formData, image: file });
//   //   }
//   // };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData({ ...formData, images: files });
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     const form = new FormData();
//     form.append("name", formData.name);
//     form.append("description", formData.description);
//     form.append("price", formData.price);
//     form.append("category", formData.category); // <-- Add this line

//     // form.append("image", formData.image); // Make sure the image file is being appended
//     formData.images.forEach((image) => {
//       form.append("images", image); // 'images' must match multer field name
//     });
    

//     // Log the data before sending to check what is being sent
//     console.log("Form data being sent:");
//     console.log("Name:", formData.name);
//     console.log("Description:", formData.description);
//     console.log("Price:", formData.price);
//     // console.log(
//     //   "Image:",
//     //   formData.image ? formData.image.name : "No image selected"
//     // );
//     console.log("Images:", formData.images.map((img) => img.name));

//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         "/api/supplier/product/create",
//         form,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setMessage("Product created successfully!");
//       // setFormData({ name: "", description: "", price: "", image: null });
//       setFormData({ name: "", description: "", price: "", category:"",images: [] }); 

//       if (onProductCreated) {
//         onProductCreated(response.data.product);
//       }
//     } catch (error) {
//       console.error("Error creating product:", error.response?.data || error.message);
//       setMessage(
//         error.response?.data?.message ||
//           "Failed to create product. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8">
//       <h2 className="text-2xl font-bold text-neutral-900 mb-6">Add New Product</h2>
      
//       {message && (
//         <div className={`mb-6 p-4 rounded ${
//           message.includes("success") ? "bg-secondary-100 text-secondary-800" 
//                                     : "bg-red-100 text-red-800"
//         }`}>
//           {message}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-neutral-700 mb-1">
//               Product Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-neutral-700 mb-1">
//               Price (Rs)
//             </label>
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
//               required
//             />
//           </div>
//         </div>
//             <CategoryDropdown
//   value={formData.category}
//   onChange={handleChange}
// />

//         <div>
//           <label className="block text-sm font-medium text-neutral-700 mb-1">
//             Description
//           </label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             rows={4}
//             className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-neutral-700 mb-1">
//             Product Image
//           </label>
//           <div className="mt-1 flex items-center">
//             <label className="cursor-pointer">
//               <span className="inline-block px-4 py-2 border border-neutral-300 rounded-lg bg-white text-neutral-700 hover:bg-neutral-50">
//                 Choose File
//               </span>
//               {/* <input
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 onChange={handleImageChange}
//               /> */}
//               <input
//                 type="file"
//                 name="images"
//                 multiple
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="hidden text-[#e0e1dd]"
//               />
//             </label>
//             <span className="ml-4 text-sm text-neutral-600">
//               {formData.image ? formData.image.name : "No file chosen"}
//             </span>
//           </div>
//         </div>

//         <div className="pt-4">
//           <button
//             type="submit"
//             disabled={loading}
//             className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? (
//               <>
//                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
    category: "Other",
    images: [],
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("category", formData.category);

    formData.images.forEach((image) => {
      form.append("images", image);
    });

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
      setFormData({ name: "", description: "", price: "", category:"", images: [] }); 

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
        <div className={`mb-6 p-4 rounded ${
          message.includes("success") ? "bg-green-100 text-green-800 border border-green-200" 
                                    : "bg-red-100 text-red-800 border border-red-200"
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
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Category
          </label>
          <CategoryDropdown
            value={formData.category}
            onChange={handleChange}
          />
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
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Product Images (Multiple allowed up to 5)
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

        <div className="pt-4 flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center px-6 py-3 border border-neutral-300 rounded-lg bg-white text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
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