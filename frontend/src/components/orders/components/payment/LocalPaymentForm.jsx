// // import React, { useState } from "react";
// // import axios from "axios";

// // const LocalPaymentForm = ({ orderId, onPaymentSuccess }) => {
// //   const [paymentMethod, setPaymentMethod] = useState("");
// //   const [mobileNumber, setMobileNumber] = useState("");
// //   const [accountName, setAccountName] = useState("");
// //   const [paymentAmount, setPaymentAmount] = useState("");
// //   const [paymentProof, setPaymentProof] = useState(null);
// //   const [status, setStatus] = useState(null);
// //   const [error, setError] = useState(null);

// //   const handlePaymentProofChange = (e) => {
// //     setPaymentProof(e.target.files[0]);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const token = localStorage.getItem("token"); // Fetch token from localStorage
// //     if (!token) {
// //       setError("No authentication token found.");
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append("orderId", orderId);
// //     formData.append("paymentMethod", paymentMethod);
// //     formData.append("mobileNumber", mobileNumber);
// //     formData.append("accountName", accountName);
// //     formData.append("paymentAmount", paymentAmount);
// //     formData.append("local_transaction_proof", paymentProof);

// //     try {
// //       const response = await axios.post(
// //         "/api/order/orders/initiate-local-token-payment",
// //         formData,
// //         {
// //           headers: {
// //             "Content-Type": "multipart/form-data",
// //             Authorization: `Bearer ${token}`, // Add the token to the headers
// //           },
// //         }
// //       );
// //       setStatus(response.data.message);
// //       setError(null); // Clear any previous error messages

// //       // Trigger the callback function if payment is successful
// //       if (onPaymentSuccess) {
// //         onPaymentSuccess(); // Call the callback function passed as prop
// //       }
// //     } catch (err) {
// //       setStatus(null);
// //       setError(err.response?.data?.message || "Error initiating payment.");
// //     }
// //   };

// //   return (
// //     <div className="local-payment-form">
// //       <h2>Local Payment Details</h2>
// //       <form onSubmit={handleSubmit}>
// //         <div>
// //           <label>Payment Method</label>
// //           <select
// //             value={paymentMethod}
// //             onChange={(e) => setPaymentMethod(e.target.value)}
// //             required
// //           >
// //             <option value="Easypaisa">Easypaisa</option>
// //             <option value="JazzCash">JazzCash</option>
// //             <option value="SadaPay">SadaPay</option>
// //             <option value="NayaPay">NayaPay</option>
// //             <option value="Upaisa">Upaisa</option>
// //             <option value="other">Other</option>
// //           </select>
// //         </div>

// //         <div>
// //           <label>Mobile Number</label>
// //           <input
// //             type="text"
// //             value={mobileNumber}
// //             onChange={(e) => setMobileNumber(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <div>
// //           <label>Account Name</label>
// //           <input
// //             type="text"
// //             value={accountName}
// //             onChange={(e) => setAccountName(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <div>
// //           <label>Payment Amount</label>
// //           <input
// //             type="number"
// //             value={paymentAmount}
// //             onChange={(e) => setPaymentAmount(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <div>
// //           <label>Payment Proof</label>
// //           <input
// //             type="file"
// //             name="local_transaction_proof"
// //             onChange={handlePaymentProofChange}
// //             required
// //           />
// //         </div>

// //         <button type="submit">Submit Payment</button>
// //       </form>

// //       {status && <div className="status success">{status}</div>}
// //       {error && <div className="status error">{error}</div>}
// //     </div>
// //   );
// // };

// // export default LocalPaymentForm;


// import React, { useState } from "react";
// import axios from "axios";
// import easypaisaLogo from "../../../../assets/images/payments/easypaisaLogo.png"
// import jazzcashLogo from "../../../../assets/images/payments/jazzcashLogo.jpeg"
// import nayapayLogo from "../../../../assets/images/payments/nayapayLogo.png"
// import sadapayLogo from "../../../../assets/images/payments/sadapayLogo.png"
// import upaisaLogo from "../../../../assets/images/payments/upaisaLogo.png"

