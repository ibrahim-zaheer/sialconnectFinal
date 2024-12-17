import React, { useState } from "react";
import axios from "axios";

const EditProductForm = ({ product, onClose, onProductUpdated }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `/supplier/product/update/${product._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Product updated successfully!");
      onProductUpdated(response.data.product); // Update state in parent
      onClose(); // Close the modal or form
    } catch (error) {
      console.error(
        "Error updating product:",
        error.response?.data || error.message
      );
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
          <div className="flex justify-around items-center mt-10 w-[60%] mx-auto">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-200 transition-all duration-300 py-2 px-5 rounded-lg"
            >
              Cancel
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
