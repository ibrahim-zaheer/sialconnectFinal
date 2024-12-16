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
            console.error("Error updating product:", error.response?.data || error.message);
            setMessage(error.response?.data?.message || "Failed to update product.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ border: "1px solid gray", padding: "20px", margin: "10px" }}>
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update Product"}
                </button>
                <button type="button" onClick={onClose} style={{ marginLeft: "10px" }}>
                    Cancel
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default EditProductForm;