// const LocalPaymentForm = ({ orderId, onPaymentSuccess }) => {
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [accountName, setAccountName] = useState("");
//   const [paymentAmount, setPaymentAmount] = useState("");
//   const [paymentProof, setPaymentProof] = useState(null);
//   const [status, setStatus] = useState(null);
//   const [error, setError] = useState(null);

//   const handlePaymentProofChange = (e) => {
//     setPaymentProof(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token"); // Fetch token from localStorage
//     if (!token) {
//       setError("No authentication token found.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("orderId", orderId);
//     formData.append("paymentMethod", paymentMethod);
//     formData.append("mobileNumber", mobileNumber);
//     formData.append("accountName", accountName);
//     formData.append("paymentAmount", paymentAmount);
//     formData.append("local_transaction_proof", paymentProof);

//     try {
//       const response = await axios.post(
//         "/api/order/orders/initiate-local-token-payment",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`, // Add the token to the headers
//           },
//         }
//       );
//       setStatus(response.data.message);
//       setError(null); // Clear any previous error messages

//       // Trigger the callback function if payment is successful
//       if (onPaymentSuccess) {
//         onPaymentSuccess(); // Call the callback function passed as prop
//       }
//     } catch (err) {
//       setStatus(null);
//       setError(err.response?.data?.message || "Error initiating payment.");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-3xl font-bold text-center mb-6">Local Payment Details</h2>
      
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="space-y-2">
//           <label htmlFor="paymentMethod" className="block text-lg font-semibold text-gray-700">
//             Payment Method
//           </label>
          
