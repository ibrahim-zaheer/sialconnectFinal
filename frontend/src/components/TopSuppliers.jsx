import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  CircularProgress, 
  Box,
  Chip,
  Avatar
} from '@mui/material';
import axios from 'axios';

const TopSuppliers = () => {
  const [topSuppliers, setTopSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  

  useEffect(() => {
    const fetchTopSuppliers = async () => {
      try {
        // Fetch top suppliers data from the API
        const response = await axios.get('/api/order/orders/top-suppliers');
        setTopSuppliers(response.data.topSuppliers);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch top suppliers');
        setLoading(false);
      }
    };

    fetchTopSuppliers();
  }, []);

  // const handleSupplierClick = (supplierId) => {
  //   // Navigate to supplier details page
  //   navigate(`/supplier/details/${supplierId}`);
  // };
  const handleSupplierClick = (supplierName) => {
    navigate('/ExporterProducts', { state: { supplierName } });
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
        Top Suppliers with Most Orders
      </Typography>
      
      <Grid container spacing={3} justifyContent="center">
        {topSuppliers.map((supplier, index) => (
          <Grid item xs={12} sm={6} md={4} key={supplier._id}>
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
              // onClick={() => handleSupplierClick(supplier._id)}
              onClick={() => handleSupplierClick(supplier.supplierDetails.name)}

            >
              {/* Supplier Badge for ranking */}
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
              
              {/* Supplier Profile Picture */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Avatar 
                  alt={supplier.supplierDetails.name} 
                  src={supplier.supplierDetails.profilePicture || '/default-profile.png'}  // Default profile image
                  sx={{ width: 100, height: 100 }}
                />
              </Box>

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {supplier.supplierDetails.name}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  {/* Optional: show supplier email */}
                  {supplier.supplierDetails.email && (
                    <Typography variant="body2" color="text.secondary">
                      {supplier.supplierDetails.email}
                    </Typography>
                  )}
                </Box>
                
                {/* Show the number of orders */}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Ordered {supplier.count} times
                </Typography>

                {/* Optional: show description if available */}
                {supplier.supplierDetails.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {supplier.supplierDetails.description}
                  </Typography>
                )}
                
                {/* Optional: show categories or additional info */}
                {supplier.supplierDetails.category && (
                  <Chip 
                    label={supplier.supplierDetails.category} 
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

export default TopSuppliers;
