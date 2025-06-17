// import React from 'react'
// import axios from 'axios';
// export async function fetchUserVerification(token) {
//   const res = await fetch('/api/adminVerification/myRequests', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     }
//   });
//   if (!res.ok) {
//     throw new Error('Failed to fetch verification status');
//   }
//   console.log(res.json());
//   return await res.json(); // { adminVerified, verifications }
// }


import axios from 'axios';

export async function fetchUserVerification(token) {
  try {
    const response = await axios.get('/api/adminVerification/myRequests', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // response.data contains { adminVerified, verifications }
    console.log(response.data);
    return response.data;
  } catch (error) {
    // You can customize error message here
    throw new Error(
      error.response?.data?.message || error.message || 'Failed to fetch verification status'
    );
  }
}