//           {/* <select
//             id="paymentMethod"
//             value={paymentMethod}
//             onChange={(e) => setPaymentMethod(e.target.value)}
//             required
//             className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="Easypaisa">Easypaisa
//             <img
//               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAzFBMVEX///8AAABCrVO4uLivr6/T09P09PQ+rFDz8/M7q00zqUcvqEQ3qkrKyspxcXHX19fq6up6enoqp0CKiorExMTw+PHk5ORra2tXV1fe3t5/f38+Pj4uLi7t7e0VFRWqqqqhoaGQkJBkZGTS6dU3Nzeq1rDk8uZISEgJFwwADgFTU1N1dXWYmJjI5My127oSEhJPsl9zv36JyJJjuXDK5c4iIiKPypfp9Op1v4C938JZtWeYzp/b7d1AREFYXlkfJCAVozKi06kXHhhNVE6JTYHmAAAPjklEQVR4nO1dCVfiSBCGcIQknOGOKAFFdgQVQRzxmF13//9/2iR9dwJ0QrqjPr95b94MObq/PqqqqztVudwPfvADgmapM544f+Zn8/nNn1bbLdR6WVcpLZQb4/bN3/koXAwmhS/Oczhe3EdyozFwG1nXMxl64+lRchj9Qjnr+sZEqX0hTg92ZSHrSotj2I7LDmLxNYarGy1VxHBWzLr6x9BzTqAHMM6awyEMByfz8+FmzWMfUuLn4f5TCp3KIi1+Pq6GWfMJYZkmPx+LrBmxaMTWfgKoZc2KQlL9dwSfphuHMjowwLaZNbcAY1n8fHSyZuehLpNgPj/Jml/5Si5Bb9WRLcGmbH4e5lkSLCkg6Fnj2RFsKCHoGThZEVTTgz4yGqiqetDHIAuCPYUE8/mWeoIVpQSzWBdLs9T2QbULJ7XFrjjUEkx9NSgApdKmlgHBfF6hG66cCcF8vqKM4U1GDKeqCBYyIqjMr6FaE1IYqWGYgaLAUOJH7SSu3lW/PS54GC+desKF84UKhr+S1Gww6fBOpWZnchb/RQo60Y1dqdFyr8FVLsYVy/LXUXFV4Wh5fviFzZi+Vunmabz6TEsCryzHeqfsZVSsLqyL+nObcSakVH6xunAQx18dw5KX6yOO0YUxzQ9xHVSXQw1CuAvjV0Pc6yOBF4FoJZJoLeFelClNi4J1SHaQS3QuuqlyYjESqsF90mWcoCUncQ0l5gHeJn7/UIyhxInYEik+cQ96EDwHd8RKOgFCxZ+yayvYiSKGUiIILe1PW4WLzURp6wuRle+JO7ZiC5dlOnxCELFnTt0GE1P77VT4hCFyIOHkE81CDGUdQhEYpKc3rpDG/ZMCmwiIDNLTSxHyct2cXk4UBMzGFDbAsmQooO5TKEVIXUjaojn+UUEaQlyEoKQVosDBmRQ+JzgXYuicXlAEjuviNM4uie2IyDkIdtwoTmPXpC/EUM4+4vFyUyhE0A0kxRd1/GhJGn5MQTeQlG/BjvsvUhikYnJG0gr4+HciKZytF/QLy1H4AoWfPDuEXAh5WaJUpOQT1YXw50RSlviC7oVTrBrxbxVTY0VD+GzCJKGbpiR+iEzSqWjxCiT5TrIppukBJO3MxDosOyjG0liNOPzkeUvjflbYH4sJhN5SzJGOIctJI+rRZ3AxXRZKBxzEjXGCbzXknfxK/t3BxXvdcceFUmN4XvZQ6TVqBdcZJDugKvPri+zOetGQ+iHU6V/4ng45i1+MrI4kUpAdliCBtEkX0o+zZ3gqMcC7bILiKzhJkLdxSKD2MxIOaj5hz5CiZDmKkdlAleTL93HN/recjUSVeQD67Zb7IQu9eCFTE7498L+ot262UlX95T9d/ifVNupIri1zac9Cv/Wkf8JNQ/bR552lR/wqKVBEFKSriZ1p7iJ+lhLsIwryv63cmfoq8oKST/S2CiLW7UzN4hUGQFP+5zNKDJlLS9vTiblcTa7EuVfzaazHcF8neihInI6yjnfxePMY6tr+650EH/eIwFH2QeW1x1AzPw7cUZMwH/sKg+90bY+hZoUMGxrnKatHR23MT78PNSNknXLoxHPOH8JSdRxMXQs6ca+wwSikQXKaQeCkFaBoitxbc06SrdNsgu09AIZHxynEeaGVjGUrs7BXT4YGxumd8COVzjKefK3H25FLGbMqYKjZ18dvplBpFNuDoz6PUd+tqQslEI1HEzI8pPf347zRKSyd/s0ZTfbX1bzvLAulzxFy7rcFGQpPxbTwuDmohdMD6kNPnj6pKRFiZUT4F2Rgo2OKlpoSAWZe05qrNwUlIWEaSJuo9b4cdIPZodtr+UXtyDD1KB63bVLCBjZsVZfeqsD2Vk3xDgs43XqQLXE0XT3Fa4sq0pA9/9eGxlBUMRfZVtXMF6kS59bUWIryJeoD26i+xJGqqWyuOEu2fHvl2hRIHInT40HnSjM38grL0VKG7cZnaRJnF2pSQ4tnhsfCHT9mcKkx1jcxES5St6UVtpegP3heJLVsaOJ7sCTZ4bMDBOVJnNuoiWFUZUz914MEPVSNRwnF5nhRA2A/p17Qc6SQ4bpRho3zUY0sLO2p/3sVXU6o2PQ1cndf05qry/RKubOjx0pEselLnHWErAngjZmUDKruw/ERimGlbjpe7xcAKXGc2fsaMarMqK33ExGlMBAM++HUsXqrRRhq+2FKMI3fDqsp6+UUmXP7YonOQIBqarwoPB8eRLpprhMO1rtVTH5SupBf6kfBsIyP2CTfXi0zJr+EntvjeBXQVVVLe41hcrx9rCwhDcgifUEKoQm1tWFZmw8Blt3dWrOqcbsvKEHa2u326DiF0KuWvVrPHvdp5d+3s2fNNo0k9DzYv2UxPCZsWJZG1bRsbfP8+jHbPT5eXl4+Pt7ezV6fNyvbMqtJ2WmyxAxE/DmjG0a1apqmZVne39WqRy05twDyxqgP4XEqEaZc5+k6geRLF7aU1SGF1Ylj7FSYr5IJ5rqxzMfUUVWwhXmZ5VQ0XuQTzOV22VGUZa3x+IixUE2XoK5o1zu3zmYu6oY8W+ZTUNQ1VT0YUFQ/UA2lBHO5J9UUq3L3giLwoVaiSt/Pi4BSpaHoXA2Hy9jOh6QwzBS9znHQFXPBnwxL1eGvCKwVjFQ9mxGKsDNjrPoTwVxJ3GwWQVdgN+wESD9II4KdKW02yjyaEAfdtfCeWDx+1ktGIjSMt01cr7wAP1NTdwxSALexdx6O8LM+Fz8fuxQ5GtZK2RnPOLjdxNni3Au9aj9/mvnH421tn2rJGZb28Snk517cvdiJNlsgvepatjc0BVx/rJKQ1Ktfgx7A79nGirNv5rGzXuLvrWaMy4+NbR3dP9N1f4Nq8/r4uefeXrzdPW2MYCuN23DSdd3fkbJs7eF199X6LoTu2y7YNPTWsXYAy9BXm4f1x93eDdSvjO4XHY0/+MEPfvCDH/xAMm6fHw4FVvn6WNuGYSravs8E4ORHNYO9NVWAZ1qNrOshD/A7cinHuj8Hbr/9KM09W7peNb71outu8/L6rQn+IA4axYnTdiMSNxWcft0NYgBVguwG1KVmo1YrDanYXMNxsVgcU9EAiwH8f9Wm9Xq/DwLp9WoRoWmGy37dAZGigoKC19b73p8pnWypV/LK7IXjgZXa9Xo7SKtRrnDVDOiROF1t9hpKKjc4RzmD0PXGAj2ybaGGAelKqYxF4IagoYJ/+fkbQHS3ERs18BzFJ3bRrVPyPM4HUsMpd0ZtJqpiCeYv3NZQ/jY2LCibbImOuEXFRS7lflEMy2wkqBEI9ASye1GZRHiGi1wNP3NBdQ2VR/YGZswMEh3+ohmez5ky5yRKOxVqdALZMBno+NCHpIbMK4f/EoblUM7HkhDDFhOEGM8JJlHuDWAYpOv4i2IYjpeOupGJpbpshxjOQ0+iq1zY523wdzAFtqFngpRvRxly8UDhbOTS5oGQUqE+DBcJ80HU2B9HPMMJujJw8GzkWna+eCcvqOSoXHNXf6YoxNVUhCEHGIkclzvtk7HB9yEOzng1uEF3OQz1UZ2aOoQh6nsQrhDOSDe4BO+f+leauPV9hoDVGRhlKGFTWZDhpNQooHFTpKsQ/Ac3Ht+H4Nc5KLNxQ94MszHfs+1AGP4X/H+LpDe444YqGOU2REKnglJdXOB3uKghBBjOwciCRLZUs8JZhZKgcQzBgCJJLhb4HjBj7um60Ax7uP1DdVqSOvhAk6WCHvqXEOnn5w1S70MM8etgTUr4JhddgX3CjVIgfqjg3vP8IBDGcC7hqH0DjqHDXqbrBEQssQFc3BgwXckcX+vBoIfHGRItBqa2g1OCkYfu9/dhfoqrWoKvWpL2AHXhGILHyNtdUhxfcBP3IclNPG+PS1TykKMMqVQqoFOuIswEqs6UpEFF5qeTQomyaaZcR8CewQxhoMol0L7nkzx+e48nD+/1GbKZ2C6wTSOg8cPXHL6Ktag+5IQxsWmA1KMoT1iGJCfH9oxo/h5mQWc6u8EMQ9nkR7X4DFHVgCimDNVeJENYc4J5jyuCaWYiSysRyjuw6QBDOivmH8IwN3znnnGjGFZ4hnResf8gQyAaqLF+Tm6lbZpw/PAaZkin+OgwDK/fIhJWAMN0Xx+i8TCcsMZQBzMkrdLjGdJZtc9gg4n2oV+nNkuylzvah7/9j8GaTBa7aYVuSTrByz2sEuge/69mzcXPXuCXk+zAnUMM0TUHNxDzVLgPc0Hj9mouXmH4tQvNQ84u/Sc4YlXuODdbfyq2xmTxxDcOJUtzhXuy+CnBAhuIBknw3uIZUoJriK6BOU3F0G9H96FLrXpQEPEKkqVUA3F2qWaGDgys4blAMAjJWx380s6IHRdj9M4C2ypIjBGG1FMOohzSh/kohh1Pkp9RZbYRMaBbiCkAWw4zXFerHMU729oE31CBR5E1hHMgVmDdqEzVQBu7WC2jBkXCmWLocK8rYkZ49kLTkh2lf1ARCB1UEmSEtc0Zx/DR0tlAQX4kKt1+6uI6oDGHZG4ZzS4yTkeoNJSbLRCMJFkLxRCtvdEC058/DlMn+HauD13mafy8r8b/BpegqEJyk2gLTdfM1Qw57N424Gi67f8Ax/qZ/5oajmFdwSvKG2AmoLrTzbBwJ5Q6oe/KtyoUjRY9OiYe3TJeHHCSBpYPrTakj/1/o9WIP596eP1EGD7awcmy1dPs7u4JnYO1A/mDUx1f0HqhQpkJ2+kCvzLQK1zmkvcIhp7yIiIfiEDsRbmilEG0XeqV2V/g6oAuxY+cUbqdWgGDrwn9GAgo0oGOIniyGQG2xGrr5EMAOpdbrTciGYarwf76HsUwKu0LFC9cNt8rnmEogphh4rNmjLupR/lpJnxhaFXEeBTaoOoXhOGCeSO24ZjE2P09+nCR54DlJ2NDjsN+Gk+4UN9MGEzkXqpCQ9igYGBxXUJMH6pBJ3CGvVMM6RTclL1EUZzu9bVxxjDljqSuuFG+tlz3VbeqhoeqZa5Z5YGm8aLM+0uXxKXCJqQYB81y3+qh0dwiDOukbbaM97kMbaP7AmPT5GmGlBjymofJ+DiEE9hfiC8iGOaCo5LPz+tZxCHy2qTlFIPXOQun1VoQ+6g3nrRabdrFnYP2QaUJ7pqSwiirrdau1yehrM/nY6c1CVg3Fi2ntXBJkbRjtdhuOZPikH86N3Sd1jKoynjRajn1CO99GigxhieSfwHbsF36FVHJM+ujChC+wGQIr56+IICq2KIRVIMTlbYLFvuf/gpAYnRQbAxLS6S8ob35PUZpVC42tF76HgwjDJcpe+nLM8xVuIRBLr7yLSRNgOaSZCOh3VjfQtIgVDpuu73ktPJ3GaU/+EG6+B+zaSYyxayx4gAAAABJRU5ErkJggg==" // Replace with your actual image link
//               alt="Easypaisa"
//               className="h-8"
//             />
//             </option>
//             <option value="JazzCash">JazzCash
//             <img
//               src="data:image/png;base64,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" // Replace with your actual image link
//               alt="JazzCash"
//               className="h-8"
//             />
//             </option>
//             <option value="SadaPay">SadaPay</option>
//             <option value="NayaPay">NayaPay</option>
//             <option value="Upaisa">Upaisa</option>
//             <option value="other">Other</option>
//           </select> */}
         
