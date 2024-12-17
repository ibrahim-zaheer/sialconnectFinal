import { useState, useEffect } from "react";
import axios from "axios";
import AddProduct from "./AddProduct";
import DisplayProducts from "./DisplayProducts";
import EditProductForm from "./EditProductForm";
const ManageProducts = () => {
  const [products, setProducts] = useState([]); // Shared state for products
  const [productToEdit, setProductToEdit] = useState(null);
  const [message, setMessage] = useState(""); // Message for errors or notifications
  const [loading, setLoading] = useState(false); // State for loading

  // Fetch products by supplier
  const fetchProducts = async () => {
    setLoading(true);
    setMessage(""); // Clear any previous messages

    try {
      const token = localStorage.getItem("token"); // Fetch token from local storage
      const response = await axios.get("/supplier/product/read", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token for authentication
        },
      });

      setProducts(response.data.products); // Set products data
    } catch (error) {
      console.error(
        "Error fetching products:",
        error.response?.data || error.message
      );
      setMessage(
        error.response?.data?.message ||
          "Failed to fetch products. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Add a new product to the list dynamically
  const addProductToList = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  // Update a product in the list
  const updateProductInList = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, []);

  return (
    <>
      <div className="w-full overflow-hidden flex justify-center items-center">
        <div className="w-[80%] py-4">
          <h1 className="text-3xl text-center font-semibold text-[#1b263b]">
            Manage Products
          </h1>
          <AddProduct onProductCreated={addProductToList} />
          {productToEdit && (
            <EditProductForm
              product={productToEdit}
              onClose={() => setProductToEdit(null)} // Close modal
              onProductUpdated={updateProductInList} // Update product in state
            />
          )}
          <DisplayProducts
            products={products}
            setProducts={setProducts}
            setProductToEdit={setProductToEdit} // Pass handler for editing
            message={message}
          />
        </div>
      </div>
    </>
  );
};

export default ManageProducts;
