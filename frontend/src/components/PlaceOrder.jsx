// src/components/PlaceOrder.js
import React, { useEffect, useState } from 'react';

const PlaceOrder = () => {
  const [isAllowed, setIsAllowed] = useState(false);
  

  useEffect(() => {
    // Check if a token exists in localStorage (or sessionStorage)
    const token = localStorage.getItem('token');

    // If token exists, allow placing order; otherwise, disallow
    if (token) {
      setIsAllowed(true);
    } else {
      setIsAllowed(false);
    }
  }, []);

  return (
    <div>
      <h1>Place Order</h1>
      {isAllowed ? (
        <p>Allowed</p> // Show this if the user is logged in (token exists)
      ) : (
        <p>Not allowed</p> // Show this if the user is not logged in (token missing)
      )}
    </div>
  );
};

export default PlaceOrder;