// <div className="relative">
//   <select
//     id="paymentMethod"
//     value={paymentMethod}
//     onChange={(e) => setPaymentMethod(e.target.value)}
//     required
//     className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
//   >
//     <option value="">Select Payment Method</option>
//     <option value="Easypaisa">Easypaisa</option>
//     <option value="JazzCash">JazzCash</option>
//     <option value="SadaPay">SadaPay</option>
//     <option value="NayaPay">NayaPay</option>
//     <option value="Upaisa">Upaisa</option>
//     <option value="other">Other</option>
//   </select>
//   <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//     <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//       <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
//     </svg>
//   </div>
// </div>

// {paymentMethod === "Easypaisa" && (
//   <img 
//   src={easypaisaLogo} 
//     alt="Easypaisa" 
//     className="h-8 mt-2"
//   />
// )}
// {paymentMethod === "JazzCash" && (
//   <img 
//   src={jazzcashLogo} 
//     alt="JazzCash" 
//     className="h-8 mt-2"
//   />
// )}
// {paymentMethod === "SadaPay" && (
//   <img 
//   src={sadapayLogo} 
//     alt="Sadapay" 
//     className="h-8 mt-2"
//   />
// )}
// {paymentMethod === "NayaPay" && (
//   <img 
//   src={nayapayLogo} 
//     alt="nayapay" 
//     className="h-8 mt-2"
//   />
// )}
// {paymentMethod === "Upaisa" && (
//   <img 
//   src={upaisaLogo} 
//     alt="upaisa" 
//     className="h-8 mt-2"
//   />
// )}

          
//         </div>

