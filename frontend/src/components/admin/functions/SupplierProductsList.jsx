// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const SupplierProductsList = ({
//   supplierId,
//   apiEndpoint,
//   title = "Supplier Products",
// }) => {
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!supplierId || !apiEndpoint) return;

//     const fetchProducts = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(`${apiEndpoint}/${supplierId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setProducts(res.data.products);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch products");
//       }
//     };

//     fetchProducts();
//   }, [supplierId, apiEndpoint]);

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">{title}</h2>
//       {error && <p className="text-red-600">{error}</p>}

//       {products.length === 0 && !error ? (
//         <p>No products found for this supplier.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {products.map((product) => (
//             <div key={product._id} className="border p-4 rounded-lg shadow">
//               <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
//               <p>
//                  {product.image && (
//                 <div className="mt-4 flex justify-center items-center overflow-hidden">
//                   <img
//                     src={
//                       product.image?.[0] ||
//                       "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600"
//                     }
//                     alt={product.name}
//                     className="w-80 h-80 object-cover rounded-md"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src =
//                         "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600";
//                     }}
//                   />
//                 </div>
//               )}
//                 <strong>Category:</strong> {product.category}
//               </p>
//               <p>
//                 <strong>Price:</strong> ${product.price}
//               </p>
//               <p>
//                 <strong>Description:</strong> {product.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SupplierProductsList;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";

// const SupplierProductsList = ({
//   supplierId,
//   apiEndpoint,
//   title = "Supplier Products",
// }) => {
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!supplierId || !apiEndpoint) return;

//     const fetchProducts = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(`${apiEndpoint}/${supplierId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setProducts(res.data.products);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch products");
//       }
//     };

//     fetchProducts();
//   }, [supplierId, apiEndpoint]);

//   // Filter out products that don't have a valid name or image
//   const validProducts = products.filter(
//     (product) => product.name && product.image?.[0]
//   );

//   const cardVariants = {
//     hidden: { scale: 0.95, opacity: 0 },
//     visible: {
//       scale: 1,
//       opacity: 1,
//       transition: {
//         duration: 0.3,
//       },
//     },
//     hover: {
//       scale: 1.03,
//       boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
//       transition: {
//         duration: 0.2,
//       },
//     },
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">{title}</h2>
//       {error && <p className="text-red-600">{error}</p>}

//       {validProducts.length === 0 && !error ? (
//         <p>No valid products found for this supplier.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {validProducts.map((product) => (
//             <motion.div
//               key={product._id}
//               variants={cardVariants}
//               whileHover="hover"
//               className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
//             >
//               <div className="p-6">
//                 <div className="flex justify-center items-center">
//                   <div className="mt-4 flex justify-center items-center overflow-hidden">
//                     <img
//                       src={
//                         product.image?.[0] ||
//                         "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600"
//                       }
//                       alt={product.name}
//                       className="w-80 h-80 object-cover rounded-md"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src =
//                           "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600";
//                       }}
//                     />
//                   </div>
//                 </div>

//                 <h3 className="text-lg font-semibold text-neutral-900 line-clamp-2 mt-4">
//                   {product.name}
//                 </h3>
//                 <p className="text-primary-600 font-medium mt-1">
//                   Rs {product.price?.toLocaleString() || "N/A"} per piece
//                 </p>

//                 <p className="text-sm text-neutral-600 mt-1">
//                   <span className="font-medium">Category:</span> {product.category}
//                 </p>
//                 <p className="text-sm text-neutral-600 mt-1">
//                   <span className="font-medium">Description:</span>{" "}
//                   {product.description?.substring(0, 100)}...
//                 </p>

//                 {product.supplierName && (
//                   <p className="text-sm text-neutral-600 mt-2">
//                     <span className="font-medium">Supplier:</span>{" "}
//                     {product.supplierName}
//                   </p>
//                 )}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SupplierProductsList;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SupplierProductsList = ({
  supplierId,
  apiEndpoint,
  title = "Supplier Products",
}) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!supplierId || !apiEndpoint) return;

    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${apiEndpoint}/${supplierId}`, {
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

  // Filter out products that don't have a valid name or image
  const validProducts = products.filter(
    (product) => product.name && product.image?.[0]
  );

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {error && <p className="text-red-600">{error}</p>}

      {validProducts.length === 0 && !error ? (
        <p>No valid products found for this supplier.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {validProducts.map((product) => (
            <Link
              key={product._id}
              to={`/supplier/product/${product._id}`}
              className="text-primary-600 hover:text-white hover:bg-primary-800 duration-300 transition-all font-medium text-sm border-2 rounded-lg border-primary-600 p-2 mt-5 flex justify-center items-center"
            >
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-center items-center">
                    <div className="mt-4 flex justify-center items-center overflow-hidden">
                      <img
                        src={
                          product.image?.[0] ||
                          "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600"
                        }
                        alt={product.name}
                        className="w-80 h-80 object-cover rounded-md"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600";
                        }}
                      />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-neutral-900 line-clamp-2 mt-4">
                    {product.name}
                  </h3>
                  <p className="text-primary-600 font-medium mt-1">
                    Rs {product.price?.toLocaleString() || "N/A"} per piece
                  </p>

                  <p className="text-sm text-neutral-600 mt-1">
                    <span className="font-medium">Category:</span> {product.category}
                  </p>
                  <p className="text-sm text-neutral-600 mt-1">
                    <span className="font-medium">Description:</span>{" "}
                    {product.description?.substring(0, 100)}...
                  </p>

                  {product.supplierName && (
                    <p className="text-sm text-neutral-600 mt-2">
                      <span className="font-medium">Supplier:</span>{" "}
                      {product.supplierName}
                    </p>
                  )}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SupplierProductsList;
