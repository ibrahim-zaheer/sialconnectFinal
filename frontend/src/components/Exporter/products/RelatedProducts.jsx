// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// const RelatedProducts = ({ currentProductId, currentCategory }) => {
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const user = useSelector((state) => state.user);

//   useEffect(() => {
//     const fetchRelatedProducts = async () => {
//       try {
//         setLoading(true);
//         // First try to get products from the same category
//         const response = await axios.get(`/api/supplier/product/readAllProducts?category=${currentCategory}&limit=3`);
        
//         let products = response.data.filter(product => product._id !== currentProductId);
        
//         // If we don't have enough products from the same category, fetch random ones
//         if (products.length < 3) {
//           const remaining = 3 - products.length;
//           const randomResponse = await axios.get(`/api/products/readAllProducts?limit=${remaining}&exclude=${currentProductId}`);
//           products = [...products, ...randomResponse.data];
//         }
        
//         setRelatedProducts(products.slice(0, 3));
//       } catch (err) {
//         setError("Failed to load related products");
//         console.error("Error fetching related products:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRelatedProducts();
//   }, [currentProductId, currentCategory]);

//   if (loading) {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {[...Array(3)].map((_, index) => (
//           <div key={index} className="bg-white rounded-lg shadow p-4 animate-pulse">
//             <div className="h-40 bg-gray-200 rounded mb-4"></div>
//             <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//             <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-red-500 text-center py-4">{error}</div>;
//   }

//   if (relatedProducts.length === 0) {
//     return <div className="text-gray-500 text-center py-4">No related products found</div>;
//   }

//   return (
//     <div className="mt-12">
//       <h3 className="text-xl font-semibold text-gray-900 mb-6">Related Products</h3>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {relatedProducts.map((product) => (
//           <ProductCard key={product._id} product={product} userRole={user?.role} />
//         ))}
//       </div>
//     </div>
//   );
// };

// // Separate ProductCard component for single responsibility
// const ProductCard = ({ product, userRole }) => {
//   return (
//     <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
//       <Link to={`/supplier/product/${product._id}`}>
//         <div className="relative h-48 bg-gray-100">
//           {product.image?.length > 0 ? (
//             <img
//               src={product.image[0]}
//               alt={product.name}
//               className="w-full h-full object-contain p-4"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-400">
//               <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//             </div>
//           )}
//         </div>
//         <div className="p-4">
//           <h4 className="font-medium text-gray-900 truncate">{product.name}</h4>
//           <div className="mt-2 flex justify-between items-center">
//             <span className="text-lg font-semibold text-blue-600">
//               Rs {product.price.toLocaleString()}
//             </span>
//             <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
//               {product.category}
//             </span>
//           </div>
//           {userRole === "exporter" && (
//             <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
//               View Details
//             </button>
//           )}
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default RelatedProducts;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const RelatedProducts = ({ currentProductId, currentCategory }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoading(true);
        
        // First fetch products from the same category
        const categoryResponse = await axios.get(
          `/api/supplier/product/readAllProducts?category=${currentCategory}&limit=3&exclude=${currentProductId}`
        );
        
        let products = categoryResponse.data;
        
        // If we need more products, fetch random ones
        if (products.length < 3) {
          const remaining = 3 - products.length;
          const randomResponse = await axios.get(
            `/api/supplier/product/readAllProducts?limit=${remaining}&exclude=${currentProductId}`
          );
          products = [...products, ...randomResponse.data];
        }
        
        setRelatedProducts(products.slice(0, 3));
      } catch (err) {
        setError("Failed to load related products");
        console.error("Error fetching related products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProductId, currentCategory]);

  // ... rest of the component remains the same ...
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4 animate-pulse">
            <div className="h-40 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  if (relatedProducts.length === 0) {
    return <div className="text-gray-500 text-center py-4">No related products found</div>;
  }

  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Related Products</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product._id} product={product} userRole={user?.role} />
        ))}
      </div>
    </div>
  );
};

// ProductCard component remains the same
const ProductCard = ({ product, userRole }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/supplier/product/${product._id}`}>
        <div className="relative h-48 bg-gray-100">
          {product.image?.length > 0 ? (
            <img
              src={product.image[0]}
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
        <div className="p-4">
          <h4 className="font-medium text-gray-900 truncate">{product.name}</h4>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-lg font-semibold text-blue-600">
              Rs {product.price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {product.category}
            </span>
          </div>
          {userRole === "exporter" && (
            <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              View Details
            </button>
          )}
        </div>
      </Link>
    </div>
  );
};

export default RelatedProducts;