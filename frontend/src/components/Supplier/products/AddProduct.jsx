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
  // const [formData, setFormData] = useState({
  //   name: "",
  //   description: "",
  //   price: "",
  //   image: null, // For image file
  // });
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    images: [], // changed from image: null
  });
  

  const [message, setMessage] = useState(""); // Success/Error message
  const [loading, setLoading] = useState(false); // For loading state

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setFormData({ ...formData, image: file });
  //   }
  // };

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
    // form.append("image", formData.image); // Make sure the image file is being appended
    formData.images.forEach((image) => {
      form.append("images", image); // 'images' must match multer field name
    });
    

    // Log the data before sending to check what is being sent
    console.log("Form data being sent:");
    console.log("Name:", formData.name);
    console.log("Description:", formData.description);
    console.log("Price:", formData.price);
    // console.log(
    //   "Image:",
    //   formData.image ? formData.image.name : "No image selected"
    // );
    console.log("Images:", formData.images.map((img) => img.name));

    try {
      const token = localStorage.getItem("token"); // Fetch token from local storage
      const response = await axios.post(
        "/api/supplier/product/create",
        form, // Send the FormData object
        {
          headers: {
            "Content-Type": "multipart/form-data", // This must be set for file uploads
            Authorization: `Bearer ${token}`, // Pass token for authentication
          },
        }
      );

      setMessage("Product created successfully!");
      // setFormData({ name: "", description: "", price: "", image: null }); // Reset form
      setFormData({ name: "", description: "", price: "", images: [] }); 

      if (onProductCreated) {
        onProductCreated(response.data.product); // Handle response
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
    <>
      <div className="my-10">
        <div className="w-[50%] mx-auto flex flex-col bg-[#1b263b] rounded-2xl p-10">
          <h2 className="text-2xl font-semibold my-3 text-[#e0e1dd] w-full text-center">
            Add a Product
          </h2>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="w-full flex justify-between gap-5">
              <div className="my-4 flex flex-1 flex-col justify-center gap-2">
                <label className="font-semibold text-[#e0e1dd]">
                  Product Name
                </label>
                <input
                  className="px-2 flex-1 py-2 bg-[#f1f1f1] rounded-lg"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="my-4 flex flex-col justify-center gap-2">
                <label className="font-semibold text-[#e0e1dd]">Price</label>
                <input
                  className="px-2 py-2 flex-1 bg-[#f1f1f1] rounded-lg"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col justify-center gap-2">
              <label className="font-semibold text-[#e0e1dd]">
                Description
              </label>
              <textarea
                className="px-2 py-2 bg-[#f1f1f1] max-w-full rounded-lg resize-none"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="mt-5 mb-8 flex flex-col justify-center gap-3">
              <label className="font-semibold text-[#e0e1dd]">
                Product Image
              </label>
              {/* <input
                className="text-[#e0e1dd]"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              /> */}
              <input
               className="text-[#e0e1dd]"
                type="file"
                name="images"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="w-full flex justify-center items-center">
              <button
                className="border my-3 border-[#778da9] px-5 rounded-lg py-2 bg-[#415a77] text-white hover:bg-[#778da9] transition-all duration-300"
                type="submit"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Add Product"}
              </button>
            </div>
          </form>
          {/* {message && <p>{message}</p>} */}
        </div>
      </div>
    </>
  );
};

export default AddProduct;
