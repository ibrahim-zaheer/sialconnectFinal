// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Grid,
//   CircularProgress,
//   Box,
//   Chip
// } from '@mui/material';
// import axios from 'axios';

// const TopProducts = () => {
//   const [topProducts, setTopProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTopProducts = async () => {
//       try {
//         const response = await axios.get('/api/order/orders/top-products');
//         setTopProducts(response.data.topProducts);
//         setLoading(false);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to fetch top products');
//         setLoading(false);
//       }
//     };

//     fetchTopProducts();
//   }, []);

//   const handleProductClick = (productId) => {
//     navigate(`/supplier/product/${productId}`);
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={4}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Typography color="error" align="center" mt={4}>
//         {error}
//       </Typography>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3, fontWeight: 'bold' }}>
//         Top Selling Products
//       </Typography>

//       <Grid container spacing={3} justifyContent="center">
//         {topProducts.map((product, index) => (
//           <Grid item xs={12} sm={6} md={4} key={product._id}>
//             <Card
//               sx={{
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 cursor: 'pointer',
//                 transition: 'transform 0.3s, box-shadow 0.3s',
//                 '&:hover': {
//                   boxShadow: 6,
//                   transform: 'translateY(-5px)'
//                 }
//               }}
//               onClick={() => handleProductClick(product._id)}
//             >
//               {/* Product Image */}
//               <CardMedia
//                 component="img"
//                 height="200"
//                 image={product.productDetails.image || '/default-product-image.jpg'}
//                 alt={product.productDetails.name}
//                 sx={{ objectFit: 'contain', backgroundColor: '#f5f5f5', p: 2 }}
//               />

//               {/* Badge for ranking */}
//               <Box sx={{ position: 'absolute', top: 8, left: 8 }}>
//                 <Chip
//                   label={`#${index + 1}`}
//                   color={
//                     index === 0 ? 'primary' :
//                     index === 1 ? 'secondary' : 'success'
//                   }
//                   size="small"
//                 />
//               </Box>

//               <CardContent sx={{ flexGrow: 1 }}>
//                 <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
//                   {product.productDetails.name}
//                 </Typography>

//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                   {/* <Typography variant="body2" color="text.secondary">
//                     Ordered {product.count} times
//                   </Typography> */}
//                   {product.productDetails.price && (
//                     <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold' }}>
//                       ${product.productDetails.price.toFixed(2)}
//                     </Typography>
//                   )}

//                 </Box>
//                   {/* Description moved outside the flex container */}
//   {product.productDetails.description && (
//     <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//       {product.productDetails.description}
//     </Typography>
//   )}

//   {product.productDetails.category && (
//     <Chip
//       label={product.productDetails.category}
//       size="small"
//       sx={{ mt: 1 }}
//     />
//   )}

//                 {product.productDetails.category && (
//                   <Chip
//                     label={product.productDetails.category}
//                     size="small"
//                     sx={{ mt: 1 }}
//                   />
//                 )}
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default TopProducts;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Grid,
//   CircularProgress,
//   Box,
//   Chip,
//   Button,
//   Container,
// } from "@mui/material";
// import axios from "axios";

// const TopProducts = () => {
//   const [topProducts, setTopProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTopProducts = async () => {
//       try {
//         const response = await axios.get("/api/order/orders/top-products");
//         setTopProducts(response.data.topProducts);
//         setLoading(false);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch top products");
//         setLoading(false);
//       }
//     };

//     fetchTopProducts();
//   }, []);

//   const handleProductClick = (productId) => {
//     navigate(`/supplier/product/${productId}`);
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={4}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Typography color="error" align="center" mt={4}>
//         {error}
//       </Typography>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//       <Typography
//         variant="h4"
//         gutterBottom
//         align="center"
//         sx={{ mb: 5, fontWeight: "bold" }}
//       >
//         Top Selling Products
//       </Typography>