//         <div className="space-y-2">
//           <label htmlFor="mobileNumber" className="block text-lg font-semibold text-gray-700">
//             Mobile Number
//           </label>
//           <input
//             type="text"
//             id="mobileNumber"
//             value={mobileNumber}
//             onChange={(e) => setMobileNumber(e.target.value)}
//             required
//             className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="space-y-2">
//           <label htmlFor="accountName" className="block text-lg font-semibold text-gray-700">
//             Account Name
//           </label>
//           <input
//             type="text"
//             id="accountName"
//             value={accountName}
//             onChange={(e) => setAccountName(e.target.value)}
//             required
//             className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="space-y-2">
//           <label htmlFor="paymentAmount" className="block text-lg font-semibold text-gray-700">
//             Payment Amount
//           </label>
//           <input
//             type="number"
//             id="paymentAmount"
//             value={paymentAmount}
//             onChange={(e) => setPaymentAmount(e.target.value)}
//             required
//             className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="space-y-2">
//           <label htmlFor="paymentProof" className="block text-lg font-semibold text-gray-700">
//             Payment Proof
//           </label>
//           <input
//             type="file"
//             id="paymentProof"
//             name="local_transaction_proof"
//             onChange={handlePaymentProofChange}
//             required
//             className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           Submit Payment
//         </button>
//       </form>

