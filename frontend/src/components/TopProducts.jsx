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
import { useTranslation } from "react-i18next";

const TopProducts = () => {
  const { t } = useTranslation();
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
        {t("other:top_products")}
      </h2>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topProducts.slice(0, 3).map((product, index) => {
          const p = product.productDetails;
          return (
            <div
              key={product._id}
              className="group relative bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-center items-center">
                      <div className="mt-4 flex justify-center items-center overflow-hidden">
                        <img
                          src={
                            Array.isArray(p.image)
                              ? p.image[0]
                              : p.image ||
                                "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600"
                          }
                          alt={p.name}
                          className="w-80 h-80 object-cover rounded-md"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600";
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 line-clamp-2">
                        {p.name}
                      </h3>
                      <p className="text-primary-600 font-medium mt-1">
                        Rs {p.price?.toLocaleString() || "N/A"} per piece
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-neutral-600 text-sm line-clamp-3">
                    {p.description?.length > 40
                      ? `${p.description.substring(0, 40)}...`
                      : p.description}
                  </p>
                  {p.category && (
                    <span className="inline-block mt-2 bg-neutral-100 text-neutral-800 text-xs px-2 py-1 rounded">
                      {p.category}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleProductClick(product._id)}
                  className="text-primary-600 hover:text-white hover:bg-primary-800 duration-300 transition-all font-medium text-sm border-2 rounded-lg border-primary-600 p-2 mt-5 flex justify-center items-center w-full"
                >
                  View Details
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopProducts;
