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



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Grid, 
  CircularProgress, 
  Box,
  Chip
} from '@mui/material';
import axios from 'axios';

const TopProducts = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await axios.get('/api/order/orders/top-products');
        setTopProducts(response.data.topProducts);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch top products');
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
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={4}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3, fontWeight: 'bold' }}>
        Top Selling Products
      </Typography>
      
      <Grid container spacing={3} justifyContent="center">
        {topProducts.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-5px)'
                }
              }}
              onClick={() => handleProductClick(product._id)}
            >
              {/* Product Image - Updated to handle array of images */}
              {/* <CardMedia
                component="img"
                height="200"
                image={
                  Array.isArray(product.productDetails.image) 
                    ? product.productDetails.image[0] || '/default-product-image.jpg'
                    : product.productDetails.image || '/default-product-image.jpg'
                }
                alt={product.productDetails.name}
                sx={{ objectFit: 'contain', backgroundColor: '#f5f5f5', p: 2 }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/default-product-image.jpg';
                }}
              /> */}
              <CardMedia
  component="img"
  height="200"
  image={
    Array.isArray(product.productDetails.image) 
      ? product.productDetails.image[0] || '/default-product-image.jpg'
      : product.productDetails.image || '/default-product-image.jpg'
  }
  alt={product.productDetails.name}
  sx={{
    objectFit: 'contain', 
    backgroundColor: '#f5f5f5', 
    p: 2,
    maxWidth: '100%',  // Ensures the image doesn't exceed its container width
    maxHeight: '200px',  // Sets the maximum height of the image
    width: 'auto',  // Maintains the aspect ratio of the image
  }}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = '/default-product-image.jpg';
  }}
/>

              
              {/* Badge for ranking */}
              <Box sx={{ position: 'absolute', top: 8, left: 8 }}>
                <Chip 
                  label={`#${index + 1}`} 
                  color={
                    index === 0 ? 'primary' : 
                    index === 1 ? 'secondary' : 'success'
                  }
                  size="small"
                />
              </Box>
              
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {product.productDetails.name}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  {product.productDetails.price && (
                    <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold' }}>
                      ${product.productDetails.price.toFixed(2)}
                    </Typography>
                  )}
                </Box>
                
                {/* Description */}
                {product.productDetails.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {/* {product.productDetails.description} */}
                    {product.productDetails.description.split(' ').slice(0, 10).join(' ') + (product.productDetails.description.split(' ').length > 20 ? '...' : '')}

                  </Typography>
                )}
                
                {/* Category - Removed duplicate chip */}
                {product.productDetails.category && (
                  <Chip 
                    label={product.productDetails.category} 
                    size="small" 
                    sx={{ mt: 1 }}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TopProducts;