//       <Grid container spacing={3} justifyContent="center">
//         {topProducts.map((product, index) => (
//           <Grid item xs={12} sm={6} md={4} key={product._id}>
//             <Card
//               sx={{
//                 height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "space-between",
//                 cursor: "pointer",
//                 position: "relative",
//                 transition: "transform 0.3s, box-shadow 0.3s",
//                 "&:hover": {
//                   boxShadow: 6,
//                   transform: "translateY(-5px)",
//                 },
//               }}
//               onClick={() => handleProductClick(product._id)}
//             >
//               <CardMedia
//                 component="img"
//                 height="200"
//                 image={
//                   Array.isArray(product.productDetails.image)
//                     ? product.productDetails.image[0] ||
//                       "/default-product-image.jpg"
//                     : product.productDetails.image ||
//                       "/default-product-image.jpg"
//                 }
//                 alt={product.productDetails.name}
//                 sx={{
//                   objectFit: "contain",
//                   backgroundColor: "#f5f5f5",
//                   p: 2,
//                   maxWidth: "100%",
//                   maxHeight: "200px",
//                   width: "auto",
//                   alignSelf: "center",
//                 }}
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = "/default-product-image.jpg";
//                 }}
//               />

//               {/* Badge for ranking */}
//               <Box sx={{ position: "absolute", top: 8, left: 8 }}>
//                 <Chip
//                   label={`#${index + 1}`}
//                   color={
//                     index === 0
//                       ? "primary"
//                       : index === 1
//                       ? "secondary"
//                       : "success"
//                   }
//                   size="small"
//                 />
//               </Box>

//               <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
//                 <Typography
//                   variant="h6"
//                   component="h3"
//                   gutterBottom
//                   sx={{ fontWeight: "bold" }}
//                 >
//                   {product.productDetails.name}
//                 </Typography>

//                 {product.productDetails.price && (
//                   <Typography
//                     variant="body1"
//                     color="primary"
//                     sx={{ fontWeight: "bold", mb: 1 }}
//                   >
//                     Rs {product.productDetails.price.toFixed(0)} per piece
//                   </Typography>
//                 )}

//                 {product.productDetails.description && (
//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     sx={{ mb: 1 }}
//                   >
//                     {product.productDetails.description
//                       .split(" ")
//                       .slice(0, 20)
//                       .join(" ") +
//                       (product.productDetails.description.split(" ").length > 20
//                         ? "..."
//                         : "")}
//                   </Typography>
//                 )}

//                 {product.productDetails.category && (
//                   <Chip
//                     label={product.productDetails.category}
//                     size="small"
//                     sx={{ mt: "auto" }}
//                   />
//                 )}

//                 <Button
//                   variant="outlined"
//                   fullWidth
//                   sx={{ mt: 2 }}
//                   onClick={(e) => {
//                     e.stopPropagation(); // Prevent card click
//                     handleProductClick(product._id);
//                   }}
//                 >
//                   View Details
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default TopProducts;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TopProducts = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await axios.get("/api/order/orders/top-products");
        setTopProducts(response.data.topProducts);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch top products");
        setLoading(false);
      }
    };

    fetchTopProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/supplier/product/${productId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-4">
        <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-8">
        Top Selling Products
      </h2>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topProducts.slice(0,3).map((product, index) => (
          <div
            key={product._id}
            className="group relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"
          >
            {/* Product Image */}
            <div className="w-full flex justify-center items-center">
              <img
                src={
                  Array.isArray(product.productDetails.image)
                    ? product.productDetails.image[0]
                    : product.productDetails.image ||
                      "/default-product-image.jpg"
                }
                alt={product.productDetails.name}
                className="h-48 w-48"
              />
            </div>

            {/* Badge for ranking */}
            <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
              #{index + 1}
            </div>

            <div className="p-4">
              {/* Product Name */}
              <h3 className="text-xl font-semibold">
                {product.productDetails.name}
              </h3>

              {/* Product Price */}
              {product.productDetails.price && (
                <p className="text-lg text-gray-800 mt-2">
                  Rs {product.productDetails.price.toFixed(0)} per piece
                </p>
              )}

              {/* Product Description */}
              {product.productDetails.description && (
                <p className="text-sm text-gray-600 mt-2">
                  {product.productDetails.description
                    .split(" ")
                    .slice(0, 10)
                    .join(" ")}
                  {product.productDetails.description.split(" ").length > 10
                    ? "..."
                    : ""}
                </p>
              )}

              {/* Product Category */}
              {product.productDetails.category && (
                <div className="mt-3">
                  <span className="inline-block bg-gray-200 text-gray-800 text-xs py-1 px-2 rounded-full">
                    {product.productDetails.category}
                  </span>
                </div>
              )}

              {/* View Details Button */}
              <button
                className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                onClick={() => handleProductClick(product._id)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