//       {status && <div className="mt-4 text-center text-green-600 font-semibold">{status}</div>}
//       {error && <div className="mt-4 text-center text-red-600 font-semibold">{error}</div>}
//     </div>
//   );
// };

// export default LocalPaymentForm;


import React, { useState } from "react";
import axios from "axios";
import easypaisaLogo from "../../../../assets/images/payments/easypaisaLogo.png";
import jazzcashLogo from "../../../../assets/images/payments/jazzcashLogo.jpeg";
import nayapayLogo from "../../../../assets/images/payments/nayapayLogo.png";
import sadapayLogo from "../../../../assets/images/payments/sadapayLogo.png";
import upaisaLogo from "../../../../assets/images/payments/upaisaLogo.png";

const LocalPaymentForm = ({ orderId, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentProof, setPaymentProof] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  
  // Add your IBAN number here
  const ibanNumber = "PK36SCBL0000001123456702";
  const [copyStatus, setCopyStatus] = useState("Copy");

  const handlePaymentProofChange = (e) => {
    setPaymentProof(e.target.files[0]);
  };

  const copyIbanToClipboard = () => {
    navigator.clipboard.writeText(ibanNumber)
      .then(() => {
        setCopyStatus("Copied!");
        setTimeout(() => setCopyStatus("Copy"), 2000);
      })
      .catch(err => {
        console.error('Failed to copy IBAN: ', err);
        setCopyStatus("Failed to copy");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found.");
      return;
    }

    const formData = new FormData();
    formData.append("orderId", orderId);
    formData.append("paymentMethod", paymentMethod);
    formData.append("mobileNumber", mobileNumber);
    formData.append("accountName", accountName);
    formData.append("paymentAmount", paymentAmount);
    formData.append("local_transaction_proof", paymentProof);

    try {
      const response = await axios.post(
        "/api/order/orders/initiate-local-token-payment",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStatus(response.data.message);
      setError(null);

      if (onPaymentSuccess) {
        onPaymentSuccess();
      }
    } catch (err) {
      setStatus(null);
      setError(err.response?.data?.message || "Error initiating payment.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Local Payment Details</h2>
      
      {/* IBAN Number Section */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Bank Transfer Details</h3>
        <p className="text-gray-600 mb-3">Please transfer the exact amount to our IBAN account:</p>
        
        <div className="flex items-center justify-between bg-white p-3 rounded border border-gray-300">
          <div className="flex-1">
            <p className="font-mono text-lg">{ibanNumber}</p>
          </div>
          <button
            onClick={copyIbanToClipboard}
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {copyStatus}
          </button>
        </div>
        
        <p className="mt-2 text-sm text-gray-500">
          After transfer, please upload the payment proof below.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="paymentMethod" className="block text-lg font-semibold text-gray-700">
            Payment Method
          </label>
          
          <div className="relative">
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="">Select Payment Method</option>
              <option value="Easypaisa">Easypaisa</option>
              <option value="JazzCash">JazzCash</option>
              <option value="SadaPay">SadaPay</option>
              <option value="NayaPay">NayaPay</option>
              <option value="Upaisa">Upaisa</option>
              <option value="other">Other</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>

          {paymentMethod === "Easypaisa" && (
            <img 
              src={easypaisaLogo} 
              alt="Easypaisa" 
              className="h-8 mt-2"
            />
          )}
          {paymentMethod === "JazzCash" && (
            <img 
              src={jazzcashLogo} 
              alt="JazzCash" 
              className="h-8 mt-2"
            />
          )}
          {paymentMethod === "SadaPay" && (
            <img 
              src={sadapayLogo} 
              alt="Sadapay" 
              className="h-8 mt-2"
            />
          )}
          {paymentMethod === "NayaPay" && (
            <img 
              src={nayapayLogo} 
              alt="nayapay" 
              className="h-8 mt-2"
            />
          )}
          {paymentMethod === "Upaisa" && (
            <img 
              src={upaisaLogo} 
              alt="upaisa" 
              className="h-8 mt-2"
            />
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="mobileNumber" className="block text-lg font-semibold text-gray-700">
            Mobile Number
          </label>
          <input
            type="text"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="accountName" className="block text-lg font-semibold text-gray-700">
            Account Name
          </label>
          <input
            type="text"
            id="accountName"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            required
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="paymentAmount" className="block text-lg font-semibold text-gray-700">
            Payment Amount
          </label>
          <input
            type="number"
            id="paymentAmount"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            required
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="paymentProof" className="block text-lg font-semibold text-gray-700">
            Payment Proof (Screenshot/Receipt)
          </label>
          <input
            type="file"
            id="paymentProof"
            name="local_transaction_proof"
            onChange={handlePaymentProofChange}
            required
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept="image/*,.pdf"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Payment
        </button>
      </form>

      {status && <div className="mt-4 text-center text-green-600 font-semibold">{status}</div>}
      {error && <div className="mt-4 text-center text-red-600 font-semibold">{error}</div>}
    </div>
  );
};

export default LocalPaymentForm;