import React, { useEffect, useState } from "react";
import axios from "axios";

const SupplierProductsList = ({ supplierId, apiEndpoint, title = "Supplier Products" }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!supplierId || !apiEndpoint) return;

    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const res = await axios.get(`${apiEndpoint}/${supplierId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
              },
        });
        setProducts(res.data.products);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch products");
      }
    };

    fetchProducts();
  }, [supplierId, apiEndpoint]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {error && <p className="text-red-600">{error}</p>}

      {products.length === 0 && !error ? (
        <p>No products found for this supplier.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Description:</strong> {product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SupplierProductsList;
