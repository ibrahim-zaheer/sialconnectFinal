import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../../pages/Exporter/ProductCard";

// const RecommendedProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchRecommendations = async () => {
//       try {
//         const response = await axios.get('/api/supplier/product/recommendations', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setProducts(response.data);
//       } catch (error) {
//         console.error('Failed to fetch recommendations:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecommendations();
//   }, [token]);

//   if (loading) return <p>Loading recommendations...</p>;

//   if (products.length === 0) return <p>No recommendations available.</p>;

//    return (
//     <div>
//       <h2 className="text-2xl font-bold text-neutral-900 mb-6">Recommended Products</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <ProductCard
//             key={product._id}
//             product={product}
//             role="exporter" // or whatever role is appropriate
//             favorites={[]} // pass favorites if you have them
//             setFavorites={() => {}} // pass setFavorites if you have them
//             userId={null} // pass userId if you have it
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

const RecommendedProducts = ({ maxItems = 3 }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(
          "/api/supplier/product/recommendations",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [token]);

  if (loading) return <p>Loading recommendations...</p>;

  if (products.length === 0) return <p>No recommendations available.</p>;

  const displayedProducts = products.slice(0, maxItems);

  return (
    <div>
      <h2 className="text-4xl text-center font-bold text-neutral-900 mb-6">
        Recommended Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-20">
        {displayedProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            role="exporter"
            favorites={[]}
            setFavorites={() => {}}
            userId={null}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
